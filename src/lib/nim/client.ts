import OpenAI from "openai";

const NIM_BASE_URL = "https://integrate.api.nvidia.com/v1";
const NIM_API_KEY = process.env.NIM_API_KEY || "";
const DEFAULT_MODEL = "meta/llama-3.3-70b-instruct";

if (!NIM_API_KEY) {
  console.warn("NIM_API_KEY is not set. AI inference will fail.");
}

const client = new OpenAI({
  apiKey: NIM_API_KEY || "missing-key",
  baseURL: NIM_BASE_URL,
  timeout: 60000,
  maxRetries: 2,
});

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function nimStructured<T>(
  messages: ChatMessage[],
  jsonSchema: Record<string, unknown>,
  options?: { model?: string; temperature?: number; maxTokens?: number }
): Promise<T> {
  const response = await client.chat.completions.create({
    model: options?.model || DEFAULT_MODEL,
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 4096,
    extra_body: {
      nvext: {
        guided_json: jsonSchema,
      },
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  const content = response.choices[0]?.message?.content || "{}";
  try {
    return JSON.parse(content) as T;
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]) as T;
    throw new Error(`Failed to parse structured output: ${content}`);
  }
}
