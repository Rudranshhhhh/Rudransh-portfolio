// Phoenix self-healing test — deliberate type error
// This file intentionally assigns a string to a number variable.
// Phoenix will detect the typecheck failure, diagnose this file,
// generate a fix (change "hello world" to a number or fix the type),
// validate it, and open a PR.

export const buggyValue: number = "hello world";  // ← type error: string → number

export function brokenAdd(a: number, b: number): string {
  return a + b;  // ← type error: returns number but declared string
}
