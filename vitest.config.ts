import { defineConfig } from "vitest/config";

// Unit tests are peer files: a module's test sits beside it as `<module>.test.ts`
// (e.g. src/greeting.ts <-> src/greeting.test.ts). See CONVENTIONS.md ("Tests").
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      // `all: true` + an explicit include means untested source files surface at
      // 0% instead of being silently omitted — honest totals.
      all: true,
      include: ["src/**/*.ts"],
      // Nothing to cover in these: *.test.ts are the tests themselves; index.ts
      // files are re-export-only barrels (CONVENTIONS.md) with no logic.
      exclude: ["src/**/*.test.ts", "src/**/index.ts", "**/*.d.ts"],
      reporter: ["text-summary", "html", "json-summary", "lcov"],
      reportsDirectory: "coverage",
      // Floors that fail the build on a coverage regression. Set a notch under
      // your real baseline so the gate catches drops without flaking, and
      // ratchet upward as coverage grows.
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
    },
  },
});
