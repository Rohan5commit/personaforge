import { z } from "zod";

export const ProductInputSchema = z.object({
  idea: z.string().min(1, "Product idea is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  audienceType: z.string().min(1, "Audience type is required"),
  market: z.string().min(1, "Market is required"),
  pricingModel: z.string().min(1, "Pricing model is required"),
  stage: z.string().min(1, "Product stage is required"),
  website: z.string().optional(),
});
export type ProductInput = z.infer<typeof ProductInputSchema>;

export const PersonaSchema = z.object({
  id: z.string(),
  name: z.string(),
  ageRange: z.string(),
  role: z.string(),
  incomeBand: z.string(),
  educationBand: z.string(),
  goals: z.array(z.string()),
  frustrations: z.array(z.string()),
  toolsCurrentlyUsed: z.array(z.string()),
  buyingBehavior: z.string(),
  objections: z.array(z.string()),
  preferredChannels: z.array(z.string()),
  segmentId: z.string().optional(),
  quoteSnippets: z.array(z.string()),
});
export type Persona = z.infer<typeof PersonaSchema>;

export const TranscriptLineSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const InterviewResponseSchema = z.object({
  personaId: z.string(),
  reactions: z.array(z.string()),
  objections: z.array(z.string()),
  desiredFeatures: z.array(z.string()),
  trustConcerns: z.array(z.string()),
  buyingTriggers: z.array(z.string()),
  switchingBarriers: z.array(z.string()),
  transcript: z.array(TranscriptLineSchema),
});
export type InterviewResponse = z.infer<typeof InterviewResponseSchema>;

export const PersonaScoreSchema = z.object({
  personaId: z.string(),
  diversityScore: z.number(),
  realismScore: z.number(),
  uniquenessScore: z.number(),
  overallScore: z.number(),
});
export type PersonaScore = z.infer<typeof PersonaScoreSchema>;

export const SegmentClusterSchema = z.object({
  id: z.string(),
  name: z.string(),
  personaIds: z.array(z.string()),
  sharedPains: z.array(z.string()),
  sharedDesires: z.array(z.string()),
  avgWillingnessToPay: z.string(),
  channelPreference: z.array(z.string()),
});
export type SegmentCluster = z.infer<typeof SegmentClusterSchema>;

export const PricingSignalSchema = z.object({
  tier: z.string(),
  segment: z.string(),
  willingness: z.string(),
  sensitivity: z.string(),
});
export type PricingSignal = z.infer<typeof PricingSignalSchema>;

export const ObjectionThemeSchema = z.object({
  theme: z.string(),
  frequency: z.number(),
  severity: z.string(),
  segments: z.array(z.string()),
  sampleQuotes: z.array(z.string()),
});
export type ObjectionTheme = z.infer<typeof ObjectionThemeSchema>;

export const InsightSummarySchema = z.object({
  segmentClusters: z.array(SegmentClusterSchema),
  topPains: z.array(z.string()),
  topDesires: z.array(z.string()),
  topFeatureRequests: z.array(z.string()),
  pricingInsights: z.array(PricingSignalSchema),
  positioningIdeas: z.array(z.string()),
  launchRecommendations: z.array(z.string()),
  messagingHooks: z.array(z.string()),
  objectionThemes: z.array(ObjectionThemeSchema),
});
export type InsightSummary = z.infer<typeof InsightSummarySchema>;

export const LaunchBriefSchema = z.object({
  targetUsers: z.string(),
  problemSolutionFit: z.string(),
  riskyAssumptions: z.array(z.string()),
  messagingRecommendations: z.array(z.string()),
  gtmSuggestions: z.array(z.string()),
  mvpFeaturePriority: z.array(z.string()),
});
export type LaunchBrief = z.infer<typeof LaunchBriefSchema>;

export const AgentStepSchema = z.object({
  name: z.string(),
  status: z.enum(["pending", "running", "completed", "failed"]),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  agentName: z.string(),
  description: z.string(),
  retryCount: z.number().default(0),
  maxRetries: z.number().default(2),
});
export type AgentStep = z.infer<typeof AgentStepSchema>;

export const RunOutputSchema = z.object({
  personas: z.array(PersonaSchema),
  interviews: z.array(InterviewResponseSchema),
  scores: z.array(PersonaScoreSchema),
  insights: InsightSummarySchema,
  brief: LaunchBriefSchema,
});
export type RunOutput = z.infer<typeof RunOutputSchema>;

export const AgentRunSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "running", "completed", "failed"]),
  steps: z.array(AgentStepSchema),
  input: z.any(),
  output: RunOutputSchema.nullable(),
  createdAt: z.string(),
  completedAt: z.string().optional(),
});
export type AgentRun = z.infer<typeof AgentRunSchema>;
