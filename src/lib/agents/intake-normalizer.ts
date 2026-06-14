import { ProductInput } from "@/lib/schemas";

const MARKET_KEYWORDS: Record<string, string[]> = {
  "US": ["us", "united states", "america", "american", "usa"],
  "UK": ["uk", "united kingdom", "britain", "british", "england"],
  "Europe": ["europe", "european", "eu"],
  "India": ["india", "indian", "bharat"],
  "Global": ["global", "worldwide", "international", "everywhere"],
  "Africa": ["africa", "african", "nigeria", "kenya", "south africa"],
  "Southeast Asia": ["southeast asia", "asia pacific", "apac", "indonesia", "vietnam", "thailand"],
  "Latin America": ["latin america", "latam", "brazil", "mexico", "argentina"],
  "East Asia": ["japan", "korea", "china", "chinese", "japanese", "korean", "taiwan"],
  "Middle East": ["middle east", "uae", "saudi", "dubai"],
  "Canada": ["canada", "canadian"],
  "Australia": ["australia", "australian", "nz"],
};

const AUDIENCE_KEYWORDS: Record<string, string[]> = {
  "Students": ["student", "college", "university", "school", "academic", "study", "learn", "tutor", "education"],
  "Professionals": ["professional", "enterprise", "b2b", "business", "corporate", "workplace", "employee"],
  "Small businesses": ["small business", "smb", "startup", "founder", "entrepreneur", "solopreneur"],
  "Content creators": ["creator", "influencer", "youtuber", "tiktok", "streamer", "blogger", "podcaster"],
  "Consumers": ["consumer", "end user", "individual", "personal", "family", "parent", "teen", "elderly"],
  "Developers": ["developer", "engineer", "programmer", "technical", "devops", "data scientist"],
  "Healthcare": ["doctor", "patient", "healthcare", "medical", "clinic", "hospital", "therapist"],
  "Gamers": ["gamer", "gaming", "esports", "player", "mobile gaming"],
};

const PRICING_PATTERNS: Record<string, string> = {
  "freemium": "freemium",
  "free tier": "freemium",
  "subscription": "subscription",
  "monthly": "subscription",
  "yearly": "subscription",
  "annual": "subscription",
  "one-time": "one-time purchase",
  "lifetime": "one-time purchase",
  "pay per": "usage-based",
  "usage": "usage-based",
  "enterprise": "enterprise pricing",
  "custom pricing": "enterprise pricing",
  "free": "free",
  "open source": "free / open source",
};

const STAGE_SYNONYMS: Record<string, string> = {
  "idea": "Idea / Concept",
  "concept": "Idea / Concept",
  "brainstorm": "Idea / Concept",
  "early prototype": "Early prototype",
  "prototype": "Early prototype",
  "mvp": "MVP ready for beta testing",
  "beta": "MVP ready for beta testing",
  "beta testing": "MVP ready for beta testing",
  "launched": "MVP with first paying customers",
  "paying customers": "MVP with first paying customers",
  "early revenue": "MVP with first paying customers",
  "pmf": "Post-MVP, seeking product-market fit",
  "product-market fit": "Post-MVP, seeking product-market fit",
  "scaling": "Growth stage",
  "growth": "Growth stage",
  "established": "Growth stage",
};

function detectMarket(text: string): string {
  const lower = text.toLowerCase();
  const detected: string[] = [];
  for (const [market, keywords] of Object.entries(MARKET_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      detected.push(market);
    }
  }
  return detected.length > 0 ? detected.join(", ") : "Global";
}

function detectAudience(text: string): string {
  const lower = text.toLowerCase();
  const detected: string[] = [];
  for (const [audience, keywords] of Object.entries(AUDIENCE_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      detected.push(audience);
    }
  }
  return detected.length > 0 ? detected[0] : "";
}

function normalizePricing(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const [pattern, normalized] of Object.entries(PRICING_PATTERNS)) {
    if (lower.includes(pattern)) return normalized;
  }
  return text.trim();
}

function normalizeStage(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const [pattern, normalized] of Object.entries(STAGE_SYNONYMS)) {
    if (lower.includes(pattern)) return normalized;
  }
  return text.trim();
}

function normalizeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

function cleanWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export async function normalizeIntake(input: ProductInput): Promise<ProductInput> {
  const idea = cleanWhitespace(input.idea);
  const description = cleanWhitespace(input.description);

  const market = input.market.trim() || detectMarket(`${idea} ${description}`);

  let audience = input.audienceType.trim();
  if (!audience) {
    audience = detectAudience(`${idea} ${description}`);
  }

  let pricing = input.pricingModel.trim();
  if (pricing) {
    pricing = normalizePricing(pricing);
  }

  let stage = input.stage.trim();
  if (stage) {
    stage = normalizeStage(stage);
  }

  return {
    idea,
    description,
    audienceType: audience,
    market,
    pricingModel: pricing,
    stage,
    website: normalizeUrl(input.website),
  };
}
