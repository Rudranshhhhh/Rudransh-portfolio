// Phoenix self-healing test — deliberate type errors (v3)
// Phoenix will clone this repo, read this file, and fix these errors.

export const buggyValue: number = "hello world";

export function brokenAdd(a: number, b: number): string {
  return a + b;
}

export const anotherBug: boolean = 42;
