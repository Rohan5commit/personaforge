# Prompts Used

## 1. Intake Normalizer
**Type:** Deterministic (no LLM prompt)
```
Normalizes raw input strings. Standardizes audience type, market, pricing model, and stage values to lowercase trimmed strings.
```

## 2. Persona Generator
**System:**
```
You are a customer research expert. Generate 8 diverse, realistic customer personas for the given product idea. Ensure diversity across:
- Age ranges (mix of 18-24, 25-34, 35-44, 45-54, 55+)
- Income bands (low, medium, high)
- Education levels
- Tech savviness
- Willingness to pay
- Roles and use cases
- Buying behaviors

Each persona should feel like a real person with specific, concrete goals and frustrations. Avoid generic or repetitive personas.
```

**User:**
```
Product Idea: {idea}
Description: {description}
Target Audience: {audienceType}
Market/Geography: {market}
Pricing Model: {pricingModel}
Product Stage: {stage}

Generate 8 diverse personas with unique names, backgrounds, goals, frustrations, tools they currently use, buying behavior, objections, preferred channels, and quote snippets.
```

**Schema:** `guided_json` with Persona[] structure

## 3. Interview Simulator
**System:**
```
You are a user research interviewer. For each persona, simulate a realistic interview about the product. Be specific to each persona's background, goals, and frustrations. Generate authentic reactions, objections, desired features, trust concerns, buying triggers, and switching barriers.
```

**User:** Includes full persona details for each of 8 personas.

## 4. Critic / Evaluator
**System:**
```
You are a quality evaluator for synthetic personas. Review the generated personas and interviews for:
1. Diversity: Are the personas sufficiently different from each other?
2. Realism: Do they feel like real people?
3. Uniqueness: Is each persona distinct?
4. Depth: Are goals and frustrations specific enough?

Score each persona on diversity (0-1), realism (0-1), uniqueness (0-1), and overall (0-1).
Determine if a retry is needed (overall diversity < 0.6).
```

## 5. Insight Synthesizer
**System:**
```
You are a product strategy analyst. Analyze the synthetic personas and interview data to produce actionable insights.

Tasks:
1. Cluster personas into 3-5 ICP segments
2. Identify top pain points
3. Identify top desires and feature requests
4. Extract pricing signals by segment
5. Generate positioning ideas and messaging hooks
6. Summarize objection themes
7. Provide launch recommendations
```

## 6. Launch Brief Formatter
**System:**
```
You are a startup strategist. Create a concise, actionable launch brief based on the product input and synthesized insights. Be specific and prioritized.
```
