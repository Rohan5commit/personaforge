import { Persona } from "@/lib/schemas";

export function scoreDiversity(personas: Persona[]): number {
  if (personas.length < 2) return 0;

  const uniqueAges = new Set(personas.map((p) => p.ageRange));
  const uniqueIncomes = new Set(personas.map((p) => p.incomeBand));
  const uniqueRoles = new Set(personas.map((p) => p.role));

  const ageScore = Math.min(uniqueAges.size / 4, 1);
  const incomeScore = Math.min(uniqueIncomes.size / 3, 1);
  const roleScore = Math.min(uniqueRoles.size / personas.length, 1);

  return (ageScore + incomeScore + roleScore) / 3;
}

export function detectRepetition(personas: Persona[]): string[] {
  const issues: string[] = [];
  const goalSets = personas.map((p) => new Set(p.goals.map((g) => g.toLowerCase())));

  for (let i = 0; i < goalSets.length; i++) {
    for (let j = i + 1; j < goalSets.length; j++) {
      const intersection = new Set(
        [...goalSets[i]].filter((g) => goalSets[j].has(g))
      );
      const union = new Set([...goalSets[i], ...goalSets[j]]);
      if (union.size > 0 && intersection.size / union.size > 0.7) {
        issues.push(
          `Personas ${personas[i].name} and ${personas[j].name} have >70% overlapping goals`
        );
      }
    }
  }

  return issues;
}
