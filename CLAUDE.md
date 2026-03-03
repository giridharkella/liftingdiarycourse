# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test framework is configured yet.

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (configured via PostCSS)

## Architecture

This is a fresh Next.js App Router project. All routes and layouts live under `src/app/`. The entry page is `src/app/page.tsx` and the root layout is `src/app/layout.tsx`.
