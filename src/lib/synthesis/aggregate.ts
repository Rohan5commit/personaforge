import { Persona, PersonaScore } from "@/lib/schemas";

export function computeAggregateScores(
  scores: PersonaScore[]
): {
  avgDiversity: number;
  avgRealism: number;
  avgUniqueness: number;
  avgOverall: number;
  weakestPersonaId: string | null;
} {
  if (scores.length === 0) {
    return { avgDiversity: 0, avgRealism: 0, avgUniqueness: 0, avgOverall: 0, weakestPersonaId: null };
  }

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const avgDiversity = avg(scores.map((s) => s.diversityScore));
  const avgRealism = avg(scores.map((s) => s.realismScore));
  const avgUniqueness = avg(scores.map((s) => s.uniquenessScore));
  const avgOverall = avg(scores.map((s) => s.overallScore));

  const weakest = scores.reduce((min, s) =>
    s.overallScore < min.overallScore ? s : min
  );

  return {
    avgDiversity,
    avgRealism,
    avgUniqueness,
    avgOverall,
    weakestPersonaId: weakest.personaId,
  };
}

export function aggregatePains(personas: Persona[]): { pain: string; count: number; percentage: number }[] {
  const counts = new Map<string, number>();
  for (const p of personas) {
    for (const f of p.frustrations) {
      counts.set(f, (counts.get(f) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([pain, count]) => ({ pain, count, percentage: Math.round((count / personas.length) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export function aggregateChannels(personas: Persona[]): { channel: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of personas) {
    for (const c of p.preferredChannels) {
      counts.set(c, (counts.get(c) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([channel, count]) => ({ channel, count }))
    .sort((a, b) => b.count - a.count);
}
