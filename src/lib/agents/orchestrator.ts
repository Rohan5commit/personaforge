import { normalizeIntake } from "./intake-normalizer";
import { generatePersonas } from "./persona-generator";
import { simulateInterviews } from "./interview-simulator";
import { evaluatePersonas } from "./critic-evaluator";
import { synthesizeInsights } from "./insight-synthesizer";
import { formatLaunchBrief } from "./launch-brief-formatter";
import {
  ProductInput,
  AgentRun,
  AgentStep,
} from "@/lib/schemas";

const RUNS = new Map<string, AgentRun>();

function generateId(): string {
  return `run_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function createSteps(): AgentStep[] {
  return [
    {
      name: "normalize",
      status: "pending",
      agentName: "Intake Normalizer",
      description: "Processing and normalizing your product input",
      retryCount: 0,
      maxRetries: 0,
    },
    {
      name: "personas",
      status: "pending",
      agentName: "Persona Generator",
      description: "Creating 8 diverse customer personas",
      retryCount: 0,
      maxRetries: 2,
    },
    {
      name: "interviews",
      status: "pending",
      agentName: "Interview Simulator",
      description: "Simulating interviews with each persona",
      retryCount: 0,
      maxRetries: 0,
    },
    {
      name: "critic",
      status: "pending",
      agentName: "Critic / Evaluator",
      description: "Evaluating persona quality and diversity",
      retryCount: 0,
      maxRetries: 2,
    },
    {
      name: "insights",
      status: "pending",
      agentName: "Insight Synthesizer",
      description: "Clustering segments and extracting insights",
      retryCount: 0,
      maxRetries: 0,
    },
    {
      name: "brief",
      status: "pending",
      agentName: "Launch Brief Formatter",
      description: "Generating actionable launch brief",
      retryCount: 0,
      maxRetries: 0,
    },
  ];
}

function updateStep(
  run: AgentRun,
  stepName: string,
  status: AgentStep["status"]
) {
  const step = run.steps.find((s) => s.name === stepName);
  if (step) {
    step.status = status;
    if (status === "running") step.startedAt = new Date().toISOString();
    if (status === "completed" || status === "failed")
      step.completedAt = new Date().toISOString();
  }
}

export function getRun(id: string): AgentRun | undefined {
  return RUNS.get(id);
}

export function getAllRuns(): AgentRun[] {
  return Array.from(RUNS.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function createRunEntry(input: ProductInput): AgentRun {
  const id = generateId();
  const run: AgentRun = {
    id,
    status: "pending",
    steps: createSteps(),
    input,
    output: null,
    createdAt: new Date().toISOString(),
  };
  RUNS.set(id, run);
  return run;
}

export async function executeRun(input: ProductInput): Promise<AgentRun> {
  const existingRun = Array.from(RUNS.values()).find(
    (r) => r.input === input && r.status === "pending"
  );
  
  const run: AgentRun = existingRun || createRunEntry(input);
  run.status = "running";

  try {
    // Step 1: Normalize
    updateStep(run, "normalize", "running");
    const normalized = await normalizeIntake(input);
    updateStep(run, "normalize", "completed");

    // Step 2: Generate personas
    updateStep(run, "personas", "running");
    let personas = await generatePersonas(normalized);
    updateStep(run, "personas", "completed");

    // Step 3: Simulate interviews
    updateStep(run, "interviews", "running");
    let interviews = await simulateInterviews(personas, normalized);
    updateStep(run, "interviews", "completed");

    // Step 4: Critic evaluation with retry loop
    updateStep(run, "critic", "running");
    let criticResult = await evaluatePersonas(personas, interviews);
    let retryCount = 0;
    const maxRetries = 2;

    while (criticResult.needsRetry && retryCount < maxRetries) {
      retryCount++;
      const criticStep = run.steps.find((s) => s.name === "critic");
      if (criticStep) criticStep.retryCount = retryCount;

      // Regenerate personas with feedback
      const newPersonas = await generatePersonas(normalized);
      const newInterviews = await simulateInterviews(newPersonas, normalized);
      const newCritic = await evaluatePersonas(newPersonas, newInterviews);

      if (newCritic.overallDiversity > criticResult.overallDiversity) {
        personas = newPersonas;
        interviews = newInterviews;
        criticResult = newCritic;
      }
    }
    updateStep(run, "critic", "completed");

    // Step 5: Synthesize insights
    updateStep(run, "insights", "running");
    const insights = await synthesizeInsights(personas, interviews, criticResult.scores);
    updateStep(run, "insights", "completed");

    // Step 6: Format launch brief
    updateStep(run, "brief", "running");
    const brief = await formatLaunchBrief(normalized, insights);
    updateStep(run, "brief", "completed");

    run.output = { personas, interviews, scores: criticResult.scores, insights, brief };
    run.status = "completed";
    run.completedAt = new Date().toISOString();
  } catch (error) {
    run.status = "failed";
    console.error("Agent run failed:", error);
  }

  return run;
}
