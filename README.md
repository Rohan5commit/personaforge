# PersonaForge

**Agentic AI platform for generating and stress-testing synthetic customer personas, conversations, and product feedback.**

> "PersonaForge uses agentic AI to generate realistic customer personas and feedback loops, then converts them into product, marketing, and launch insights."

## Problem

Startups waste weeks and thousands of dollars on manual user research before validating product ideas. Most early-stage founders skip user research entirely, building products nobody wants.

## Solution

PersonaForge autonomously generates synthetic but realistic customer personas, simulates interviews with each persona, evaluates quality with a critic agent, and extracts actionable insights — ICP segments, pricing signals, messaging hooks, and a launch brief — all in under 3 minutes.

## How It Works

### Agent Pipeline

1. **Intake Normalizer** — Processes and normalizes user input
2. **Persona Generator** — Creates 8 diverse customer profiles with structured output
3. **Interview Simulator** — Simulates authentic interviews for each persona
4. **Critic / Evaluator** — Scores quality and triggers retry if diversity is weak
5. **Insight Synthesizer** — Clusters segments and extracts actionable insights
6. **Launch Brief Formatter** — Produces concise strategy document

### Critique Loop

The Critic agent evaluates persona diversity after generation. If the overall diversity score falls below 0.6, personas are regenerated — up to 2 retries. This self-improving loop ensures quality without human intervention.

### Structured Output

Every agent outputs validated JSON matching a Zod schema. This prevents hallucination cascading and enables programmatic quality checks between agents.

## Tech Stack

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS v4, shadcn/ui
- **AI Inference:** NVIDIA NIM (meta/llama-3.3-70b-instruct)
- **Structured Output:** NIM `guided_json` with Zod validation
- **Deployment:** Vercel

## Why This Is Truly GenAI + Agentic

This is not a chatbot or a single-prompt wrapper. It uses:

- **6 specialized agents** with distinct roles and prompts
- **A critique/refinement loop** where one agent evaluates and triggers regeneration
- **Structured data flow** between agents via validated JSON schemas
- **Deterministic logic** (clustering, scoring) combined with model-driven analysis
- **Real orchestration** — agents run sequentially with data dependencies

## Setup

### Prerequisites

- Node.js 18+
- NVIDIA NIM API key (free at https://build.nvidia.com)

### Install

```bash
git clone https://github.com/Rohan5commit/personaforge.git
cd personaforge
npm install
```

### Environment Variables

Create `.env.local`:

```bash
NIM_API_KEY=nvapi-your-key-here
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Flow

1. Land on homepage → understand the product instantly
2. Click "Try Demo" → product intake page
3. Select a demo preset (AI Study Assistant, Fintech, Telemedicine, Creator Tools)
4. Click "Generate" → watch 6 agents run in sequence
5. View Insights Dashboard → segments, pains, desires, pricing, objections
6. Explore Personas → detailed profiles with interview transcripts
7. Read Launch Brief → actionable strategy document

## Env Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NIM_API_KEY` | NVIDIA NIM API key | Yes |

## Limitations

- In-memory state (runs lost on server restart)
- ~2-3 minute pipeline execution time
- Quality depends on NIM model output
- No persistence layer (designed for hackathon demo)
- Free tier NIM has ~40 req/min limit

## Future Work

- PostgreSQL/Redis for persistent run storage
- Streaming progress via Server-Sent Events
- Multi-model support (different models per agent)
- Export to PDF/Notion
- Team collaboration features
- Historical run comparison
- A/B testing of persona sets
- Integration with real user research tools

## Documentation

- [Architecture](docs/architecture.md) — System design and agent pipeline
- [Demo Script](docs/demo-script.md) — 2-4 minute demo narration
- [Pitch](docs/pitch.md) — Judge-facing pitch
- [Prompts Used](docs/prompts-used.md) — Key agent prompts
- [AI Build Log](docs/ai-build-log.md) — Development record
- [Setup](docs/setup.md) — Installation and deployment
- [Judging Hook](docs/judging-hook.md) — Why this scores well
- [Credits](docs/credits.md) — Tools and frameworks

## License

MIT
