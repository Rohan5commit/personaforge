import { describe, it, expect } from "vitest";
import { clusterPersonas } from "./cluster";
import type { Persona } from "@/lib/schemas";

function makePersona(overrides: Partial<Persona>): Persona {
  return {
    id: "p1",
    name: "Test User",
    ageRange: "25-34",
    role: "Student",
    incomeBand: "medium",
    educationBand: "Bachelors",
    goals: ["Goal 1"],
    frustrations: ["Frustration 1"],
    toolsCurrentlyUsed: ["Tool 1"],
    buyingBehavior: "Buys after research",
    objections: ["Price"],
    preferredChannels: ["Instagram"],
    quoteSnippets: ["Quote 1"],
    ...overrides,
  };
}

describe("clusterPersonas", () => {
  it("clusters by income band", () => {
    const personas = [
      makePersona({ id: "p1", name: "Alice", incomeBand: "high", role: "Engineer" }),
      makePersona({ id: "p2", name: "Bob", incomeBand: "high", role: "Designer" }),
      makePersona({ id: "p3", name: "Charlie", incomeBand: "low", role: "Student" }),
    ];

    const clusters = clusterPersonas(personas);
    expect(clusters.length).toBeGreaterThanOrEqual(2);

    const highIncomeCluster = clusters.find((c) =>
      c.personaIds.includes("p1")
    );
    expect(highIncomeCluster).toBeDefined();
  });

  it("handles single persona", () => {
    const personas = [
      makePersona({ id: "p1", name: "Alice", incomeBand: "medium" }),
    ];

    const clusters = clusterPersonas(personas);
    expect(clusters.length).toBe(1);
    expect(clusters[0].personaIds).toContain("p1");
  });

  it("ensures all personas are assigned", () => {
    const personas = [
      makePersona({ id: "p1", name: "A", incomeBand: "high", role: "Engineer" }),
      makePersona({ id: "p2", name: "B", incomeBand: "low", role: "Student" }),
      makePersona({ id: "p3", name: "C", incomeBand: "medium", role: "Designer" }),
      makePersona({ id: "p4", name: "D", incomeBand: "high", role: "Manager" }),
    ];

    const clusters = clusterPersonas(personas);
    const allIds = clusters.flatMap((c) => c.personaIds);
    expect(allIds).toContain("p1");
    expect(allIds).toContain("p2");
    expect(allIds).toContain("p3");
    expect(allIds).toContain("p4");
  });
});
