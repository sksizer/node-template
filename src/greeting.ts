/**
 * A tiny example module — the shape every feature module in this template takes:
 * one responsibility, named exports, and (once the test layer lands) a peer
 * `greeting.test.ts` sitting beside it. Replace it with your own code.
 */

export interface GreetOptions {
  /** Word to open with instead of the default "Hello". */
  greeting?: string;
}

/**
 * Build a greeting for `name`.
 *
 * @example
 * greet("world");                     // "Hello, world!"
 * greet("world", { greeting: "Hi" }); // "Hi, world!"
 */
export function greet(name: string, options: GreetOptions = {}): string {
  const greeting = options.greeting ?? "Hello";
  return `${greeting}, ${name}!`;
}
