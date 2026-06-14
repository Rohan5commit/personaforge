import { describe, it, expect } from "vitest";
import { LaunchBriefSchema } from "@/lib/schemas";

describe("Launch Brief Assembly", () => {
  it("validates brief structure", () => {
    const brief = {
      targetUsers: "College students aged 18-24 who struggle with time management",
      problemSolutionFit:
        "Students need personalized study tools that adapt to their learning style. Our AI assistant provides customized study plans and practice questions.",
      riskyAssumptions: [
        "Students will pay $9.99/mo for study tools when free alternatives exist",
        "AI-generated study plans are as effective as human tutoring",
        "Students will trust AI with their academic data",
      ],
      messagingRecommendations: [
        "Lead with time savings: 'Study in half the time'",
        "Emphasize personalization: 'Your AI study buddy that knows how you learn'",
        "Social proof from beta users",
      ],
      gtmSuggestions: [
        "Partner with college study groups and organizations",
        "Content marketing on Reddit r/college and r/studytips",
        "Freemium model with referral bonuses",
        "Campus ambassador program",
      ],
      mvpFeaturePriority: [
        "Personalized study plan generation",
        "Flashcard creation from notes",
        "Progress tracking and analytics",
        "Practice question generation",
      ],
    };

    const result = LaunchBriefSchema.safeParse(brief);
    expect(result.success).toBe(true);
  });

  it("rejects brief with missing fields", () => {
    const brief = {
      targetUsers: "Students",
    };
    expect(LaunchBriefSchema.safeParse(brief).success).toBe(false);
  });
});
