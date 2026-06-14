"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/shared/nav";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Loader2, XCircle, AlertTriangle } from "lucide-react";
import { getRunStatus } from "@/app/actions";

interface StepStatus {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  agentName: string;
  description: string;
  retryCount: number;
}

export default function RunPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [steps, setSteps] = useState<StepStatus[]>([]);
  const [overallStatus, setOverallStatus] = useState<string>("pending");

  useEffect(() => {
    const poll = async () => {
      try {
        const run = await getRunStatus(id);
        if (!run) return;

        setSteps(run.steps);
        setOverallStatus(run.status);

        if (run.status === "completed") {
          setTimeout(() => router.push(`/insights/${id}`), 1500);
        } else if (run.status === "failed") {
          // stay on page to show error
        }
      } catch (err) {
        console.error("Poll error:", err);
      }
    };

    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, [id, router]);

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const progress = steps.length > 0 ? (completedCount / steps.length) * 100 : 0;

  const getIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "running":
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground/40" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Running Agent Pipeline</h1>
          <p className="mt-2 text-muted-foreground">
            {overallStatus === "completed"
              ? "Pipeline complete! Redirecting to insights..."
              : overallStatus === "failed"
              ? "Pipeline encountered an error."
              : "Each agent is processing your input..."}
          </p>
          <Progress value={progress} className="mt-6 h-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            {completedCount} of {steps.length} agents complete
          </p>
        </div>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <Card
              key={i}
              className={`p-4 transition-all ${
                step.status === "running"
                  ? "border-primary shadow-md"
                  : step.status === "completed"
                  ? "border-green-500/30"
                  : step.status === "failed"
                  ? "border-destructive/30"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {getIcon(step.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{step.agentName}</span>
                    {step.retryCount > 0 && (
                      <Badge variant="outline" className="text-xs">
                        Retry {step.retryCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                </div>
                <Badge
                  variant={
                    step.status === "completed"
                      ? "default"
                      : step.status === "running"
                      ? "secondary"
                      : step.status === "failed"
                      ? "destructive"
                      : "outline"
                  }
                  className="text-xs"
                >
                  {step.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {overallStatus === "failed" && (
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-destructive mb-4">
              <AlertTriangle className="h-5 w-5" />
              <span>Pipeline failed</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              One or more agents encountered an error. This may be due to API rate limits or
              a temporary issue with the AI model.
            </p>
            <a href="/intake">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Try Again
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
