(function () {
  "use strict";

  const chapterTitles = [
    "The Wonderful World of Science",
    "Diversity in the Living World",
    "Mindful Eating: A Path to a Healthy Body",
    "Exploring Magnets",
    "Measurement of Length and Motion",
    "Materials Around Us",
    "Temperature and its Measurement",
    "A Journey through States of Water",
    "Methods of Separation in Everyday Life",
    "Living Creatures: Exploring their Characteristics",
    "Nature's Treasures",
    "Beyond Earth"
  ];

  const rubricDimensions = [
    {
      name: "Scientific Inquiry",
      description: "Asks relevant questions, predicts outcomes, and plans fair investigations."
    },
    {
      name: "Conceptual Understanding",
      description: "Explains Grade 6 science ideas accurately and connects related concepts."
    },
    {
      name: "Observation & Evidence",
      description: "Records observations carefully and uses evidence to support conclusions."
    },
    {
      name: "Application & Problem Solving",
      description: "Applies learning to unfamiliar situations and practical problems."
    },
    {
      name: "Scientific Communication",
      description: "Communicates methods, results, and reasoning clearly using suitable terms."
    },
    {
      name: "Reflection & Responsibility",
      description: "Uses feedback, identifies next steps, and works safely and responsibly."
    }
  ];

  const rubricLabels = ["Emerging", "Developing", "Proficient", "Advanced"];
  const rubricKey = "smile-grade6-overall-rubric";
  const studentKey = "smile-grade6-student-details";
  const ratings = Array(rubricDimensions.length).fill(null);

  const readJson = (key, fallback = {}) => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") || fallback;
    } catch (_error) {
      return fallback;
    }
  };

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const getChapterRecords = () => chapterTitles.map((title, index) => {
    const chapter = index + 1;
    return {
      chapter,
      title,
      ...readJson(`smile-grade6-chapter-${chapter}-assessment`),
      rubric: readJson(`smile-grade6-chapter-${chapter}-rubric`)
    };
  });

  const scoreBand = (percentage) => {
    if (percentage >= 85) return "Advanced";
    if (percentage >= 70) return "Proficient";
    if (percentage >= 50) return "Developing";
    return "Emerging";
  };

  const renderOverallReport = () => {
    const summary = document.querySelector("[data-report-summary]");
    const tableRoot = document.querySelector("[data-chapter-report]");
    if (!summary || !tableRoot) return;

    const records = getChapterRecords();
    const preComplete = records.filter((record) => record.preCompletedAt);
    const postComplete = records.filter((record) => record.postCompletedAt);
    const preScore = preComplete.reduce((total, record) => total + Number(record.preScore || 0), 0);
    const preTotal = preComplete.reduce((total, record) => total + Number(record.preTotal || 0), 0);
    const postScore = postComplete.reduce((total, record) => total + Number(record.postScore || 0), 0);
    const postTotal = postComplete.reduce((total, record) => total + Number(record.postTotal || 0), 0);
    const prePercent = preTotal ? Math.round((preScore / preTotal) * 100) : 0;
    const postPercent = postTotal ? Math.round((postScore / postTotal) * 100) : 0;
    const gain = postPercent - prePercent;
    const completedRubrics = records.filter((record) => Number.isFinite(record.rubric?.average));
    const chapterRubricAverage = completedRubrics.length
      ? completedRubrics.reduce((total, record) => total + record.rubric.average, 0) / completedRubrics.length
      : null;

    summary.innerHTML = `
      <div class="grade-report-stat"><span>Chapters Completed</span><strong>${postComplete.length}/12</strong><small>${Math.round((postComplete.length / 12) * 100)}% of the course</small></div>
      <div class="grade-report-stat"><span>Overall Pre-Test</span><strong>${preTotal ? `${preScore}/${preTotal}` : "Pending"}</strong><small>${preTotal ? `${prePercent}% baseline` : "No baseline results yet"}</small></div>
      <div class="grade-report-stat"><span>Overall Post-Test</span><strong>${postTotal ? `${postScore}/${postTotal}` : "Pending"}</strong><small>${postTotal ? `${postPercent}% · ${scoreBand(postPercent)}` : "No final results yet"}</small></div>
      <div class="grade-report-stat ${postTotal ? "gain" : "pending"}"><span>Overall Learning Gain</span><strong>${postTotal && preTotal ? `${gain > 0 ? "+" : ""}${gain}%` : "Pending"}</strong><small>Post-test minus pre-test</small></div>
      <div class="grade-report-stat ${chapterRubricAverage === null ? "pending" : ""}"><span>Chapter Rubric Average</span><strong>${chapterRubricAverage === null ? "Pending" : `${chapterRubricAverage.toFixed(2)}/4`}</strong><small>${completedRubrics.length}/12 chapter rubrics saved</small></div>`;

    tableRoot.innerHTML = `<table class="grade-report-table">
      <thead><tr><th>Chapter</th><th>Topic</th><th>Pre-Test</th><th>Post-Test</th><th>Gain</th><th>Rubric</th><th>Status</th></tr></thead>
      <tbody>${records.map((record) => {
        const hasPre = Boolean(record.preCompletedAt);
        const hasPost = Boolean(record.postCompletedAt);
        const chapterGain = hasPre && hasPost ? record.postPercent - record.prePercent : null;
        const status = hasPost ? "Complete" : (hasPre ? "In Progress" : "Not Started");
        const statusClass = status.toLowerCase().replace(" ", "-");
        return `<tr>
          <td class="number">${record.chapter}</td>
          <td>${escapeHtml(record.title)}</td>
          <td>${hasPre ? `${record.preScore}/${record.preTotal} (${record.prePercent}%)` : "—"}</td>
          <td>${hasPost ? `${record.postScore}/${record.postTotal} (${record.postPercent}%)` : "—"}</td>
          <td>${chapterGain === null ? "—" : `${chapterGain > 0 ? "+" : ""}${chapterGain}%`}</td>
          <td>${Number.isFinite(record.rubric?.average) ? `${record.rubric.average.toFixed(2)}/4 · ${escapeHtml(record.rubric.level)}` : "—"}</td>
          <td><span class="report-status ${statusClass}">${status}</span></td>
        </tr>`;
      }).join("")}</tbody>
    </table>`;
  };

  const rubricLevel = (average) => {
    if (average >= 3.25) return "Advanced";
    if (average >= 2.5) return "Proficient";
    if (average >= 1.75) return "Developing";
    return "Emerging";
  };

  const updateRubricTotal = () => {
    const rated = ratings.filter((rating) => rating !== null);
    const total = document.querySelector("[data-rubric-total]");
    if (!total) return;
    if (!rated.length) {
      total.textContent = "Not rated";
      return;
    }
    const average = rated.reduce((sum, rating) => sum + rating, 0) / rated.length;
    total.textContent = `${average.toFixed(2)}/4 · ${rubricLevel(average)}`;
  };

  const renderRubric = () => {
    const root = document.querySelector("[data-rubric-dimensions]");
    if (!root) return;
    root.innerHTML = rubricDimensions.map((dimension, index) => `<div class="overall-rubric-row">
      <div><h4>${escapeHtml(dimension.name)}</h4><p>${escapeHtml(dimension.description)}</p></div>
      <div class="rubric-rating-options" data-rubric-index="${index}">
        ${rubricLabels.map((label, labelIndex) => `<button type="button" data-rating="${labelIndex + 1}"${ratings[index] === labelIndex + 1 ? ' class="selected"' : ""}>${labelIndex + 1} · ${label}</button>`).join("")}
      </div>
    </div>`).join("");

    root.querySelectorAll("[data-rating]").forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.closest("[data-rubric-index]");
        const index = Number(group.dataset.rubricIndex);
        ratings[index] = Number(button.dataset.rating);
        group.querySelectorAll("button").forEach((item) => item.classList.toggle("selected", item === button));
        updateRubricTotal();
      });
    });
    updateRubricTotal();
  };

  const studentFields = {
    name: document.querySelector("[data-student-name]"),
    id: document.querySelector("[data-student-id]"),
    school: document.querySelector("[data-student-school]")
  };

  const saveStudentDetails = () => {
    localStorage.setItem(studentKey, JSON.stringify({
      name: studentFields.name?.value.trim() || "",
      id: studentFields.id?.value.trim() || "",
      school: studentFields.school?.value.trim() || ""
    }));
  };

  const loadSavedData = () => {
    const details = readJson(studentKey);
    Object.entries(studentFields).forEach(([key, field]) => {
      if (field) field.value = details[key] || "";
      field?.addEventListener("change", saveStudentDetails);
    });

    const saved = readJson(rubricKey);
    if (Array.isArray(saved.ratings)) {
      saved.ratings.forEach((rating, index) => {
        ratings[index] = Number.isInteger(rating) && rating >= 1 && rating <= 4 ? rating : null;
      });
    }
    const notes = document.querySelector("[data-rubric-notes]");
    if (notes) notes.value = saved.notes || "";
  };

  const saveRubric = () => {
    if (ratings.some((rating) => rating === null)) {
      document.querySelector("[data-rubric-status]").textContent = "Rate all six skills before saving.";
      return;
    }
    saveStudentDetails();
    const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    localStorage.setItem(rubricKey, JSON.stringify({
      ratings: [...ratings],
      average: Number(average.toFixed(2)),
      level: rubricLevel(average),
      notes: document.querySelector("[data-rubric-notes]")?.value.trim() || "",
      savedAt: new Date().toISOString()
    }));
    document.querySelector("[data-rubric-status]").textContent = `Saved · ${average.toFixed(2)}/4 (${rubricLevel(average)})`;
  };

  loadSavedData();
  renderRubric();
  renderOverallReport();
  window.addEventListener("pageshow", renderOverallReport);
  document.querySelector("[data-refresh-report]")?.addEventListener("click", renderOverallReport);
  document.querySelector("[data-print-report]")?.addEventListener("click", () => {
    saveStudentDetails();
    window.print();
  });
  document.querySelector("[data-save-rubric]")?.addEventListener("click", saveRubric);
}());
