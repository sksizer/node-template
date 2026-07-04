// Barrel: re-exports only, no logic of its own. Every public entry point of the
// library is surfaced from here. See CONVENTIONS.md ("Modules & barrels").
export { greet } from "./greeting.js";
export type { GreetOptions } from "./greeting.js";
