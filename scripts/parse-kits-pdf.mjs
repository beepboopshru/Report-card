// Parses data/kits.layout.txt (output of `pdftotext -layout`) into data/kits.json.
//
// Approach: each kit metadata row begins with a number, contains "Explorer" or
// "Discoverer" as an unambiguous anchor, and ends in "active". We split each row
// around those anchors instead of relying on column positions, because long
// concept names ("Peristence of Vision") push later columns out of alignment.
//
// Descriptions live in the rightmost column (start ~char 92). They wrap over
// multiple lines and may span past subsequent kit rows. We collect right-column
// text as a sequential stream between kit rows; the result is best-effort. The
// rubric generator handles empty descriptions gracefully.

import { readFileSync, writeFileSync } from "node:fs";

const raw = readFileSync("data/kits.layout.txt", "latin1");
const lines = raw.split(/\r?\n/);

const DESC_COL = 92;
const KIT_NUM_RE = /^(\d{1,3})\s/;
const CATEGORY_RE = /\b(Explorer|Discoverer)\b/;
const GRADE_RE = /\b(\d{1,2})\s+\d+\s+active\b/;

const kits = [];

// Pass 1: extract all kit metadata rows.
// We need to know each row's line index so we can attribute right-column text.
const rowsByLine = new Map();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!KIT_NUM_RE.test(line)) continue;
  const catMatch = line.match(CATEGORY_RE);
  if (!catMatch) continue;
  const gradeMatch = line.match(GRADE_RE);
  if (!gradeMatch) continue;

  const numMatch = line.match(KIT_NUM_RE);
  const kitNumber = Number(numMatch[1]);

  // Slice the line:
  //   [kitNum][spaces] CONCEPT KITNAME [spaces] CATEGORY [spaces] SUBJECT [spaces] GRADE 0 active [description]
  const catIdx = line.indexOf(catMatch[1]);
  const beforeCat = line.slice(numMatch[0].length, catIdx).trim();

  // Split CONCEPT vs KITNAME. The kit name is uppercase (or mostly so), the
  // concept is title-case. Find the first uppercase-only token in beforeCat.
  const tokens = beforeCat.split(/\s+/);
  let splitIdx = tokens.length;
  for (let t = 0; t < tokens.length; t++) {
    // Uppercase token: ASCII uppercase letters, digits, and a few symbols (- | / etc).
    // Tokens like "DESIGN", "MAGIC", "BOW" are uppercase.
    const tok = tokens[t];
    if (/^[A-Z][A-Z0-9|/&\-+,'!.()]*$/.test(tok) && tok.length >= 2) {
      splitIdx = t;
      break;
    }
  }
  const concept = tokens.slice(0, splitIdx).join(" ").trim();
  const kitName = tokens.slice(splitIdx).join(" ").trim();

  const category = catMatch[1];
  const afterCat = line.slice(catIdx + category.length, line.indexOf(gradeMatch[0])).trim();
  const subject = afterCat;
  const grade = Number(gradeMatch[1]);

  // First-line description tail: anything after "active" on this same line.
  const activeEnd = line.indexOf("active", line.indexOf(gradeMatch[0])) + "active".length;
  const firstDescLine = line.slice(activeEnd).trim();

  const kit = {
    kitNumber,
    concept,
    kitName,
    category,
    subject,
    grade,
    description: firstDescLine ? firstDescLine + " " : "",
    _line: i,
  };
  rowsByLine.set(i, kits.length);
  kits.push(kit);
}

// Pass 2: collect right-column text on lines BETWEEN kit rows and attribute
// to the most recent kit row.
const sortedLines = [...rowsByLine.keys()].sort((a, b) => a - b);
for (let s = 0; s < sortedLines.length; s++) {
  const startLine = sortedLines[s];
  const endLine = s + 1 < sortedLines.length ? sortedLines[s + 1] : lines.length;
  const kit = kits[rowsByLine.get(startLine)];
  for (let i = startLine + 1; i < endLine; i++) {
    const line = lines[i];
    if (line.length <= DESC_COL) continue;
    const text = line.slice(DESC_COL).trim();
    if (text) kit.description += text + " ";
  }
  kit.description = kit.description.replace(/\s+/g, " ").trim();
}

// Strip internal _line marker.
for (const k of kits) delete k._line;

// Supplement: hand-recovered kit rows that the strict parser couldn't extract
// because of PDF quirks (multi-line kit names, missing category, "--" grade).
// These were verified by reading data/kits.layout.txt manually.
const SUPPLEMENT = [
  {
    kitNumber: 19, concept: "Be an Ornithologist", kitName: "BIRD GAME",
    category: "Discoverer", subject: "Biology", grade: 3,
    description: "This interactive game teaches bird strategy. Players discover fascinating bird behaviors and habitats through gameplay.",
  },
  {
    kitNumber: 20, concept: "Skeletal and Muscular System", kitName: "GHOST UNCLE | FLIP BOOK",
    category: "Discoverer", subject: "Human Body", grade: 5,
    description: "This hands-on project teaches human anatomy through building a 'Ghost Uncle' model. Participants discover bone functions, muscle-joint interactions, and skeletal growth while constructing their movable figure.",
  },
  {
    kitNumber: 30, concept: "Why things react", kitName: "SHACKY BOTTLE | COPPER TREE | CHAMELEON CHEMISTRY",
    category: "Explorer", subject: "Chemistry", grade: 9,
    description: "This module brings chemistry to life with three engaging experiments: Shaky Bottle demonstrates gas-producing reactions, Copper Tree showcases beautiful metal displacement, and Chameleon Chemistry shows reaction principles firsthand.",
  },
  {
    kitNumber: 73, concept: "Sound and Light", kitName: "TABLE TOP BELL",
    category: "Explorer", subject: "Physics", grade: 5,
    description: "",
  },
  {
    kitNumber: 73, concept: "Sound and Light", kitName: "SOS LIGHT",
    category: "Discoverer", subject: "Physics", grade: 5,
    description: "",
  },
];

const haveKey = new Set(kits.map(k => `${k.kitNumber}|${k.category}|${k.kitName}`));
for (const k of SUPPLEMENT) {
  const key = `${k.kitNumber}|${k.category}|${k.kitName}`;
  if (!haveKey.has(key)) kits.push(k);
}

// Sort by kitNumber then category for stable output.
kits.sort((a, b) =>
  a.kitNumber - b.kitNumber || a.category.localeCompare(b.category) || a.kitName.localeCompare(b.kitName));

console.log(`Parsed ${kits.length - SUPPLEMENT.length} from PDF + ${SUPPLEMENT.length} supplements = ${kits.length} total.`);

writeFileSync("data/kits.json", JSON.stringify(kits, null, 2));
console.log(`Wrote ${kits.length} kits to data/kits.json`);
