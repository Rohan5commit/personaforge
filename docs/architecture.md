# Architecture

## System Overview

PersonaForge is a multi-agent AI system that generates synthetic customer personas, simulates interviews, and extracts actionable product insights. It uses NVIDIA NIM for all AI inference with a modular pipeline architecture.

## Agent Pipeline

```
User Input → [Intake Normalizer] → [Persona Generator] → [Interview Simulator] → [Critic/Evaluator] → [Insight Synthesizer] → [Launch Brief Formatter] → Output
                                         ↑                                              |
                                         └────────── Retry Loop (max 2) ────────────────┘
```

### 1. Intake Normalizer (Deterministic)
- **Input:** Raw product input from user
- **Output:** Normalized `ProductInput`
- **Role:** Standardizes strings, validates structure

### 2. Persona Generator (Model-driven)
- **Input:** Normalized `ProductInput`
- **Output:** 8 `Persona` objects
- **Role:** Creates diverse customer profiles with structured JSON output via NIM's `guided_json`

### 3. Interview Simulator (Model-driven)
- **Input:** Personas + ProductInput
- **Output:** `InterviewResponse[]` per persona
- **Role:** Simulates authentic interviews with objections, features, trust concerns

### 4. Critic / Evaluator (Model-driven)
- **Input:** Personas + Interviews
- **Output:** `PersonaScore[]` + retry recommendation
- **Role:** Scores diversity (0-1), realism (0-1), uniqueness (0-1). Triggers regeneration if overall diversity < 0.6

### 5. Insight Synthesizer (Model-driven)
- **Input:** Personas + Interviews + Scores
- **Output:** `InsightSummary`
- **Role:** Clusters ICP segments, extracts pains, desires, features, pricing, positioning, messaging

### 6. Launch Brief Formatter (Model-driven)
- **Input:** ProductInput + InsightSummary
- **Output:** `LaunchBrief`
- **Role:** Produces concise actionable strategy document

## Critique/Refinement Loop

The Critic agent evaluates persona quality after generation. If `needsRetry` is true (overall diversity < 0.6), personas are regenerated with feedback context. This loop runs max 2 times to prevent infinite regeneration.

```
Generate Personas → Evaluate → [if weak] → Regenerate → Re-evaluate → Continue
```

## Output Synthesis

All agent outputs are validated against Zod schemas before passing downstream. Segment clustering uses deterministic income-band grouping with shared trait extraction, not model-driven clustering.

## Deterministic vs Model-Driven

| Component | Type | Reason |
|-----------|------|--------|
| Intake Normalizer | Deterministic | String processing, no creativity needed |
| Persona Generator | Model-driven | Needs creative diversity |
| Interview Simulator | Model-driven | Needs authentic conversation |
| Critic/Evaluator | Model-driven | Needs qualitative judgment |
| Insight Synthesizer | Model-driven | Needs strategic analysis |
| Launch Brief Formatter | Model-driven | Needs actionable writing |
| Segment Clustering | Deterministic | Reproducible grouping logic |
| Diversity Scoring | Deterministic | Mathematical computation |
