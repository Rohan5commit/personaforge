import type { Persona, InterviewResponse, PersonaScore, InsightSummary, LaunchBrief } from "@/lib/schemas";

export const healthPersonas: Persona[] = [
  {
    id: "p1", name: "Martha Greene", ageRange: "55-64", role: "Rural resident, chronic conditions",
    incomeBand: "medium", educationBand: "High School",
    goals: ["Manage diabetes without driving 2 hours", "Stay independent", "Avoid ER visits"],
    frustrations: ["Nearest doctor is 90 miles away", "Long wait times", "Can't get prescriptions refilled easily"],
    toolsCurrentlyUsed: ["MyChart portal", "CVS pharmacy app", "Phone calls"],
    buyingBehavior: "Will use if doctor recommends it, skeptical of tech",
    objections: ["Don't trust video calls for real medicine", "Internet is unreliable here"],
    preferredChannels: ["Facebook", "Local news", "Word of mouth"],
    quoteSnippets: ["I drive 3 hours just for a 15-minute appointment", "If my doctor says it's safe, I'll try it"],
  },
  {
    id: "p2", name: "James Whitehawk", ageRange: "35-44", role: "Tribal community health worker",
    incomeBand: "low", educationBand: "Bachelors",
    goals: ["Get mental health services for community", "Reduce travel burden for elders", "Connect people to specialists"],
    frustrations: ["No mental health providers nearby", "Stigma around seeking help", "Insurance doesn't cover telehealth"],
    toolsCurrentlyUsed: ["Epic MyChart", "Phone triage", "Community health records"],
    buyingBehavior: "Needs tribal council approval, evidence-based decisions",
    objections: ["Bandwidth limitations", "Cultural concerns about video therapy", "Insurance reimbursement unclear"],
    preferredChannels: ["Community meetings", "Tribal newsletter", "Email"],
    quoteSnippets: ["Our nearest psychiatrist is 4 hours away", "Elders won't use something they can't understand"],
  },
  {
    id: "p3", name: "Rosa Hernandez", ageRange: "25-34", role: "Undocumented worker, no insurance",
    incomeBand: "low", educationBand: "Some college",
    goals: ["Find affordable healthcare", "Get prenatal care", "Not get deported"],
    frustrations: ["No insurance, scared of hospitals", "Language barriers", "Can't miss work for appointments"],
    toolsCurrentlyUsed: ["Community clinic", "Spanish-language hotlines", "Pharmacy consultations"],
    buyingBehavior: "Will use if culturally sensitive and affordable",
    objections: ["Don't trust platforms with personal data", "Afraid of ICE", "No Spanish-speaking doctors"],
    preferredChannels: ["WhatsApp groups", "Church community", "Spanish radio"],
    quoteSnippets: ["I'm pregnant and haven't seen a doctor yet", "Necesito un doctor que hable español"],
  },
  {
    id: "p4", name: "Robert Chen", ageRange: "65-74", role: "Retiree, tech-averse",
    incomeBand: "medium", educationBand: "High School",
    goals: ["See my cardiologist without traveling", "Keep taking my medications", "Stay healthy enough to golf"],
    frustrations: ["Can't figure out video calls", "Wife manages all tech", "Prefers in-person but body can't do it"],
    toolsCurrentlyUsed: ["Landline phone", "Wife's iPad", "CVS pharmacy"],
    buyingBehavior: "Will use if wife sets it up, needs phone option too",
    objections: ["I'm too old for this", "What if it doesn't work and I miss my appointment?"],
    preferredChannels: ["TV ads", "Doctor's office brochures", "Phone"],
    quoteSnippets: ["Just put me on the phone with the doctor", "My wife handles all this computer stuff"],
  },
  {
    id: "p5", name: "Aisha Patel", ageRange: "28-37", role: "Busy mom, three kids",
    incomeBand: "medium", educationBand: "Bachelors",
    goals: ["Get pediatric care without waiting rooms", "Handle her own health issues", "Not take time off work"],
    frustrations: ["Sick kids = missed work = lost pay", "Waiting rooms are germ factories", "Hard to schedule around kids"],
    toolsCurrentlyUsed: ["Kaiser app", "Amazon Pharmacy", "Google for symptoms"],
    buyingBehavior: "Convenience is top priority, will pay for quality",
    objections: ["Is telehealth as good as in-person?", "Will my insurance cover it?"],
    preferredChannels: ["Facebook groups", "Mom blogs", "Instagram"],
    quoteSnippets: ["I spent 4 hours in a waiting room with 3 sick kids", "If I can do this from my couch at nap time, I'm in"],
  },
  {
    id: "p6", name: "David Okafor", ageRange: "40-49", role: "Truck driver, on the road constantly",
    incomeBand: "medium", educationBand: "High School",
    goals: ["Get healthcare while traveling", "Manage blood pressure", "Not lose my CDL medical certification"],
    frustrations: ["Can't establish a relationship with one doctor", "No time to find local providers", "Health issues go untreated"],
    toolsCurrentlyUsed: ["Phone", "CVS MinuteClinic", "Truck stop pharmacies"],
    buyingBehavior: "Needs something that works across state lines",
    objections: ["Doctors in different states can't prescribe", "What if I need a physical exam?"],
    preferredChannels: ["YouTube", "Trucker forums", "CB radio word of mouth"],
    quoteSnippets: ["I haven't seen a real doctor in 2 years", "My health checks happen at truck stops"],
  },
  {
    id: "p7", name: "Linda Yamamoto", ageRange: "50-59", role: "Immigrant, English not first language",
    incomeBand: "medium", educationBand: "Masters",
    goals: ["Find Japanese-speaking therapist", "Manage anxiety", "Navigate American healthcare system"],
    frustrations: ["Cultural stigma around mental health", "No providers who understand Japanese culture", "Insurance is confusing"],
    toolsCurrentlyUsed: ["Kaiser app (in English)", "Japanese community center referrals", "Google Translate"],
    buyingBehavior: "Wants culturally competent care, willing to pay out of pocket",
    objections: ["Therapy through a screen feels impersonal", "Worried about privacy in shared living space"],
    preferredChannels: ["LINE messenger", "Japanese community newspaper", "Word of mouth"],
    quoteSnippets: ["In Japan, we don't talk about these things", "I need someone who understands my background"],
  },
  {
    id: "p8", name: "Marcus Taylor", ageRange: "30-39", role: "Veteran, PTSD and chronic pain",
    incomeBand: "medium", educationBand: "Some college",
    goals: ["Access VA mental health services", "Manage chronic pain without opioids", "Reconnect with community"],
    frustrations: ["VA wait times are brutal", "Stigma in veteran community", "Moved away from VA hospital"],
    toolsCurrentlyUsed: ["My HealtheVet", "VA Video Connect", "Phone appointments"],
    buyingBehavior: "Will use anything VA endorses, skeptical of private sector",
    objections: ["VA already offers telehealth", "Don't trust private companies with my records"],
    preferredChannels: ["Veteran groups", "Facebook", "VA newsletters"],
    quoteSnippets: ["I waited 3 months for a therapy appointment", "If it helps veterans, I'll try it"],
  },
];

