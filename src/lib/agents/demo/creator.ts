import type { Persona, InterviewResponse, PersonaScore, InsightSummary, LaunchBrief } from "@/lib/schemas";

export const creatorPersonas: Persona[] = [
  {
    id: "p1", name: "Zara Kim", ageRange: "22-26", role: "Beauty YouTuber, 50K subscribers",
    incomeBand: "medium", educationBand: "Some college",
    goals: ["Quit my day job", "Diversify beyond YouTube ads", "Build a real brand"],
    frustrations: ["YouTube ad revenue is unpredictable", "Brand deals are inconsistent", "No time to build a website"],
    toolsCurrentlyUsed: ["YouTube Studio", "Instagram", "Canva"],
    buyingBehavior: "Will invest if it directly increases revenue",
    objections: ["Already paying for 5 tools", "Don't want another dashboard", "Takes time to set up"],
    preferredChannels: ["Twitter", "YouTube", "Discord"],
    quoteSnippets: ["I have 50K subscribers but make less than minimum wage", "I need recurring revenue, not one-off brand deals"],
  },
  {
    id: "p2", name: "Devon Harris", ageRange: "28-35", role: "Fitness creator, 120K Instagram",
    incomeBand: "medium", educationBand: "Bachelors",
    goals: ["Launch workout plans", "Build membership community", "Stop chasing brand deals"],
    frustrations: ["Instagram算法变化频繁", "Ad revenue is unreliable", "Hard to monetize workout content directly"],
    toolsCurrentlyUsed: ["Instagram", "Teachable", "PayPal"],
    buyingBehavior: "Needs proof of concept before committing",
    objections: ["Tried Patreon, low conversion", "Worried about alienating free audience"],
    preferredChannels: ["Instagram", "YouTube", "Twitter"],
    quoteSnippets: ["I give away free content but can't figure out how to charge", "My followers say they'd pay but when I launch, crickets"],
  },
  {
    id: "p3", name: "Mei Tanaka", ageRange: "25-30", role: "Art/illustration creator, 30K Twitter",
    incomeBand: "low", educationBand: "Bachelors",
    goals: ["Sell prints and commissions", "License art to brands", "Make a living from art"],
    frustrations: ["Commissions are exhausting", "No passive income stream", "Art theft is rampant"],
    toolsCurrentlyUsed: ["Twitter", "Etsy", "Gumroad"],
    buyingBehavior: "Budget-conscious, needs clear ROI",
    objections: ["Can't afford monthly fees", "Gumroad already does this", "Scared of platform lock-in"],
    preferredChannels: ["Twitter", "Tumblr", "Discord"],
    quoteSnippets: ["I make beautiful art but I'm broke", "I need a storefront that actually gets creators"],
  },
  {
    id: "p4", name: "Kyle Rodriguez", ageRange: "30-39", role: "Tech reviewer, 200K YouTube",
    incomeBand: "high", educationBand: "Masters",
    goals: ["Scale beyond one person", "Launch a media brand", "Hire an editor"],
    frustrations: ["Editing takes 20 hours per video", "Can't scale alone", "Sponsorships dominate content"],
    toolsCurrentlyUsed: ["YouTube", "Adobe Premiere", "Notion"],
    buyingBehavior: "Willing to pay premium for scaling tools",
    objections: ["Need team features, not individual tools", "Don't want to rebuild on new platform"],
    preferredChannels: ["Twitter", "LinkedIn", "YouTube"],
    quoteSnippets: ["I'm the bottleneck in my own business", "I need to turn this side hustle into a media company"],
  },
  {
    id: "p5", name: "Jasmine Lee", ageRange: "20-24", role: "Gaming streamer, 80K Twitch",
    incomeBand: "medium", educationBand: "Some college",
    goals: ["Monetize beyond Twitch subs", "Build merch line", "Create content outside streaming"],
    frustrations: ["Twitch takes 50% of subs", "Merch is hard to set up", "Streaming burnout is real"],
    toolsCurrentlyUsed: ["Twitch", "Streamlabs", "Shopify trial"],
    buyingBehavior: "Follows what other successful streamers use",
    objections: ["Already using Shopify (kinda)", "My audience won't pay extra"],
    preferredChannels: ["Twitch", "Twitter", "Discord"],
    quoteSnippets: ["I stream 6 days a week and barely make rent", "My viewers love me but won't click 'buy'"],
  },
  {
    id: "p6", name: "Omar Hassan", ageRange: "35-44", role: "Education creator, 150K YouTube",
    incomeBand: "high", educationBand: "Doctorate",
    goals: ["Sell online courses", "Build community around courses", "Transition from ad-dependent to direct revenue"],
    frustrations: ["Teachable fees are high", "No built-in community features", "Hard to create course bundles"],
    toolsCurrentlyUsed: ["YouTube", "Teachable", "Circle"],
    buyingBehavior: "Researches extensively, compares platforms",
    objections: ["Already invested in Teachable", "Switching costs are high", "Don't want to lose existing students"],
    preferredChannels: ["LinkedIn", "YouTube", "Email"],
    quoteSnippets: ["I educate 2 million people a year and can't afford a studio", "If my community lives here, they won't leave"],
  },
  {
    id: "p7", name: "Sophie Dubois", ageRange: "27-32", role: "Lifestyle/blogger, 40K newsletter",
    incomeBand: "medium", educationBand: "Bachelors",
    goals: ["Monetize newsletter", "Launch premium content tier", "Diversify from Instagram"],
    frustrations: ["Newsletter growth is slow", "No good paywall options", "Instagram algorithm kills reach"],
    toolsCurrentlyUsed: ["Substack", "Instagram", "ConvertKit"],
    buyingBehavior: "Values simplicity and aesthetics",
    objections: ["Substack is already working", "Don't want to migrate content", "Worried about subscriber loss"],
    preferredChannels: ["Instagram", "Twitter", "Substack"],
    quoteSnippets: ["I write to 40K people but charge nothing", "If Substack works, why switch? But... I want more features"],
  },
  {
    id: "p8", name: "Luis Morales", ageRange: "23-28", role: "Comedy/meme creator, 500K TikTok",
    incomeBand: "low", educationBand: "Some college",
    goals: ["Turn viral fame into sustainable income", "Launch merch", "Get brand deals"],
    frustrations: ["TikTok Creator Fund pays nothing", "Can't figure out merch", "Brand deals are one-time"],
    toolsCurrentlyUsed: ["TikTok", "Instagram", "CapCut"],
    buyingBehavior: "Needs to see money coming in before paying for tools",
    objections: ["Can't afford tools yet", "My audience is too young to buy", "Don't trust platforms with my content"],
    preferredChannels: ["TikTok", "Instagram", "Twitter"],
    quoteSnippets: ["I have half a million followers and $200 in my bank account", "How do creators with fewer followers make more money?"],
  },
];

