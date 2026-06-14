import { normalizeIntake } from "./intake-normalizer";
import { generatePersonas } from "./persona-generator";
import { simulateInterviews } from "./interview-simulator";
import { evaluatePersonas } from "./critic-evaluator";
import { synthesizeInsights } from "./insight-synthesizer";
import { formatLaunchBrief } from "./launch-brief-formatter";
import {
  ProductInput,
  AgentStep,
  Persona,
  InterviewResponse,
  PersonaScore,
  InsightSummary,
  LaunchBrief,
} from "@/lib/schemas";
import { studyPersonas, studyInterviews, studyScores, studyInsights, studyBrief } from "./demo/study";
import { fintechPersonas, fintechInterviews, fintechScores, fintechInsights, fintechBrief } from "./demo/fintech";
import { healthPersonas, healthInterviews, healthScores, healthInsights, healthBrief } from "./demo/health";
import { creatorPersonas, creatorInterviews, creatorScores, creatorInsights, creatorBrief } from "./demo/creator";

function generateId(): string {
  return `run_${crypto.randomUUID()}`;
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
  steps: AgentStep[],
  stepName: string,
  status: AgentStep["status"]
) {
  const step = steps.find((s) => s.name === stepName);
  if (step) {
    step.status = status;
    if (status === "running") step.startedAt = new Date().toISOString();
    if (status === "completed" || status === "failed")
      step.completedAt = new Date().toISOString();
  }
}

export interface RunResult {
  id: string;
  status: "completed" | "failed";
  input: ProductInput;
  output: {
    personas: Persona[];
    interviews: InterviewResponse[];
    scores: PersonaScore[];
    insights: InsightSummary;
    brief: LaunchBrief;
  } | null;
  steps: AgentStep[];
  createdAt: string;
  completedAt: string;
}

type DemoOutput = {
  personas: Persona[];
  interviews: InterviewResponse[];
  scores: PersonaScore[];
  insights: InsightSummary;
  brief: LaunchBrief;
};

function getDemoData(input: ProductInput): DemoOutput {
  const idea = input.idea.toLowerCase();

  if (idea.includes("study") || idea.includes("tutor") || idea.includes("learning")) {
    return { personas: studyPersonas, interviews: studyInterviews, scores: studyScores, insights: studyInsights, brief: studyBrief };
  }
  if (idea.includes("budget") || idea.includes("fintech") || idea.includes("money") || idea.includes("finance")) {
    return { personas: fintechPersonas, interviews: fintechInterviews, scores: fintechScores, insights: fintechInsights, brief: fintechBrief };
  }
  if (idea.includes("health") || idea.includes("telemedicine") || idea.includes("medical") || idea.includes("doctor")) {
    return { personas: healthPersonas, interviews: healthInterviews, scores: healthScores, insights: healthInsights, brief: healthBrief };
  }
  if (idea.includes("creator") || idea.includes("monetiz") || idea.includes("content") || idea.includes("influencer")) {
    return { personas: creatorPersonas, interviews: creatorInterviews, scores: creatorScores, insights: creatorInsights, brief: creatorBrief };
  }

  // Fallback: study demo (shouldn't hit for the 4 presets)
  return { personas: studyPersonas, interviews: studyInterviews, scores: studyScores, insights: studyInsights, brief: studyBrief };
}

export async function executeRun(input: ProductInput): Promise<RunResult> {
  const id = generateId();
  const steps = createSteps();
  const createdAt = new Date().toISOString();

  try {
    // Check if this is a demo preset (fast path)
    const idea = input.idea.toLowerCase();
    const isDemoPreset =
      idea.includes("study") || idea.includes("budget") || idea.includes("fintech") ||
      idea.includes("telemedicine") || idea.includes("health") || idea.includes("creator") ||
      idea.includes("monetiz") || idea.includes("content creator");

    if (isDemoPreset) {
      // Fast demo mode: use pre-generated data
      updateStep(steps, "normalize", "running");
      await new Promise((r) => setTimeout(r, 200));
      updateStep(steps, "normalize", "completed");

      updateStep(steps, "personas", "running");
      await new Promise((r) => setTimeout(r, 500));
      updateStep(steps, "personas", "completed");

      updateStep(steps, "interviews", "running");
      await new Promise((r) => setTimeout(r, 500));
      updateStep(steps, "interviews", "completed");

      updateStep(steps, "critic", "running");
      await new Promise((r) => setTimeout(r, 300));
      updateStep(steps, "critic", "completed");

      updateStep(steps, "insights", "running");
      await new Promise((r) => setTimeout(r, 400));
      updateStep(steps, "insights", "completed");

      updateStep(steps, "brief", "running");
      await new Promise((r) => setTimeout(r, 300));
      updateStep(steps, "brief", "completed");

      const demoData = getDemoData(input);
      return {
        id,
        status: "completed",
        input,
        output: demoData,
        steps,
        createdAt,
        completedAt: new Date().toISOString(),
      };
    }

    // Full AI pipeline for custom inputs
    updateStep(steps, "normalize", "running");
    const normalized = await normalizeIntake(input);
    updateStep(steps, "normalize", "completed");

    updateStep(steps, "personas", "running");
    let personas = await generatePersonas(normalized);
    updateStep(steps, "personas", "completed");

    updateStep(steps, "interviews", "running");
    let interviews = await simulateInterviews(personas, normalized);
    updateStep(steps, "interviews", "completed");

    updateStep(steps, "critic", "running");
    let criticResult = await evaluatePersonas(personas, interviews);
    const criticStep = steps.find((s) => s.name === "critic")!;
    while (criticResult.needsRetry && criticStep.retryCount < criticStep.maxRetries) {
      criticStep.retryCount++;
      criticStep.description = `Retry ${criticStep.retryCount}/${criticStep.maxRetries}: Regenerating personas (low diversity)`;
      updateStep(steps, "personas", "running");
      personas = await generatePersonas(normalized);
      updateStep(steps, "personas", "completed");
      updateStep(steps, "interviews", "running");
      interviews = await simulateInterviews(personas, normalized);
      updateStep(steps, "interviews", "completed");
      criticResult = await evaluatePersonas(personas, interviews);
    }
    updateStep(steps, "critic", "completed");

    updateStep(steps, "insights", "running");
    const insights = await synthesizeInsights(personas, interviews, criticResult.scores);
    updateStep(steps, "insights", "completed");

    updateStep(steps, "brief", "running");
    const brief = await formatLaunchBrief(normalized, insights);
    updateStep(steps, "brief", "completed");

    return {
      id,
      status: "completed",
      input,
      output: { personas, interviews, scores: criticResult.scores, insights, brief },
      steps,
      createdAt,
      completedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Agent run failed:", error);
    return {
      id,
      status: "failed",
      input,
      output: null,
      steps,
      createdAt,
      completedAt: new Date().toISOString(),
    };
  }
}
