"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/shared/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Wallet, Stethoscope, Palette, Loader2 } from "lucide-react";
import { startRun } from "@/app/actions";
import type { ProductInput } from "@/lib/schemas";

const PRESETS = [
  {
    id: "ai-study-assistant",
    name: "AI Study Assistant",
    icon: BookOpen,
    input: {
      idea: "AI-powered study assistant that adapts to individual learning styles",
      description:
        "An intelligent tutoring platform that uses AI to analyze a student's learning patterns, strengths, and weaknesses. It generates personalized study plans, practice questions, and explains concepts in the format that works best for each student.",
      audienceType: "Students (high school and college)",
      market: "US and Europe",
      pricingModel: "Freemium with premium subscription ($9.99/mo)",
      stage: "MVP ready for beta testing",
    },
  },
  {
    id: "student-fintech",
    name: "Student Fintech App",
    icon: Wallet,
    input: {
      idea: "Smart budgeting app designed specifically for college students",
      description:
        "A mobile-first financial management app built for college students. It automatically categorizes spending, alerts before overdrafts, splits bills with roommates, tracks financial aid, and provides gamified savings challenges.",
      audienceType: "College students aged 18-24",
      market: "US college students",
      pricingModel: "Free with optional premium ($4.99/mo)",
      stage: "Early prototype",
    },
  },
  {
    id: "telemedicine",
    name: "Telemedicine Platform",
    icon: Stethoscope,
    input: {
      idea: "On-demand telemedicine for rural and underserved communities",
      description:
        "A telemedicine platform connecting patients in rural areas with licensed physicians via video consultations. Features include symptom triage, prescription delivery, chronic disease management, and multilingual interface.",
      audienceType: "Adults in rural areas",
      market: "Rural United States",
      pricingModel: "Pay-per-visit ($49-$99) with insurance",
      stage: "Post-MVP, seeking product-market fit",
    },
  },
  {
    id: "creator-tools",
    name: "Creator Monetization SaaS",
    icon: Palette,
    input: {
      idea: "All-in-one monetization platform for content creators",
      description:
        "A comprehensive SaaS platform helping creators monetize beyond ad revenue. Includes membership tiers, digital product storefronts, community spaces, analytics, brand deal matching, and payment processing.",
      audienceType: "Content creators and influencers",
      market: "Global English-speaking creators",
      pricingModel: "Tiered: Starter $19/mo, Pro $49/mo, Enterprise $99/mo",
      stage: "MVP with first paying customers",
    },
  },
];

export default function IntakePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProductInput>({
    idea: "",
    description: "",
    audienceType: "",
    market: "",
    pricingModel: "",
    stage: "",
    website: "",
  });

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setForm({ ...preset.input, website: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await startRun(form);
      localStorage.setItem(`personaforge_run_${result.id}`, JSON.stringify(result));
      router.push(`/run/${result.id}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Describe your product</h1>
        <p className="mt-2 text-muted-foreground">
          Or start with a demo preset to see PersonaForge in action.
        </p>

        {/* Presets */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className="flex items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent"
            >
              <p.icon className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm font-medium">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            or fill manually
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="idea">Product Idea *</Label>
            <Input
              id="idea"
              placeholder="e.g., AI study assistant for college students"
              value={form.idea}
              onChange={(e) => setForm({ ...form, idea: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what your product does, who it's for, and what problem it solves..."
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="audienceType">Target Audience *</Label>
              <Input
                id="audienceType"
                placeholder="e.g., College students"
                value={form.audienceType}
                onChange={(e) =>
                  setForm({ ...form, audienceType: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="market">Market / Geography *</Label>
              <Input
                id="market"
                placeholder="e.g., US and Europe"
                value={form.market}
                onChange={(e) => setForm({ ...form, market: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Pricing Model *</Label>
              <Input
                placeholder="e.g., Freemium at $9.99/mo"
                value={form.pricingModel}
                onChange={(e) =>
                  setForm({ ...form, pricingModel: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Product Stage *</Label>
              <Select
                value={form.stage}
                onValueChange={(v) => setForm({ ...form, stage: v || "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Idea / Concept">Idea / Concept</SelectItem>
                  <SelectItem value="Early prototype">Early prototype</SelectItem>
                  <SelectItem value="MVP ready for beta testing">
                    MVP ready for beta
                  </SelectItem>
                  <SelectItem value="MVP with first paying customers">
                    MVP with customers
                  </SelectItem>
                  <SelectItem value="Post-MVP, seeking product-market fit">
                    Seeking PMF
                  </SelectItem>
                  <SelectItem value="Growth stage">Growth stage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website or Deck Summary (optional)</Label>
            <Input
              id="website"
              placeholder="https://..."
              value={form.website || ""}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running Agent Pipeline...
              </>
            ) : (
              "Generate Personas & Insights"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
