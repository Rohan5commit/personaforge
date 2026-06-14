"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Nav } from "@/components/shared/nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Frown,
  Wrench,
  BarChart3,
} from "lucide-react";
import { getRunResults } from "@/app/actions";
import type { Persona, InterviewResponse, PersonaScore, InsightSummary } from "@/lib/schemas";

export default function PersonasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<{
    personas: Persona[];
    interviews: InterviewResponse[];
    scores: PersonaScore[];
    insights: InsightSummary;
  } | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  useEffect(() => {
    getRunResults(id).then((run) => {
      if (run?.output) {
        setData({
          personas: run.output.personas,
          interviews: run.output.interviews,
          scores: run.output.scores,
          insights: run.output.insights,
        });
      }
    });
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen">
        <Nav />
        <div className="flex items-center justify-center py-32 text-muted-foreground">
          Loading personas...
        </div>
      </div>
    );
  }

  const { personas, interviews, scores, insights } = data;

  const getScore = (personaId: string) =>
    scores.find((s) => s.personaId === personaId);
  const getInterview = (personaId: string) =>
    interviews.find((i) => i.personaId === personaId);
  const getSegment = (personaId: string) =>
    insights.segmentClusters.find((s) => s.personaIds.includes(personaId));

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Persona Explorer</h1>
            <p className="mt-1 text-muted-foreground">
              {personas.length} synthetic personas generated
            </p>
          </div>
          <Link href={`/insights/${id}`}>
            <Button className="gap-2">
              Insights Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {selectedPersona ? (
          <PersonaDetail
            persona={selectedPersona}
            interview={getInterview(selectedPersona.id)}
            score={getScore(selectedPersona.id)}
            segment={getSegment(selectedPersona.id)}
            onBack={() => setSelectedPersona(null)}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {personas.map((p) => {
              const score = getScore(p.id);
              const segment = getSegment(p.id);
              return (
                <Card
                  key={p.id}
                  className="p-5 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => setSelectedPersona(p)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {p.ageRange} · {p.role}
                      </p>
                    </div>
                    {segment && (
                      <Badge variant="secondary" className="text-xs">
                        {segment.name}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Target className="h-3 w-3" />
                      {p.goals[0]}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Frown className="h-3 w-3" />
                      {p.frustrations[0]}
                    </div>
                  </div>
                  {score && (
                    <div className="mt-3 flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        Diversity: {Math.round(score.diversityScore * 100)}%
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Realism: {Math.round(score.realismScore * 100)}%
                      </Badge>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function PersonaDetail({
  persona,
  interview,
  score,
  segment,
  onBack,
}: {
  persona: Persona;
  interview?: InterviewResponse;
  score?: PersonaScore;
  segment?: { name: string };
  onBack: () => void;
}) {
  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to all personas
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{persona.name}</h2>
              <p className="text-muted-foreground">
                {persona.ageRange} · {persona.role} · {persona.incomeBand} income · {persona.educationBand}
              </p>
            </div>
            {segment && <Badge>{segment.name}</Badge>}
          </div>

          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 mt-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-500" /> Goals
                </h4>
                <ul className="space-y-1 text-sm">
                  {persona.goals.map((g, i) => (
                    <li key={i}>• {g}</li>
                  ))}
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Frown className="h-4 w-4 text-red-500" /> Frustrations
                </h4>
                <ul className="space-y-1 text-sm">
                  {persona.frustrations.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-blue-500" /> Tools Currently Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {persona.toolsCurrentlyUsed.map((t, i) => (
                    <Badge key={i} variant="outline">{t}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Buying Behavior</h4>
                <p className="text-sm text-muted-foreground">{persona.buyingBehavior}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Preferred Channels</h4>
                <div className="flex flex-wrap gap-2">
                  {persona.preferredChannels.map((c, i) => (
                    <Badge key={i} variant="secondary">{c}</Badge>
                  ))}
                </div>
              </div>
              {persona.quoteSnippets.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Voice</h4>
                    {persona.quoteSnippets.map((q, i) => (
                      <p key={i} className="text-sm italic text-muted-foreground mb-1">
                        &ldquo;{q}&rdquo;
                      </p>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="interview" className="space-y-4 mt-4">
              {interview && (
                <>
                  <div>
                    <h4 className="font-medium mb-2">Reactions</h4>
                    <ul className="space-y-1 text-sm">
                      {interview.reactions.map((r, i) => (
                        <li key={i}>• {r}</li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Objections</h4>
                    <ul className="space-y-1 text-sm">
                      {interview.objections.map((o, i) => (
                        <li key={i}>• {o}</li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Desired Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {interview.desiredFeatures.map((f, i) => (
                        <Badge key={i} variant="outline">{f}</Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Trust Concerns</h4>
                      <ul className="space-y-1 text-sm">
                        {interview.trustConcerns.map((t, i) => (
                          <li key={i}>• {t}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Buying Triggers</h4>
                      <ul className="space-y-1 text-sm">
                        {interview.buyingTriggers.map((t, i) => (
                          <li key={i}>• {t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Switching Barriers</h4>
                    <ul className="space-y-1 text-sm">
                      {interview.switchingBarriers.map((b, i) => (
                        <li key={i}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="transcript" className="mt-4">
              {interview && interview.transcript.length > 0 ? (
                <div className="space-y-4">
                  {interview.transcript.map((line, i) => (
                    <div key={i} className="space-y-2">
                      <div className="rounded-lg bg-muted p-3 text-sm">
                        <span className="font-medium">Interviewer:</span> {line.question}
                      </div>
                      <div className="rounded-lg bg-primary/5 p-3 text-sm">
                        <span className="font-medium">{persona.name}:</span> {line.answer}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No transcript available.</p>
              )}
            </TabsContent>
          </Tabs>
        </Card>

        {/* Score sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Quality Scores
            </h3>
            {score ? (
              <div className="space-y-3">
                {[
                  { label: "Diversity", value: score.diversityScore },
                  { label: "Realism", value: score.realismScore },
                  { label: "Uniqueness", value: score.uniquenessScore },
                  { label: "Overall", value: score.overallScore },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{label}</span>
                      <span>{Math.round(value * 100)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${value * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No scores available</p>
            )}
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold mb-3">Objections</h3>
            <ul className="space-y-1 text-sm">
              {persona.objections.map((o, i) => (
                <li key={i} className="text-muted-foreground">• {o}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
