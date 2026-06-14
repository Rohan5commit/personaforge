import { Persona, SegmentCluster } from "@/lib/schemas";

export function clusterPersonas(personas: Persona[]): SegmentCluster[] {
  const clusters: SegmentCluster[] = [];
  const used = new Set<string>();

  const incomeGroups = ["low", "medium", "high"];

  // Strategy 1: Cluster by income band
  for (const income of incomeGroups) {
    const members = personas.filter(
      (p) => p.incomeBand.toLowerCase().includes(income) && !used.has(p.id)
    );
    if (members.length >= 2) {
      members.forEach((m) => used.add(m.id));
      clusters.push({
        id: `seg_${clusters.length + 1}`,
        name: `${income.charAt(0).toUpperCase() + income.slice(1)} Income ${members[0].role.split(" ")[0]}s`,
        personaIds: members.map((m) => m.id),
        sharedPains: extractShared(members, "frustrations"),
        sharedDesires: extractShared(members, "goals"),
        avgWillingnessToPay: income === "high" ? "Premium" : income === "medium" ? "Moderate" : "Budget",
        channelPreference: extractShared(members, "preferredChannels"),
      });
    }
  }

  // Assign remaining personas to new clusters or existing ones
  for (const p of personas) {
    if (!used.has(p.id)) {
      used.add(p.id);
      clusters.push({
        id: `seg_${clusters.length + 1}`,
        name: `${p.role} Segment`,
        personaIds: [p.id],
        sharedPains: p.frustrations.slice(0, 3),
        sharedDesires: p.goals.slice(0, 3),
        avgWillingnessToPay: p.incomeBand.toLowerCase().includes("high") ? "Premium" : "Moderate",
        channelPreference: p.preferredChannels.slice(0, 2),
      });
    }
  }

  return clusters;
}

function extractShared(personas: Persona[], field: keyof Persona): string[] {
  const counts = new Map<string, number>();
  for (const p of personas) {
    const val = p[field];
    if (Array.isArray(val)) {
      for (const item of val) {
        counts.set(item, (counts.get(item) || 0) + 1);
      }
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([item]) => item);
}
