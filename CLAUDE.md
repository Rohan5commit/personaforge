# PersonaForge

Agentic AI platform that generates synthetic customer personas, simulates interviews, and extracts product insights.

## Stack
- Next.js 16, React, TypeScript, Tailwind CSS v4, shadcn/ui
- AI inference: NVIDIA NIM (`meta/llama-3.3-70b-instruct`)
- Deployment: Vercel

## Architecture
6-agent pipeline in `src/lib/agents/`:
1. **Intake Normalizer** — deterministic string processing, no LLM
2. **Persona Generator** — NIM structured output → 8 diverse personas
3. **Interview Simulator** — NIM generates reactions, objections, transcripts per persona
4. **Critic/Evaluator** — NIM scores diversity/realism, triggers retry if < 0.6
5. **Insight Synthesizer** — deterministic clustering + NIM extraction
6. **Launch Brief Formatter** — NIM produces actionable launch document

Critique loop: up to 2 retries if persona diversity is low.

## Key Conventions
- All LLM calls go through `src/lib/nim/client.ts` using `nvext.guided_json`
- Data types defined in `src/lib/schemas/index.ts` with Zod
- Server actions in `src/app/actions.ts` validate input before any agent runs
- Demo presets use pre-cached data (no NIM calls) for fast demos
- All result data persisted in localStorage (no server-side state)

## Running
```bash
npm run dev     # Development server
npm run build   # Production build
npm run lint    # ESLint
npx vitest run  # Tests
```

## Environment
- `NIM_API_KEY` — required, NVIDIA NIM API key (see `.env.example`)
