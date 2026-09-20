import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Plain Node tests for the pure logic in src/lib (pricing rules, dates). No
// browser or React needed, so they run in a few seconds: `npm test`.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
