"use server";

import { executeRun } from "@/lib/agents/orchestrator";
import { ProductInputSchema } from "@/lib/schemas";

const MAX_FIELD_LENGTHS: Record<string, number> = {
  idea: 200,
  description: 2000,
  audienceType: 100,
  market: 100,
  pricingModel: 100,
  stage: 50,
  website: 500,
};

function sanitizeField(value: string, maxLen: number): string {
  let clean = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
  clean = clean.slice(0, maxLen);
  return clean.trim();
}

function sanitizeInput(raw: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, maxLen] of Object.entries(MAX_FIELD_LENGTHS)) {
    if (typeof raw[key] === "string") {
      out[key] = sanitizeField(raw[key] as string, maxLen);
    } else if (raw[key] !== undefined) {
      out[key] = raw[key];
    }
  }
  return out;
}

export async function startRun(input: unknown) {
  const sanitized = sanitizeInput(input as Record<string, unknown>);
  const parsed = ProductInputSchema.safeParse(sanitized);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const msg = Object.entries(errors)
      .map(([k, v]) => `${k}: ${v?.join(", ")}`)
      .join("; ");
    throw new Error(`Invalid input: ${msg}`);
  }

  const run = await executeRun(parsed.data);
  return {
    id: run.id,
    status: run.status,
    input: run.input,
    output: run.output,
    steps: run.steps,
    createdAt: run.createdAt,
    completedAt: run.completedAt,
  };
}
