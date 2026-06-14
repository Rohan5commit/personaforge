import { nimStructured, ChatMessage } from "@/lib/nim/client";
import { Persona, ProductInput } from "@/lib/schemas";

const PERSONA_SCHEMA = {
  type: "object",
  properties: {
    personas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          ageRange: { type: "string" },
          role: { type: "string" },
          incomeBand: { type: "string" },
          educationBand: { type: "string" },
          goals: { type: "array", items: { type: "string" } },
          frustrations: { type: "array", items: { type: "string" } },
          toolsCurrentlyUsed: { type: "array", items: { type: "string" } },
          buyingBehavior: { type: "string" },
          objections: { type: "array", items: { type: "string" } },
          preferredChannels: { type: "array", items: { type: "string" } },
          quoteSnippets: { type: "array", items: { type: "string" } },
        },
        required: [
          "id", "name", "ageRange", "role", "incomeBand", "educationBand",
          "goals", "frustrations", "toolsCurrentlyUsed", "buyingBehavior",
          "objections", "preferredChannels", "quoteSnippets",
        ],
      },
    },
  },
  required: ["personas"],
};

export async function generatePersonas(input: ProductInput): Promise<Persona[]> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a customer research expert. Generate 8 diverse, realistic customer personas for the given product idea. Ensure diversity across:
- Age ranges (mix of 18-24, 25-34, 35-44, 45-54, 55+)
- Income bands (low, medium, high)
- Education levels
- Tech savviness
- Willingness to pay
- Roles and use cases
- Buying behaviors

Each persona should feel like a real person with specific, concrete goals and frustrations. Avoid generic or repetitive personas. Use the product context to make personas realistic and relevant.`,
    },
    {
      role: "user",
      content: `Product Idea: ${input.idea}
Description: ${input.description}
Target Audience: ${input.audienceType}
Market/Geography: ${input.market}
Pricing Model: ${input.pricingModel}
Product Stage: ${input.stage}
${input.website ? `Website: ${input.website}` : ""}

Generate 8 diverse personas with unique names, backgrounds, goals, frustrations, tools they currently use, buying behavior, objections, preferred channels, and quote snippets. Use IDs like "p1", "p2", etc.`,
    },
  ];

  const result = await nimStructured<{ personas: Persona[] }>(
    messages,
    PERSONA_SCHEMA,
    { temperature: 0.8, maxTokens: 6000 }
  );

  return result.personas.map((p, i) => ({
    ...p,
    id: p.id || `p${i + 1}`,
  }));
}