export const healthInterviews: InterviewResponse[] = healthPersonas.map((p) => ({
  personaId: p.id,
  reactions: ["If my doctor trusts it, I might too", "Better than driving 3 hours"],
  objections: (Array.isArray(p.objections) ? p.objections : [p.objections]).slice(0, 2),
  desiredFeatures: ["Video calls with doctors", "Prescription delivery", "Symptom checker", "Insurance verification"],
  trustConcerns: ["Doctor qualifications on platform", "Data privacy", "Will insurance cover this?"],
  buyingTriggers: ["Doctor recommendation", "Insurance coverage", "Proven outcomes from others"],
  switchingBarriers: ["Current provider relationship", "Tech anxiety", "Unreliable internet"],
  transcript: [
    { question: "What's your biggest healthcare challenge?", answer: p.frustrations[0] },
    { question: "How do you currently see a doctor?", answer: p.toolsCurrentlyUsed[0] },
    { question: "Would you try a video visit?", answer: p.ageRange.startsWith("6") ? "If someone helps me set it up" : "If it saves me time, yes" },
    { question: "What would make you trust this?", answer: "My own doctor on the platform" },
  ],
}));

const HEALTH_DIVERSITY = [0.85, 0.72, 0.91, 0.67, 0.80, 0.76, 0.88, 0.74];
const HEALTH_REALISM   = [0.90, 0.78, 0.87, 0.73, 0.82, 0.69, 0.92, 0.79];
const HEALTH_UNIQUENESS = [0.81, 0.68, 0.89, 0.71, 0.77, 0.84, 0.83, 0.70];
const HEALTH_OVERALL   = [0.85, 0.73, 0.89, 0.70, 0.80, 0.76, 0.88, 0.74];

export const healthScores: PersonaScore[] = healthPersonas.map((p, i) => ({
  personaId: p.id,
  diversityScore: HEALTH_DIVERSITY[i],
  realismScore: HEALTH_REALISM[i],
  uniquenessScore: HEALTH_UNIQUENESS[i],
  overallScore: HEALTH_OVERALL[i],
}));

