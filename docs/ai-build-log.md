# AI Build Log

## Development Approach

This project was built using AI-assisted development with Claude (via opencode/Codex CLI). The AI was used for:

1. **Architecture Design** — Planning the 6-agent pipeline, data flow, and schema structure
2. **Code Generation** — Writing all TypeScript code, React components, agent prompts, and API routes
3. **Schema Design** — Creating Zod schemas for type safety across all agent outputs
4. **Prompt Engineering** — Crafting system prompts for each specialized agent
5. **Documentation** — Generating architecture docs, demo scripts, and setup guides

## Key AI-Assisted Decisions

- **NVIDIA NIM over OpenAI**: Used NIM's `guided_json` structured output for reliable JSON parsing across all agents
- **In-memory state**: Avoided database dependency for hackathon speed; AgentRun state stored in a Map
- **Deterministic clustering**: Used programmatic income-band grouping instead of model-driven clustering for reproducibility
- **Zod schemas**: Every agent output validated with Zod before passing downstream
- **Retry loop**: Critic agent triggers max 2 persona regenerations if diversity score < 0.6

## Build Timeline

| Phase | Description | Approach |
|-------|-------------|----------|
| 1 | Project scaffolding | AI-generated setup commands + manual execution |
| 2 | Data models | AI-designed Zod schemas with TypeScript types |
| 3 | NIM client | AI-generated OpenAI-compatible client with structured output |
| 4 | Agent pipeline | AI-written prompts + schema-driven structured output |
| 5 | UI pages | AI-generated React/Next.js components with shadcn/ui |
| 6 | Documentation | AI-generated all docs and README |

## Models Used

- **NVIDIA NIM**: `meta/llama-3.3-70b-instruct` for all agent inference
- **Claude (Anthropic)**: For code generation and architecture design

## Lessons Learned

- Structured output (`guided_json`) is critical for multi-agent pipelines — free-text JSON parsing is unreliable
- Critique loops add meaningful quality improvement but increase latency significantly
- In-memory state works for hackathon demos but needs Redis/DB for production
- Persona diversity requires explicit diversity instructions and scoring criteria