export const creatorInterviews: InterviewResponse[] = creatorPersonas.map((p) => ({
  personaId: p.id,
  reactions: ["This is exactly what I need", "Looks promising but I've been burned before"],
  objections: (Array.isArray(p.objections) ? p.objections : [p.objections]).slice(0, 2),
  desiredFeatures: ["Membership tiers", "Digital product storefront", "Analytics dashboard", "Brand deal matching"],
  trustConcerns: ["Content ownership", "Platform fees", "Will my audience follow me here?"],
  buyingTriggers: ["See other creators succeeding", "Free trial", "Direct revenue increase"],
  switchingBarriers: ["Already using multiple tools", "Content migration fear", "Audience inertia"],
  transcript: [
    { question: "What's your biggest creator challenge?", answer: p.frustrations[0] },
    { question: "How do you currently make money?", answer: `Mostly ${p.toolsCurrentlyUsed[0]}` },
    { question: "Would you pay for a better monetization tool?", answer: p.incomeBand === "high" ? "Yes, if it scales my revenue" : "Only if I see immediate ROI" },
    { question: "What would make you switch?", answer: "If a creator I respect is using it successfully" },
  ],
}));

const CREATOR_DIVERSITY = [0.78, 0.84, 0.71, 0.89, 0.76, 0.82, 0.68, 0.86];
const CREATOR_REALISM   = [0.85, 0.79, 0.73, 0.91, 0.80, 0.87, 0.74, 0.82];
const CREATOR_UNIQUENESS = [0.72, 0.86, 0.68, 0.93, 0.75, 0.81, 0.70, 0.88];
const CREATOR_OVERALL   = [0.78, 0.83, 0.71, 0.91, 0.77, 0.83, 0.71, 0.85];

export const creatorScores: PersonaScore[] = creatorPersonas.map((p, i) => ({
  personaId: p.id,
  diversityScore: CREATOR_DIVERSITY[i],
  realismScore: CREATOR_REALISM[i],
  uniquenessScore: CREATOR_UNIQUENESS[i],
  overallScore: CREATOR_OVERALL[i],
}));

