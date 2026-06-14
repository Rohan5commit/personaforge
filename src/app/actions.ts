"use server";

import { executeRun } from "@/lib/agents/orchestrator";
import { ProductInput } from "@/lib/schemas";

export async function startRun(input: ProductInput) {
  const run = await executeRun(input);
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
