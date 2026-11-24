// Funniest Autocorrect Fail — make.fun entry
// Writes exactly one autocorrect-fail line to /output/entry.txt.
//
// The joke is built from sentence fragments and joined into a single
// line, so the program is deterministic: every run produces the same
// bytes. The line is kept under 200 characters by construction and the
// program refuses to write it if that ever stops being true.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 199;

// The fail: "milk" autocorrected to "Mike". One wrong word, one very
// awkward dinner guest.
const opener = "Texted my wife";
const quotedAsk = "'pick up milk on your way home'";
const twist = "autocorrect changed it to 'pick up Mike'";
const fallout = "and now Mike is coming to dinner.";

const parts = [opener, quotedAsk, "—", twist, fallout];
const line = parts.join(" ");

if (line.length < 1 || line.length > MAX_CHARS) {
  throw new Error(`entry is ${line.length} chars, must be 1-199`);
}
if (line.trim() !== line || line.includes("\n")) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, line, "utf8");
console.log(`wrote ${line.length} chars to ${OUTPUT_PATH}`);
console.log(line);
