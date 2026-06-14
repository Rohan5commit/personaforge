"use server";

import { executeRun, getRun, getAllRuns } from "@/lib/agents/orchestrator";
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
