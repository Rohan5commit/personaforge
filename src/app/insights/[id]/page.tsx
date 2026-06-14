"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Nav } from "@/components/shared/nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  AlertTriangle,
  Heart,
  Star,
  DollarSign,
  Megaphone,
  Target,
  ArrowRight,
  FileText,
} from "lucide-react";
import { getRunResults } from "@/app/actions";
import { getRunFromStorage } from "@/lib/client-storage";
import type { InsightSummary, Persona, PersonaScore } from "@/lib/schemas";

export default function InsightsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<{
    insight: InsightSummary;
    personas: Persona[];
    scores: PersonaScore[];
  } | null>(null);

  useEffect(() => {
    // Try localStorage first (instant)
    const stored = getRunFromStorage(id);
    if (stored?.output) {
      setData({
        insight: stored.output.insights,
        personas: stored.output.personas,
        scores: stored.output.scores,
      });
      return;
    }

    // Fallback to server action
    getRunResults(id).then((run) => {
      if (run?.output) {
        setData({
          insight: run.output.insights,
          personas: run.output.personas,
          scores: run.output.scores,
        });
      }
    });
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen">
        <Nav />
        <div className="flex items-center justify-center py-32 text-muted-foreground">
          Loading insights...
        </div>
      </div>
    );
  }

  const { insight, personas } = data;

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Insights Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              {personas.length} personas analyzed across {insight.segmentClusters.length} segments
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/personas/${id}`}>
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                View Personas
              </Button>
            </Link>
            <Link href={`/brief/${id}`}>
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Launch Brief
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="segments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="pains">Pains & Desires</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="objections">Objections</TabsTrigger>
            <TabsTrigger value="messaging">Messaging</TabsTrigger>
          </TabsList>

          <TabsContent value="segments" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {insight.segmentClusters.map((seg) => (
                <Card key={seg.id} className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{seg.name}</h3>
                    <Badge variant="secondary">{seg.personaIds.length} personas</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Pains: </span>
                      {seg.sharedPains.slice(0, 2).join("; ")}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Desires: </span>
                      {seg.sharedDesires.slice(0, 2).join("; ")}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span>{seg.avgWillingnessToPay}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pains" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-5">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Top Pain Points
                </h3>
                <div className="space-y-3">
                  {insight.topPains.map((pain, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-xs text-muted-foreground mt-1 w-5">{i + 1}.</span>
                      <span className="text-sm">{pain}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Heart className="h-4 w-4 text-pink-500" />
                  Top Desires
                </h3>
                <div className="space-y-3">
                  {insight.topDesires.map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-xs text-muted-foreground mt-1 w-5">{i + 1}.</span>
                      <span className="text-sm">{d}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-5 lg:col-span-2">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Top Feature Requests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {insight.topFeatureRequests.map((f, i) => (
                    <Badge key={i} variant="outline">{f}</Badge>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {insight.pricingInsights.map((p, i) => (
                <Card key={i} className="p-5">
                  <Badge className="mb-2">{p.tier}</Badge>
                  <p className="text-sm text-muted-foreground mb-1">
                    Segment: {p.segment}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Willingness:</span> {p.willingness}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Sensitivity:</span> {p.sensitivity}
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="objections" className="space-y-4">
            <div className="space-y-3">
              {insight.objectionThemes.map((o, i) => (
                <Card key={i} className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{o.theme}</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Frequency: {o.frequency}</Badge>
                      <Badge variant={o.severity === "high" ? "destructive" : "outline"}>
                        {o.severity}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Segments: {o.segments.join(", ")}
                  </p>
                  <div className="text-sm italic text-muted-foreground">
                    {o.sampleQuotes.map((q, qi) => (
                      <p key={qi}>&ldquo;{q}&rdquo;</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messaging" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-5">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Megaphone className="h-4 w-4 text-blue-500" />
                  Messaging Hooks
                </h3>
                <div className="space-y-3">
                  {insight.messagingHooks.map((m, i) => (
                    <div key={i} className="p-3 rounded-md bg-muted text-sm">
                      {m}
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Target className="h-4 w-4 text-green-500" />
                  Positioning Ideas
                </h3>
                <div className="space-y-3">
                  {insight.positioningIdeas.map((p, i) => (
                    <div key={i} className="text-sm">
                      {p}
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-5 lg:col-span-2">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-purple-500" />
                  Launch Recommendations
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {insight.launchRecommendations.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-bold">{i + 1}.</span>
                      {r}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
