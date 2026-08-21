(function () {
  "use strict";

  const chapterMatch = window.location.pathname.match(/chapter(\d+)-/i);
  if (!chapterMatch || typeof quizData === "undefined" || !Array.isArray(quizData)) return;

  const chapterNumber = Number(chapterMatch[1]);
  const chapterTitle = document.querySelector("h1")?.textContent.trim() || `Chapter ${chapterNumber}`;
  const questions = quizData.map((item) => ({
    question: item.q,
    options: [...item.options],
    correct: item.correct
  }));
  const storageKey = `smile-grade6-chapter-${chapterNumber}-assessment`;
  const rubricStorageKey = `smile-grade6-chapter-${chapterNumber}-rubric`;
  const rubricDimensions = [
    ["Scientific Inquiry", "Asks relevant questions, predicts outcomes, and plans fair investigations."],
    ["Conceptual Understanding", "Explains the chapter concepts accurately and connects related ideas."],
    ["Observation & Evidence", "Records observations carefully and uses evidence to support conclusions."],
    ["Application & Problem Solving", "Applies chapter learning to practical and unfamiliar situations."],
    ["Scientific Communication", "Explains methods, results, and reasoning clearly using suitable terms."],
    ["Reflection & Responsibility", "Uses feedback, identifies next steps, and works safely and responsibly."]
  ];
  const rubricLabels = ["Emerging", "Developing", "Proficient", "Advanced"];
  const quizTabButton = [...document.querySelectorAll("nav.tabs button")].find((button) =>
    button.getAttribute("onclick")?.includes("'quiz'") || button.dataset.tab === "quiz"
  );
  if (quizTabButton) quizTabButton.textContent = "Post-Test";
  const quizHeading = document.querySelector("#quiz h2.section-title");
  if (quizHeading) quizHeading.textContent = "Post-Test · Final Chapter Quiz";
  const readRecord = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "null") || {};
    } catch (_error) {
      return {};
    }
  };
  const writeRecord = (record) => localStorage.setItem(storageKey, JSON.stringify(record));
  const readRubric = () => {
    try {
      return JSON.parse(localStorage.getItem(rubricStorageKey) || "null") || {};
    } catch (_error) {
      return {};
    }
  };
  let record = readRecord();
  const postAnswers = Array(questions.length).fill(null);

  const overlay = document.createElement("section");
  overlay.className = "smile-assessment-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "smileAssessmentTitle");

  const closeOverlay = () => {
    overlay.remove();
    document.body.classList.remove("smile-assessment-locked");
  };

  const baselinePercent = () => Math.round((record.preScore / record.preTotal) * 100);

  const showBaselineComplete = () => {
    overlay.innerHTML = `<div class="smile-assessment-dialog">
      <header class="smile-assessment-header">
        <p class="smile-assessment-kicker">Baseline completed</p>
        <h2 id="smileAssessmentTitle">Your starting point is recorded</h2>
        <p>Now study the chapter and complete the Quick Quiz at the end.</p>
      </header>
      <div class="smile-assessment-body smile-baseline-result">
        <div class="smile-baseline-score">${record.preScore}/${record.preTotal}</div>
        <p>Your answers are not shown now. This keeps the final learning comparison fair.</p>
        <button type="button" class="smile-assessment-btn" data-start-learning>Start Learning</button>
      </div>
    </div>`;
    overlay.querySelector("[data-start-learning]").addEventListener("click", closeOverlay);
    overlay.querySelector("[data-start-learning]").focus();
  };

  const startPreTest = () => {
    const answers = Array(questions.length).fill(null);
    let current = 0;
    overlay.innerHTML = `<div class="smile-assessment-dialog">
      <header class="smile-assessment-header">
        <p class="smile-assessment-kicker">Grade 6 Science · Chapter ${chapterNumber}</p>
        <h2 id="smileAssessmentTitle">Before You Learn: Pre-Test</h2>
        <p>${chapterTitle} · Answer every question. Correct answers will not be revealed.</p>
      </header>
      <div class="smile-assessment-body">
        <div class="smile-progress-row"><span data-pre-progress></span><span>Baseline knowledge check</span></div>
        <div class="smile-progress-track"><div class="smile-progress-fill" data-pre-progress-fill></div></div>
        <div class="smile-pre-question" data-pre-question></div>
        <div class="smile-assessment-actions">
          <button type="button" class="smile-assessment-btn secondary" data-pre-previous>Previous</button>
          <button type="button" class="smile-assessment-btn" data-pre-next>Next</button>
        </div>
      </div>
    </div>`;

    const questionRoot = overlay.querySelector("[data-pre-question]");
    const previous = overlay.querySelector("[data-pre-previous]");
    const next = overlay.querySelector("[data-pre-next]");
    const progress = overlay.querySelector("[data-pre-progress]");
    const progressFill = overlay.querySelector("[data-pre-progress-fill]");

    const renderQuestion = () => {
      const item = questions[current];
      progress.textContent = `Question ${current + 1} of ${questions.length}`;
      progressFill.style.width = `${((current + 1) / questions.length) * 100}%`;
      questionRoot.innerHTML = `<h3>${current + 1}. ${escapeHtml(item.question)}</h3>
        <div class="smile-pre-options">${item.options.map((option, optionIndex) => `<label class="smile-pre-option${answers[current] === optionIndex ? " selected" : ""}">
          <input type="radio" name="smilePreAnswer" value="${optionIndex}"${answers[current] === optionIndex ? " checked" : ""}>
          <span>${escapeHtml(option)}</span>
        </label>`).join("")}</div>`;
      previous.disabled = current === 0;
      next.disabled = answers[current] === null;
      next.textContent = current === questions.length - 1 ? "Submit Pre-Test" : "Next";
      questionRoot.querySelectorAll("input").forEach((input) => {
        input.addEventListener("change", () => {
          answers[current] = Number(input.value);
          questionRoot.querySelectorAll(".smile-pre-option").forEach((option) => option.classList.remove("selected"));
          input.closest(".smile-pre-option").classList.add("selected");
          next.disabled = false;
        });
      });
      questionRoot.querySelector("input:checked")?.focus();
    };

    previous.addEventListener("click", () => {
      if (current > 0) {
        current -= 1;
        renderQuestion();
      }
    });
    next.addEventListener("click", () => {
      if (answers[current] === null) return;
      if (current < questions.length - 1) {
        current += 1;
        renderQuestion();
        return;
      }
      if (answers.some((answer) => answer === null)) return;
      const score = answers.reduce(
        (total, answer, index) => total + Number(answer === questions[index].correct),
        0
      );
      record = {
        ...record,
        chapterNumber,
        chapterTitle,
        preScore: score,
        preTotal: questions.length,
        prePercent: Math.round((score / questions.length) * 100),
        preAnswers: answers,
        preCompletedAt: new Date().toISOString()
      };
      writeRecord(record);
      updateStatusButton();
      showBaselineComplete();
    });
    renderQuestion();
  };

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const statusButton = document.createElement("button");
  statusButton.type = "button";
  statusButton.className = "smile-status-button";
  const updateStatusButton = () => {
    record = readRecord();
    statusButton.textContent = record.postCompletedAt
      ? `Learning Report · ${record.postScore}/${record.postTotal}`
      : `Pre-Test · ${record.preScore}/${record.preTotal}`;
  };
  statusButton.addEventListener("click", () => {
    const report = document.querySelector("#smileLearningReport");
    quizTabButton?.click();
    if (report) {
      report.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    document.querySelector("#quiz-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const renderLearningReport = () => {
    record = readRecord();
    if (!record.preCompletedAt || !record.postCompletedAt) return;
    const quizScore = document.querySelector("#quiz-score");
    if (!quizScore) return;
    document.querySelector("#smileLearningReport")?.remove();
    const gain = record.postScore - record.preScore;
    const gainPoints = record.postPercent - record.prePercent;
    const gainClass = gain < 0 ? "loss" : "gain";
    const gainLabel = gain > 0 ? `Improved by ${gain} mark${gain === 1 ? "" : "s"}` : (gain === 0 ? "Score maintained" : `Changed by ${gain} marks`);
    const report = document.createElement("section");
    report.id = "smileLearningReport";
    report.className = "smile-learning-report";
    report.innerHTML = `<h3>Chapter Learning Report</h3>
      <p>${escapeHtml(gainLabel)} after studying ${escapeHtml(chapterTitle)}.</p>
      <div class="smile-report-grid">
        <div class="smile-report-stat"><span>Pre-Test</span><strong>${record.preScore}/${record.preTotal}</strong></div>
        <div class="smile-report-stat"><span>Post-Test</span><strong>${record.postScore}/${record.postTotal}</strong></div>
        <div class="smile-report-stat ${gainClass}"><span>Learning Gain</span><strong>${gain > 0 ? "+" : ""}${gain} (${gainPoints > 0 ? "+" : ""}${gainPoints}%)</strong></div>
      </div>
      <div class="smile-answer-summary">
        Pre-Test: ${record.preScore} correct, ${record.preTotal - record.preScore} incorrect ·
        Post-Test: ${record.postScore} correct, ${record.postTotal - record.postScore} incorrect
      </div>`;
    quizScore.insertAdjacentElement("afterend", report);
    updateStatusButton();
  };

  const rubricLevel = (average) => {
    if (average >= 3.25) return "Advanced";
    if (average >= 2.5) return "Proficient";
    if (average >= 1.75) return "Developing";
    return "Emerging";
  };

  const downloadAssessmentPaper = () => {
    const questionPaper = questions.map((item, questionIndex) => `<section class="paper-question">
      <h3>${questionIndex + 1}. ${escapeHtml(item.question)}</h3>
      <div class="paper-options">${item.options.map((option, optionIndex) => `<div><span>${String.fromCharCode(65 + optionIndex)}.</span> ${escapeHtml(option)}</div>`).join("")}</div>
    </section>`).join("");
    const rubricRows = rubricDimensions.map(([name, description]) => `<tr>
      <td><strong>${escapeHtml(name)}</strong><small>${escapeHtml(description)}</small></td>
      ${rubricLabels.map((label, index) => `<td><span class="check-box"></span><small>${index + 1} · ${label}</small></td>`).join("")}
    </tr>`).join("");
    const documentHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Grade 6 Science · Chapter ${chapterNumber} Assessment</title>
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #172033; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.45; background: #eef4fb; }
    .paper-page { max-width: 182mm; min-height: 269mm; margin: 12mm auto; padding: 12mm; background: #fff; box-shadow: 0 8px 30px #173b6720; }
    header { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: center; padding: 14px 16px; border-radius: 8px; background: linear-gradient(115deg, #173b67, #2563eb); color: #fff; }
    header span { font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    h1 { margin: 4px 0; font-size: 22px; line-height: 1.2; }
    header p { margin: 0; color: #dbeafe; }
    .brand-mark { min-width: 86px; padding: 10px; border: 1px solid #ffffff66; border-radius: 7px; text-align: center; font-size: 10px; font-weight: 800; }
    .paper-label { margin-bottom: 8px; color: #2563eb; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .student-fields { display: grid; grid-template-columns: 1.4fr .7fr 1fr; gap: 12px; margin: 16px 0; }
    .field { min-height: 34px; padding-top: 15px; border-bottom: 1px solid #475569; color: #64748b; font-size: 10px; }
    .instructions { display: flex; justify-content: space-between; gap: 18px; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; background: #eff6ff; }
    .score-box { white-space: nowrap; color: #173b67; font-weight: 800; }
    .paper-question { margin: 15px 0; padding: 12px; border: 1px solid #dbe4ee; border-left: 4px solid #2563eb; border-radius: 6px; break-inside: avoid; }
    .paper-question h3 { margin: 0 0 7px; font-size: 13px; }
    .paper-options { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 18px; }
    .paper-options div { min-height: 25px; padding: 4px 6px; border-radius: 4px; background: #f8fafc; }
    .paper-options span { display: inline-flex; width: 18px; height: 18px; margin-right: 3px; align-items: center; justify-content: center; border: 1px solid #94a3b8; border-radius: 50%; font-size: 9px; font-weight: 700; }
    .rubric-page { break-before: page; }
    .rubric-page h2 { margin: 0 0 4px; color: #173b67; font-size: 21px; }
    .rubric-page > p { margin: 0 0 14px; color: #526176; }
    .rubric-banner { display: flex; justify-content: space-between; gap: 18px; align-items: center; margin-bottom: 15px; padding: 14px 16px; border-radius: 8px; background: #fef3c7; border: 1px solid #f4c950; }
    .rubric-banner strong { display: block; color: #7c5300; font-size: 14px; }
    .rubric-banner span { color: #7c5f20; font-size: 10px; }
    .rubric-score { min-width: 110px; padding: 9px; border: 1px solid #d6a900; border-radius: 6px; background: #fff; text-align: center; color: #7c5300; font-weight: 800; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    th, td { padding: 9px 7px; border: 1px solid #b9c6d6; vertical-align: middle; text-align: center; }
    th { background: #eaf2ff; color: #173b67; font-size: 10px; }
    th:first-child, td:first-child { width: 36%; text-align: left; }
    td strong, td small { display: block; }
    td small { margin-top: 3px; color: #526176; font-size: 8px; line-height: 1.3; }
    .check-box { display: block; width: 15px; height: 15px; margin: 0 auto 4px; border: 1.5px solid #334155; }
    .comments { height: 105px; margin-top: 15px; padding: 9px; border: 1px solid #b9c6d6; }
    .comments strong { display: block; margin-bottom: 8px; }
    .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 38px; }
    .signature { padding-top: 6px; border-top: 1px solid #334155; text-align: center; }
    .print-note { margin-top: 16px; padding: 9px; border-top: 1px dashed #94a3b8; color: #64748b; font-size: 9px; text-align: center; }
    @media print {
      body { background: #fff; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .paper-page { max-width: none; min-height: auto; margin: 0; padding: 0; box-shadow: none; }
    }
  </style>
</head>
<body>
  <main class="paper-page question-pages">
    <div class="paper-label">Student Question Paper</div>
    <header>
      <div>
        <span>Grade 6 Science · Physical Assessment</span>
        <h1>Chapter ${chapterNumber}: ${escapeHtml(chapterTitle)}</h1>
        <p>${questions.length} multiple-choice questions · 1 mark each · Answer every question.</p>
      </div>
      <div class="brand-mark">SCIENCEUTSAV<br>STEM</div>
    </header>
    <div class="student-fields">
      <div class="field">Student Name</div><div class="field">Student ID</div><div class="field">Date</div>
    </div>
    <div class="instructions"><span><strong>Instructions:</strong> Circle one answer for each question. Do not use the online chapter during this assessment.</span><span class="score-box">Score: ____ / ${questions.length}</span></div>
    ${questionPaper}
    <div class="print-note">Print the complete packet double-sided when possible. The teacher rubric begins on a separate page.</div>
  </main>
  <section class="paper-page rubric-page">
    <div class="paper-label">Teacher Evaluation Sheet</div>
    <h2>Teacher Science Skills Rubric</h2>
    <p>Chapter ${chapterNumber}: ${escapeHtml(chapterTitle)}</p>
    <div class="student-fields">
      <div class="field">Student Name</div><div class="field">Student ID</div><div class="field">Date</div>
    </div>
    <div class="rubric-banner">
      <div><strong>For teacher use only</strong><span>Tick one level for each skill using evidence demonstrated during this chapter.</span></div>
      <div class="rubric-score">Average: ____ / 4</div>
    </div>
    <table>
      <thead><tr><th>Skill &amp; Evidence</th>${rubricLabels.map((label, index) => `<th>${index + 1}<br>${label}</th>`).join("")}</tr></thead>
      <tbody>${rubricRows}</tbody>
    </table>
    <div class="comments"><strong>Teacher Comments</strong></div>
    <div class="signatures"><div class="signature">Teacher Signature</div><div class="signature">Date</div></div>
    <div class="print-note">Attach this teacher evaluation sheet to the student's completed chapter assessment.</div>
  </section>
</body>
</html>`;
    const blob = new Blob([documentHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `grade-6-chapter-${chapterNumber}-assessment-and-rubric.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const renderChapterRubric = () => {
    const quizScore = document.querySelector("#quiz-score");
    if (!quizScore || document.querySelector("#smileChapterRubric")) return;

    const saved = readRubric();
    const ratings = rubricDimensions.map((_, index) => {
      const value = saved.ratings?.[index];
      return Number.isInteger(value) && value >= 1 && value <= 4 ? value : null;
    });
    const rubric = document.createElement("section");
    rubric.id = "smileChapterRubric";
    rubric.className = "smile-chapter-rubric";
    rubric.innerHTML = `<div class="smile-rubric-heading">
        <div>
          <span>Teacher Evaluation · Chapter ${chapterNumber}</span>
          <h3>Science Skills Rubric</h3>
          <p>Rate the evidence demonstrated while learning ${escapeHtml(chapterTitle)}.</p>
        </div>
        <strong data-chapter-rubric-total>Not rated</strong>
      </div>
      <div class="smile-rubric-guide">
        ${rubricLabels.map((label, index) => `<span><b>${index + 1}</b> ${label}</span>`).join("")}
      </div>
      <div class="smile-rubric-dimensions">
        ${rubricDimensions.map(([name, description], dimensionIndex) => `<div class="smile-rubric-row">
          <div><h4>${escapeHtml(name)}</h4><p>${escapeHtml(description)}</p></div>
          <div class="smile-rubric-options" data-rubric-dimension="${dimensionIndex}">
            ${rubricLabels.map((label, labelIndex) => `<button type="button" data-rubric-rating="${labelIndex + 1}"${ratings[dimensionIndex] === labelIndex + 1 ? ' class="selected"' : ""}>${labelIndex + 1} · ${label}</button>`).join("")}
          </div>
        </div>`).join("")}
      </div>
      <label class="smile-rubric-notes">Teacher Comments
        <textarea data-chapter-rubric-notes placeholder="Record evidence, strengths, support required, and next steps.">${escapeHtml(saved.notes || "")}</textarea>
      </label>
      <div class="smile-rubric-actions">
        <button type="button" class="smile-rubric-save" data-save-chapter-rubric>Save Chapter Rubric</button>
        <button type="button" class="smile-rubric-download" data-download-assessment>Download Assessment + Rubric</button>
        <span data-chapter-rubric-status aria-live="polite"></span>
      </div>`;

    const updateTotal = () => {
      const rated = ratings.filter((rating) => rating !== null);
      const total = rubric.querySelector("[data-chapter-rubric-total]");
      if (!rated.length) {
        total.textContent = "Not rated";
        return;
      }
      const average = rated.reduce((sum, rating) => sum + rating, 0) / rated.length;
      total.textContent = `${average.toFixed(2)}/4 · ${rubricLevel(average)}`;
    };

    rubric.querySelectorAll("[data-rubric-rating]").forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.closest("[data-rubric-dimension]");
        const dimensionIndex = Number(group.dataset.rubricDimension);
        ratings[dimensionIndex] = Number(button.dataset.rubricRating);
        group.querySelectorAll("button").forEach((item) => item.classList.toggle("selected", item === button));
        updateTotal();
      });
    });

    rubric.querySelector("[data-save-chapter-rubric]").addEventListener("click", () => {
      const status = rubric.querySelector("[data-chapter-rubric-status]");
      if (ratings.some((rating) => rating === null)) {
        status.textContent = "Rate all six skills before saving.";
        return;
      }
      const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
      localStorage.setItem(rubricStorageKey, JSON.stringify({
        chapterNumber,
        chapterTitle,
        ratings: [...ratings],
        average: Number(average.toFixed(2)),
        level: rubricLevel(average),
        notes: rubric.querySelector("[data-chapter-rubric-notes]").value.trim(),
        savedAt: new Date().toISOString()
      }));
      status.textContent = `Saved · ${average.toFixed(2)}/4 (${rubricLevel(average)})`;
    });
    rubric.querySelector("[data-download-assessment]").addEventListener("click", downloadAssessmentPaper);

    const learningReport = document.querySelector("#smileLearningReport");
    (learningReport || quizScore).insertAdjacentElement("afterend", rubric);
    updateTotal();
  };

  document.addEventListener("click", (event) => {
    const option = event.target.closest(".quiz-option");
    if (!option) return;
    const questionElement = option.closest(".quiz-question");
    const questionElements = [...document.querySelectorAll("#quiz-container .quiz-question")];
    const questionIndex = questionElements.indexOf(questionElement);
    if (questionIndex < 0 || postAnswers[questionIndex] !== null) return;
    postAnswers[questionIndex] = [...questionElement.querySelectorAll(".quiz-option")].indexOf(option);
  });

  const quizScore = document.querySelector("#quiz-score");
  if (quizScore) {
    new MutationObserver(() => {
      const match = quizScore.textContent.match(/(\d+)\s*\/\s*(\d+)/);
      if (!match) return;
      const postScore = Number(match[1]);
      const postTotal = Number(match[2]);
      record = {
        ...readRecord(),
        postScore,
        postTotal,
        postPercent: Math.round((postScore / postTotal) * 100),
        postAnswers,
        postCompletedAt: new Date().toISOString()
      };
      writeRecord(record);
      renderLearningReport();
    }).observe(quizScore, { childList: true, subtree: true, characterData: true });
  }

  document.body.appendChild(statusButton);
  updateStatusButton();
  renderLearningReport();
  renderChapterRubric();

  if (!record.preCompletedAt || record.preTotal !== questions.length) {
    document.body.classList.add("smile-assessment-locked");
    document.body.appendChild(overlay);
    startPreTest();
  }
}());
