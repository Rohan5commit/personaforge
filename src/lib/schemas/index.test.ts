import { describe, it, expect } from "vitest";
import {
  ProductInputSchema,
  PersonaSchema,
  InterviewResponseSchema,
  PersonaScoreSchema,
  InsightSummarySchema,
  LaunchBriefSchema,
} from "./index";

describe("ProductInputSchema", () => {
  it("validates a complete product input", () => {
    const input = {
      idea: "AI study assistant",
      description: "An AI-powered tutoring platform for students",
      audienceType: "college students",
      market: "US",
      pricingModel: "freemium",
      stage: "MVP",
    };
    expect(ProductInputSchema.safeParse(input).success).toBe(true);
  });

  it("rejects empty idea", () => {
    const input = {
      idea: "",
      description: "An AI-powered tutoring platform",
      audienceType: "students",
      market: "US",
      pricingModel: "freemium",
      stage: "MVP",
    };
    expect(ProductInputSchema.safeParse(input).success).toBe(false);
  });

  it("allows optional website", () => {
    const input = {
      idea: "AI study assistant",
      description: "An AI-powered tutoring platform for students",
      audienceType: "college students",
      market: "US",
      pricingModel: "freemium",
      stage: "MVP",
      website: "https://example.com",
    };
    const result = ProductInputSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe("https://example.com");
    }
  });
});

describe("PersonaSchema", () => {
  it("validates a complete persona", () => {
    const persona = {
      id: "p1",
      name: "Sarah Chen",
      ageRange: "25-34",
      role: "Graduate Student",
      incomeBand: "medium",
      educationBand: "Masters",
      goals: ["Improve grades", "Save time studying"],
      frustrations: ["Overwhelming course material", "No personalized study plan"],
      toolsCurrentlyUsed: ["Quizlet", "Notion"],
      buyingBehavior: "Researches extensively before purchasing",
      objections: ["Already using free tools", "Price sensitivity"],
      preferredChannels: ["Instagram", "Reddit"],
      quoteSnippets: ["I wish I had more time to study effectively"],
    };
    expect(PersonaSchema.safeParse(persona).success).toBe(true);
  });

  it("rejects persona with missing required fields", () => {
    const persona = {
      id: "p1",
      name: "Sarah",
    };
    expect(PersonaSchema.safeParse(persona).success).toBe(false);
  });
});

describe("InterviewResponseSchema", () => {
  it("validates a complete interview response", () => {
    const interview = {
      personaId: "p1",
      reactions: ["Seems useful", "Interesting concept"],
      objections: ["Too expensive", "Already have free tools"],
      desiredFeatures: ["Flashcard generation", "Progress tracking"],
      trustConcerns: ["Data privacy", "AI accuracy"],
      buyingTriggers: ["Free trial", "Peer recommendation"],
      switchingBarriers: ["Existing workflow", "Learning curve"],
      transcript: [
        { question: "What do you think?", answer: "It sounds helpful." },
        { question: "Would you pay for this?", answer: "Maybe if it's affordable." },
      ],
    };
    expect(InterviewResponseSchema.safeParse(interview).success).toBe(true);
  });
});

describe("PersonaScoreSchema", () => {
  it("validates scores", () => {
    const score = {
      personaId: "p1",
      diversityScore: 0.8,
      realismScore: 0.9,
      uniquenessScore: 0.7,
      overallScore: 0.8,
    };
    expect(PersonaScoreSchema.safeParse(score).success).toBe(true);
  });
});

describe("InsightSummarySchema", () => {
  it("validates a complete insight summary", () => {
    const insight = {
      segmentClusters: [
        {
          id: "seg_1",
          name: "Budget Students",
          personaIds: ["p1", "p2"],
          sharedPains: ["High cost", "Time constraints"],
          sharedDesires: ["Affordable tools", "Better grades"],
          avgWillingnessToPay: "Budget",
          channelPreference: ["Instagram"],
        },
      ],
      topPains: ["Overwhelming material", "No personalization"],
      topDesires: ["Better study habits", "Time savings"],
      topFeatureRequests: ["Flashcards", "Progress tracking"],
      pricingInsights: [
        { tier: "Free", segment: "Students", willingness: "High", sensitivity: "High" },
      ],
      positioningIdeas: ["AI-powered study buddy"],
      launchRecommendations: ["Target Reddit communities"],
      messagingHooks: ["Study smarter, not harder"],
      objectionThemes: [
        {
          theme: "Price",
          frequency: 5,
          severity: "high",
          segments: ["Students"],
          sampleQuotes: ["Too expensive for a student"],
        },
      ],
    };
    expect(InsightSummarySchema.safeParse(insight).success).toBe(true);
  });
});

describe("LaunchBriefSchema", () => {
  it("validates a complete launch brief", () => {
    const brief = {
      targetUsers: "College students aged 18-24",
      problemSolutionFit: "Students need personalized study tools",
      riskyAssumptions: ["Students will pay for study tools"],
      messagingRecommendations: ["Focus on time savings"],
      gtmSuggestions: ["Partner with study groups"],
      mvpFeaturePriority: ["Flashcard generation", "Progress tracking"],
    };
    expect(LaunchBriefSchema.safeParse(brief).success).toBe(true);
  });
});
