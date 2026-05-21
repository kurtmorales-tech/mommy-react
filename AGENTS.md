# mommy-react

## Toolchain

- **Package manager:** Bun (bun.lock). Use `bun` not npm/pnpm.
- **Build:** `bun run build` runs `tsc` (typecheck) then `vite build`. Type errors block production builds.
- **Dev server:** `bun run dev` (Vite defaults, no config file).
- **Preview:** `bun run preview` (built output).
- **No test framework, no linter, no formatter configured.**

## TypeScript

- `verbatimModuleSyntax: true` — use `import type` for type-only imports.
- `strict: true`, `noUnusedLocals`, `noUnusedParameters`.
- `noEmit: true` (Vite handles bundling).
- `jsx: "react-jsx"` — no need to import React for JSX.

## Code layout

- **Entrypoint:** `index.html` → `src/main.tsx`.
- `src/` contains both `.tsx`/`.ts` source files AND stale `.js` files (`main.js`, `App.js`, `counter.js`). The `.js` files are dead code — do not edit them.
- `src/style.css.d.ts` is a CSS module type declaration (allows `import './style.css'`).
- Single-page birthday card app (not a multi-route SPA). No routing library.

## Assets

- Gallery images live in `public/images/` and are referenced as `/images/<filename>`.
- Corner brand assets: `public/favicon.svg`, `public/icons.svg`.