export const creatorInsights: InsightSummary = {
  segmentClusters: [
    {
      id: "seg_1", name: "Struggling Viral Creators",
      personaIds: ["p1", "p5", "p8"],
      sharedPains: ["High followers, low income", "Unreliable platform revenue", "No passive income"],
      sharedDesires: ["Recurring revenue", "Merch without hassle", "Financial stability"],
      avgWillingnessToPay: "Low (need to see ROI first)",
      channelPreference: ["TikTok", "Twitter", "Discord"],
    },
    {
      id: "seg_2", name: "Professional Content Businesses",
      personaIds: ["p4", "p6", "p7"],
      sharedPains: ["Scaling challenges", "Tool sprawl", "Want direct revenue"],
      sharedDesires: ["All-in-one platform", "Community features", "Team collaboration"],
      avgWillingnessToPay: "Premium ($30-99/mo)",
      channelPreference: ["LinkedIn", "Twitter", "Email"],
    },
    {
      id: "seg_3", name: "Niche Monetizers",
      personaIds: ["p2", "p3"],
      sharedPains: ["Hard to monetize niche content", "Commission burnout", "No passive income"],
      sharedDesires: ["Digital product sales", "Print-on-demand", "Brand partnerships"],
      avgWillingnessToPay: "Moderate ($10-30/mo)",
      channelPreference: ["Instagram", "Twitter", "Etsy"],
    },
  ],
  topPains: [
    "Platform ad revenue is unpredictable and declining",
    "Too many tools needed to run a creator business",
    "No easy way to sell digital products or memberships",
    "Brand deal income is inconsistent",
    "Can't scale past one person",
  ],
  topDesires: [
    "Recurring membership revenue",
    "Easy digital product storefront",
    "Analytics that show what drives revenue",
    "Brand deal matching",
    "Community tools built-in",
  ],
  topFeatureRequests: [
    "Membership tiers with Stripe integration",
    "Digital product storefront",
    "Revenue analytics dashboard",
    "Email list builder",
    "Brand deal marketplace",
  ],
  pricingInsights: [
    { tier: "Free (5% commission)", segment: "Struggling Viral", willingness: "High", sensitivity: "Only pay when I earn" },
    { tier: "$29/mo", segment: "Niche Monetizers", willingness: "Medium", sensitivity: "Need to earn $100+ first" },
    { tier: "$99/mo", segment: "Professional Businesses", willingness: "High", sensitivity: "Replaces $200+ in other tools" },
  ],
  positioningIdeas: [
    "Turn followers into customers — all in one place",
    "The monetization platform that grows with you",
    "Stop chasing brand deals, start building revenue",
  ],
  launchRecommendations: [
    "Launch on Product Hunt with creator testimonials",
    "Partner with 10 mid-tier creators (50K-200K) for case studies",
    "Offer 3 months free to first 100 creators",
    "Create 'Creator Money Map' viral content series",
    "Target creator economy Twitter and newsletters",
  ],
  messagingHooks: [
    "You have the audience. Now build the business.",
    "From likes to lifetime value",
    "Stop renting your audience, start owning your revenue",
    "Your content is worth more than ad revenue",
  ],
  objectionThemes: [
    {
      theme: "Tool Fatigue",
      frequency: 6,
      severity: "high",
      segments: ["Struggling Viral", "Professional Businesses"],
      sampleQuotes: ["I already use 5 tools", "I can't migrate my entire setup"],
    },
    {
      theme: "Audience Migration Fear",
      frequency: 4,
      severity: "medium",
      segments: ["Niche Monetizers", "Professional Businesses"],
      sampleQuotes: ["Will my followers follow me to a new platform?", "Substack works, why switch?"],
    },
  ],
};

export const creatorBrief: LaunchBrief = {
  targetUsers: "Content creators with 10K-500K followers who struggle to monetize their audience beyond platform ad revenue. Focus on YouTubers, TikTokers, newsletter writers, and niche educators who want to build sustainable creator businesses.",
  problemSolutionFit: "Creators have audiences but no easy way to monetize them directly. Ad revenue is unreliable, brand deals are inconsistent, and building a storefront requires multiple expensive tools. This platform consolidates memberships, digital products, analytics, and brand matching in one place.",
  riskyAssumptions: [
    "Creators will migrate from established tools (Teachable, Substack, Shopify)",
    "Mid-tier creators (50K-200K) are willing to pay $30-99/mo",
    "Audiences will follow creators to a new platform",
    "Brand deal marketplace will attract enough brands",
  ],
  messagingRecommendations: [
    "Lead with revenue: 'You have the audience. Now build the business.'",
    "Use case studies: 'Creator X went from $500/mo to $5K/mo in 90 days'",
    "Address tool fatigue: 'One platform, not five'",
    "Emphasize ownership: 'Stop renting your audience'",
  ],
  gtmSuggestions: [
    "Launch on Product Hunt with 10 creator testimonials",
    "Partner with creator economy newsletters (Creator Economy, Morning Brew)",
    "Offer 3 months free to first 100 qualified creators",
    "Create 'Creator Money Map' viral content series",
    "Sponsor creator meetups at VidCon and VidSummit",
  ],
  mvpFeaturePriority: [
    "Membership tiers with Stripe integration",
    "Digital product storefront",
    "Revenue analytics dashboard",
    "Email list builder",
    "Brand deal marketplace (Phase 2)",
  ],
};
