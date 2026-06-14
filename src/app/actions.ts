"use server";

import { executeRun, getRun, getAllRuns } from "@/lib/agents/orchestrator";
import { ProductInput } from "@/lib/schemas";

export async function startRun(input: ProductInput) {
  // Create run entry first (fast)
  const { createRunEntry } = await import("@/lib/agents/orchestrator");
  const run = createRunEntry(input);

  // Start pipeline in background (don't await - avoids Vercel timeout)
  executeRun(input).catch((err) => {
    console.error("Background pipeline error:", err);
  });

  return { id: run.id, status: "running" as const };
}

export async function getRunStatus(id: string) {
  const run = getRun(id);
  if (!run) return null;
  return {
    id: run.id,
    status: run.status,
    steps: run.steps,
    createdAt: run.createdAt,
    completedAt: run.completedAt,
  };
}

export async function getRunResults(id: string) {
  const run = getRun(id);
  if (!run) return null;
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

export async function listRuns() {
  return getAllRuns().map((r) => ({
    id: r.id,
    status: r.status,
    idea: r.input.idea,
    createdAt: r.createdAt,
    completedAt: r.completedAt,
  }));
}
