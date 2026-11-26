// Deadpan Forecasts for Cities That Do Not Exist — make.fun entry.
//
// The program writes one deadpan weather line for an invented city to
// /output/entry.txt. The line is a fixed, hand-written forecast: a dry TV
// meteorologist's sign-off from Zarnwick, a city that does not exist.
// It stays inside the 160-character gate (147 characters), names the city,
// gives a concrete temperature, a vivid absurd detail (rain falling
// sideways, fog filing a formal complaint), and closes like a real
// broadcast handoff ("Back to you.").
//
// Deterministic by design: the grader runs the program twice and the
// entry must read the same both times, so there is no randomness, no
// clock, no network, and no input beyond this file.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const FORECAST =
  "Good evening from Zarnwick, where it is 14 degrees, raining sideways, " +
  "and the fog has filed a formal complaint. Dry by dawn, probably. " +
  "Back to you.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  // The gate counts characters, so guard the line before writing it:
  // it must be 1..160 characters, not only white space, and a single
  // line — the judge compares one forecast line against another.
  const line = FORECAST.trim();
  if (line.length < 1 || line.length > 160) {
    throw new Error(
      `forecast must be 1-160 characters, got ${line.length}`,
    );
  }
  if (line.includes("\n")) {
    throw new Error("forecast must be a single line");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");
}

main();
