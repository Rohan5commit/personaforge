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
  Persona,
  InterviewResponse,
  PersonaScore,
  InsightSummary,
  LaunchBrief,
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

// Demo data for fast demo mode
function getDemoData(input: ProductInput): {
  personas: Persona[];
  interviews: InterviewResponse[];
  scores: PersonaScore[];
  insights: InsightSummary;
  brief: LaunchBrief;
} {
  const isStudyAssistant = input.idea.toLowerCase().includes("study");
  const isFintech = input.idea.toLowerCase().includes("budget") || input.idea.toLowerCase().includes("fintech");

  const personas: Persona[] = [
    {
      id: "p1", name: "Sarah Chen", ageRange: "22-26", role: "Graduate Student",
      incomeBand: "low", educationBand: "Masters",
      goals: ["Ace upcoming exams", "Study more efficiently", "Balance work and school"],
      frustrations: ["Too many resources to organize", "Generic study tools", "No personalized plan"],
      toolsCurrentlyUsed: ["Quizlet", "Notion", "Google Calendar"],
      buyingBehavior: "Researches extensively, compares free alternatives first",
      objections: ["Already using free tools", "Tight student budget", "Skeptical of AI accuracy"],
      preferredChannels: ["Reddit", "Instagram", "YouTube"],
      quoteSnippets: ["I waste hours organizing notes instead of studying", "If it actually adapts to how I learn, I'd pay for it"],
    },
    {
      id: "p2", name: "Marcus Johnson", ageRange: "19-22", role: "Undergraduate Student",
      incomeBand: "low", educationBand: "Bachelors",
      goals: ["Improve GPA", "Study less but learn more", "Get into grad school"],
      frustrations: ["Procrastination", "One-size-fits-all approaches", "Can't find study groups"],
      toolsCurrentlyUsed: ["Anki", "Discord", "YouTube"],
      buyingBehavior: "Impulse buyer if peer推荐, price-sensitive",
      objections: ["Free alternatives exist", "Don't trust AI to know my level"],
      preferredChannels: ["TikTok", "Discord", "Twitter"],
      quoteSnippets: ["I need something that knows when I'm struggling", "Show me it works before I pay"],
    },
    {
      id: "p3", name: "Dr. Emily Park", ageRange: "35-44", role: "Working Professional",
      incomeBand: "high", educationBand: "Doctorate",
      goals: ["Upskill quickly", "Stay competitive", "Learn new domain"],
      frustrations: ["Limited time", "Generic courses", "No accountability"],
      toolsCurrentlyUsed: ["Coursera", "LinkedIn Learning", "Notion"],
      buyingBehavior: "Willing to pay premium for quality, values time savings",
      objections: ["Quality of AI explanations", "Privacy concerns with learning data"],
      preferredChannels: ["LinkedIn", "Email newsletters"],
      quoteSnippets: ["Time is my biggest constraint", "I'd pay $50/mo if it saves me 5 hours/week"],
    },
    {
      id: "p4", name: "Alex Rivera", ageRange: "25-34", role: "Career Switcher",
      incomeBand: "medium", educationBand: "Bachelors",
      goals: ["Learn coding fast", "Build portfolio", "Land first tech job"],
      frustrations: ["Overwhelmed by resources", "No structured path", "Imposter syndrome"],
      toolsCurrentlyUsed: ["freeCodeCamp", "YouTube", "VS Code"],
      buyingBehavior: "Invests in courses that promise outcomes",
      objections: ["Already spent on bootcamps", "AI can't teach real skills"],
      preferredChannels: ["YouTube", "Reddit", "Twitter"],
      quoteSnippets: ["I need a roadmap, not more videos", "If it can quiz me on what I actually don't know, that's huge"],
    },
    {
      id: "p5", name: "Priya Sharma", ageRange: "28-35", role: "Parent Returning to Study",
      incomeBand: "medium", educationBand: "Masters",
      goals: ["Complete certification", "Advance career", "Set example for kids"],
      frustrations: ["Fragmented study time", "Guilt about time away from family", "Outdated study methods"],
      toolsCurrentlyUsed: ["Google Docs", "Flashcard apps"],
      buyingBehavior: "Needs proven ROI before spending",
      objections: ["Family budget priorities", "Skepticism about AI claims"],
      preferredChannels: ["Facebook groups", "LinkedIn"],
      quoteSnippets: ["Every minute counts when you have kids", "Show me real results from people like me"],
    },
    {
      id: "p6", name: "Jordan Taylor", ageRange: "17-20", role: "High School Senior",
      incomeBand: "low", educationBand: "High School",
      goals: ["Get into good college", "Improve SAT scores", "Study without burnout"],
      frustrations: ["Boring study methods", "Parents pressure", "No idea how to study effectively"],
      toolsCurrentlyUsed: ["Khan Academy", "Instagram", "TikTok"],
      buyingBehavior: "Parents make purchase decisions, influenced by peers",
      objections: ["Parents won't pay", "Looks like just another app"],
      preferredChannels: ["TikTok", "Instagram", "Snapchat"],
      quoteSnippets: ["Make studying not suck", "My friends would actually use this"],
    },
    {
      id: "p7", name: "Tom Wilson", ageRange: "45-54", role: "Mid-Career Manager",
      incomeBand: "high", educationBand: "Masters",
      goals: ["Get MBA", "Promote to VP", "Stay sharp"],
      frustrations: ["Older student challenges", "Tech unfamiliarity", "Time constraints"],
      toolsCurrentlyUsed: ["PowerPoint", "Email", "Basic LMS"],
      buyingBehavior: "Company may reimburse, values simplicity",
      objections: ["Too complex", "Don't need AI to study"],
      preferredChannels: ["Email", "LinkedIn"],
      quoteSnippets: ["Just tell me what to study", "Keep it simple and effective"],
    },
    {
      id: "p8", name: "Nina Kowalski", ageRange: "30-39", role: "Medical Resident",
      incomeBand: "medium", educationBand: "Doctorate",
      goals: ["Pass board exams", "Retain massive amounts of info", "Study during breaks"],
      frustrations: ["Information overload", "Burnout", "Generic flashcards"],
      toolsCurrentlyUsed: ["Anki", "UWorld", "First Aid"],
      buyingBehavior: "Will pay anything that works, peer validation matters",
      objections: ["AI doesn't understand medical depth", "Privacy of study patterns"],
      preferredChannels: ["Twitter", "Medical forums", "WhatsApp groups"],
      quoteSnippets: ["If it can adapt to what I don't know in real-time, I'm in", "Show me board score improvements"],
    },
  ];

  const interviews: InterviewResponse[] = personas.map((p) => ({
    personaId: p.id,
    reactions: [`Sounds interesting for someone like me`, `I see the potential but have concerns`],
    objections: p.objections.slice(0, 2),
    desiredFeatures: ["Personalized study plans", "Progress tracking", "Adaptive quizzes"],
    trustConcerns: ["Data privacy", "AI accuracy compared to human tutors"],
    buyingTriggers: ["Free trial", "Peer testimonials", "Measurable outcomes"],
    switchingBarriers: ["Current tools work fine", "Learning curve", "Cost"],
    transcript: [
      { question: "What's your biggest study challenge?", answer: p.frustrations[0] },
      { question: "How do you currently solve this?", answer: `I use ${p.toolsCurrentlyUsed[0]} but it's not ideal` },
      { question: "Would you pay for a better solution?", answer: p.incomeBand === "high" ? "Yes, if it saves time" : "Only if there's a free tier" },
      { question: "What would make you switch?", answer: "Proven results from people like me" },
    ],
  }));

  const scores: PersonaScore[] = personas.map((p) => ({
    personaId: p.id,
    diversityScore: 0.75 + Math.random() * 0.2,
    realismScore: 0.8 + Math.random() * 0.15,
    uniquenessScore: 0.7 + Math.random() * 0.25,
    overallScore: 0.75 + Math.random() * 0.2,
  }));

  const insights: InsightSummary = {
    segmentClusters: [
      {
        id: "seg_1", name: "Budget-Conscious Students",
        personaIds: ["p1", "p2", "p6"],
        sharedPains: ["Limited budget", "Generic tools", "Procrastination"],
        sharedDesires: ["Affordable personalized learning", "Better grades"],
        avgWillingnessToPay: "Budget ($5-10/mo)",
        channelPreference: ["TikTok", "Reddit", "Instagram"],
      },
      {
        id: "seg_2", name: "Career-Focused Professionals",
        personaIds: ["p3", "p5", "p7"],
        sharedPains: ["Time constraints", "Need ROI", "Quality concerns"],
        sharedDesires: ["Efficient learning", "Career advancement"],
        avgWillingnessToPay: "Premium ($20-50/mo)",
        channelPreference: ["LinkedIn", "Email"],
      },
      {
        id: "seg_3", name: "High-Intensity Learners",
        personaIds: ["p4", "p8"],
        sharedPains: ["Information overload", "Retention challenges"],
        sharedDesires: ["Adaptive system", "Proven outcomes"],
        avgWillingnessToPay: "Moderate ($10-20/mo)",
        channelPreference: ["Twitter", "YouTube"],
      },
    ],
    topPains: [
      "Generic one-size-fits-all study tools",
      "No personalized learning paths",
      "Too many resources, no organization",
      "Can't track progress effectively",
      "Study methods feel outdated",
    ],
    topDesires: [
      "AI that adapts to my learning style",
      "Personalized study plans",
      "Track what I don't know",
      "Save time while learning better",
      "Proven results and testimonials",
    ],
    topFeatureRequests: [
      "Adaptive quiz generation",
      "Progress analytics dashboard",
      "Personalized study schedules",
      "Spaced repetition integration",
      "Flashcard auto-generation from notes",
    ],
    pricingInsights: [
      { tier: "Free", segment: "Budget Students", willingness: "High", sensitivity: "Must have free tier" },
      { tier: "$9.99/mo", segment: "Undergrads", willingness: "Medium", sensitivity: "Needs free trial first" },
      { tier: "$19.99/mo", segment: "Professionals", willingness: "High", sensitivity: "Low if ROI proven" },
    ],
    positioningIdeas: [
      "The AI study buddy that learns how you learn",
      "Stop studying harder, start studying smarter",
      "Your personal AI tutor that adapts in real-time",
    ],
    launchRecommendations: [
      "Launch freemium on Reddit and TikTok with student creators",
      "Partner with study influencers for authentic testimonials",
      "Offer 14-day free trial with credit card to prove value",
      "Create viral study challenge on TikTok",
      "Target college subreddits with value-first content",
    ],
    messagingHooks: [
      "Study in half the time, remember twice as much",
      "The study tool that actually knows you",
      "AI-powered learning that adapts to YOUR brain",
      "From struggling to straight A's in 30 days",
    ],
    objectionThemes: [
      {
        theme: "Price Sensitivity",
        frequency: 6,
        severity: "high",
        segments: ["Budget Students", "High-Intensity Learners"],
        sampleQuotes: ["I can't afford another subscription", "Free tools work fine for me"],
      },
      {
        theme: "Trust in AI",
        frequency: 4,
        severity: "medium",
        segments: ["Career-Focused Professionals", "High-Intensity Learners"],
        sampleQuotes: ["How do I know the AI is accurate?", "I'd rather learn from a real person"],
      },
    ],
  };

  const brief: LaunchBrief = {
    targetUsers: "College students and working professionals who need personalized study tools. Primary: 18-26 year old students struggling with generic study methods. Secondary: Career-focused professionals seeking efficient upskilling.",
    problemSolutionFit: "Students waste hours on generic study tools that don't adapt to their learning style. PersonaForge's AI study assistant provides personalized study plans, adaptive quizzes, and progress tracking that learns from each student's strengths and weaknesses.",
    riskyAssumptions: [
      "Students will pay $9.99/mo when free alternatives exist",
      "AI-generated study plans are perceived as accurate",
      "Students will trust AI with their learning data",
      "Personalization can be demonstrated in a free trial",
    ],
    messagingRecommendations: [
      "Lead with time savings: 'Study in half the time'",
      "Emphasize personalization: 'The study tool that actually knows you'",
      "Use social proof: Show real student testimonials and grade improvements",
      "Address trust directly: 'AI that learns from YOUR strengths and weaknesses'",
    ],
    gtmSuggestions: [
      "Launch freemium model on Product Hunt and Reddit",
      "Partner with 10 student creators on TikTok for launch week",
      "Create '30-Day Study Challenge' viral campaign",
      "Target r/college, r/studytips, r/SAT with value-first content",
      "Offer campus ambassador program at 20 universities",
    ],
    mvpFeaturePriority: [
      "Personalized study plan generator",
      "Adaptive quiz system based on performance",
      "Progress dashboard with analytics",
      "Note-to-flashcard auto-conversion",
      "Spaced repetition engine",
    ],
  };

  return { personas, interviews, scores, insights, brief };
}

