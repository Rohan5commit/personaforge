import { nimStructured, ChatMessage } from "@/lib/nim/client";
import {
  Persona,
  InterviewResponse,
  PersonaScore,
  InsightSummary,
} from "@/lib/schemas";

const INSIGHT_SCHEMA = {
  type: "object",
  properties: {
    segmentClusters: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          personaIds: { type: "array", items: { type: "string" } },
          sharedPains: { type: "array", items: { type: "string" } },
          sharedDesires: { type: "array", items: { type: "string" } },
          avgWillingnessToPay: { type: "string" },
          channelPreference: { type: "array", items: { type: "string" } },
        },
        required: ["id", "name", "personaIds", "sharedPains", "sharedDesires", "avgWillingnessToPay", "channelPreference"],
      },
    },
    topPains: { type: "array", items: { type: "string" } },
    topDesires: { type: "array", items: { type: "string" } },
    topFeatureRequests: { type: "array", items: { type: "string" } },
    pricingInsights: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tier: { type: "string" },
          segment: { type: "string" },
          willingness: { type: "string" },
          sensitivity: { type: "string" },
        },
        required: ["tier", "segment", "willingness", "sensitivity"],
      },
    },
    positioningIdeas: { type: "array", items: { type: "string" } },
    launchRecommendations: { type: "array", items: { type: "string" } },
    messagingHooks: { type: "array", items: { type: "string" } },
    objectionThemes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          theme: { type: "string" },
          frequency: { type: "number" },
          severity: { type: "string" },
          segments: { type: "array", items: { type: "string" } },
          sampleQuotes: { type: "array", items: { type: "string" } },
        },
        required: ["theme", "frequency", "severity", "segments", "sampleQuotes"],
      },
    },
  },
  required: [
    "segmentClusters", "topPains", "topDesires", "topFeatureRequests",
    "pricingInsights", "positioningIdeas", "launchRecommendations",
    "messagingHooks", "objectionThemes",
  ],
};

export async function synthesizeInsights(
  personas: Persona[],
  interviews: InterviewResponse[],
  scores: PersonaScore[]
): Promise<InsightSummary> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a product strategy analyst. Analyze the synthetic personas and interview data to produce actionable insights.

Tasks:
1. Cluster personas into 3-5 ICP segments based on shared characteristics.
2. Identify the top pain points across all personas.
3. Identify the top desires and feature requests.
4. Extract pricing signals and sensitivity by segment.
5. Generate positioning ideas and messaging hooks.
6. Summarize objection themes with frequency and severity.
7. Provide launch recommendations.

Be specific, actionable, and data-driven. Reference persona names when appropriate.`,
    },
    {
      role: "user",
      content: `Personas:
${personas.map((p) => `${p.name} (${p.id}): ${p.ageRange}, ${p.role}, ${p.incomeBand}, ${p.educationBand}. Goals: ${p.goals.join("; ")}. Frustrations: ${p.frustrations.join("; ")}. Objections: ${p.objections.join("; ")}. Channels: ${p.preferredChannels.join(", ")}.`).join("\n\n")}

Interviews:
${interviews.map((i) => `${i.personaId}: Reactions: ${i.reactions.join("; ")}. Objections: ${i.objections.join("; ")}. Desired: ${i.desiredFeatures.join("; ")}. Trust: ${i.trustConcerns.join("; ")}. Triggers: ${i.buyingTriggers.join("; ")}. Barriers: ${i.switchingBarriers.join("; ")}.`).join("\n\n")}

Scores: ${scores.map((s) => `${s.personaId}: diversity=${s.diversityScore}, realism=${s.realismScore}, uniqueness=${s.uniquenessScore}`).join(", ")}

Generate comprehensive insights with segments, pains, desires, features, pricing, positioning, messaging, and objections.`,
    },
  ];

  const result = await nimStructured<InsightSummary>(
    messages,
    INSIGHT_SCHEMA,
    { temperature: 0.6, maxTokens: 6000 }
  );

  return result;
}
