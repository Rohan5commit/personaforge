import { nimStructured, ChatMessage } from "@/lib/nim/client";
import { InterviewResponse, Persona, ProductInput } from "@/lib/schemas";

const INTERVIEW_SCHEMA = {
  type: "object",
  properties: {
    interviews: {
      type: "array",
      items: {
        type: "object",
        properties: {
          personaId: { type: "string" },
          reactions: { type: "array", items: { type: "string" } },
          objections: { type: "array", items: { type: "string" } },
          desiredFeatures: { type: "array", items: { type: "string" } },
          trustConcerns: { type: "array", items: { type: "string" } },
          buyingTriggers: { type: "array", items: { type: "string" } },
          switchingBarriers: { type: "array", items: { type: "string" } },
          transcript: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                answer: { type: "string" },
              },
              required: ["question", "answer"],
            },
          },
        },
        required: [
          "personaId", "reactions", "objections", "desiredFeatures",
          "trustConcerns", "buyingTriggers", "switchingBarriers", "transcript",
        ],
      },
    },
  },
  required: ["interviews"],
};

export async function simulateInterviews(
  personas: Persona[],
  input: ProductInput
): Promise<InterviewResponse[]> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a user research interviewer. For each persona, simulate a realistic interview about the product. Be specific to each persona's background, goals, and frustrations. Generate authentic reactions, objections, desired features, trust concerns, buying triggers, and switching barriers. Include a 3-4 question short transcript per persona that sounds natural and conversational.`,
    },
    {
      role: "user",
      content: `Product: ${input.idea} - ${input.description}
Pricing: ${input.pricingModel}
Market: ${input.market}

Personas to interview:
${personas.map((p) => `- ${p.name} (${p.ageRange}, ${p.role}, ${p.incomeBand} income): Goals: ${p.goals.join(", ")}. Frustrations: ${p.frustrations.join(", ")}. Currently uses: ${p.toolsCurrentlyUsed.join(", ")}.`).join("\n")}

For each persona, simulate their interview response with reactions, objections, desired features, trust concerns, buying triggers, switching barriers, and a short transcript.`,
    },
  ];

  const result = await nimStructured<{ interviews: InterviewResponse[] }>(
    messages,
    INTERVIEW_SCHEMA,
    { temperature: 0.75, maxTokens: 8000 }
  );

  return result.interviews.map((interview, i) => ({
    ...interview,
    personaId: interview.personaId || personas[i]?.id || `p${i + 1}`,
  }));
}
