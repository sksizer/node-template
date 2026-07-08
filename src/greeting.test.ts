import { describe, expect, it } from "bun:test";
import { greet } from "./greeting.js";

// Peer unit test for greeting.ts. A peer test reads first as documentation of the
// module's contract: lead with the plain happy path — given this input, you get
// exactly this output — then cover the branches.
describe("greet", () => {
  it("greets with the default opener", () => {
    expect(greet("world")).toBe("Hello, world!");
  });

  it("uses a custom greeting when one is provided", () => {
    expect(greet("world", { greeting: "Hi" })).toBe("Hi, world!");
  });
});