export const healthInsights: InsightSummary = {
  segmentClusters: [
    {
      id: "seg_1", name: "Rural & Underserved",
      personaIds: ["p1", "p2", "p6"],
      sharedPains: ["No nearby providers", "Long travel times", "Unreliable internet"],
      sharedDesires: ["Access to specialists", "Convenience", "Affordable care"],
      avgWillingnessToPay: "Insurance-covered preferred",
      channelPreference: ["Facebook", "Community", "Word of mouth"],
    },
    {
      id: "seg_2", name: "Vulnerable Populations",
      personaIds: ["p3", "p7", "p8"],
      sharedPains: ["Language barriers", "Stigma", "Privacy concerns", "Insurance gaps"],
      sharedDesires: ["Culturally sensitive care", "Affordability", "Privacy"],
      avgWillingnessToPay: "Out-of-pocket if affordable",
      channelPreference: ["WhatsApp", "Community", "Cultural orgs"],
    },
    {
      id: "seg_3", name: "Convenience Seekers",
      personaIds: ["p4", "p5"],
      sharedPains: ["Waiting rooms", "Scheduling around family", "Tech complexity"],
      sharedDesires: ["Quick access", "Phone option", "Kids and adults together"],
      avgWillingnessToPay: "Willing to pay for convenience",
      channelPreference: ["Facebook", "Mom groups", "TV"],
    },
  ],
  topPains: [
    "Nearest doctor is hours away",
    "Long wait times for appointments",
    "Can't find providers who speak my language",
    "Insurance doesn't cover telehealth",
    "Waiting rooms are full of germs",
  ],
  topDesires: [
    "See a doctor from home",
    "Get prescriptions without traveling",
    "Find a provider who speaks my language",
    "Affordable options without insurance",
    "Quick access for urgent issues",
  ],
  topFeatureRequests: [
    "Video calls with doctors",
    "Prescription delivery",
    "Symptom checker",
    "Insurance verification at booking",
    "Multi-language support",
  ],
  pricingInsights: [
    { tier: "Insurance-covered", segment: "All segments", willingness: "High", sensitivity: "Must accept major insurance" },
    { tier: "$49-$99 per visit", segment: "Uninsured", willingness: "Medium", sensitivity: "Compare to ER cost ($1500+)" },
    { tier: "$19.99/mo subscription", segment: "Frequent users", willingness: "Low", sensitivity: "Need to see value first" },
  ],
  positioningIdeas: [
    "Healthcare that comes to you — no matter where you live",
    "See a doctor today, not next month",
    "Your health, your language, your schedule",
  ],
  launchRecommendations: [
    "Partner with rural health clinics for pilot program",
    "Target Hispanic community health organizations",
    "Offer free first-visit trial to build trust",
    "Work with insurance companies for coverage",
    "Create multilingual marketing materials",
  ],
  messagingHooks: [
    "No more 3-hour drives for a 15-minute appointment",
    "A doctor in your pocket, not a waiting room",
    "Healthcare that speaks your language — literally",
    "Your commute to the doctor: 0 miles",
  ],
  objectionThemes: [
    {
      theme: "Trust in Virtual Care",
      frequency: 6,
      severity: "high",
      segments: ["Rural & Underserved", "Convenience Seekers"],
      sampleQuotes: ["How can a doctor help me through a screen?", "What if I need a physical exam?"],
    },
    {
      theme: "Technology Barriers",
      frequency: 4,
      severity: "medium",
      segments: ["Rural & Underserved", "Vulnerable Populations"],
      sampleQuotes: ["I can barely use my phone", "My internet cuts out constantly"],
    },
  ],
};

export const healthBrief: LaunchBrief = {
  targetUsers: "Adults in rural and underserved communities who struggle to access healthcare due to distance, provider shortages, or language barriers. Also serving busy parents, elderly patients, and non-English speakers.",
  problemSolutionFit: "Millions of Americans live hours from the nearest specialist, face month-long wait times, or can't find providers who speak their language. Telemedicine bridges this gap with video consultations, prescription delivery, and multilingual support — all from home.",
  riskyAssumptions: [
    "Patients trust virtual care as much as in-person visits",
    "Insurance companies will reimburse telehealth visits",
    "Rural internet infrastructure supports reliable video calls",
    "Cultural stigma around mental health won't block adoption",
  ],
  messagingRecommendations: [
    "Lead with access: 'See a doctor today, not next month'",
    "Emphasize convenience: 'Your commute to the doctor: 0 miles'",
    "Use social proof from similar communities",
    "Address trust: 'Board-certified doctors, same as your local clinic'",
  ],
  gtmSuggestions: [
    "Partner with 10 rural health clinics for pilot program",
    "Offer free first-visit trial to build initial user base",
    "Work with community health workers for outreach",
    "Create multilingual marketing in Spanish, Japanese, and others",
    "Apply for rural health grants to subsidize costs",
  ],
  mvpFeaturePriority: [
    "Reliable video call infrastructure",
    "Multi-language support",
    "Insurance verification at booking",
    "Prescription delivery integration",
    "Symptom triage before appointment",
  ],
};
