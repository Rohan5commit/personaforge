# Pitch

## One-liner
PersonaForge uses agentic AI to generate realistic customer personas and feedback loops, then converts them into product, marketing, and launch insights.

## Problem
Startups waste weeks and thousands of dollars on manual user research before validating product ideas. Most early-stage founders skip user research entirely, building products nobody wants.

## Solution
PersonaForge autonomously generates synthetic but realistic customer personas, simulates interviews with each persona, evaluates quality with a critic agent, and extracts actionable insights — ICP segments, pricing signals, messaging hooks, and a launch brief — all in under 3 minutes.

## Why It's GenAI-Native
This isn't a chatbot or a wrapper around a single prompt. PersonaForge uses a 6-agent pipeline where each agent has a specialized role, structured JSON output, and a critique/refinement loop. The critic agent scores persona diversity and triggers regeneration when quality is weak. Every output is validated against Zod schemas.

## Tech Stack
- Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui
- NVIDIA NIM (meta/llama-3.3-70b-instruct) for all AI inference
- Modular agent pipeline with structured output
- Deterministic clustering + model-driven synthesis

## Demo Flow
1. User describes a product idea (or picks a preset)
2. 6 agents run in sequence with live progress
3. Dashboard shows segments, pains, desires, pricing, objections
4. Persona explorer shows detailed profiles with interview transcripts
5. Launch brief provides actionable strategy

## Why This Wins
- **Clearly GenAI-native**: Every feature requires generative AI
- **Clearly agentic**: 6 agents with a critique loop, not one prompt
- **Useful**: Solves a real problem for founders and product builders
- **Visually demoable**: Live progress, dashboards, persona cards
- **Fast to understand**: Idea → Personas → Insights in 3 minutes
- **Technical enough**: Shows orchestration, schema validation, retry logic
