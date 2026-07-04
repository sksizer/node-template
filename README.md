# node-template

A reference template for a single-package Node/TypeScript **library** published to npm.

It captures a set of code-management conventions — build, type-checking, formatting,
linting, testing, coverage, dependency hygiene, publish hygiene, and CI — as a base you
can clone and adapt. Not a monorepo: one `src/`, one publishable package.

The template is assembled as a stack of additive layers, each landing as its own PR so it
can be reviewed and adopted independently:

1. **Scaffold** — package manifest, TypeScript build, minimal `src/`.
2. **Format & lint** — Biome.
3. **Test & coverage** — Vitest with a coverage floor.
4. **CI** — the enforced build/typecheck/lint/test gate.
5. **Dependency hygiene** — Dependabot + vulnerability audit.
6. **Publish hygiene** — `publint` + `are-the-types-wrong`.
7. **Dead-code** — knip (report-only).
8. **Code metrics** — scc (report-only).
9. **Conventions** — the module/test/import rules the code follows.

This README grows as the layers land.
