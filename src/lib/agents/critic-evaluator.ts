import { nimStructured, ChatMessage } from "@/lib/nim/client";
import { Persona, InterviewResponse, PersonaScore } from "@/lib/schemas";

const SCORE_SCHEMA = {
  type: "object",
  properties: {
    scores: {
      type: "array",
      items: {
        type: "object",
        properties: {
          personaId: { type: "string" },
          diversityScore: { type: "number" },
          realismScore: { type: "number" },
          uniquenessScore: { type: "number" },
          overallScore: { type: "number" },
        },
        required: ["personaId", "diversityScore", "realismScore", "uniquenessScore", "overallScore"],
      },
    },
    overallDiversity: { type: "number" },
    issues: { type: "array", items: { type: "string" } },
    needsRetry: { type: "boolean" },
  },
  required: ["scores", "overallDiversity", "issues", "needsRetry"],
};

export interface CriticResult {
  scores: PersonaScore[];
  overallDiversity: number;
  issues: string[];
  needsRetry: boolean;
}

export async function evaluatePersonas(
  personas: Persona[],
  interviews: InterviewResponse[]
): Promise<CriticResult> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `You are a quality evaluator for synthetic personas. Review the generated personas and interviews for:
1. Diversity: Are the personas sufficiently different from each other? Check age, income, role, goals, frustrations.
2. Realism: Do they feel like real people? Are their responses authentic?
3. Uniqueness: Is each persona distinct, or do they overlap too much?
4. Depth: Are goals and frustrations specific enough?

Score each persona on diversity (0-1), realism (0-1), uniqueness (0-1), and overall (0-1).
Flag issues like repetition, shallow differentiation, or unrealistic profiles.
Determine if a retry is needed (overall diversity < 0.6).`,
    },
    {
      role: "user",
      content: `Personas:
${personas.map((p) => `${p.name} (${p.id}): ${p.ageRange}, ${p.role}, ${p.incomeBand}. Goals: ${p.goals.join("; ")}. Frustrations: ${p.frustrations.join("; ")}.`).join("\n")}

Interviews:
${interviews.map((i) => `${i.personaId}: Reactions: ${i.reactions.join("; ")}. Objections: ${i.objections.join("; ")}.`).join("\n")}

Evaluate diversity, realism, uniqueness. Return scores for each persona and overall assessment.`,
    },
  ];

  const result = await nimStructured<CriticResult>(
    messages,
    SCORE_SCHEMA,
    { temperature: 0.3, maxTokens: 4000 }
  );

  return result;
}
