// Keeps every code challenge aligned with the exact Arduino code taught in its lesson.
(function () {
  "use strict";

  const content = window.LMS_CONTENT || {};
  const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const deriveBlankAnswers = (challengeCode = "", solutionCode = "") => {
    if (!challengeCode.includes("____") || !solutionCode) return [];
    const parts = challengeCode.split(/_{4,}/);
    const answers = [];
    let cursor = 0;

    for (let index = 0; index < parts.length - 1; index += 1) {
      const prefixIndex = solutionCode.indexOf(parts[index], cursor);
      if (prefixIndex === -1) break;
      const answerStart = prefixIndex + parts[index].length;
      const suffix = parts[index + 1];
      const answerEnd = suffix ? solutionCode.indexOf(suffix, answerStart) : solutionCode.length;
      if (answerEnd === -1) break;
      answers.push(solutionCode.slice(answerStart, answerEnd).trim());
      cursor = answerEnd;
    }
    if (answers.length === parts.length - 1) return answers;

    const lineAnswers = [];
    let searchFrom = 0;
    challengeCode.split("\n").forEach((line) => {
      if (!line.includes("____")) return;
      const matcher = new RegExp(escapeRegExp(line).replace(/_{4,}/g, "(.+?)"));
      const match = solutionCode.slice(searchFrom).match(matcher);
      if (!match) return;
      lineAnswers.push(match[1].trim());
      searchFrom += match.index + match[0].length;
    });
    return lineAnswers;
  };

  const challengeFromSolution = (solutionCode) => {
    const candidates = [];
    const addFirstMatch = (pattern) => {
      const match = pattern.exec(solutionCode);
      if (!match) return;
      const valueOffset = match[0].lastIndexOf(match[1]);
      candidates.push({ start: match.index + valueOffset, end: match.index + valueOffset + match[1].length, answer: match[1] });
    };

    addFirstMatch(/\b(?:const\s+int\s+\w+\s*=\s*|#define\s+\w+\s+)([AD]?\d+)\b/);
    addFirstMatch(/\bpinMode\s*\([^,\n]+,\s*(INPUT_PULLUP|INPUT|OUTPUT)\s*\)/);
    addFirstMatch(/\bdelay\s*\(\s*(\d+)\s*\)/);
    addFirstMatch(/\bdigitalWrite\s*\([^,\n]+,\s*(HIGH|LOW)\s*\)/);

    const selected = candidates
      .filter((candidate, index, list) => list.findIndex((item) => item.start === candidate.start) === index)
      .sort((left, right) => left.start - right.start);
    if (!selected.length) return null;

    let challengeCode = solutionCode;
    [...selected].reverse().forEach((candidate) => {
      challengeCode = `${challengeCode.slice(0, candidate.start)}____${challengeCode.slice(candidate.end)}`;
    });
    return { challengeCode, answers: selected.map((candidate) => candidate.answer) };
  };

  Object.values(content).forEach((lesson) => {
    const evaluation = lesson.evaluate;
    const solutionCode = lesson.explain?.code || "";
    if (!evaluation?.challengeCode?.includes("____") || !solutionCode) return;

    const blankCount = (evaluation.challengeCode.match(/_{4,}/g) || []).length;
    const currentAnswers = evaluation.challengeAnswers || deriveBlankAnswers(evaluation.challengeCode, solutionCode);
    if (currentAnswers.length === blankCount && currentAnswers.every((answer) => String(answer).trim())) {
      evaluation.challengeAnswers = currentAnswers;
      return;
    }

    const corrected = challengeFromSolution(solutionCode);
    if (!corrected) return;
    evaluation.challenge = `Complete the missing values in the ${lesson.topic} program so it matches the code studied in this session.`;
    evaluation.challengeCode = corrected.challengeCode;
    evaluation.challengeAnswers = corrected.answers;
  });
}());
