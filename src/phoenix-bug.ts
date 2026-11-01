// Phoenix self-healing test — deliberate type error v2
// A string assigned to a number — Phoenix should fix this automatically.

export const buggyValue: number = "hello world";  // ← TS2322

export function brokenAdd(a: number, b: number): string {
  return a + b;  // ← return type mismatch
}

export const anotherBug: boolean = 42;  // ← TS2322: number not assignable to boolean
