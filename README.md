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
   `src/index.ts` as a re-export barrel (and its smoke test in sync).
3. Install and verify:

   ```sh
   bun install
   bun run check    # format + lint
   bun test         # or: bun run coverage
   bun run build    # emits dist/
   ```

**Bun is the dev toolchain** — installer (`bun.lock`, pinned by `.bun-version`),
script runner, and test runner. The *published artifact* still targets Node
(`engines.node`, plain ESM + `.d.ts` in `dist/`); bun is how the repo is
developed, not a runtime dependency of consumers.

## Scripts

| Script | What it does |
| --- | --- |
| `bun run build` | Type-check-emit to `dist/` (`tsconfig.build.json`) |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run check` / `check:ci` | Biome: format + lint + import organization |
| `bun run lint:fix` | Biome, applying safe fixes |
| `bun test` / `test:watch` | bun's built-in test runner |
| `bun run coverage` | `bun test --coverage` with thresholds (`bunfig.toml`) |
| `bun run audit` | `bun audit` — fail on high/critical advisories |
| `bun run package-check` | publint + are-the-types-wrong on the built package |
| `bun run lint:deps` | knip dead-code / unused-dependency scan |
| `bun run metrics` | scc code metrics (needs scc on PATH) |

## What's in the box

The template is assembled as a stack of additive layers, each landed as its own PR
so it can be reviewed and adopted independently:

1. **Scaffold** — package manifest, TypeScript build, minimal `src/`.
2. **Format & lint** — Biome (`biome.jsonc`).
3. **Test & coverage** — `bun test` with a coverage floor (`bunfig.toml`).
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
