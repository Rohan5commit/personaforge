"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Nav } from "@/components/shared/nav";
import { ArrowRight, Users, MessageSquare, Search, Sparkles, Zap, Target } from "lucide-react";

const STEPS = [
  { icon: Target, title: "Define Product", desc: "Describe your startup, product, or idea" },
  { icon: Users, title: "Generate Personas", desc: "AI creates 8 diverse customer personas" },
  { icon: MessageSquare, title: "Simulate Feedback", desc: "Agent interviews each persona" },
  { icon: Search, title: "Extract Strategy", desc: "Get ICP segments, insights, and launch brief" },
];

const FEATURES = [
  { icon: Zap, title: "6-Agent Pipeline", desc: "Multi-agent system with critique loops, not one-shot prompts" },
  { icon: Users, title: "Diverse Personas", desc: "Realistic synthetic customers across age, income, and behavior" },
  { icon: MessageSquare, title: "Interview Simulation", desc: "Authentic objections, desires, and transcript excerpts" },
  { icon: Search, title: "Actionable Insights", desc: "ICP segments, pricing signals, messaging hooks, launch brief" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              GenAI Bootcamp Project
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Generate. Stress-test.
              <br />
              <span className="text-primary">Launch smarter.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              PersonaForge uses agentic AI to generate realistic customer personas,
              simulate interviews, and extract actionable product insights — in minutes, not weeks.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/intake">
                <Button size="lg" className="gap-2">
                  Try Demo <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/architecture">
                <Button size="lg" variant="outline">
                  View Agent System
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">How it works</h2>
          <p className="mt-3 text-center text-muted-foreground">
            From idea to launch strategy in four steps
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Card key={i} className="relative p-6">
                <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <step.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Why PersonaForge</h2>
          <p className="mt-3 text-center text-muted-foreground">
            More than a chatbot. A real multi-agent research system.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Card key={i} className="p-6">
                <f.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to understand your users?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Stop guessing. Start generating.
          </p>
          <Link href="/intake" className="mt-8 inline-block">
            <Button size="lg" className="gap-2">
              Start Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm text-muted-foreground">
          <span>PersonaForge</span>
          <span>Built for Statify 2.0 GenAI Bootcamp</span>
        </div>
      </footer>
    </div>
  );
}