export async function executeRun(input: ProductInput): Promise<AgentRun> {
  const id = generateId();
  const run: AgentRun = {
    id,
    status: "running",
    steps: createSteps(),
    input,
    output: null,
    createdAt: new Date().toISOString(),
  };
  RUNS.set(id, run);

  try {
    // Check if this is a demo preset (fast path)
    const isDemoPreset =
      input.idea.toLowerCase().includes("study assistant") ||
      input.idea.toLowerCase().includes("budgeting app") ||
      input.idea.toLowerCase().includes("telemedicine") ||
      input.idea.toLowerCase().includes("creator monetization");

    if (isDemoPreset) {
      // Fast demo mode: use pre-generated data
      updateStep(run, "normalize", "running");
      await new Promise((r) => setTimeout(r, 200));
      updateStep(run, "normalize", "completed");

      updateStep(run, "personas", "running");
      await new Promise((r) => setTimeout(r, 500));
      updateStep(run, "personas", "completed");

      updateStep(run, "interviews", "running");
      await new Promise((r) => setTimeout(r, 500));
      updateStep(run, "interviews", "completed");

      updateStep(run, "critic", "running");
      await new Promise((r) => setTimeout(r, 300));
      updateStep(run, "critic", "completed");

      updateStep(run, "insights", "running");
      await new Promise((r) => setTimeout(r, 400));
      updateStep(run, "insights", "completed");

      updateStep(run, "brief", "running");
      await new Promise((r) => setTimeout(r, 300));
      updateStep(run, "brief", "completed");

      const demoData = getDemoData(input);
      run.output = demoData;
    } else {
      // Full AI pipeline for custom inputs
      updateStep(run, "normalize", "running");
      const normalized = await normalizeIntake(input);
      updateStep(run, "normalize", "completed");

      updateStep(run, "personas", "running");
      let personas = await generatePersonas(normalized);
      updateStep(run, "personas", "completed");

      updateStep(run, "interviews", "running");
      let interviews = await simulateInterviews(personas, normalized);
      updateStep(run, "interviews", "completed");

      updateStep(run, "critic", "running");
      let criticResult = await evaluatePersonas(personas, interviews);
      let retryCount = 0;
      while (criticResult.needsRetry && retryCount < 2) {
        retryCount++;
        personas = await generatePersonas(normalized);
        interviews = await simulateInterviews(personas, normalized);
        criticResult = await evaluatePersonas(personas, interviews);
      }
      updateStep(run, "critic", "completed");

      updateStep(run, "insights", "running");
      const insights = await synthesizeInsights(personas, interviews, criticResult.scores);
      updateStep(run, "insights", "completed");

      updateStep(run, "brief", "running");
      const brief = await formatLaunchBrief(normalized, insights);
      updateStep(run, "brief", "completed");

      run.output = { personas, interviews, scores: criticResult.scores, insights, brief };
    }

    run.status = "completed";
    run.completedAt = new Date().toISOString();
  } catch (error) {
    run.status = "failed";
    console.error("Agent run failed:", error);
  }

  return run;
}
