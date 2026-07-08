import { describe, expect, it } from "bun:test";
import * as barrel from "./index.js";

// Barrel smoke test. Two jobs:
// 1. Assert the public surface: every intended export is present, so an
//    accidental removal from the barrel fails a test, not a consumer.
// 2. Keep coverage totals honest: bun's coverage only counts files that were
//    loaded during the run. Importing the barrel loads every module it
//    re-exports, so an untested module surfaces at 0% instead of being
//    silently omitted from the report.
describe("public surface", () => {
  it("exports the library API", () => {
    expect(Object.keys(barrel).sort()).toEqual(["greet"]);
  });
});
