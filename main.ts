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
// awkward dinner guest. The slip pair is checked below so a future edit
// cannot silently drop the joke.
const SLIP = { intended: "milk", sent: "Mike" };

function buildLine(): string {
  const opener = "Texted my wife";
  const quotedAsk = `'pick up ${SLIP.intended} on your way home'`;
  const twist = `autocorrect changed it to 'pick up ${SLIP.sent}'`;
  const fallout = `and now ${SLIP.sent} is coming to dinner.`;
  return [opener, quotedAsk, "—", twist, fallout].join(" ");
}

const line = buildLine();

if (!line.includes(SLIP.intended) || !line.includes(SLIP.sent)) {
  throw new Error("entry lost the autocorrect slip");
}

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
