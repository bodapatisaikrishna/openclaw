import process from "node:process";
import { afterEach } from "vitest";

export function useBunVersionForTest() {
  const versions = process.versions;
  const original = Object.getOwnPropertyDescriptor(versions, "bun");

  afterEach(() => {
    if (original) {
      Object.defineProperty(versions, "bun", original);
    } else {
      Reflect.deleteProperty(versions, "bun");
    }
  });

  return (bun: string | undefined) => {
    // Keep the real process and its event lifecycle while simulating the runtime.
    Object.defineProperty(versions, "bun", { value: bun, configurable: true });
  };
}
