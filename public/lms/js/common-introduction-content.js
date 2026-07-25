(function () {
  const pdfRoot = "assets/COMMON SESSION FOR ALL TEH LEVELS/LMS/LMS";
  const imageRoot = "assets/images/common-session/docx";

  window.COMMON_SESSION_CONTENT = {
    session: "Introduction Session",
    topic: "Introduction to Robotics and Arduino IDE",
    cover: "assets/logos/year-1/im-a-robo-scientist-y1-enhanced.png",
    folders: [
      {
        title: "What is STEM",
        items: [
          {
            folder: "1.WHAT IS STEM",
            folderPath: "intro to robotics/1.WHAT IS STEM",
            type: "docx",
            file: "STEM.docx",
            title: "STEM - Think, Create, Innovate",
            lead: "STEM connects Science, Technology, Engineering, and Mathematics into one practical way of learning. Students ask questions, explore ideas, build solutions, test them, and improve.",
            images: [
              [`${imageRoot}/stem/stem-01.png`, "What parts of Science, Technology, Engineering, and Mathematics can you identify in this image?"],
              [`${imageRoot}/stem/stem-02.png`, "Which real-life problem could this STEM idea help solve?"],
              [`${imageRoot}/stem/stem-03.png`, "What would you build, test, and improve if this was your project?"],
              [`${imageRoot}/stem/stem-04.png`, "How are science, technology, engineering, and mathematics working together here?"],
              [`${imageRoot}/stem/stem-05.png`, "What hands-on activity would help you understand this idea better?"]
            ],
            sections: [
              ["What does STEM mean?", "Science helps us discover how the world works. Technology helps us use tools to solve problems. Engineering helps us design and build solutions. Mathematics helps us use logic, numbers, patterns, and data."],
              ["Science", "Science helps us ask questions, investigate, experiment, and discover. Students connect this to plants, Earth changes, the human body, electricity, temperature, light, sound, and motion."],
              ["Technology", "Technology turns ideas into useful tools and solutions, including computers, smartphones, robots, artificial intelligence, internet, 3D printing, and virtual reality."],
              ["Engineering", "Engineers identify a problem, imagine ideas, design, build, test, and improve. Robots, bridges, electric vehicles, smart homes, and spacecraft are engineering examples."],
              ["Mathematics", "Mathematics helps students measure, calculate, predict, analyze, and make decisions. A robot uses mathematics for distance, speed, direction, timing, and sensor readings."],
              ["STEM works as a team", "A smart robot uses science to understand sensors, technology to use microcontrollers and software, engineering to design the body, and mathematics to calculate movement and data."],
              ["Where do we see STEM?", "STEM is used in space exploration, healthcare, environment, transportation, smart cities, agriculture, robotics, solar power, smart plant monitoring, and other real-world systems."],
              ["Skills developed", "Students build problem solving, creativity, teamwork, critical thinking, digital skills, adaptability, and the habit of learning from mistakes."]
            ]
          },
          {
            folder: "2.STEM engage",
            folderPath: "intro to robotics/2.STEM engage",
            type: "docx",
            file: "engage.docx",
            title: "STEM Engage",
            lead: "Students observe the images, compare what they see, and answer: What difference do you see? What has been changed?",
            images: [
              [`${imageRoot}/stem-engage/stem-engage-01.png`, "Observe carefully: what is different, added, removed, or improved?"],
              [`${imageRoot}/stem-engage/stem-engage-02.png`, "What changed in this image, and why might that change be useful?"],
              [`${imageRoot}/stem-engage/stem-engage-03.png`, "Which part catches your attention first? What question does it create?"],
              [`${imageRoot}/stem-engage/stem-engage-04.png`, "If you had to improve this idea, what would you change next?"]
            ],
            sections: [
              ["Observe", "Look carefully at each image before answering."],
              ["Compare", "Identify what is different between the examples."],
              ["Think", "Explain what has changed and why that change matters."]
            ]
          },
          {
            folder: "3.5 E's",
            type: "pdf",
            file: "Features-of-LMS-modules-1.pdf",
            title: "Features of LMS Modules",
            src: `${pdfRoot}/intro to robotics/3.5 E's/Features-of-LMS-modules-1.pdf`
          }
        ]
      },
      {
        title: "Mastering Arduino Uno",
        items: [
          {
            folder: "1.why arduino ide",
            folderPath: "mastering arduino ide/1.why arduino ide",
            type: "docx",
            file: "Why Arduino IDE.docx",
            title: "Why Arduino IDE",
            lead: "Arduino IDE is the software used on the computer to write programs and upload them to the Arduino board.",
            sections: [
              ["What is Arduino IDE?", "Arduino IDE helps students write programs, called sketches, and send them to the board so projects can work, such as blinking an LED, moving a motor, or reading a sensor."],
              ["Why do we need Arduino IDE?", "Students use it to write code, check for mistakes, upload code using USB, and view information through Serial Monitor."],
              ["Why it is important", "It is beginner-friendly, connects the computer to the Arduino board, provides ready-made examples, helps fix mistakes quickly, and is used by students and inventors around the world."],
              ["How it works", "Write the code, check it using Verify, upload it to Arduino using Upload, then watch the physical project work."],
              ["Outcomes", "Students learn how to install Arduino IDE, connect Arduino properly, write and upload simple code, and fix common errors."]
            ]
          },
          {
            folder: "2.all about arduino ide",
            folderPath: "mastering arduino ide/2.all about arduino ide",
            type: "docx",
            file: "All About Arduino IDE.docx",
            title: "All About Arduino IDE",
            lead: "The Arduino Software IDE makes it easy to write code and upload it to the board offline.",
            images: [
              [`${imageRoot}/all-about-arduino-ide/all-about-arduino-ide-01.png`, "Which area of the IDE would you use to write your code?"],
              [`${imageRoot}/all-about-arduino-ide/all-about-arduino-ide-02.png`, "Why is selecting the correct board important before upload?"],
              [`${imageRoot}/all-about-arduino-ide/all-about-arduino-ide-03.png`, "What could happen if the wrong port is selected?"],
              [`${imageRoot}/all-about-arduino-ide/all-about-arduino-ide-04.gif`, "What does the upload process tell us about computer-to-board communication?"]
            ],
            sections: [
              ["IDE versions", "Arduino IDE 1.x.x is the classic version. Arduino IDE 2.x is newer, faster, more responsive, and includes advanced coding and debugging features."],
              ["Main areas", "The IDE includes a toolbar, message area, text editor, text console, and board or port information. IDE 2.x also includes a sidebar for boards, libraries, debugging, and search."],
              ["Setup flow", "Download and install Arduino IDE, connect the Arduino board, open the IDE, select the correct board, select the correct port, and open an example such as Blink."],
              ["Uploading code", "Click the upload arrow. If upload succeeds, the message Done uploading appears and the board runs the program."],
              ["Blink example", "After uploading Blink, the on-board LED marked L starts blinking. Students can change the delay value to make it blink faster or slower."]
            ]
          },
          {
            folder: "3.arduino installation guide",
            type: "pdf-group",
            title: "Arduino Installation Guide",
            files: [
              ["Arduino-IDE-Installation.pdf", `${pdfRoot}/mastering arduino ide/3.arduino installation guide/Arduino-IDE-Installation.pdf`],
              ["Driver-Installation-Guide.pdf", `${pdfRoot}/mastering arduino ide/3.arduino installation guide/Driver-Installation-Guide.pdf`]
            ]
          },
          {
            folder: "4.how to upload code",
            type: "pdf",
            file: "How-to-upload-code.pdf",
            title: "How to Upload Code",
            src: `${pdfRoot}/mastering arduino ide/4.how to upload code/How-to-upload-code.pdf`
          },
          {
            folder: "5.how to use serial monitor",
            type: "pdf",
            file: "Open-the-Serial-Monitor.pdf",
            title: "Open the Serial Monitor",
            src: `${pdfRoot}/mastering arduino ide/5.how to use serial monitor/Open-the-Serial-Monitor.pdf`
          },
          {
            folder: "6.how to install libraries",
            type: "pdf",
            file: "Advance-Library-Installation-Guide.pdf",
            title: "Advanced Library Installation Guide",
            src: `${pdfRoot}/mastering arduino ide/6.how to install libraries/Advance-Library-Installation-Guide.pdf`
          },
          {
            folder: "7.how to resolve errors",
            type: "pdf-group",
            title: "How to Resolve Errors",
            files: [
              ["Driver-Installation-Guide (1).pdf", `${pdfRoot}/mastering arduino ide/7.how to resolve errors/Driver-Installation-Guide (1).pdf`],
              ["Robotics-Errors-1.pdf", `${pdfRoot}/mastering arduino ide/7.how to resolve errors/Robotics-Errors-1.pdf`]
            ]
          }
        ]
      },
      {
        title: "Kit Spec",
        items: [
          {
            folder: "1.Level 1 Material List",
            type: "pdf",
            level: "1",
            file: "level1 .pdf",
            title: "Level 1 Creative Automation Material List",
            src: "assets/material/level1 .pdf"
          },
          {
            folder: "1.Level 2 Material List",
            type: "pdf",
            level: "2",
            file: "level 2.pdf",
            title: "Level 2 Sensational Sensors Material List",
            src: "assets/material/level 2.pdf"
          },
          {
            folder: "2.Know How to Use Our Board",
            folderPath: "",
            type: "docx",
            file: "know how to use our board.docx",
            title: "Know How to Use Our Board",
            lead: "This board guide explains the major connectors on the robotics board and shows what each connector is used for during projects.",
            images: [
              [`${imageRoot}/know-how-board/know-how-board-01.png`, "Look at the board layout. Which connectors are for motors, sensors, communication modules, and direct pin access?"]
            ],
            sections: [
              ["Motor Driver", "The Motor Driver connector is used to connect and control motors that require more current than an Arduino pin can supply. It allows Arduino to control motor speed, direction, and movement through dedicated motor output terminals."],
              ["SPI Devices", "The SPI connector is designed for high-speed communication modules such as RFID readers, SD card modules, TFT displays, Ethernet modules, and wireless communication modules."],
              ["UART Devices / Bluetooth", "The UART connector uses TX and RX pins for serial communication. It is commonly used with Bluetooth modules, GPS modules, GSM modules, and serial sensors."],
              ["GPIO Digital 3-Pin", "The digital 3-pin connectors provide Signal, VCC, and GND together. They are useful for LEDs, buzzers, touch sensors, IR sensors, relay modules, push buttons, ultrasonic sensors, and servo motors."],
              ["I2C Devices", "The I2C connector uses SDA and SCL communication lines. It is commonly used for LCD displays, OLED displays, RTC modules, temperature sensors, accelerometers, and other I2C modules."],
              ["GPIO Analog Pins", "Analog pins read changing voltage values from sensors such as LDRs, potentiometers, gas sensors, moisture sensors, sound sensors, flex sensors, and joysticks."],
              ["GPIO Digital 2-Pin", "Digital 2-pin connectors are simple two-wire connections for push buttons, limit switches, reed switches, LEDs, and other basic digital components."],
              ["Keypad / Direct Connection", "The direct connection header gives access to Arduino input and output pins. It is useful for matrix keypads, jumper-wire testing, custom circuits, and external modules."],
              ["Bottom I2C Connector", "The additional bottom I2C connector gives another place to connect I2C modules using SDA, SCL, VCC, and GND. Multiple I2C devices can share the same bus."]
            ]
          }
        ]
      }
    ]
  };

  const assetPrefix = "https://cdn.jsdelivr.net/gh/Prem-things/SU_LMS_ROBOTICS@main/"; // patched: assets stay in the upstream GitHub repo
  const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

  const slugify = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const renderPdf = (title, src) => `<article class="common-file-card pdf-source-card">
      <div class="common-file-header"><span>PDF</span><strong>${escapeHtml(title)}</strong></div>
      <iframe class="embedded-pdf" src="${assetPrefix}${src}#view=FitH" title="${escapeHtml(title)}" loading="lazy"></iframe>
  </article>`;

  const renderDoc = (item) => `<article class="common-file-card doc-source-card">
      <div class="common-file-header"><span>DOCX</span><strong>${escapeHtml(item.file)}</strong></div>
      <h2>${escapeHtml(item.title)}</h2>
      <p class="lead-text">${escapeHtml(item.lead)}</p>
      ${item.images?.length ? `<div class="common-image-flow">${item.images.map((entry, index) => {
        const image = Array.isArray(entry) ? entry[0] : entry;
        const prompt = Array.isArray(entry) ? entry[1] : "What do you notice, and what question does it create?";
        return `<article class="common-brainstorm-card">
            <img src="${assetPrefix}${image}" alt="${escapeHtml(item.title)} image ${index + 1}" loading="lazy" decoding="async">
            <div><strong>Brainstorm ${index + 1}</strong><p>${escapeHtml(prompt)}</p></div>
        </article>`;
      }).join("")}</div>` : ""}
      <div class="common-section-grid">
          ${item.sections.map(([title, text]) => `<section><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></section>`).join("")}
      </div>
  </article>`;

  const renderItem = (item) => {
    if (item.type === "pdf") return renderPdf(item.file, item.src);
    if (item.type === "pdf-group") return item.files.map(([title, src]) => renderPdf(title, src)).join("");
    return renderDoc(item);
  };

  const visibleFoldersForLevel = (data, selectedYear) => data.folders.map((folder) => ({
    ...folder,
    items: folder.items.filter((item) => !item.level || item.level === selectedYear)
  })).filter((folder) => folder.items.length);

  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const selectedYear = params.get("year") || "1";
    const selectedGrade = params.get("grade") || "4";
    const isIntegratedIntro = document.body.dataset.page === "all-5e" && params.get("mode") === "introduction";
    if (document.body.dataset.page !== "common-introduction" && !isIntegratedIntro) return;
    const data = window.COMMON_SESSION_CONTENT;
    let root = document.querySelector("[data-common-session-root]");
    if (isIntegratedIntro) {
      const main = document.querySelector(".all5e-page");
      if (!main) return;
      main.classList.add("common-session-page");
      main.innerHTML = `<section data-common-session-root></section>`;
      root = main.querySelector("[data-common-session-root]");
    }
    if (!root || !data) return;

    document.title = data.topic;
    const visibleFolders = visibleFoldersForLevel(data, selectedYear);
    const navItems = visibleFolders.flatMap((folder, folderIndex) => folder.items.map((item, itemIndex) => ({
      folder: folder.title,
      folderIndex,
      itemIndex,
      title: item.title,
      subfolder: item.folder,
      id: slugify(`${folder.title}-${item.folder}`)
    })));

    root.innerHTML = `<section class="common-hero">
            <img src="${assetPrefix}${data.cover}" alt="I'm a Robo Scientist logo">
            <div>
                <p class="phase-label">Generic Common Session</p>
                <h1>${escapeHtml(data.topic)}</h1>
                <div class="all5e-hero-actions">
                    <a class="back-btn" href="../index.html?panel=sessionSelect&year=${escapeHtml(selectedYear)}&grade=${escapeHtml(selectedGrade)}">Back to Sessions</a>
                </div>
        </div>
    </section>
        <div class="common-layout">
            <aside class="common-dialogue-nav" aria-label="Introduction folder navigation">
                <p class="phase-label">Select Topic</p>
                ${visibleFolders.map((folder, folderIndex) => `<div class="common-dialogue-group${folderIndex === 0 ? " active" : ""}" data-common-group="${folderIndex}">
                    <button type="button" class="dialogue-option common-folder-option${folderIndex === 0 ? " active" : ""}" data-common-folder="${folderIndex}">
                        <span>${folderIndex + 1}</span>
                        <strong>${escapeHtml(folder.title)}</strong>
                        <small>${folder.items.length} topic${folder.items.length === 1 ? "" : "s"}</small>
                    </button>
                    <div class="common-subdialogue-list" aria-label="${escapeHtml(folder.title)} subtopics">
                        ${navItems.filter((item) => item.folderIndex === folderIndex).map((item, index) => `<button type="button" class="dialogue-option common-subdialogue-option${folderIndex === 0 && index === 0 ? " active" : ""}" data-common-folder-child="${item.folderIndex}" data-common-target="${item.id}">
                            <span>${item.itemIndex + 1}</span>
                            <strong>${escapeHtml(item.subfolder)}</strong>
                            <small>${escapeHtml(item.title)}</small>
                        </button>`).join("")}
                    </div>
                </div>`).join("")}
            </aside>
            <div class="common-content-flow">
                ${visibleFolders.map((folder, folderIndex) => `<section class="common-folder-block${folderIndex === 0 ? " active" : ""}" data-common-folder-section="${folderIndex}">
                    <div class="common-folder-title">
                        <span>${folderIndex + 1}</span>
                        <h2>${escapeHtml(folder.title)}</h2>
                    </div>
                    ${folder.items.map((item, itemIndex) => `<section class="common-subfolder-block${folderIndex === 0 && itemIndex === 0 ? " active" : ""}" id="${slugify(`${folder.title}-${item.folder}`)}" data-common-section="${slugify(`${folder.title}-${item.folder}`)}">
            <div class="common-subfolder-title">
                <span>${escapeHtml(item.folder)}</span>
                <h3>${escapeHtml(item.title)}</h3>
            </div>
            ${renderItem(item)}
        </section>`).join("")}
    </section>`).join("")}
            </div>
        </div>`;

    const options = root.querySelectorAll("[data-common-target]");
    const folderOptions = root.querySelectorAll("[data-common-folder]");
    const sections = root.querySelectorAll("[data-common-section]");
    const folders = root.querySelectorAll(".common-folder-block");
    const subOptions = root.querySelectorAll("[data-common-folder-child]");
    const showFolder = (folderIndex) => {
      root.querySelectorAll(".common-dialogue-group").forEach((group) => {
        group.classList.toggle("active", group.dataset.commonGroup === String(folderIndex));
      });
      folderOptions.forEach((option) => option.classList.toggle("active", option.dataset.commonFolder === String(folderIndex)));
      const firstChild = root.querySelector(`[data-common-folder-child="${folderIndex}"]`);
      if (firstChild) showSection(firstChild.dataset.commonTarget);
    };
    const showSection = (target) => {
      options.forEach((option) => option.classList.toggle("active", option.dataset.commonTarget === target));
      sections.forEach((section) => section.classList.toggle("active", section.dataset.commonSection === target));
      folders.forEach((folder) => {
        folder.classList.toggle("active", Boolean(folder.querySelector(`.common-subfolder-block.active`)));
      });
      const activeSection = root.querySelector(`[data-common-section="${target}"]`);
      if (activeSection) activeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    options.forEach((option) => {
      option.addEventListener("click", () => showSection(option.dataset.commonTarget));
    });
    folderOptions.forEach((option) => {
      option.addEventListener("click", () => showFolder(option.dataset.commonFolder));
    });
  });
}());
