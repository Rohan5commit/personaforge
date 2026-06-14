"use client";

import { Nav } from "@/components/shared/nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, ArrowRight, RefreshCw, Brain, Lightbulb, FileText, Search, Users } from "lucide-react";

const AGENTS = [
  {
    name: "Intake Normalizer",
    icon: Bot,
    color: "text-blue-500",
    description: "Parses and normalizes the raw product input into a structured format. Standardizes audience type, market, pricing model, and stage values.",
    input: "Raw user input (product idea, description, settings)",
    output: "Normalized ProductInput object",
    deterministic: true,
  },
  {
    name: "Persona Generator",
    icon: Users,
    color: "text-green-500",
    description: "Generates 8 diverse, realistic customer personas using NVIDIA NIM with structured output. Ensures diversity across age, income, role, goals, and behavior.",
    input: "Normalized ProductInput",
    output: "Persona[] array with 8 personas",
    deterministic: false,
  },
  {
    name: "Interview Simulator",
    icon: Brain,
    color: "text-purple-500",
    description: "Simulates realistic interviews for each persona. Generates reactions, objections, desired features, trust concerns, buying triggers, and transcript excerpts.",
    input: "Personas + ProductInput",
    output: "InterviewResponse[] per persona",
    deterministic: false,
  },
  {
    name: "Critic / Evaluator",
    icon: Search,
    color: "text-orange-500",
    description: "Reviews personas and interviews for quality. Scores diversity, realism, and uniqueness. Triggers regeneration if quality is below threshold.",
    input: "Personas + Interviews",
    output: "PersonaScore[] + retry recommendation",
    deterministic: false,
  },
  {
    name: "Insight Synthesizer",
    icon: Lightbulb,
    color: "text-yellow-500",
    description: "Clusters personas into ICP segments and extracts actionable insights: pains, desires, features, pricing, positioning, messaging, and objections.",
    input: "Personas + Interviews + Scores",
    output: "InsightSummary with all analysis",
    deterministic: false,
  },
  {
    name: "Launch Brief Formatter",
    icon: FileText,
    color: "text-pink-500",
    description: "Takes all insights and produces a concise, actionable launch brief with target users, problem-solution fit, risky assumptions, messaging, and MVP priorities.",
    input: "ProductInput + InsightSummary",
    output: "LaunchBrief document",
    deterministic: false,
  },
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Agent Architecture</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          PersonaForge uses a 6-agent pipeline with a critique/refinement loop.
          This is not a single-prompt system — each agent is specialized, modular, and
          passes structured data to the next.
        </p>

        {/* Pipeline visualization */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Pipeline Flow</h2>
          <div className="flex flex-wrap items-center gap-2">
            {AGENTS.map((agent, i) => (
              <div key={i} className="flex items-center gap-2">
                <Badge variant="outline" className="whitespace-nowrap">
                  {agent.name}
                </Badge>
                {i < AGENTS.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4" />
            Critic can trigger persona re-generation (max 2 retries)
          </div>
        </div>

        <Separator className="my-10" />

        {/* Agent details */}
        <h2 className="text-xl font-semibold mb-6">Agent Details</h2>
        <div className="space-y-4">
          {AGENTS.map((agent, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-start gap-4">
                <agent.icon className={`h-6 w-6 ${agent.color} shrink-0 mt-1`} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{agent.name}</h3>
                    <Badge
                      variant={agent.deterministic ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {agent.deterministic ? "Deterministic" : "Model-driven"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {agent.description}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2 text-sm">
                    <div>
                      <span className="font-medium">Input: </span>
                      <span className="text-muted-foreground">{agent.input}</span>
                    </div>
                    <div>
                      <span className="font-medium">Output: </span>
                      <span className="text-muted-foreground">{agent.output}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Separator className="my-10" />

        {/* Why this is more than prompting */}
        <h2 className="text-xl font-semibold mb-4">Why This Is More Than One-Shot Prompting</h2>
        <Card className="p-6">
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <h3 className="font-medium mb-1">1. Modular Agent Pipeline</h3>
              <p className="text-muted-foreground">
                Each agent has a single responsibility with its own prompt, schema, and parameters.
                The persona generator does not know about insights; the critic does not generate content.
                This separation enables targeted improvement of each stage.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-1">2. Critique & Refinement Loop</h3>
              <p className="text-muted-foreground">
                The critic agent evaluates persona diversity and quality. If scores fall below threshold,
                personas are regenerated with feedback from the critic — up to 2 retries. This is a
                self-improving loop, not a linear prompt chain.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-1">3. Structured Data Flow</h3>
              <p className="text-muted-foreground">
                Every agent outputs validated JSON matching a Zod schema. Downstream agents receive
                typed, structured data — not free text. This prevents hallucination cascading and
                enables programmatic quality checks.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-1">4. Deterministic vs Model-Driven</h3>
              <p className="text-muted-foreground">
                The intake normalizer is deterministic (string processing). All other agents are
                model-driven (NIM API calls). This hybrid approach ensures reliability where
                determinism is possible and flexibility where creativity is needed.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-1">5. Clustering & Aggregation</h3>
              <p className="text-muted-foreground">
                Segment clustering uses deterministic logic (income band grouping, shared trait
                extraction) rather than relying on the model to cluster. This makes segment
                assignment reproducible and auditable.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
