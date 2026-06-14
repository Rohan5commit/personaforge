import { nimStructured, ChatMessage } from "@/lib/nim/client";
import { InsightSummary, ProductInput, LaunchBrief } from "@/lib/schemas";

const BRIEF_SCHEMA = {
  type: "object",
  properties: {
    targetUsers: { type: "string" },
    problemSolutionFit: { type: "string" },
    riskyAssumptions: { type: "array", items: { type: "string" } },
    messagingRecommendations: { type: "array", items: { type: "string" } },
    gtmSuggestions: { type: "array", items: { type: "string" } },
    mvpFeaturePriority: { type: "array", items: { type: "string" } },
  },
  required: [
    "targetUsers", "problemSolutionFit", "riskyAssumptions",
    "messagingRecommendations", "gtmSuggestions", "mvpFeaturePriority",
  ],
};

export async function formatLaunchBrief(
  input: ProductInput,
  insights: InsightSummary
): Promise<LaunchBrief> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a startup strategist. Create a concise, actionable launch brief based on the product input and synthesized insights. Be specific and prioritized. Focus on the most impactful recommendations.`,
    },
    {
      role: "user",
      content: `Product: ${input.idea} - ${input.description}
Stage: ${input.stage}
Market: ${input.market}
Pricing: ${input.pricingModel}

Key Insights:
- Top Segments: ${insights.segmentClusters.map((s) => `${s.name} (${s.personaIds.length} personas)`).join(", ")}
- Top Pains: ${insights.topPains.join("; ")}
- Top Desires: ${insights.topDesires.join("; ")}
- Top Features: ${insights.topFeatureRequests.join("; ")}
- Pricing: ${insights.pricingInsights.map((p) => `${p.tier}: ${p.willingness}`).join("; ")}
- Key Objections: ${insights.objectionThemes.map((o) => `${o.theme} (${o.frequency})`).join("; ")}
- Messaging Hooks: ${insights.messagingHooks.join("; ")}
- Launch Recs: ${insights.launchRecommendations.join("; ")}

Generate a launch brief with: target users description, problem-solution fit analysis, risky assumptions to validate, messaging recommendations, go-to-market suggestions, and MVP feature priorities.`,
    },
  ];

  return await nimStructured<LaunchBrief>(
    messages,
    BRIEF_SCHEMA,
    { temperature: 0.5, maxTokens: 4000 }
  );
}
