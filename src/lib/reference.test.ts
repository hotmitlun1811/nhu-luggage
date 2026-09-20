import { describe, expect, it } from "vitest";
import { REFERENCE_ALPHABET, REFERENCE_PATTERN, REFERENCE_SUFFIX_LENGTH, generateReference, suffixFromBytes } from "./reference";

describe("generateReference", () => {
  it("is STW, the drop-off day and 6 characters", () => {
    const ref = generateReference("2026-09-21");
    expect(ref).toMatch(REFERENCE_PATTERN);
    expect(ref.startsWith("STW-260921-")).toBe(true);
    expect(ref.split("-")[2]).toHaveLength(REFERENCE_SUFFIX_LENGTH);
  });

  it("uses today's date when there is no drop-off day", () => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "").slice(2);
    expect(generateReference()).toMatch(new RegExp(`^STW-${today}-`));
  });

  it("never draws a character that is easy to misread or that could spell a word", () => {
    expect(REFERENCE_ALPHABET).toHaveLength(27);
    expect(new Set(REFERENCE_ALPHABET).size).toBe(27);
    for (const bad of "01ILOAEUY") expect(REFERENCE_ALPHABET).not.toContain(bad);
    for (let i = 0; i < 2000; i++) expect(generateReference("2026-09-21")).toMatch(REFERENCE_PATTERN);
  });

  it("does not repeat itself", () => {
    // 20 codes from 387 million possibilities: a repeat here would mean the randomness is broken.
    const codes = new Set(Array.from({ length: 20 }, () => generateReference("2026-09-21")));
    expect(codes.size).toBe(20);
  });

  it("uses every character about equally often", () => {
    const counts = new Map<string, number>();
    for (let i = 0; i < 60_000; i++) {
      for (const ch of generateReference("2026-09-21").split("-")[2]) counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
    const expected = (60_000 * REFERENCE_SUFFIX_LENGTH) / REFERENCE_ALPHABET.length; // about 13,333 each
    expect(counts.size).toBe(27);
    for (const n of counts.values()) expect(Math.abs(n - expected)).toBeLessThan(expected * 0.1);
  });
});

describe("suffixFromBytes", () => {
  it("gives each character exactly the same number of usable bytes, so none is favoured", () => {
    const counts = new Map<string, number>();
    for (let byte = 0; byte < 243; byte++) {
      const ch = suffixFromBytes([byte], 1);
      counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
    expect(counts.size).toBe(27);
    for (const n of counts.values()) expect(n).toBe(9);
  });

  it("skips the bytes that would bias the result", () => {
    for (let byte = 243; byte < 256; byte++) expect(suffixFromBytes([byte], 1)).toBe("");
    expect(suffixFromBytes([250, 255, 0, 1, 2, 3, 4, 5, 6])).toBe(REFERENCE_ALPHABET.slice(0, 6));
  });

  it("stops at the length asked for", () => {
    expect(suffixFromBytes([0, 1, 2, 3, 4, 5, 6, 7], 3)).toHaveLength(3);
  });
});
