"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Nav } from "@/components/shared/nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Target,
  AlertTriangle,
  Megaphone,
  Rocket,
  ListOrdered,
  FileText,
} from "lucide-react";
import { getRunResults } from "@/app/actions";
import { getRunFromStorage } from "@/lib/client-storage";
import type { LaunchBrief, ProductInput } from "@/lib/schemas";

function getInitialData(id: string) {
  const stored = getRunFromStorage(id);
  if (stored?.output) {
    return { brief: stored.output.brief as LaunchBrief, input: stored.input as ProductInput };
  }
  return null;
}

export default function BriefPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const initial = getInitialData(id);
  const [brief, setBrief] = useState<LaunchBrief | null>(() => initial?.brief ?? null);
  const [input, setInput] = useState<ProductInput | null>(() => initial?.input ?? null);
  const [error, setError] = useState(() => !initial);

  useEffect(() => {
    if (brief && input) return;

    const controller = new AbortController();

    getRunResults(id).then((run) => {
      if (controller.signal.aborted) return;
      if (run?.output) {
        setBrief(run.output.brief);
        setInput(run.input);
        setError(false);
      } else {
        setError(true);
      }
    }).catch(() => {
      if (!controller.signal.aborted) setError(true);
    });

    const timeout = setTimeout(() => {
      if (!controller.signal.aborted) setError(true);
    }, 15000);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [id, brief, input]);

  if (error) {
    return (
      <div className="min-h-screen">
        <Nav />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <AlertTriangle className="h-12 w-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Results not found</h2>
          <p className="text-muted-foreground mb-6">
            This run may have expired or the data is no longer available.
          </p>
          <Link href="/intake">
            <Button>Start a New Run</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!brief || !input) {
    return (
      <div className="min-h-screen">
        <Nav />
        <div className="flex items-center justify-center py-32 text-muted-foreground">
          Loading launch brief...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-7 w-7" />
              Launch Brief
            </h1>
            <p className="mt-1 text-muted-foreground">
              For: {input.idea}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/insights/${id}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Insights
              </Button>
            </Link>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="gap-2 print:hidden"
            >
              Print / Export PDF
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-primary" />
              Target Users
            </h2>
            <p className="text-sm leading-relaxed">{brief.targetUsers}</p>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-green-500" />
              Problem-Solution Fit
            </h2>
            <p className="text-sm leading-relaxed">{brief.problemSolutionFit}</p>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Risky Assumptions to Validate
            </h2>
            <ul className="space-y-2">
              {brief.riskyAssumptions.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="shrink-0 mt-0.5">
                    {i + 1}
                  </Badge>
                  {a}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <Megaphone className="h-5 w-5 text-blue-500" />
              Messaging Recommendations
            </h2>
            <ul className="space-y-2">
              {brief.messagingRecommendations.map((m, i) => (
                <li key={i} className="text-sm">• {m}</li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <Rocket className="h-5 w-5 text-purple-500" />
              Go-to-Market Suggestions
            </h2>
            <ul className="space-y-2">
              {brief.gtmSuggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Badge variant="secondary" className="shrink-0 mt-0.5">
                    {i + 1}
                  </Badge>
                  {s}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <ListOrdered className="h-5 w-5 text-yellow-500" />
              MVP Feature Priority
            </h2>
            <ol className="space-y-2">
              {brief.mvpFeaturePriority.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {f}
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
