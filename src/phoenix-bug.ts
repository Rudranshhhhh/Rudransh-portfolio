// Phoenix self-healing test — deliberate type errors
// Phoenix will detect this CI failure, diagnose, patch, validate, and open a PR.
// Triggered at: 20261102003253

export const buggyValue: number = "hello world";

export function brokenAdd(a: number, b: number): string {
  return a + b;
}

export const anotherBug: boolean = 42;
