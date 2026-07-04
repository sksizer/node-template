# node-template

A reference template for a single-package Node/TypeScript **library** published to
npm. One `src/`, one publishable package — not a monorepo.

It captures a working set of code-management conventions — build, type-checking,
formatting, linting, testing, coverage, dependency hygiene, publish hygiene, and CI
— as a base you can clone and adapt.

## Using it

1. Clone or use as a GitHub template, then rename: `name` in `package.json`, the
   title here, and the copyright holder in `LICENSE`.
2. Replace `src/greeting.ts` (and its peer test) with your own code. Keep
   `src/index.ts` as a re-export barrel.
3. Install and verify:

   ```sh
   npm install
   npm run check    # format + lint
   npm test         # or: npm run coverage
   npm run build    # emits dist/
   ```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run build` | Type-check-emit to `dist/` (`tsconfig.build.json`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` / `check:ci` | Biome: format + lint + import organization |
| `npm run lint:fix` | Biome, applying safe fixes |
| `npm test` / `test:watch` | Vitest |
| `npm run coverage` | Vitest with coverage thresholds |
| `npm run audit` | Fail on high/critical advisories |
| `npm run package-check` | publint + are-the-types-wrong on the built package |
| `npm run lint:deps` | knip dead-code / unused-dependency scan |
| `npm run metrics` | scc code metrics (needs scc on PATH) |

## What's in the box

The template is assembled as a stack of additive layers, each landed as its own PR
so it can be reviewed and adopted independently:

1. **Scaffold** — package manifest, TypeScript build, minimal `src/`.
2. **Format & lint** — Biome (`biome.jsonc`).
3. **Test & coverage** — Vitest with a coverage floor (`vitest.config.ts`).
4. **CI** — the enforced build/typecheck/lint/test gate (`.github/workflows/ci.yml`).
5. **Dependency hygiene** — Dependabot + vulnerability audit.
6. **Publish hygiene** — `publint` + `are-the-types-wrong`.
7. **Dead-code** — knip (report-only).
8. **Code metrics** — scc (report-only).
9. **Conventions** — the module/test/import rules the code follows.

## Conventions

The structural and quality rules — modules & barrels, peer tests, coverage
ratcheting, the complexity gate, packaging — are documented in
[CONVENTIONS.md](./CONVENTIONS.md).
