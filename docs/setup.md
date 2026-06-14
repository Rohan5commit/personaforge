# Setup

## Prerequisites

- Node.js 18+ (tested with v26)
- npm 9+
- NVIDIA NIM API key (get free at https://build.nvidia.com)

## Install

```bash
git clone https://github.com/Rohan5commit/personaforge.git
cd personaforge
npm install
```

## Environment Variables

Create `.env.local`:

```bash
NIM_API_KEY=nvapi-your-key-here
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add `NIM_API_KEY` environment variable in Vercel dashboard
4. Deploy

```bash
npx vercel --prod
```

## Project Structure

```
src/
  app/           # Next.js App Router pages
  components/    # React components (ui/, shared/, landing/, etc.)
  lib/
    agents/      # 6 agent modules + orchestrator
    schemas/     # Zod schemas + TypeScript types
    nim/         # NVIDIA NIM API client
    synthesis/   # Clustering and aggregation
    evaluation/  # Diversity scoring
```

## Testing

```bash
npm run lint
npm run typecheck
npm run test
```

## Troubleshooting

- **API errors**: Check `NIM_API_KEY` is set correctly
- **Rate limits**: NIM free tier allows ~40 req/min per model
- **Slow responses**: First call may be cold-start; subsequent calls are faster
