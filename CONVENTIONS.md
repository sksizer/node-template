# Conventions

The structural and quality rules this template follows. They are deliberately
small: enough to keep a single-package library consistent as it grows, without
ceremony. Code and tests should follow them; the tooling enforces the ones that
can be enforced.

## Modules & barrels

- **Factor modules by functionality** — one responsibility per file. `greeting.ts`
  does greetings; a new concern gets a new file.
- **`index.ts` is a barrel only.** It re-exports the public surface; it holds no
  logic of its own. See `src/index.ts`.
- A module **directory** with an `index.ts` therefore implies several broken-out
  modules sitting beside that barrel. If a directory would contain only `index.ts`
  plus logic, split the logic into named sibling modules and let `index.ts`
  re-export them.
- **Imports flow one way.** If you introduce layers (e.g. `cli/` over a core
  library), lower layers never import higher ones — the core never reaches up into
  the CLI. Keep the dependency direction acyclic and inward.
- Use **`.js` import specifiers** for local modules (`./greeting.js`), per NodeNext
  resolution, and `import type` for type-only imports (`verbatimModuleSyntax` is
  on, so the distinction is required).

## Tests

- **Unit tests are peer files.** A module's test sits next to it as
  `<module>.test.ts` — `src/greeting.ts` ↔ `src/greeting.test.ts`. The runner is
  bun's built-in `bun test` (`import { describe, expect, it } from "bun:test"`),
  scoped to `src/` via `test.root` in `bunfig.toml`.
- **Tests express the contract, not just edge cases.** A peer test should read
  first as documentation: lead with a few small, plain input→output cases that make
  the module's purpose obvious at a glance — *given this input, you get exactly
  this* — then cover the branches. `src/greeting.test.ts` is the model.
- **Every module with a meaningful contract gets a peer test**, even a thin one.
- **The barrel gets a smoke test** (`src/index.test.ts`): import the barrel,
  assert the sorted export names. It pins the public surface (removing an export
  fails a test before it fails a consumer) and it makes coverage honest — see
  Coverage below.
- Tests never ship: `tsconfig.build.json` excludes `src/**/*.test.ts`, so
  co-located tests stay out of `dist/`. The build also drops the `bun` types
  (`types: ["node"]`) so nothing bun-specific can leak into `dist/`.
- **Prefer peer data files over inlined blobs.** If a test needs a fixture
  (a sample document, a config), put it in a sibling file and load it verbatim
  rather than inlining a large string — the fixture reads as real data and byte
  offsets stay exact.
- **Gate live/integration tests behind an env var.** Tests that hit a network,
  spawn a real external tool, or spend money live in peer files like the rest, but
  the whole suite is wrapped in `describe.if(process.env.LIVE === "1")` (or an
  equivalent early return). A plain `bun test` — locally and in CI — stays fast,
  offline, and deterministic; `LIVE=1 bun test` opts in explicitly.

## Coverage

- Bun's coverage counts only files that were **loaded** during the test run — an
  untested module that nothing imports would be silently missing from the report.
  The barrel smoke test closes that hole: importing `src/index.ts` loads every
  module the barrel re-exports, so unloaded-and-untested code surfaces at 0%
  instead of vanishing — **honest totals**, provided the barrel stays complete.
- Bun reports **function and line coverage only** (no branch coverage). If a
  module's correctness hangs on dense branching, cover the branches with explicit
  test cases rather than trusting the percentage.
- The thresholds in `bunfig.toml` are **floors that fail the build** on a
  regression. Set them a notch under your real baseline so they catch drops without
  flaking, and **ratchet them upward** as coverage grows.

## Complexity

- `biome.jsonc` opts into `noExcessiveCognitiveComplexity` at `error` with a
  per-function ceiling (default 15). It keeps individual functions small.
- Raising the ceiling is allowed but is a **deliberate decision** — treat a bump as
  a change worth its own commit and reasoning, not a reflex to make CI pass.

## Packaging & publishing

- The package is **ESM-only** (`type: module`), with a typed `exports` map,
  `files: ["dist"]`, and `sideEffects: false`.
- `package-check` (publint + are-the-types-wrong) verifies the built package's
  packaging and that its `.d.ts` resolve for consumers. Run it before publishing;
  CI runs it on every PR.
- `prepublishOnly` builds `dist/` so a publish always ships fresh output.

## Dependencies & supply chain

- **Pin `devDependencies` to exact versions** (no `^`). With the committed
  `bun.lock` this makes a plain `bun install` reproduce the exact tree
  `bun install --frozen-lockfile` would, and it closes the window where a fresh
  install could drift onto a newer, possibly-compromised patch. Every version move
  then happens through a reviewed Dependabot PR.
- **Range runtime `dependencies` (`^x.y.z`), do not pin them.** This is a
  *library* — exact-pinning its runtime deps forces version conflicts and
  duplicate installs on consumers. Pin apps and dev tooling; range a library's
  deps. (The template currently ships zero runtime dependencies.)
- **Dependabot cooldown** delays adopting a just-published version until it has
  been public for a few days (see `.github/dependabot.yml`), so a malicious
  release has time to be caught before it reaches a PR. Together with the lockfile
  and the `audit` gate, that's the supply-chain posture: pinned installs, delayed
  adoption, advisory scanning.

## Scripts & gates

Every gate is a plain `package.json` script, so what CI runs is exactly what you
can run locally.

| Script | What it does | Enforced in CI |
| --- | --- | --- |
| `build` | `tsc -p tsconfig.build.json` → `dist/` | CI |
| `typecheck` | `tsc --noEmit` | CI |
| `check` / `check:ci` | Biome format + lint + import organization | CI (`check:ci`) |
| `lint:fix` | Biome, applying safe fixes | — |
| `test` / `coverage` | `bun test`; `coverage` enforces `bunfig.toml` thresholds | CI (`coverage`) |
| `audit` | `bun audit --audit-level=high` | Audit workflow |
| `package-check` | build → publint → attw | Package Quality workflow |
| `lint:deps` | knip dead-code / unused-dependency scan | Knip workflow (report-only) |
| `metrics` | scc code metrics (needs scc on PATH) | Code Metrics workflow (report-only) |

Workflows: **CI** (core blocking gate), **Audit**, **Package Quality** (blocking),
**Knip** and **Code Metrics** (report-only), plus **Dependabot** for monthly
dependency and action updates (with a supply-chain cooldown).
