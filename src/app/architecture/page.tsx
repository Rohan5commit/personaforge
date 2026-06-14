"use client";

import { Nav } from "@/components/shared/nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, RefreshCw, Brain, Lightbulb, FileText, Search, Users, CheckCircle } from "lucide-react";

const AGENTS = [
  {
    name: "Intake Normalizer",
    icon: Bot,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    description: "Parses and normalizes the raw product input into a structured format. Standardizes audience type, market, pricing model, and stage values.",
    input: "Raw user input (product idea, description, settings)",
    output: "Normalized ProductInput object",
    deterministic: true,
  },
  {
    name: "Persona Generator",
    icon: Users,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    description: "Generates 8 diverse, realistic customer personas using NVIDIA NIM with structured output. Ensures diversity across age, income, role, goals, and behavior.",
    input: "Normalized ProductInput",
    output: "Persona[] array with 8 personas",
    deterministic: false,
  },
  {
    name: "Interview Simulator",
    icon: Brain,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    description: "Simulates realistic interviews for each persona. Generates reactions, objections, desired features, trust concerns, buying triggers, and transcript excerpts.",
    input: "Personas + ProductInput",
    output: "InterviewResponse[] per persona",
    deterministic: false,
  },
  {
    name: "Critic / Evaluator",
    icon: Search,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    description: "Reviews personas and interviews for quality. Scores diversity, realism, and uniqueness. Triggers regeneration if quality is below threshold.",
    input: "Personas + Interviews",
    output: "PersonaScore[] + retry recommendation",
    deterministic: false,
  },
  {
    name: "Insight Synthesizer",
    icon: Lightbulb,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    description: "Clusters personas into ICP segments and extracts actionable insights: pains, desires, features, pricing, positioning, messaging, and objections.",
    input: "Personas + Interviews + Scores",
    output: "InsightSummary with all analysis",
    deterministic: false,
  },
  {
    name: "Launch Brief Formatter",
    icon: FileText,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    description: "Takes all insights and produces a concise, actionable launch brief with target users, problem-solution fit, risky assumptions, messaging, and MVP priorities.",
    input: "ProductInput + InsightSummary",
    output: "LaunchBrief document",
    deterministic: false,
  },
];

function PipelineDiagram() {
  const boxW = 140;
  const boxH = 60;
  const gap = 28;
  const totalW = AGENTS.length * boxW + (AGENTS.length - 1) * gap;
  const svgW = totalW + 40;
  const svgH = 180;

  return (
    <div className="overflow-x-auto pb-4">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full min-w-[700px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arrow marker */}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground/60" />
          </marker>
          <marker id="arrow-red" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-orange-500" />
          </marker>
        </defs>

        {/* Agent boxes + arrows */}
        {AGENTS.map((agent, i) => {
          const x = 20 + i * (boxW + gap);
          const y = 40;
          return (
            <g key={i}>
              {/* Box */}
              <rect
                x={x} y={y} width={boxW} height={boxH} rx="8"
                className={`fill-background stroke-border`}
                strokeWidth="1.5"
              />
              {/* Colored top bar */}
              <rect x={x} y={y} width={boxW} height="4" rx="8"
                className={agent.bg.replace("/10", "")}
                style={{ opacity: 0.8 }}
              />
              <rect x={x} y={y + 2} width={boxW} height="2"
                className={agent.bg.replace("/10", "")}
                style={{ opacity: 0.8 }}
              />
              {/* Agent number */}
              <circle cx={x + 16} cy={y + 24} r="10"
                className="fill-primary/10 stroke-primary/30" strokeWidth="1" />
              <text x={x + 16} y={y + 28} textAnchor="middle"
                className="fill-primary text-[10px] font-bold">
                {i + 1}
              </text>
              {/* Name */}
              <text x={x + 32} y={y + 22} className="fill-foreground text-[10px] font-semibold">
                {agent.name.split(" ").slice(0, 2).join(" ")}
              </text>
              <text x={x + 32} y={y + 36} className="fill-muted-foreground text-[8px]">
                {agent.deterministic ? "Deterministic" : "NIM Model"}
              </text>
              {/* Type badge */}
              <text x={x + boxW / 2} y={y + 52} textAnchor="middle"
                className="fill-muted-foreground text-[7px]">
                {agent.output.split(" ").slice(0, 3).join(" ")}
              </text>

              {/* Arrow to next */}
              {i < AGENTS.length - 1 && (
                <line
                  x1={x + boxW + 2} y1={y + boxH / 2}
                  x2={x + boxW + gap - 2} y2={y + boxH / 2}
                  className="stroke-muted-foreground/40"
                  strokeWidth="1.5" markerEnd="url(#arrow)"
                />
              )}
            </g>
          );
        })}

        {/* Retry loop arrow from Critic back to Persona Generator */}
        {(() => {
          const criticX = 20 + 3 * (boxW + gap) + boxW;
          const personaX = 20 + 1 * (boxW + gap);
          const loopY = 40 + boxH + 12;
          const midX = (criticX + personaX) / 2;
          return (
            <g>
              <path
                d={`M ${criticX - 20} ${40 + boxH} L ${criticX - 20} ${loopY} Q ${criticX - 20} ${loopY + 12} ${criticX - 32} ${loopY + 12} L ${personaX + 20} ${loopY + 12} Q ${personaX} ${loopY + 12} ${personaX} ${loopY} L ${personaX} ${40 + boxH}`}
                fill="none" className="stroke-orange-500/50" strokeWidth="1"
                strokeDasharray="4 3" markerEnd="url(#arrow-red)"
              />
              <text x={midX} y={loopY + 26} textAnchor="middle"
                className="fill-orange-500 text-[8px] font-medium">
                Retry if diversity &lt; 0.6 (max 2x)
              </text>
            </g>
          );
        })()}

        {/* Data flow labels */}
        <text x={svgW / 2} y={22} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Structured data flows left to right — each agent outputs validated JSON
        </text>
      </svg>
    </div>
  );
}

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

        {/* SVG Pipeline Diagram */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Pipeline Flow</h2>
          <Card className="p-6">
            <PipelineDiagram />
          </Card>
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
            <Card key={i} className={`p-5 ${agent.border} border`}>
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${agent.bg}`}>
                  <agent.icon className={`h-5 w-5 ${agent.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{i + 1}. {agent.name}</h3>
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
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Modular Agent Pipeline",
              desc: "Each agent has a single responsibility with its own prompt, schema, and parameters. The persona generator does not know about insights; the critic does not generate content.",
            },
            {
              title: "Critique & Refinement Loop",
              desc: "The critic agent evaluates persona diversity. If scores fall below 0.6, personas are regenerated — up to 2 retries. This is a self-improving loop, not a linear chain.",
            },
            {
              title: "Structured Data Flow",
              desc: "Every agent outputs validated JSON matching a Zod schema. Downstream agents receive typed data — not free text. This prevents hallucination cascading.",
            },
            {
              title: "Deterministic + Model-Driven",
              desc: "The intake normalizer is deterministic (string processing). All other agents use NIM API. This hybrid ensures reliability where possible, creativity where needed.",
            },
            {
              title: "Reproducible Clustering",
              desc: "Segment clustering uses deterministic logic (income band grouping, shared trait extraction) rather than relying on the model. Segments are reproducible and auditable.",
            },
            {
              title: "NVIDIA NIM Inference",
              desc: "All LLM calls go through NVIDIA NIM with structured output (guided_json). This enforces schema compliance at the API level, not just prompt engineering.",
            },
          ].map((item, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
