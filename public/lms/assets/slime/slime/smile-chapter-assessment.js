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

  if (!record.preCompletedAt || record.preTotal !== questions.length) {
    document.body.classList.add("smile-assessment-locked");
    document.body.appendChild(overlay);
    startPreTest();
  }
}());
