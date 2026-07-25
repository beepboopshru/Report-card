// Generated curriculum data for Level 2 Sensational Sensors Classes 6 to 9, Sessions 1 to 10.
Object.assign(window.LMS_CONTENT, {
  "2-6-1": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 1",
    "topic": "Light Sensing & Auto Lighting",
    "cover": "assets/images/pdf/year-2/session-1-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Light Sensing & Auto Lighting. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Light Sensing & Auto Lighting to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Light Sense",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-1/explore/y2-c6-session1-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-1/explore/y2-c6-session1-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-6/session-1/explore-y2-c6-s1-page-01.jpg",
          "Curiosity Kickoff",
          "Light Sensing & Auto Lighting source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-1/explore-y2-c6-s1-page-02.jpg",
          "Project Setup",
          "Beginner project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-1/explore-y2-c6-s1-page-03.jpg",
          "Main Code",
          "Light Sensing & Auto Lighting source PDF code page.",
          "y2c6s1-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-1/explore-y2-c6-s1-page-04.jpg",
          "Try This Yourself",
          "Light Sensing & Auto Lighting source PDF practice page.",
          "y2c6s1-explore-try-code"
        ]
      ],
      "codes": {
        "y2c6s1-explore-main-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c6s1-explore-try-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the light sensor decision input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 1 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-1/hardware-01.png",
            "LDR Sensor",
            "LDR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ldr sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-02.png",
            "Automatic LED",
            "Automatic LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how automatic led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-03.png",
            "Arduino Logic",
            "Arduino Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how arduino logic changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-04.png",
            "Light Threshold",
            "Light Threshold is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how light threshold changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Beginner Build: Session 1 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-6/session-1/elaborate-y2-c6-s1-page-02.jpg",
        "assets/images/pdf/year-2/class-6/session-1/elaborate-y2-c6-s1-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-1/elaborate/y2-c6-session1-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-1/elaborate-y2-c6-s1-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-1/elaborate-y2-c6-s1-page-06.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-1/elaborate-y2-c6-s1-page-07.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-1/elaborate-y2-c6-s1-page-08.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF.",
              "y2c6s1-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Light Sensing & Auto Lighting as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-1/elaborate/y2-c6-session1-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-1/elaborate-y2-c6-s1-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-1/elaborate-y2-c6-s1-page-10.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-1/elaborate-y2-c6-s1-page-11.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF.",
              "y2c6s1-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Light Sensing & Auto Lighting as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c6s1-elaborate-project1-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c6s1-elaborate-project2-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Light Sense.",
      "challengeCode": "#define LDR_PIN ____\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 1 focused on?",
          [
            "Light Sense",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Light Sensing & Auto Lighting",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-1": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 1",
    "topic": "Light Sensing & Auto Lighting",
    "cover": "assets/images/pdf/year-2/session-1-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Light Sensing & Auto Lighting. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Light Sensing & Auto Lighting to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Smart Night Light System",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-1/explore/y2-c7-session1-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-1/explore/y2-c7-session1-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-7/session-1/explore-y2-c7-s1-page-01.jpg",
          "Curiosity Kickoff",
          "Light Sensing & Auto Lighting source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-1/explore-y2-c7-s1-page-05.jpg",
          "Project Setup",
          "Intermediate project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-1/explore-y2-c7-s1-page-06.jpg",
          "Main Code",
          "Light Sensing & Auto Lighting source PDF code page.",
          "y2c7s1-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-1/explore-y2-c7-s1-page-07.jpg",
          "Try This Yourself",
          "Light Sensing & Auto Lighting source PDF practice page.",
          "y2c7s1-explore-try-code"
        ]
      ],
      "codes": {
        "y2c7s1-explore-main-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c7s1-explore-try-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the light sensor decision input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 1 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-1/hardware-01.png",
            "LDR Sensor",
            "LDR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ldr sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-02.png",
            "Automatic LED",
            "Automatic LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how automatic led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-03.png",
            "Arduino Logic",
            "Arduino Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how arduino logic changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-04.png",
            "Light Threshold",
            "Light Threshold is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how light threshold changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Intermediate Build: Session 1 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-02.jpg",
        "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-1/elaborate/y2-c7-session1-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-12.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-13.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-14.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-15.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF.",
              "y2c7s1-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-16.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light Sensing & Auto Lighting as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-1/elaborate/y2-c7-session1-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-17.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-18.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-19.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF.",
              "y2c7s1-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-7/session-1/elaborate-y2-c7-s1-page-20.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light Sensing & Auto Lighting as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c7s1-elaborate-project1-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c7s1-elaborate-project2-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Smart Night Light System.",
      "challengeCode": "#define LDR_PIN ____\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 1 focused on?",
          [
            "Smart Night Light System",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Light Sensing & Auto Lighting",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-1": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 1",
    "topic": "Light Sensing & Auto Lighting",
    "cover": "assets/images/pdf/year-2/session-1-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Light Sensing & Auto Lighting. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Light Sensing & Auto Lighting to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Smart Light Detection",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-1/explore/y2-c8-session1-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-1/explore/y2-c8-session1-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-8/session-1/explore-y2-c8-s1-page-01.jpg",
          "Curiosity Kickoff",
          "Light Sensing & Auto Lighting source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-1/explore-y2-c8-s1-page-08.jpg",
          "Project Setup",
          "Advanced project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-1/explore-y2-c8-s1-page-09.jpg",
          "Main Code",
          "Light Sensing & Auto Lighting source PDF code page.",
          "y2c8s1-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-1/explore-y2-c8-s1-page-10.jpg",
          "Try This Yourself",
          "Light Sensing & Auto Lighting source PDF practice page.",
          "y2c8s1-explore-try-code"
        ]
      ],
      "codes": {
        "y2c8s1-explore-main-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c8s1-explore-try-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the light sensor decision input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 1 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-1/hardware-01.png",
            "LDR Sensor",
            "LDR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ldr sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-02.png",
            "Automatic LED",
            "Automatic LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how automatic led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-03.png",
            "Arduino Logic",
            "Arduino Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how arduino logic changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-04.png",
            "Light Threshold",
            "Light Threshold is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how light threshold changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Advanced Build: Session 1 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-02.jpg",
        "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-1/elaborate/y2-c8-session1-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-22.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-23.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-24.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF.",
              "y2c8s1-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Light Sensing & Auto Lighting as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-1/elaborate/y2-c8-session1-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-25.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-26.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-27.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF.",
              "y2c8s1-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-8/session-1/elaborate-y2-c8-s1-page-28.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light Sensing & Auto Lighting as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c8s1-elaborate-project1-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c8s1-elaborate-project2-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Smart Light Detection.",
      "challengeCode": "#define LDR_PIN ____\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 1 focused on?",
          [
            "Smart Light Detection",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Light Sensing & Auto Lighting",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-1": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 1",
    "topic": "Light Sensing & Auto Lighting",
    "cover": "assets/images/pdf/year-2/session-1-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Light Sensing & Auto Lighting. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Light Sensing & Auto Lighting because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Light Sensing & Auto Lighting to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Adaptive Light Logic",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-1/explore/y2-c9-session1-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-1/explore/y2-c9-session1-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-9/session-1/explore-y2-c9-s1-page-01.jpg",
          "Curiosity Kickoff",
          "Light Sensing & Auto Lighting source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-1/explore-y2-c9-s1-page-11.jpg",
          "Project Setup",
          "Expert project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-1/explore-y2-c9-s1-page-12.jpg",
          "Main Code",
          "Light Sensing & Auto Lighting source PDF code page.",
          "y2c9s1-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-1/explore-y2-c9-s1-page-13.jpg",
          "Learning Page",
          "Light Sensing & Auto Lighting source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-1/explore-y2-c9-s1-page-14.jpg",
          "Learning Page",
          "Light Sensing & Auto Lighting source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-1/explore-y2-c9-s1-page-15.jpg",
          "Try This Yourself",
          "Light Sensing & Auto Lighting source PDF practice page.",
          "y2c9s1-explore-try-code"
        ]
      ],
      "codes": {
        "y2c9s1-explore-main-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c9s1-explore-try-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the light sensor decision input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 1 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-1/hardware-01.png",
            "LDR Sensor",
            "LDR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ldr sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-02.png",
            "Automatic LED",
            "Automatic LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how automatic led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-03.png",
            "Arduino Logic",
            "Arduino Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how arduino logic changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-1/hardware-04.png",
            "Light Threshold",
            "Light Threshold is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how light threshold changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Expert Build: Session 1 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-02.jpg",
        "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-1/elaborate/y2-c9-session1-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-29.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-30.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-31.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF.",
              "y2c9s1-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-32.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light Sensing & Auto Lighting as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-1/elaborate/y2-c9-session1-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-34.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-35.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF.",
              "y2c9s1-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-9/session-1/elaborate-y2-c9-s1-page-36.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 1 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light Sensing & Auto Lighting as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c9s1-elaborate-project1-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c9s1-elaborate-project2-code": "#define LDR_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Adaptive Light Logic.",
      "challengeCode": "#define LDR_PIN ____\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(LDR_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 1 focused on?",
          [
            "Adaptive Light Logic",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Light Sensing & Auto Lighting",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-6-2": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 2",
    "topic": "Sound Reactive System",
    "cover": "assets/images/pdf/year-2/session-2-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Sound Reactive System. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Sound Reactive System to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Sound Trigger",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-2/explore/y2-c6-session2-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-2/explore/y2-c6-session2-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-6/session-2/explore-y2-c6-s2-page-01.jpg",
          "Curiosity Kickoff",
          "Sound Reactive System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-2/explore-y2-c6-s2-page-02.jpg",
          "Project Setup",
          "Beginner project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-2/explore-y2-c6-s2-page-03.jpg",
          "Main Code",
          "Sound Reactive System source PDF code page.",
          "y2c6s2-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-2/explore-y2-c6-s2-page-04.jpg",
          "Try This Yourself",
          "Sound Reactive System source PDF practice page.",
          "y2c6s2-explore-try-code"
        ]
      ],
      "codes": {
        "y2c6s2-explore-main-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
        "y2c6s2-explore-try-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sound reactive behavior input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 2 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-2/hardware-01.png",
            "Sound Sensor",
            "Sound Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sound sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-02.png",
            "Reactive LED",
            "Reactive LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how reactive led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-03.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-04.png",
            "Serial Reading",
            "Serial Reading is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how serial reading changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Beginner Build: Session 2 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-02.jpg",
        "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-2/elaborate/y2-c6-session2-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-06.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-07.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-08.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF.",
              "y2c6s2-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-09.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-10.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-11.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-12.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-13.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-14.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-15.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-16.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-17.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-18.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-19.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-2/elaborate-y2-c6-s2-page-20.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ]
          ],
          "working": "This build applies Sound Reactive System as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c6s2-elaborate-project1-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Sound Trigger.",
      "challengeCode": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 2 focused on?",
          [
            "Sound Trigger",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Sound Reactive System",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-2": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 2",
    "topic": "Sound Reactive System",
    "cover": "assets/images/pdf/year-2/session-2-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Sound Reactive System. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Sound Reactive System to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Sound Reactive Alert",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-2/explore/y2-c7-session2-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-2/explore/y2-c7-session2-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-7/session-2/explore-y2-c7-s2-page-01.jpg",
          "Curiosity Kickoff",
          "Sound Reactive System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-2/explore-y2-c7-s2-page-05.jpg",
          "Project Setup",
          "Intermediate project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-2/explore-y2-c7-s2-page-06.jpg",
          "Main Code",
          "Sound Reactive System source PDF code page.",
          "y2c7s2-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-2/explore-y2-c7-s2-page-07.jpg",
          "Try This Yourself",
          "Sound Reactive System source PDF practice page.",
          "y2c7s2-explore-try-code"
        ]
      ],
      "codes": {
        "y2c7s2-explore-main-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
        "y2c7s2-explore-try-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sound reactive behavior input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 2 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-2/hardware-01.png",
            "Sound Sensor",
            "Sound Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sound sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-02.png",
            "Reactive LED",
            "Reactive LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how reactive led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-03.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-04.png",
            "Serial Reading",
            "Serial Reading is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how serial reading changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Intermediate Build: Session 2 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-7/session-2/elaborate-y2-c7-s2-page-02.jpg",
        "assets/images/pdf/year-2/class-7/session-2/elaborate-y2-c7-s2-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Level 2 Sensational Sensors Class 7 Build Pending",
          "download": null,
          "pages": [],
          "working": "The Elaborate PDF for this session is not in the workspace yet. Add it later and regenerate the content to show physical build pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Sound Reactive Alert.",
      "challengeCode": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 2 focused on?",
          [
            "Sound Reactive Alert",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Sound Reactive System",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-2": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 2",
    "topic": "Sound Reactive System",
    "cover": "assets/images/pdf/year-2/session-2-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Sound Reactive System. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Sound Reactive System to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Sound Reactive Lighting",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-2/explore/y2-c8-session2-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-2/explore/y2-c8-session2-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-8/session-2/explore-y2-c8-s2-page-01.jpg",
          "Curiosity Kickoff",
          "Sound Reactive System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-2/explore-y2-c8-s2-page-08.jpg",
          "Project Setup",
          "Advanced project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-2/explore-y2-c8-s2-page-09.jpg",
          "Main Code",
          "Sound Reactive System source PDF code page.",
          "y2c8s2-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-2/explore-y2-c8-s2-page-10.jpg",
          "Try This Yourself",
          "Sound Reactive System source PDF practice page.",
          "y2c8s2-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-2/explore-y2-c8-s2-page-11.jpg",
          "Learning Page",
          "Sound Reactive System source PDF page."
        ]
      ],
      "codes": {
        "y2c8s2-explore-main-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
        "y2c8s2-explore-try-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sound reactive behavior input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 2 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-2/hardware-01.png",
            "Sound Sensor",
            "Sound Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sound sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-02.png",
            "Reactive LED",
            "Reactive LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how reactive led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-03.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-04.png",
            "Serial Reading",
            "Serial Reading is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how serial reading changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Advanced Build: Session 2 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-02.jpg",
        "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-2/elaborate/y2-c8-session2-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-22.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-23.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-24.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF.",
              "y2c8s2-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Sound Reactive System as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-2/elaborate/y2-c8-session2-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-25.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-26.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-27.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-2/elaborate-y2-c8-s2-page-28.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF.",
              "y2c8s2-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Sound Reactive System as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c8s2-elaborate-project1-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
        "y2c8s2-elaborate-project2-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Sound Reactive Lighting.",
      "challengeCode": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 2 focused on?",
          [
            "Sound Reactive Lighting",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Sound Reactive System",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-2": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 2",
    "topic": "Sound Reactive System",
    "cover": "assets/images/pdf/year-2/session-2-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Sound Reactive System. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Sound Reactive System because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Sound Reactive System to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Acoustic Logic System",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-2/explore/y2-c9-session2-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-2/explore/y2-c9-session2-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-9/session-2/explore-y2-c9-s2-page-01.jpg",
          "Curiosity Kickoff",
          "Sound Reactive System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-2/explore-y2-c9-s2-page-12.jpg",
          "Project Setup",
          "Expert project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-2/explore-y2-c9-s2-page-13.jpg",
          "Main Code",
          "Sound Reactive System source PDF code page.",
          "y2c9s2-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-2/explore-y2-c9-s2-page-14.jpg",
          "Learning Page",
          "Sound Reactive System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-2/explore-y2-c9-s2-page-15.jpg",
          "Try This Yourself",
          "Sound Reactive System source PDF practice page.",
          "y2c9s2-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-2/explore-y2-c9-s2-page-16.jpg",
          "Learning Page",
          "Sound Reactive System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-2/explore-y2-c9-s2-page-17.jpg",
          "Learning Page",
          "Sound Reactive System source PDF page."
        ]
      ],
      "codes": {
        "y2c9s2-explore-main-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
        "y2c9s2-explore-try-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sound reactive behavior input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 2 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-2/hardware-01.png",
            "Sound Sensor",
            "Sound Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sound sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-02.png",
            "Reactive LED",
            "Reactive LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how reactive led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-03.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-2/hardware-04.png",
            "Serial Reading",
            "Serial Reading is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how serial reading changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Expert Build: Session 2 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-02.jpg",
        "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-2/elaborate/y2-c9-session2-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-29.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-30.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-31.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-32.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF.",
              "y2c9s2-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Sound Reactive System as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-2/elaborate/y2-c9-session2-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-34.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-35.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 2 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-2/elaborate-y2-c9-s2-page-36.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 2 Elaborate PDF.",
              "y2c9s2-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Sound Reactive System as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c9s2-elaborate-project1-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
        "y2c9s2-elaborate-project2-code": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Acoustic Logic System.",
      "challengeCode": "#define SOUND_PIN A0\n#define LED_PIN 5\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  int soundValue = analogRead(SOUND_PIN);\n  digitalWrite(LED_PIN, soundValue > 500 ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 2 focused on?",
          [
            "Acoustic Logic System",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Sound Reactive System",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-6-3": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 3",
    "topic": "Tilt Safety & Alert",
    "cover": "assets/images/pdf/year-2/session-3-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Tilt Safety & Alert. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Tilt Safety & Alert to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Tilt Alert",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-3/explore/y2-c6-session3-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-3/explore/y2-c6-session3-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-6/session-3/explore-y2-c6-s3-page-01.jpg",
          "Curiosity Kickoff",
          "Tilt Safety & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-3/explore-y2-c6-s3-page-02.jpg",
          "Project Setup",
          "Beginner project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-3/explore-y2-c6-s3-page-03.jpg",
          "Main Code",
          "Tilt Safety & Alert source PDF code page.",
          "y2c6s3-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-3/explore-y2-c6-s3-page-04.jpg",
          "Try This Yourself",
          "Tilt Safety & Alert source PDF practice page.",
          "y2c6s3-explore-try-code"
        ]
      ],
      "codes": {
        "y2c6s3-explore-main-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c6s3-explore-try-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the tilt safety response input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 3 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-3/hardware-01.png",
            "Tilt Sensor",
            "Tilt Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how tilt sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-02.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-03.png",
            "Safety LED",
            "Safety LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how safety led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-04.png",
            "Servo Logic",
            "Servo Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Beginner Build: Session 3 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-02.jpg",
        "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-3/elaborate/y2-c6-session3-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-06.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-07.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-08.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 3 Elaborate PDF.",
              "y2c6s3-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Tilt Safety & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-3/elaborate/y2-c6-session3-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-10.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-11.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-3/elaborate-y2-c6-s3-page-12.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 3 Elaborate PDF.",
              "y2c6s3-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Tilt Safety & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c6s3-elaborate-project1-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c6s3-elaborate-project2-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Tilt Alert.",
      "challengeCode": "#define TILT_PIN ____\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 3 focused on?",
          [
            "Tilt Alert",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Tilt Safety & Alert",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-3": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 3",
    "topic": "Tilt Safety & Alert",
    "cover": "assets/images/pdf/year-2/session-3-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Tilt Safety & Alert. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Tilt Safety & Alert to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Tilt Safety Alarm",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-3/explore/y2-c7-session3-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-3/explore/y2-c7-session3-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-7/session-3/explore-y2-c7-s3-page-01.jpg",
          "Curiosity Kickoff",
          "Tilt Safety & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-3/explore-y2-c7-s3-page-05.jpg",
          "Project Setup",
          "Intermediate project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-3/explore-y2-c7-s3-page-06.jpg",
          "Main Code",
          "Tilt Safety & Alert source PDF code page.",
          "y2c7s3-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-3/explore-y2-c7-s3-page-07.jpg",
          "Try This Yourself",
          "Tilt Safety & Alert source PDF practice page.",
          "y2c7s3-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-3/explore-y2-c7-s3-page-08.jpg",
          "Learning Page",
          "Tilt Safety & Alert source PDF page."
        ]
      ],
      "codes": {
        "y2c7s3-explore-main-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c7s3-explore-try-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the tilt safety response input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 3 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-3/hardware-01.png",
            "Tilt Sensor",
            "Tilt Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how tilt sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-02.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-03.png",
            "Safety LED",
            "Safety LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how safety led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-04.png",
            "Servo Logic",
            "Servo Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Intermediate Build: Session 3 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-02.jpg",
        "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-3/elaborate/y2-c7-session3-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-13.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-14.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-15.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-16.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 3 Elaborate PDF.",
              "y2c7s3-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Tilt Safety & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-3/elaborate/y2-c7-session3-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-17.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-18.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-19.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-3/elaborate-y2-c7-s3-page-20.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 3 Elaborate PDF.",
              "y2c7s3-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Tilt Safety & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c7s3-elaborate-project1-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c7s3-elaborate-project2-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Tilt Safety Alarm.",
      "challengeCode": "#define TILT_PIN ____\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 3 focused on?",
          [
            "Tilt Safety Alarm",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Tilt Safety & Alert",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-3": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 3",
    "topic": "Tilt Safety & Alert",
    "cover": "assets/images/pdf/year-2/session-3-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Tilt Safety & Alert. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Tilt Safety & Alert to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Tilt Safety Alert",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-3/explore/y2-c8-session3-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-3/explore/y2-c8-session3-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-8/session-3/explore-y2-c8-s3-page-01.jpg",
          "Curiosity Kickoff",
          "Tilt Safety & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-3/explore-y2-c8-s3-page-09.jpg",
          "Project Setup",
          "Advanced project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-3/explore-y2-c8-s3-page-10.jpg",
          "Main Code",
          "Tilt Safety & Alert source PDF code page.",
          "y2c8s3-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-3/explore-y2-c8-s3-page-11.jpg",
          "Try This Yourself",
          "Tilt Safety & Alert source PDF practice page.",
          "y2c8s3-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-3/explore-y2-c8-s3-page-12.jpg",
          "Learning Page",
          "Tilt Safety & Alert source PDF page."
        ]
      ],
      "codes": {
        "y2c8s3-explore-main-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c8s3-explore-try-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the tilt safety response input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 3 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-3/hardware-01.png",
            "Tilt Sensor",
            "Tilt Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how tilt sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-02.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-03.png",
            "Safety LED",
            "Safety LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how safety led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-04.png",
            "Servo Logic",
            "Servo Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Advanced Build: Session 3 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-02.jpg",
        "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-3/elaborate/y2-c8-session3-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-22.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-23.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-24.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 3 Elaborate PDF.",
              "y2c8s3-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Tilt Safety & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-3/elaborate/y2-c8-session3-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-25.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-26.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-27.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-3/elaborate-y2-c8-s3-page-28.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 3 Elaborate PDF.",
              "y2c8s3-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Tilt Safety & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c8s3-elaborate-project1-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c8s3-elaborate-project2-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Tilt Safety Alert.",
      "challengeCode": "#define TILT_PIN ____\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 3 focused on?",
          [
            "Tilt Safety Alert",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Tilt Safety & Alert",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-3": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 3",
    "topic": "Tilt Safety & Alert",
    "cover": "assets/images/pdf/year-2/session-3-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Tilt Safety & Alert. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Tilt Safety & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Tilt Safety & Alert to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Smart Tilt Logic",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-3/explore/y2-c9-session3-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-3/explore/y2-c9-session3-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-9/session-3/explore-y2-c9-s3-page-01.jpg",
          "Curiosity Kickoff",
          "Tilt Safety & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-3/explore-y2-c9-s3-page-13.jpg",
          "Project Setup",
          "Expert project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-3/explore-y2-c9-s3-page-14.jpg",
          "Main Code",
          "Tilt Safety & Alert source PDF code page.",
          "y2c9s3-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-3/explore-y2-c9-s3-page-15.jpg",
          "Try This Yourself",
          "Tilt Safety & Alert source PDF practice page.",
          "y2c9s3-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-3/explore-y2-c9-s3-page-16.jpg",
          "Learning Page",
          "Tilt Safety & Alert source PDF page."
        ]
      ],
      "codes": {
        "y2c9s3-explore-main-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c9s3-explore-try-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the tilt safety response input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 3 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-3/hardware-01.png",
            "Tilt Sensor",
            "Tilt Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how tilt sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-02.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-03.png",
            "Safety LED",
            "Safety LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how safety led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-3/hardware-04.png",
            "Servo Logic",
            "Servo Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Expert Build: Session 3 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-02.jpg",
        "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-3/elaborate/y2-c9-session3-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-29.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-30.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-31.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-32.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-33.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 3 Elaborate PDF.",
              "y2c9s3-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-34.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ]
          ],
          "working": "This build applies Tilt Safety & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-3/elaborate/y2-c9-session3-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-35.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-36.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-37.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-38.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 3 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-3/elaborate-y2-c9-s3-page-39.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 3 Elaborate PDF.",
              "y2c9s3-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Tilt Safety & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c9s3-elaborate-project1-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c9s3-elaborate-project2-code": "#define TILT_PIN 2\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Smart Tilt Logic.",
      "challengeCode": "#define TILT_PIN ____\n#define BUZZER_PIN 3\n\nvoid setup() {\n  pinMode(TILT_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(TILT_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 3 focused on?",
          [
            "Smart Tilt Logic",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Tilt Safety & Alert",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-6-4": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 4",
    "topic": "Magnetic Detection & Hall Logic",
    "cover": "assets/images/pdf/year-2/session-4-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Magnetic Detection & Hall Logic. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Magnetic Detection & Hall Logic to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Magnetic Detect",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-4/explore/y2-c6-session4-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-4/explore/y2-c6-session4-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-6/session-4/explore-y2-c6-s4-page-01.jpg",
          "Curiosity Kickoff",
          "Magnetic Detection & Hall Logic source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-4/explore-y2-c6-s4-page-02.jpg",
          "Project Setup",
          "Beginner project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-4/explore-y2-c6-s4-page-03.jpg",
          "Main Code",
          "Magnetic Detection & Hall Logic source PDF code page.",
          "y2c6s4-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-4/explore-y2-c6-s4-page-04.jpg",
          "Try This Yourself",
          "Magnetic Detection & Hall Logic source PDF practice page.",
          "y2c6s4-explore-try-code"
        ]
      ],
      "codes": {
        "y2c6s4-explore-main-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c6s4-explore-try-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the magnetic detection logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 4 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-4/hardware-01.png",
            "Hall Sensor",
            "Hall Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how hall sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-02.png",
            "Magnet Detection",
            "Magnet Detection is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how magnet detection changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-03.png",
            "Indicator LED",
            "Indicator LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how indicator led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-04.png",
            "Magnetic Alert",
            "Magnetic Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how magnetic alert changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Beginner Build: Session 4 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-02.jpg",
        "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-4/elaborate/y2-c6-session4-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-06.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-07.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-08.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF.",
              "y2c6s4-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Magnetic Detection & Hall Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-4/elaborate/y2-c6-session4-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-10.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-11.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-4/elaborate-y2-c6-s4-page-12.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF.",
              "y2c6s4-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Magnetic Detection & Hall Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c6s4-elaborate-project1-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c6s4-elaborate-project2-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Magnetic Detect.",
      "challengeCode": "#define HALL_PIN ____\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 4 focused on?",
          [
            "Magnetic Detect",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Magnetic Detection & Hall Logic",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-4": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 4",
    "topic": "Magnetic Detection & Hall Logic",
    "cover": "assets/images/pdf/year-2/session-4-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Magnetic Detection & Hall Logic. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Magnetic Detection & Hall Logic to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Magnetic Light Indicator",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-4/explore/y2-c7-session4-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-4/explore/y2-c7-session4-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-7/session-4/explore-y2-c7-s4-page-01.jpg",
          "Curiosity Kickoff",
          "Magnetic Detection & Hall Logic source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-4/explore-y2-c7-s4-page-05.jpg",
          "Project Setup",
          "Intermediate project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-4/explore-y2-c7-s4-page-06.jpg",
          "Main Code",
          "Magnetic Detection & Hall Logic source PDF code page.",
          "y2c7s4-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-4/explore-y2-c7-s4-page-07.jpg",
          "Try This Yourself",
          "Magnetic Detection & Hall Logic source PDF practice page.",
          "y2c7s4-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-4/explore-y2-c7-s4-page-08.jpg",
          "Learning Page",
          "Magnetic Detection & Hall Logic source PDF page."
        ]
      ],
      "codes": {
        "y2c7s4-explore-main-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c7s4-explore-try-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the magnetic detection logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 4 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-4/hardware-01.png",
            "Hall Sensor",
            "Hall Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how hall sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-02.png",
            "Magnet Detection",
            "Magnet Detection is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how magnet detection changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-03.png",
            "Indicator LED",
            "Indicator LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how indicator led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-04.png",
            "Magnetic Alert",
            "Magnetic Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how magnetic alert changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Intermediate Build: Session 4 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-02.jpg",
        "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-4/elaborate/y2-c7-session4-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-13.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-14.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-15.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-16.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-17.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF.",
              "y2c7s4-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Magnetic Detection & Hall Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-4/elaborate/y2-c7-session4-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-18.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-19.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-20.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-21.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-4/elaborate-y2-c7-s4-page-22.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF.",
              "y2c7s4-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Magnetic Detection & Hall Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c7s4-elaborate-project1-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c7s4-elaborate-project2-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Magnetic Light Indicator.",
      "challengeCode": "#define HALL_PIN ____\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 4 focused on?",
          [
            "Magnetic Light Indicator",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Magnetic Detection & Hall Logic",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-4": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 4",
    "topic": "Magnetic Detection & Hall Logic",
    "cover": "assets/images/pdf/year-2/session-4-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Magnetic Detection & Hall Logic. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Magnetic Detection & Hall Logic to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Magnetic Alert System",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-4/explore/y2-c8-session4-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-4/explore/y2-c8-session4-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-8/session-4/explore-y2-c8-s4-page-01.jpg",
          "Curiosity Kickoff",
          "Magnetic Detection & Hall Logic source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-4/explore-y2-c8-s4-page-09.jpg",
          "Project Setup",
          "Advanced project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-4/explore-y2-c8-s4-page-10.jpg",
          "Main Code",
          "Magnetic Detection & Hall Logic source PDF code page.",
          "y2c8s4-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-4/explore-y2-c8-s4-page-11.jpg",
          "Try This Yourself",
          "Magnetic Detection & Hall Logic source PDF practice page.",
          "y2c8s4-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-4/explore-y2-c8-s4-page-12.jpg",
          "Learning Page",
          "Magnetic Detection & Hall Logic source PDF page."
        ]
      ],
      "codes": {
        "y2c8s4-explore-main-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c8s4-explore-try-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the magnetic detection logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 4 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-4/hardware-01.png",
            "Hall Sensor",
            "Hall Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how hall sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-02.png",
            "Magnet Detection",
            "Magnet Detection is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how magnet detection changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-03.png",
            "Indicator LED",
            "Indicator LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how indicator led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-04.png",
            "Magnetic Alert",
            "Magnetic Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how magnetic alert changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Advanced Build: Session 4 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-02.jpg",
        "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-4/elaborate/y2-c8-session4-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-23.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-24.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-25.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-26.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-27.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF.",
              "y2c8s4-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Magnetic Detection & Hall Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-4/elaborate/y2-c8-session4-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-28.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-29.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-30.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-31.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF.",
              "y2c8s4-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-8/session-4/elaborate-y2-c8-s4-page-32.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ]
          ],
          "working": "This build applies Magnetic Detection & Hall Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c8s4-elaborate-project1-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c8s4-elaborate-project2-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Magnetic Alert System.",
      "challengeCode": "#define HALL_PIN ____\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 4 focused on?",
          [
            "Magnetic Alert System",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Magnetic Detection & Hall Logic",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-4": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 4",
    "topic": "Magnetic Detection & Hall Logic",
    "cover": "assets/images/pdf/year-2/session-4-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Magnetic Detection & Hall Logic. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Magnetic Detection & Hall Logic because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Magnetic Detection & Hall Logic to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Hall Sensor Alert System",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-4/explore/y2-c9-session4-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-4/explore/y2-c9-session4-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-9/session-4/explore-y2-c9-s4-page-01.jpg",
          "Curiosity Kickoff",
          "Magnetic Detection & Hall Logic source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-4/explore-y2-c9-s4-page-13.jpg",
          "Project Setup",
          "Expert project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-4/explore-y2-c9-s4-page-14.jpg",
          "Main Code",
          "Magnetic Detection & Hall Logic source PDF code page.",
          "y2c9s4-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-4/explore-y2-c9-s4-page-15.jpg",
          "Try This Yourself",
          "Magnetic Detection & Hall Logic source PDF practice page.",
          "y2c9s4-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-4/explore-y2-c9-s4-page-16.jpg",
          "Learning Page",
          "Magnetic Detection & Hall Logic source PDF page."
        ]
      ],
      "codes": {
        "y2c9s4-explore-main-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c9s4-explore-try-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the magnetic detection logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 4 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-4/hardware-01.png",
            "Hall Sensor",
            "Hall Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how hall sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-02.png",
            "Magnet Detection",
            "Magnet Detection is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how magnet detection changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-03.png",
            "Indicator LED",
            "Indicator LED is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how indicator led changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-4/hardware-04.png",
            "Magnetic Alert",
            "Magnetic Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how magnetic alert changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Expert Build: Session 4 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-02.jpg",
        "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-4/elaborate/y2-c9-session4-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-34.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-35.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-36.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF.",
              "y2c9s4-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Magnetic Detection & Hall Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-4/elaborate/y2-c9-session4-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-37.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-38.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-39.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF.",
              "y2c9s4-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-9/session-4/elaborate-y2-c9-s4-page-40.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 4 Elaborate PDF."
            ]
          ],
          "working": "This build applies Magnetic Detection & Hall Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c9s4-elaborate-project1-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
        "y2c9s4-elaborate-project2-code": "#define HALL_PIN 2\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Hall Sensor Alert System.",
      "challengeCode": "#define HALL_PIN ____\n#define LED_PIN 3\n\nvoid setup() {\n  pinMode(HALL_PIN, INPUT);\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, digitalRead(HALL_PIN) == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 4 focused on?",
          [
            "Hall Sensor Alert System",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Magnetic Detection & Hall Logic",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-6-5": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 5",
    "topic": "IR Object Detection & Alert",
    "cover": "assets/images/pdf/year-2/session-5-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of IR Object Detection & Alert. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect IR Object Detection & Alert to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Object Watch",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-5/explore/y2-c6-session5-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-5/explore/y2-c6-session5-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-6/session-5/explore-y2-c6-s5-page-01.jpg",
          "Curiosity Kickoff",
          "IR Object Detection & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-5/explore-y2-c6-s5-page-02.jpg",
          "Project Setup",
          "Beginner project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-5/explore-y2-c6-s5-page-03.jpg",
          "Main Code",
          "IR Object Detection & Alert source PDF code page.",
          "y2c6s5-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-5/explore-y2-c6-s5-page-04.jpg",
          "Try This Yourself",
          "IR Object Detection & Alert source PDF practice page.",
          "y2c6s5-explore-try-code"
        ]
      ],
      "codes": {
        "y2c6s5-explore-main-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
        "y2c6s5-explore-try-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the IR object detection input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 5 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-5/hardware-01.png",
            "IR Sensor",
            "IR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-02.png",
            "Object Detection",
            "Object Detection is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how object detection changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-03.png",
            "Buzzer/Servo Output",
            "Buzzer/Servo Output is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer/servo output changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-04.png",
            "Distance Trigger",
            "Distance Trigger is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how distance trigger changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Beginner Build: Session 5 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-02.jpg",
        "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-5/elaborate/y2-c6-session5-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-06.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-07.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-08.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 5 Elaborate PDF.",
              "y2c6s5-elaborate-project1-code"
            ]
          ],
          "working": "This build applies IR Object Detection & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-5/elaborate/y2-c6-session5-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-10.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-11.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-5/elaborate-y2-c6-s5-page-12.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 5 Elaborate PDF.",
              "y2c6s5-elaborate-project2-code"
            ]
          ],
          "working": "This build applies IR Object Detection & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c6s5-elaborate-project1-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
        "y2c6s5-elaborate-project2-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Object Watch.",
      "challengeCode": "#define IR_PIN ____\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 5 focused on?",
          [
            "Object Watch",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "IR Object Detection & Alert",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-5": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 5",
    "topic": "IR Object Detection & Alert",
    "cover": "assets/images/pdf/year-2/session-5-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of IR Object Detection & Alert. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect IR Object Detection & Alert to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Obstacle Alert Guard",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-5/explore/y2-c7-session5-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-5/explore/y2-c7-session5-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-7/session-5/explore-y2-c7-s5-page-01.jpg",
          "Curiosity Kickoff",
          "IR Object Detection & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-5/explore-y2-c7-s5-page-05.jpg",
          "Project Setup",
          "Intermediate project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-5/explore-y2-c7-s5-page-06.jpg",
          "Main Code",
          "IR Object Detection & Alert source PDF code page.",
          "y2c7s5-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-5/explore-y2-c7-s5-page-07.jpg",
          "Try This Yourself",
          "IR Object Detection & Alert source PDF practice page.",
          "y2c7s5-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-5/explore-y2-c7-s5-page-08.jpg",
          "Learning Page",
          "IR Object Detection & Alert source PDF page."
        ]
      ],
      "codes": {
        "y2c7s5-explore-main-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
        "y2c7s5-explore-try-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the IR object detection input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 5 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-5/hardware-01.png",
            "IR Sensor",
            "IR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-02.png",
            "Object Detection",
            "Object Detection is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how object detection changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-03.png",
            "Buzzer/Servo Output",
            "Buzzer/Servo Output is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer/servo output changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-04.png",
            "Distance Trigger",
            "Distance Trigger is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how distance trigger changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Intermediate Build: Session 5 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-02.jpg",
        "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-5/elaborate/y2-c7-session5-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-13.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-14.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-15.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-16.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 5 Elaborate PDF.",
              "y2c7s5-elaborate-project1-code"
            ]
          ],
          "working": "This build applies IR Object Detection & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-5/elaborate/y2-c7-session5-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-17.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-18.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-19.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-5/elaborate-y2-c7-s5-page-20.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 5 Elaborate PDF.",
              "y2c7s5-elaborate-project2-code"
            ]
          ],
          "working": "This build applies IR Object Detection & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c7s5-elaborate-project1-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
        "y2c7s5-elaborate-project2-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Obstacle Alert Guard.",
      "challengeCode": "#define IR_PIN ____\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 5 focused on?",
          [
            "Obstacle Alert Guard",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "IR Object Detection & Alert",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-5": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 5",
    "topic": "IR Object Detection & Alert",
    "cover": "assets/images/pdf/year-2/session-5-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of IR Object Detection & Alert. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect IR Object Detection & Alert to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: IR Obstacle Detector",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-5/explore/y2-c8-session5-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-5/explore/y2-c8-session5-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-8/session-5/explore-y2-c8-s5-page-01.jpg",
          "Curiosity Kickoff",
          "IR Object Detection & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-5/explore-y2-c8-s5-page-09.jpg",
          "Project Setup",
          "Advanced project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-5/explore-y2-c8-s5-page-10.jpg",
          "Main Code",
          "IR Object Detection & Alert source PDF code page.",
          "y2c8s5-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-5/explore-y2-c8-s5-page-11.jpg",
          "Learning Page",
          "IR Object Detection & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-5/explore-y2-c8-s5-page-12.jpg",
          "Try This Yourself",
          "IR Object Detection & Alert source PDF practice page.",
          "y2c8s5-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-5/explore-y2-c8-s5-page-13.jpg",
          "Learning Page",
          "IR Object Detection & Alert source PDF page."
        ]
      ],
      "codes": {
        "y2c8s5-explore-main-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
        "y2c8s5-explore-try-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the IR object detection input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 5 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-5/hardware-01.png",
            "IR Sensor",
            "IR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-02.png",
            "Object Detection",
            "Object Detection is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how object detection changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-03.png",
            "Buzzer/Servo Output",
            "Buzzer/Servo Output is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer/servo output changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-04.png",
            "Distance Trigger",
            "Distance Trigger is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how distance trigger changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Advanced Build: Session 5 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-02.jpg",
        "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-5/elaborate/y2-c8-session5-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-22.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-23.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-24.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 5 Elaborate PDF.",
              "y2c8s5-elaborate-project1-code"
            ]
          ],
          "working": "This build applies IR Object Detection & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-5/elaborate/y2-c8-session5-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-25.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-26.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-27.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-5/elaborate-y2-c8-s5-page-28.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 5 Elaborate PDF.",
              "y2c8s5-elaborate-project2-code"
            ]
          ],
          "working": "This build applies IR Object Detection & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c8s5-elaborate-project1-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
        "y2c8s5-elaborate-project2-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for IR Obstacle Detector.",
      "challengeCode": "#define IR_PIN ____\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 5 focused on?",
          [
            "IR Obstacle Detector",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "IR Object Detection & Alert",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-5": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 5",
    "topic": "IR Object Detection & Alert",
    "cover": "assets/images/pdf/year-2/session-5-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of IR Object Detection & Alert. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to IR Object Detection & Alert because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect IR Object Detection & Alert to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Intelligent Object Monitor",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-5/explore/y2-c9-session5-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-5/explore/y2-c9-session5-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-9/session-5/explore-y2-c9-s5-page-01.jpg",
          "Curiosity Kickoff",
          "IR Object Detection & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-5/explore-y2-c9-s5-page-14.jpg",
          "Project Setup",
          "Expert project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-5/explore-y2-c9-s5-page-15.jpg",
          "Main Code",
          "IR Object Detection & Alert source PDF code page.",
          "y2c9s5-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-5/explore-y2-c9-s5-page-16.jpg",
          "Learning Page",
          "IR Object Detection & Alert source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-5/explore-y2-c9-s5-page-17.jpg",
          "Try This Yourself",
          "IR Object Detection & Alert source PDF practice page.",
          "y2c9s5-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-5/explore-y2-c9-s5-page-18.jpg",
          "Learning Page",
          "IR Object Detection & Alert source PDF page."
        ]
      ],
      "codes": {
        "y2c9s5-explore-main-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
        "y2c9s5-explore-try-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the IR object detection input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 5 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-5/hardware-01.png",
            "IR Sensor",
            "IR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-02.png",
            "Object Detection",
            "Object Detection is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how object detection changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-03.png",
            "Buzzer/Servo Output",
            "Buzzer/Servo Output is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer/servo output changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-5/hardware-04.png",
            "Distance Trigger",
            "Distance Trigger is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how distance trigger changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Expert Build: Session 5 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-02.jpg",
        "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-5/elaborate/y2-c9-session5-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-29.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-30.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-31.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-32.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 5 Elaborate PDF.",
              "y2c9s5-elaborate-project1-code"
            ]
          ],
          "working": "This build applies IR Object Detection & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-5/elaborate/y2-c9-session5-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-34.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-35.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-5/elaborate-y2-c9-s5-page-36.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 5 Elaborate PDF.",
              "y2c9s5-elaborate-project2-code"
            ]
          ],
          "working": "This build applies IR Object Detection & Alert as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c9s5-elaborate-project1-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
        "y2c9s5-elaborate-project2-code": "#define IR_PIN 2\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Intelligent Object Monitor.",
      "challengeCode": "#define IR_PIN ____\n#define BUZZER_PIN 5\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(BUZZER_PIN, digitalRead(IR_PIN) == LOW ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 5 focused on?",
          [
            "Intelligent Object Monitor",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "IR Object Detection & Alert",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-6-6": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 6",
    "topic": "Servo Motion & Automation",
    "cover": "assets/images/pdf/year-2/session-6-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Servo Motion & Automation. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Servo Motion & Automation to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Servo Motion",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-6/explore/y2-c6-session6-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-6/explore/y2-c6-session6-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-6/session-6/explore-y2-c6-s6-page-01.jpg",
          "Curiosity Kickoff",
          "Servo Motion & Automation source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-6/explore-y2-c6-s6-page-02.jpg",
          "Project Setup",
          "Beginner project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-6/explore-y2-c6-s6-page-03.jpg",
          "Main Code",
          "Servo Motion & Automation source PDF code page.",
          "y2c6s6-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-6/explore-y2-c6-s6-page-04.jpg",
          "Try This Yourself",
          "Servo Motion & Automation source PDF practice page.",
          "y2c6s6-explore-try-code"
        ]
      ],
      "codes": {
        "y2c6s6-explore-main-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
        "y2c6s6-explore-try-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sensor automation input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 6 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-6/hardware-01.png",
            "Smart Sensor",
            "Smart Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how smart sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-02.png",
            "Servo Output",
            "Servo Output is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo output changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-03.png",
            "Display Module",
            "Display Module is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how display module changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-04.png",
            "Automation Logic",
            "Automation Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how automation logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Beginner Build: Session 6 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-02.jpg",
        "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-6/elaborate/y2-c6-session6-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-06.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-07.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-08.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF.",
              "y2c6s6-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Servo Motion & Automation as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-6/elaborate/y2-c6-session6-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-10.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-11.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF.",
              "y2c6s6-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-6/session-6/elaborate-y2-c6-s6-page-12.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ]
          ],
          "working": "This build applies Servo Motion & Automation as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c6s6-elaborate-project1-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
        "y2c6s6-elaborate-project2-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Servo Motion.",
      "challengeCode": "#define SENSOR_PIN ____\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 6 focused on?",
          [
            "Servo Motion",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Servo Motion & Automation",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-6": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 6",
    "topic": "Servo Motion & Automation",
    "cover": "assets/images/pdf/year-2/session-6-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Servo Motion & Automation. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Servo Motion & Automation to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Servo Motion Starter",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-6/explore/y2-c7-session6-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-6/explore/y2-c7-session6-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-7/session-6/explore-y2-c7-s6-page-01.jpg",
          "Curiosity Kickoff",
          "Servo Motion & Automation source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-6/explore-y2-c7-s6-page-05.jpg",
          "Project Setup",
          "Intermediate project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-6/explore-y2-c7-s6-page-06.jpg",
          "Main Code",
          "Servo Motion & Automation source PDF code page.",
          "y2c7s6-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-6/explore-y2-c7-s6-page-07.jpg",
          "Try This Yourself",
          "Servo Motion & Automation source PDF practice page.",
          "y2c7s6-explore-try-code"
        ]
      ],
      "codes": {
        "y2c7s6-explore-main-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
        "y2c7s6-explore-try-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sensor automation input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 6 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-6/hardware-01.png",
            "Smart Sensor",
            "Smart Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how smart sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-02.png",
            "Servo Output",
            "Servo Output is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo output changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-03.png",
            "Display Module",
            "Display Module is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how display module changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-04.png",
            "Automation Logic",
            "Automation Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how automation logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Intermediate Build: Session 6 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-02.jpg",
        "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-6/elaborate/y2-c7-session6-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-13.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-14.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-15.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-16.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF.",
              "y2c7s6-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Servo Motion & Automation as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-6/elaborate/y2-c7-session6-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-17.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-18.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-19.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF.",
              "y2c7s6-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-7/session-6/elaborate-y2-c7-s6-page-20.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ]
          ],
          "working": "This build applies Servo Motion & Automation as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c7s6-elaborate-project1-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
        "y2c7s6-elaborate-project2-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Servo Motion Starter.",
      "challengeCode": "#define SENSOR_PIN ____\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 6 focused on?",
          [
            "Servo Motion Starter",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Servo Motion & Automation",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-6": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 6",
    "topic": "Servo Motion & Automation",
    "cover": "assets/images/pdf/year-2/session-6-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Servo Motion & Automation. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Servo Motion & Automation to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Servo Angle Control",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-6/explore/y2-c8-session6-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-6/explore/y2-c8-session6-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-8/session-6/explore-y2-c8-s6-page-01.jpg",
          "Curiosity Kickoff",
          "Servo Motion & Automation source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-6/explore-y2-c8-s6-page-08.jpg",
          "Project Setup",
          "Advanced project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-6/explore-y2-c8-s6-page-09.jpg",
          "Main Code",
          "Servo Motion & Automation source PDF code page.",
          "y2c8s6-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-6/explore-y2-c8-s6-page-10.jpg",
          "Try This Yourself",
          "Servo Motion & Automation source PDF practice page.",
          "y2c8s6-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-6/explore-y2-c8-s6-page-11.jpg",
          "Learning Page",
          "Servo Motion & Automation source PDF page."
        ]
      ],
      "codes": {
        "y2c8s6-explore-main-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
        "y2c8s6-explore-try-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sensor automation input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 6 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-6/hardware-01.png",
            "Smart Sensor",
            "Smart Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how smart sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-02.png",
            "Servo Output",
            "Servo Output is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo output changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-03.png",
            "Display Module",
            "Display Module is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how display module changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-04.png",
            "Automation Logic",
            "Automation Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how automation logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Advanced Build: Session 6 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-02.jpg",
        "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-6/elaborate/y2-c8-session6-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-22.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-23.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-24.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF.",
              "y2c8s6-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Servo Motion & Automation as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-6/elaborate/y2-c8-session6-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-25.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-26.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-27.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-6/elaborate-y2-c8-s6-page-28.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF.",
              "y2c8s6-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Servo Motion & Automation as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c8s6-elaborate-project1-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
        "y2c8s6-elaborate-project2-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Servo Angle Control.",
      "challengeCode": "#define SENSOR_PIN ____\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 6 focused on?",
          [
            "Servo Angle Control",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Servo Motion & Automation",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-6": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 6",
    "topic": "Servo Motion & Automation",
    "cover": "assets/images/pdf/year-2/session-6-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Servo Motion & Automation. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Servo Motion & Automation because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Servo Motion & Automation to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Precision Servo Logic",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-6/explore/y2-c9-session6-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-6/explore/y2-c9-session6-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-9/session-6/explore-y2-c9-s6-page-01.jpg",
          "Curiosity Kickoff",
          "Servo Motion & Automation source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-6/explore-y2-c9-s6-page-12.jpg",
          "Project Setup",
          "Expert project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-6/explore-y2-c9-s6-page-13.jpg",
          "Main Code",
          "Servo Motion & Automation source PDF code page.",
          "y2c9s6-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-6/explore-y2-c9-s6-page-14.jpg",
          "Try This Yourself",
          "Servo Motion & Automation source PDF practice page.",
          "y2c9s6-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-6/explore-y2-c9-s6-page-15.jpg",
          "Learning Page",
          "Servo Motion & Automation source PDF page."
        ]
      ],
      "codes": {
        "y2c9s6-explore-main-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
        "y2c9s6-explore-try-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sensor automation input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 6 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-6/hardware-01.png",
            "Smart Sensor",
            "Smart Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how smart sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-02.png",
            "Servo Output",
            "Servo Output is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo output changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-03.png",
            "Display Module",
            "Display Module is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how display module changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-6/hardware-04.png",
            "Automation Logic",
            "Automation Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how automation logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Expert Build: Session 6 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-02.jpg",
        "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-6/elaborate/y2-c9-session6-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-29.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-30.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-31.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-32.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF.",
              "y2c9s6-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Servo Motion & Automation as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-6/elaborate/y2-c9-session6-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-34.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-35.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF.",
              "y2c9s6-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-9/session-6/elaborate-y2-c9-s6-page-36.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 6 Elaborate PDF."
            ]
          ],
          "working": "This build applies Servo Motion & Automation as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c9s6-elaborate-project1-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
        "y2c9s6-elaborate-project2-code": "#define SENSOR_PIN 2\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Precision Servo Logic.",
      "challengeCode": "#define SENSOR_PIN ____\n#define SERVO_PIN 3\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(SENSOR_PIN);\n  // Use detected state to control the session output.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 6 focused on?",
          [
            "Precision Servo Logic",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Servo Motion & Automation",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-6-7": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 7",
    "topic": "Digital Display & Counting Logic",
    "cover": "assets/images/pdf/year-2/session-7-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Digital Display & Counting Logic. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Digital Display & Counting Logic to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Beginner Digital Display & Counting Logic",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-7/explore/y2-c6-session7-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-7/explore/y2-c6-session7-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [],
      "codes": {
        "y2c6s7-explore-main-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
        "y2c6s7-explore-try-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the counting and display logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 7 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-7/hardware-01.png",
            "IR Sensor",
            "IR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-02.png",
            "7 Segment Display",
            "7 Segment Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how 7 segment display changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-03.png",
            "Touch Sensor",
            "Touch Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how touch sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-04.png",
            "Counter Logic",
            "Counter Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how counter logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Beginner Build: Session 7 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-02.jpg",
        "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-7/elaborate/y2-c6-session7-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-06.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-07.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-08.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF.",
              "y2c6s7-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Digital Display & Counting Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-7/elaborate/y2-c6-session7-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-10.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-11.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF.",
              "y2c6s7-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-12.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-13.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ]
          ],
          "working": "This build applies Digital Display & Counting Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 3: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-7/elaborate/y2-c6-session7-project3-code.zip",
            "Project 3 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-14.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-15.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-16.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF.",
              "y2c6s7-elaborate-project3-code"
            ],
            [
              "assets/images/pdf/year-2/class-6/session-7/elaborate-y2-c6-s7-page-17.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ]
          ],
          "working": "This build applies Digital Display & Counting Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c6s7-elaborate-project1-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
        "y2c6s7-elaborate-project2-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}\n\n// Try changing one threshold, pin, or output response and test again.",
        "y2c6s7-elaborate-project3-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Beginner Digital Display & Counting Logic.",
      "challengeCode": "#define IR_PIN ____\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 7 focused on?",
          [
            "Beginner Digital Display & Counting Logic",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Digital Display & Counting Logic",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-7": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 7",
    "topic": "Digital Display & Counting Logic",
    "cover": "assets/images/pdf/year-2/session-7-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Digital Display & Counting Logic. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Digital Display & Counting Logic to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Intermediate Digital Display & Counting Logic",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-7/explore/y2-c7-session7-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-7/explore/y2-c7-session7-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [],
      "codes": {
        "y2c7s7-explore-main-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
        "y2c7s7-explore-try-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the counting and display logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 7 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-7/hardware-01.png",
            "IR Sensor",
            "IR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-02.png",
            "7 Segment Display",
            "7 Segment Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how 7 segment display changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-03.png",
            "Touch Sensor",
            "Touch Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how touch sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-04.png",
            "Counter Logic",
            "Counter Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how counter logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Intermediate Build: Session 7 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-7/session-7/elaborate-y2-c7-s7-page-02.jpg",
        "assets/images/pdf/year-2/class-7/session-7/elaborate-y2-c7-s7-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-7/elaborate/y2-c7-session7-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-7/elaborate-y2-c7-s7-page-18.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-7/elaborate-y2-c7-s7-page-19.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-7/elaborate-y2-c7-s7-page-20.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF.",
              "y2c7s7-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-7/session-7/elaborate-y2-c7-s7-page-21.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ]
          ],
          "working": "This build applies Digital Display & Counting Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c7s7-elaborate-project1-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Intermediate Digital Display & Counting Logic.",
      "challengeCode": "#define IR_PIN ____\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 7 focused on?",
          [
            "Intermediate Digital Display & Counting Logic",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Digital Display & Counting Logic",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-7": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 7",
    "topic": "Digital Display & Counting Logic",
    "cover": "assets/images/pdf/year-2/session-7-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Digital Display & Counting Logic. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Digital Display & Counting Logic to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Advanced Digital Display & Counting Logic",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-7/explore/y2-c8-session7-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-7/explore/y2-c8-session7-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [],
      "codes": {
        "y2c8s7-explore-main-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
        "y2c8s7-explore-try-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the counting and display logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 7 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-7/hardware-01.png",
            "IR Sensor",
            "IR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-02.png",
            "7 Segment Display",
            "7 Segment Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how 7 segment display changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-03.png",
            "Touch Sensor",
            "Touch Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how touch sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-04.png",
            "Counter Logic",
            "Counter Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how counter logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Advanced Build: Session 7 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-02.jpg",
        "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-7/elaborate/y2-c8-session7-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-22.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-23.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-24.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-25.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF.",
              "y2c8s7-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-26.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-27.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ]
          ],
          "working": "This build applies Digital Display & Counting Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-7/elaborate/y2-c8-session7-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-28.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-29.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-30.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF.",
              "y2c8s7-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-31.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-7/elaborate-y2-c8-s7-page-32.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ]
          ],
          "working": "This build applies Digital Display & Counting Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c8s7-elaborate-project1-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
        "y2c8s7-elaborate-project2-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Advanced Digital Display & Counting Logic.",
      "challengeCode": "#define IR_PIN ____\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 7 focused on?",
          [
            "Advanced Digital Display & Counting Logic",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Digital Display & Counting Logic",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-7": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 7",
    "topic": "Digital Display & Counting Logic",
    "cover": "assets/images/pdf/year-2/session-7-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Digital Display & Counting Logic. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Digital Display & Counting Logic because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Digital Display & Counting Logic to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Expert Digital Display & Counting Logic",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-7/explore/y2-c9-session7-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-7/explore/y2-c9-session7-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [],
      "codes": {
        "y2c9s7-explore-main-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
        "y2c9s7-explore-try-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the counting and display logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 7 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-7/hardware-01.png",
            "IR Sensor",
            "IR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-02.png",
            "7 Segment Display",
            "7 Segment Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how 7 segment display changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-03.png",
            "Touch Sensor",
            "Touch Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how touch sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-7/hardware-04.png",
            "Counter Logic",
            "Counter Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how counter logic changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Expert Build: Session 7 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-02.jpg",
        "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-7/elaborate/y2-c9-session7-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-34.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-35.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF.",
              "y2c9s7-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-36.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-37.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ]
          ],
          "working": "This build applies Digital Display & Counting Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        },
        {
          "title": "Project 2: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-7/elaborate/y2-c9-session7-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-38.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-39.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-40.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF.",
              "y2c9s7-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-41.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-7/elaborate-y2-c9-s7-page-42.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 7 Elaborate PDF."
            ]
          ],
          "working": "This build applies Digital Display & Counting Logic as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c9s7-elaborate-project1-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
        "y2c9s7-elaborate-project2-code": "#define IR_PIN 2\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Expert Digital Display & Counting Logic.",
      "challengeCode": "#define IR_PIN ____\n#define CLK 8\n#define DIO 9\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n}\n\nvoid loop() {\n  int detected = digitalRead(IR_PIN);\n  // Update the display when detection changes.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 7 focused on?",
          [
            "Expert Digital Display & Counting Logic",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Digital Display & Counting Logic",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-6-8": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 8",
    "topic": "Touch Control & RGB / PWM Output",
    "cover": "assets/images/pdf/year-2/session-8-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Touch Control & RGB / PWM Output. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Touch Control & RGB / PWM Output to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Touch Sense",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-8/explore/y2-c6-session8-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-8/explore/y2-c6-session8-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-6/session-8/explore-y2-c6-s8-page-01.jpg",
          "Curiosity Kickoff",
          "Touch Control & RGB / PWM Output source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-8/explore-y2-c6-s8-page-02.jpg",
          "Project Setup",
          "Beginner project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-8/explore-y2-c6-s8-page-03.jpg",
          "Main Code",
          "Touch Control & RGB / PWM Output source PDF code page.",
          "y2c6s8-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-8/explore-y2-c6-s8-page-04.jpg",
          "Try This Yourself",
          "Touch Control & RGB / PWM Output source PDF practice page.",
          "y2c6s8-explore-try-code"
        ]
      ],
      "codes": {
        "y2c6s8-explore-main-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
        "y2c6s8-explore-try-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the safety override logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 8 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-8/hardware-01.png",
            "IR/Tilt/LDR Sensor",
            "IR/Tilt/LDR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir/tilt/ldr sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-02.png",
            "Push Button Override",
            "Push Button Override is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how push button override changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-03.png",
            "Display Module",
            "Display Module is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how display module changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-04.png",
            "Buzzer Safety",
            "Buzzer Safety is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer safety changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Beginner Build: Session 8 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-6/session-8/elaborate-y2-c6-s8-page-02.jpg",
        "assets/images/pdf/year-2/class-6/session-8/elaborate-y2-c6-s8-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-8/elaborate/y2-c6-session8-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-8/elaborate-y2-c6-s8-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-8/elaborate-y2-c6-s8-page-06.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-8/elaborate-y2-c6-s8-page-07.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-8/elaborate-y2-c6-s8-page-08.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 8 Elaborate PDF.",
              "y2c6s8-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Touch Control & RGB / PWM Output as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c6s8-elaborate-project1-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Touch Sense.",
      "challengeCode": "#define IR_PIN ____\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 8 focused on?",
          [
            "Touch Sense",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Touch Control & RGB / PWM Output",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-8": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 8",
    "topic": "Touch Control & RGB / PWM Output",
    "cover": "assets/images/pdf/year-2/session-8-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Touch Control & RGB / PWM Output. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Touch Control & RGB / PWM Output to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Touch Fade Controller",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-8/explore/y2-c7-session8-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-8/explore/y2-c7-session8-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-7/session-8/explore-y2-c7-s8-page-01.jpg",
          "Curiosity Kickoff",
          "Touch Control & RGB / PWM Output source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-8/explore-y2-c7-s8-page-05.jpg",
          "Project Setup",
          "Intermediate project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-8/explore-y2-c7-s8-page-06.jpg",
          "Main Code",
          "Touch Control & RGB / PWM Output source PDF code page.",
          "y2c7s8-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-8/explore-y2-c7-s8-page-07.jpg",
          "Try This Yourself",
          "Touch Control & RGB / PWM Output source PDF practice page.",
          "y2c7s8-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-8/explore-y2-c7-s8-page-08.jpg",
          "Learning Page",
          "Touch Control & RGB / PWM Output source PDF page."
        ]
      ],
      "codes": {
        "y2c7s8-explore-main-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
        "y2c7s8-explore-try-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the safety override logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 8 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-8/hardware-01.png",
            "IR/Tilt/LDR Sensor",
            "IR/Tilt/LDR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir/tilt/ldr sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-02.png",
            "Push Button Override",
            "Push Button Override is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how push button override changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-03.png",
            "Display Module",
            "Display Module is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how display module changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-04.png",
            "Buzzer Safety",
            "Buzzer Safety is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer safety changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Intermediate Build: Session 8 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-7/session-8/elaborate-y2-c7-s8-page-02.jpg",
        "assets/images/pdf/year-2/class-7/session-8/elaborate-y2-c7-s8-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 7 Build",
          "download": [
            "assets/downloads/year-2/class-7/session-8/elaborate/y2-c7-session8-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-7/session-8/elaborate-y2-c7-s8-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-8/elaborate-y2-c7-s8-page-10.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-8/elaborate-y2-c7-s8-page-11.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-8/elaborate-y2-c7-s8-page-12.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-7/session-8/elaborate-y2-c7-s8-page-13.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 8 Elaborate PDF.",
              "y2c7s8-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-7/session-8/elaborate-y2-c7-s8-page-14.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ]
          ],
          "working": "This build applies Touch Control & RGB / PWM Output as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c7s8-elaborate-project1-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Touch Fade Controller.",
      "challengeCode": "#define IR_PIN ____\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 8 focused on?",
          [
            "Touch Fade Controller",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Touch Control & RGB / PWM Output",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-8": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 8",
    "topic": "Touch Control & RGB / PWM Output",
    "cover": "assets/images/pdf/year-2/session-8-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Touch Control & RGB / PWM Output. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Touch Control & RGB / PWM Output to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Touch Activated LEDs",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-8/explore/y2-c8-session8-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-8/explore/y2-c8-session8-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-8/session-8/explore-y2-c8-s8-page-01.jpg",
          "Curiosity Kickoff",
          "Touch Control & RGB / PWM Output source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-8/explore-y2-c8-s8-page-09.jpg",
          "Project Setup",
          "Advanced project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-8/explore-y2-c8-s8-page-10.jpg",
          "Main Code",
          "Touch Control & RGB / PWM Output source PDF code page.",
          "y2c8s8-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-8/explore-y2-c8-s8-page-11.jpg",
          "Try This Yourself",
          "Touch Control & RGB / PWM Output source PDF practice page.",
          "y2c8s8-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-8/explore-y2-c8-s8-page-12.jpg",
          "Learning Page",
          "Touch Control & RGB / PWM Output source PDF page."
        ]
      ],
      "codes": {
        "y2c8s8-explore-main-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
        "y2c8s8-explore-try-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the safety override logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 8 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-8/hardware-01.png",
            "IR/Tilt/LDR Sensor",
            "IR/Tilt/LDR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir/tilt/ldr sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-02.png",
            "Push Button Override",
            "Push Button Override is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how push button override changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-03.png",
            "Display Module",
            "Display Module is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how display module changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-04.png",
            "Buzzer Safety",
            "Buzzer Safety is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer safety changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Advanced Build: Session 8 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-8/session-8/elaborate-y2-c8-s8-page-02.jpg",
        "assets/images/pdf/year-2/class-8/session-8/elaborate-y2-c8-s8-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 8 Build",
          "download": [
            "assets/downloads/year-2/class-8/session-8/elaborate/y2-c8-session8-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-8/session-8/elaborate-y2-c8-s8-page-15.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-8/elaborate-y2-c8-s8-page-16.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-8/elaborate-y2-c8-s8-page-17.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-8/session-8/elaborate-y2-c8-s8-page-18.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 8 Elaborate PDF.",
              "y2c8s8-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-8/session-8/elaborate-y2-c8-s8-page-19.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ]
          ],
          "working": "This build applies Touch Control & RGB / PWM Output as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c8s8-elaborate-project1-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Touch Activated LEDs.",
      "challengeCode": "#define IR_PIN ____\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 8 focused on?",
          [
            "Touch Activated LEDs",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Touch Control & RGB / PWM Output",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-8": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 8",
    "topic": "Touch Control & RGB / PWM Output",
    "cover": "assets/images/pdf/year-2/session-8-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Touch Control & RGB / PWM Output. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Touch Control & RGB / PWM Output because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Touch Control & RGB / PWM Output to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Smart Touch Interface",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-8/explore/y2-c9-session8-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-8/explore/y2-c9-session8-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-9/session-8/explore-y2-c9-s8-page-01.jpg",
          "Curiosity Kickoff",
          "Touch Control & RGB / PWM Output source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-8/explore-y2-c9-s8-page-13.jpg",
          "Project Setup",
          "Expert project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-8/explore-y2-c9-s8-page-14.jpg",
          "Main Code",
          "Touch Control & RGB / PWM Output source PDF code page.",
          "y2c9s8-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-8/explore-y2-c9-s8-page-15.jpg",
          "Learning Page",
          "Touch Control & RGB / PWM Output source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-8/explore-y2-c9-s8-page-16.jpg",
          "Try This Yourself",
          "Touch Control & RGB / PWM Output source PDF practice page.",
          "y2c9s8-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-8/explore-y2-c9-s8-page-17.jpg",
          "Learning Page",
          "Touch Control & RGB / PWM Output source PDF page."
        ]
      ],
      "codes": {
        "y2c9s8-explore-main-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
        "y2c9s8-explore-try-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the safety override logic input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 8 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-8/hardware-01.png",
            "IR/Tilt/LDR Sensor",
            "IR/Tilt/LDR Sensor is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how ir/tilt/ldr sensor changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-02.png",
            "Push Button Override",
            "Push Button Override is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how push button override changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-03.png",
            "Display Module",
            "Display Module is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how display module changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-8/hardware-04.png",
            "Buzzer Safety",
            "Buzzer Safety is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer safety changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Expert Build: Session 8 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-9/session-8/elaborate-y2-c9-s8-page-02.jpg",
        "assets/images/pdf/year-2/class-9/session-8/elaborate-y2-c9-s8-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 9 Build",
          "download": [
            "assets/downloads/year-2/class-9/session-8/elaborate/y2-c9-session8-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-9/session-8/elaborate-y2-c9-s8-page-20.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-8/elaborate-y2-c9-s8-page-21.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-8/elaborate-y2-c9-s8-page-22.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-9/session-8/elaborate-y2-c9-s8-page-23.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 8 Elaborate PDF.",
              "y2c9s8-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-9/session-8/elaborate-y2-c9-s8-page-24.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 8 Elaborate PDF."
            ]
          ],
          "working": "This build applies Touch Control & RGB / PWM Output as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c9s8-elaborate-project1-code": "#define IR_PIN 2\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Smart Touch Interface.",
      "challengeCode": "#define IR_PIN ____\n#define PUSH_PIN 5\n#define BUZZER_PIN 7\n\nvoid setup() {\n  pinMode(IR_PIN, INPUT);\n  pinMode(PUSH_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n  bool alert = digitalRead(IR_PIN) == LOW && digitalRead(PUSH_PIN) == HIGH;\n  digitalWrite(BUZZER_PIN, alert ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 8 focused on?",
          [
            "Smart Touch Interface",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Touch Control & RGB / PWM Output",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-6-9": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 9",
    "topic": "Laser / Multi-Trigger Security System",
    "cover": "assets/images/pdf/year-2/session-9-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Laser / Multi-Trigger Security System. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Laser / Multi-Trigger Security System to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Laser Beam Alert",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-9/explore/y2-c6-session9-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-9/explore/y2-c6-session9-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-6/session-9/explore-y2-c6-s9-page-01.jpg",
          "Curiosity Kickoff",
          "Laser / Multi-Trigger Security System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-9/explore-y2-c6-s9-page-02.jpg",
          "Project Setup",
          "Beginner project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-9/explore-y2-c6-s9-page-03.jpg",
          "Main Code",
          "Laser / Multi-Trigger Security System source PDF code page.",
          "y2c6s9-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-9/explore-y2-c6-s9-page-04.jpg",
          "Try This Yourself",
          "Laser / Multi-Trigger Security System source PDF practice page.",
          "y2c6s9-explore-try-code"
        ]
      ],
      "codes": {
        "y2c6s9-explore-main-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
        "y2c6s9-explore-try-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sensor-controlled smart model input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 9 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-9/hardware-01.png",
            "Servo Gate",
            "Servo Gate is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo gate changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-02.png",
            "Sensor Counter",
            "Sensor Counter is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sensor counter changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-03.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-04.png",
            "Smart Display",
            "Smart Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how smart display changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Beginner Build: Session 9 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-02.jpg",
        "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Project 1: Level 2 Sensational Sensors Class 6 Build",
          "download": [
            "assets/downloads/year-2/class-6/session-9/elaborate/y2-c6-session9-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-06.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-07.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 9 Elaborate PDF.",
              "y2c6s9-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-08.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-09.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-10.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-11.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-12.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-13.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-14.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-15.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-16.jpg",
              "Build Step",
              "Build Step from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-17.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/year-2/class-6/session-9/elaborate-y2-c6-s9-page-18.jpg",
              "Code File Page",
              "Code File Page from the Level 2 Sensational Sensors Session 9 Elaborate PDF."
            ]
          ],
          "working": "This build applies Laser / Multi-Trigger Security System as a Level 2 Sensational Sensors smart-system model. Students assemble the PDF parts, upload the code, and observe the sensor-driven response."
        }
      ],
      "codes": {
        "y2c6s9-elaborate-project1-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Laser Beam Alert.",
      "challengeCode": "#define SENSOR_PIN ____\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 9 focused on?",
          [
            "Laser Beam Alert",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Laser / Multi-Trigger Security System",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-9": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 9",
    "topic": "Laser / Multi-Trigger Security System",
    "cover": "assets/images/pdf/year-2/session-9-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Laser / Multi-Trigger Security System. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Laser / Multi-Trigger Security System to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Laser Security Shield",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-9/explore/y2-c7-session9-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-9/explore/y2-c7-session9-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-7/session-9/explore-y2-c7-s9-page-01.jpg",
          "Curiosity Kickoff",
          "Laser / Multi-Trigger Security System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-9/explore-y2-c7-s9-page-05.jpg",
          "Project Setup",
          "Intermediate project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-9/explore-y2-c7-s9-page-06.jpg",
          "Main Code",
          "Laser / Multi-Trigger Security System source PDF code page.",
          "y2c7s9-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-9/explore-y2-c7-s9-page-07.jpg",
          "Try This Yourself",
          "Laser / Multi-Trigger Security System source PDF practice page.",
          "y2c7s9-explore-try-code"
        ]
      ],
      "codes": {
        "y2c7s9-explore-main-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
        "y2c7s9-explore-try-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sensor-controlled smart model input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 9 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-9/hardware-01.png",
            "Servo Gate",
            "Servo Gate is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo gate changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-02.png",
            "Sensor Counter",
            "Sensor Counter is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sensor counter changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-03.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-04.png",
            "Smart Display",
            "Smart Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how smart display changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Intermediate Build: Session 9 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-7/session-9/elaborate-y2-c7-s9-page-02.jpg",
        "assets/images/pdf/year-2/class-7/session-9/elaborate-y2-c7-s9-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Level 2 Sensational Sensors Class 7 Build Pending",
          "download": null,
          "pages": [],
          "working": "The Elaborate PDF for this session is not in the workspace yet. Add it later and regenerate the content to show physical build pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Laser Security Shield.",
      "challengeCode": "#define SENSOR_PIN ____\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 9 focused on?",
          [
            "Laser Security Shield",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Laser / Multi-Trigger Security System",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-9": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 9",
    "topic": "Laser / Multi-Trigger Security System",
    "cover": "assets/images/pdf/year-2/session-9-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Laser / Multi-Trigger Security System. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Laser / Multi-Trigger Security System to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Smart Security Panel",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-9/explore/y2-c8-session9-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-9/explore/y2-c8-session9-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-8/session-9/explore-y2-c8-s9-page-01.jpg",
          "Curiosity Kickoff",
          "Laser / Multi-Trigger Security System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-9/explore-y2-c8-s9-page-08.jpg",
          "Project Setup",
          "Advanced project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-9/explore-y2-c8-s9-page-09.jpg",
          "Main Code",
          "Laser / Multi-Trigger Security System source PDF code page.",
          "y2c8s9-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-9/explore-y2-c8-s9-page-10.jpg",
          "Learning Page",
          "Laser / Multi-Trigger Security System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-9/explore-y2-c8-s9-page-11.jpg",
          "Try This Yourself",
          "Laser / Multi-Trigger Security System source PDF practice page.",
          "y2c8s9-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-9/explore-y2-c8-s9-page-12.jpg",
          "Learning Page",
          "Laser / Multi-Trigger Security System source PDF page."
        ]
      ],
      "codes": {
        "y2c8s9-explore-main-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
        "y2c8s9-explore-try-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sensor-controlled smart model input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 9 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-9/hardware-01.png",
            "Servo Gate",
            "Servo Gate is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo gate changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-02.png",
            "Sensor Counter",
            "Sensor Counter is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sensor counter changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-03.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-04.png",
            "Smart Display",
            "Smart Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how smart display changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Advanced Build: Session 9 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-8/session-9/elaborate-y2-c8-s9-page-02.jpg",
        "assets/images/pdf/year-2/class-8/session-9/elaborate-y2-c8-s9-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Level 2 Sensational Sensors Class 8 Build Pending",
          "download": null,
          "pages": [],
          "working": "The Elaborate PDF for this session is not in the workspace yet. Add it later and regenerate the content to show physical build pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Smart Security Panel.",
      "challengeCode": "#define SENSOR_PIN ____\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 9 focused on?",
          [
            "Smart Security Panel",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Laser / Multi-Trigger Security System",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-9": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 9",
    "topic": "Laser / Multi-Trigger Security System",
    "cover": "assets/images/pdf/year-2/session-9-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Laser / Multi-Trigger Security System. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Laser / Multi-Trigger Security System because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Laser / Multi-Trigger Security System to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Multi Sensor Fusion System",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-9/explore/y2-c9-session9-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-9/explore/y2-c9-session9-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-9/session-9/explore-y2-c9-s9-page-01.jpg",
          "Curiosity Kickoff",
          "Laser / Multi-Trigger Security System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-9/explore-y2-c9-s9-page-13.jpg",
          "Project Setup",
          "Expert project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-9/explore-y2-c9-s9-page-14.jpg",
          "Main Code",
          "Laser / Multi-Trigger Security System source PDF code page.",
          "y2c9s9-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-9/explore-y2-c9-s9-page-15.jpg",
          "Learning Page",
          "Laser / Multi-Trigger Security System source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-9/explore-y2-c9-s9-page-16.jpg",
          "Try This Yourself",
          "Laser / Multi-Trigger Security System source PDF practice page.",
          "y2c9s9-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-9/explore-y2-c9-s9-page-17.jpg",
          "Learning Page",
          "Laser / Multi-Trigger Security System source PDF page."
        ]
      ],
      "codes": {
        "y2c9s9-explore-main-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
        "y2c9s9-explore-try-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the sensor-controlled smart model input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 9 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-9/hardware-01.png",
            "Servo Gate",
            "Servo Gate is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how servo gate changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-02.png",
            "Sensor Counter",
            "Sensor Counter is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sensor counter changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-03.png",
            "Buzzer Alert",
            "Buzzer Alert is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how buzzer alert changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-9/hardware-04.png",
            "Smart Display",
            "Smart Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how smart display changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Level 2 Sensational Sensors Expert Build: Session 9 source assembly pages",
      "materials": [
        "assets/images/pdf/year-2/class-9/session-9/elaborate-y2-c9-s9-page-02.jpg",
        "assets/images/pdf/year-2/class-9/session-9/elaborate-y2-c9-s9-page-03.jpg"
      ],
      "projects": [
        {
          "title": "Level 2 Sensational Sensors Class 9 Build Pending",
          "download": null,
          "pages": [],
          "working": "The Elaborate PDF for this session is not in the workspace yet. Add it later and regenerate the content to show physical build pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Multi Sensor Fusion System.",
      "challengeCode": "#define SENSOR_PIN ____\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int state = digitalRead(SENSOR_PIN);\n  // Show state or count on display.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 9 focused on?",
          [
            "Multi Sensor Fusion System",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Laser / Multi-Trigger Security System",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-6-10": {
    "year": "Level 2 Sensational Sensors",
    "grade": "6th Class",
    "tier": "Beginner",
    "session": "Session 10",
    "topic": "Integrated Smart System Capstone",
    "cover": "assets/images/pdf/year-2/session-10-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Integrated Smart System Capstone. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Integrated Smart System Capstone to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Sensor Timer System",
      "downloads": [
        [
          "assets/downloads/year-2/class-6/session-10/explore/y2-c6-session10-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-6/session-10/explore/y2-c6-session10-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-6/session-10/explore-y2-c6-s10-page-01.jpg",
          "Curiosity Kickoff",
          "Integrated Smart System Capstone source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-10/explore-y2-c6-s10-page-02.jpg",
          "Project Setup",
          "Beginner project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-10/explore-y2-c6-s10-page-03.jpg",
          "Main Code",
          "Integrated Smart System Capstone source PDF code page.",
          "y2c6s10-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-10/explore-y2-c6-s10-page-04.jpg",
          "Learning Page",
          "Integrated Smart System Capstone source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-6/session-10/explore-y2-c6-s10-page-05.jpg",
          "Try This Yourself",
          "Integrated Smart System Capstone source PDF practice page.",
          "y2c6s10-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-6/session-10/explore-y2-c6-s10-page-06.jpg",
          "Learning Page",
          "Integrated Smart System Capstone source PDF page."
        ]
      ],
      "codes": {
        "y2c6s10-explore-main-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
        "y2c6s10-explore-try-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the integrated capstone response input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 10 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-10/hardware-01.png",
            "Integrated Sensors",
            "Integrated Sensors is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how integrated sensors changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-02.png",
            "TM1637 Display",
            "TM1637 Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how tm1637 display changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-03.png",
            "Sound/Light Logic",
            "Sound/Light Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sound/light logic changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-04.png",
            "Capstone System",
            "Capstone System is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how capstone system changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Elaborate PDF pending for this session.",
      "materials": [
        [
          "assets/images/pdf/year-2/session-10-cover.jpg",
          "Elaborate PDF Pending",
          "Add the Session 10 Elaborate PDF later to unlock physical build source pages."
        ],
        [
          "assets/images/pdf/year-2/session-10-cover.jpg",
          "Materials Pending",
          "The material list will be rendered from the Elaborate PDF after it is added."
        ]
      ],
      "projects": [
        {
          "title": "Level 2 Sensational Sensors Class 6 Build Pending",
          "download": null,
          "pages": [],
          "working": "The Elaborate PDF for this session is not in the workspace yet. Add it later and regenerate the content to show physical build pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Sensor Timer System.",
      "challengeCode": "#define SENSOR_PIN ____\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 6 Session 10 focused on?",
          [
            "Sensor Timer System",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Integrated Smart System Capstone",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-7-10": {
    "year": "Level 2 Sensational Sensors",
    "grade": "7th Class",
    "tier": "Intermediate",
    "session": "Session 10",
    "topic": "Integrated Smart System Capstone",
    "cover": "assets/images/pdf/year-2/session-10-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Integrated Smart System Capstone. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Integrated Smart System Capstone to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Sensor Logic Challenge",
      "downloads": [
        [
          "assets/downloads/year-2/class-7/session-10/explore/y2-c7-session10-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-7/session-10/explore/y2-c7-session10-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-7/session-10/explore-y2-c7-s10-page-01.jpg",
          "Curiosity Kickoff",
          "Integrated Smart System Capstone source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-10/explore-y2-c7-s10-page-07.jpg",
          "Project Setup",
          "Intermediate project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-7/session-10/explore-y2-c7-s10-page-08.jpg",
          "Main Code",
          "Integrated Smart System Capstone source PDF code page.",
          "y2c7s10-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-7/session-10/explore-y2-c7-s10-page-09.jpg",
          "Try This Yourself",
          "Integrated Smart System Capstone source PDF practice page.",
          "y2c7s10-explore-try-code"
        ]
      ],
      "codes": {
        "y2c7s10-explore-main-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
        "y2c7s10-explore-try-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the integrated capstone response input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 10 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-10/hardware-01.png",
            "Integrated Sensors",
            "Integrated Sensors is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how integrated sensors changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-02.png",
            "TM1637 Display",
            "TM1637 Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how tm1637 display changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-03.png",
            "Sound/Light Logic",
            "Sound/Light Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sound/light logic changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-04.png",
            "Capstone System",
            "Capstone System is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how capstone system changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Elaborate PDF pending for this session.",
      "materials": [
        [
          "assets/images/pdf/year-2/session-10-cover.jpg",
          "Elaborate PDF Pending",
          "Add the Session 10 Elaborate PDF later to unlock physical build source pages."
        ],
        [
          "assets/images/pdf/year-2/session-10-cover.jpg",
          "Materials Pending",
          "The material list will be rendered from the Elaborate PDF after it is added."
        ]
      ],
      "projects": [
        {
          "title": "Level 2 Sensational Sensors Class 7 Build Pending",
          "download": null,
          "pages": [],
          "working": "The Elaborate PDF for this session is not in the workspace yet. Add it later and regenerate the content to show physical build pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Sensor Logic Challenge.",
      "challengeCode": "#define SENSOR_PIN ____\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 7 Session 10 focused on?",
          [
            "Sensor Logic Challenge",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Integrated Smart System Capstone",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-8-10": {
    "year": "Level 2 Sensational Sensors",
    "grade": "8th Class",
    "tier": "Advanced",
    "session": "Session 10",
    "topic": "Integrated Smart System Capstone",
    "cover": "assets/images/pdf/year-2/session-10-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Integrated Smart System Capstone. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Integrated Smart System Capstone to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Integrated Smart System",
      "downloads": [
        [
          "assets/downloads/year-2/class-8/session-10/explore/y2-c8-session10-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-8/session-10/explore/y2-c8-session10-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-8/session-10/explore-y2-c8-s10-page-01.jpg",
          "Curiosity Kickoff",
          "Integrated Smart System Capstone source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-10/explore-y2-c8-s10-page-10.jpg",
          "Project Setup",
          "Advanced project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-8/session-10/explore-y2-c8-s10-page-11.jpg",
          "Main Code",
          "Integrated Smart System Capstone source PDF code page.",
          "y2c8s10-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-8/session-10/explore-y2-c8-s10-page-12.jpg",
          "Try This Yourself",
          "Integrated Smart System Capstone source PDF practice page.",
          "y2c8s10-explore-try-code"
        ]
      ],
      "codes": {
        "y2c8s10-explore-main-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
        "y2c8s10-explore-try-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the integrated capstone response input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 10 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-10/hardware-01.png",
            "Integrated Sensors",
            "Integrated Sensors is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how integrated sensors changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-02.png",
            "TM1637 Display",
            "TM1637 Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how tm1637 display changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-03.png",
            "Sound/Light Logic",
            "Sound/Light Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sound/light logic changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-04.png",
            "Capstone System",
            "Capstone System is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how capstone system changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Elaborate PDF pending for this session.",
      "materials": [
        [
          "assets/images/pdf/year-2/session-10-cover.jpg",
          "Elaborate PDF Pending",
          "Add the Session 10 Elaborate PDF later to unlock physical build source pages."
        ],
        [
          "assets/images/pdf/year-2/session-10-cover.jpg",
          "Materials Pending",
          "The material list will be rendered from the Elaborate PDF after it is added."
        ]
      ],
      "projects": [
        {
          "title": "Level 2 Sensational Sensors Class 8 Build Pending",
          "download": null,
          "pages": [],
          "working": "The Elaborate PDF for this session is not in the workspace yet. Add it later and regenerate the content to show physical build pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Integrated Smart System.",
      "challengeCode": "#define SENSOR_PIN ____\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 8 Session 10 focused on?",
          [
            "Integrated Smart System",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Integrated Smart System Capstone",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  },
  "2-9-10": {
    "year": "Level 2 Sensational Sensors",
    "grade": "9th Class",
    "tier": "Expert",
    "session": "Session 10",
    "topic": "Integrated Smart System Capstone",
    "cover": "assets/images/pdf/year-2/session-10-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-world applications of Integrated Smart System Capstone. These examples prepare students for the same smart-system logic in the project.",
      "triggers": [
        [
          "",
          "Smart streetlight",
          "Where do we see smart streetlight in real life?",
          "Smart streetlight connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Security alert",
          "Where do we see security alert in real life?",
          "Security alert connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Automatic gate",
          "Where do we see automatic gate in real life?",
          "Automatic gate connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Interactive display",
          "Where do we see interactive display in real life?",
          "Interactive display connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ],
        [
          "",
          "Safety warning system",
          "Where do we see safety warning system in real life?",
          "Safety warning system connects to Integrated Smart System Capstone because it uses sensing, logic, display, light, sound, or motion response."
        ]
      ],
      "objectives": [
        "Connect Integrated Smart System Capstone to real applications.",
        "Identify the main sensor and output behavior.",
        "Prepare for source Explore and Elaborate pages.",
        "Understand how Level 2 Sensational Sensors systems combine inputs and outputs.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Advanced Integration Model",
      "downloads": [
        [
          "assets/downloads/year-2/class-9/session-10/explore/y2-c9-session10-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/year-2/class-9/session-10/explore/y2-c9-session10-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/year-2/class-9/session-10/explore-y2-c9-s10-page-01.jpg",
          "Curiosity Kickoff",
          "Integrated Smart System Capstone source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-10/explore-y2-c9-s10-page-13.jpg",
          "Project Setup",
          "Expert project setup and materials from the Explore PDF."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-10/explore-y2-c9-s10-page-14.jpg",
          "Main Code",
          "Integrated Smart System Capstone source PDF code page.",
          "y2c9s10-explore-main-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-10/explore-y2-c9-s10-page-15.jpg",
          "Learning Page",
          "Integrated Smart System Capstone source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-10/explore-y2-c9-s10-page-16.jpg",
          "Try This Yourself",
          "Integrated Smart System Capstone source PDF practice page.",
          "y2c9s10-explore-try-code"
        ],
        [
          "assets/images/pdf/year-2/class-9/session-10/explore-y2-c9-s10-page-17.jpg",
          "Learning Page",
          "Integrated Smart System Capstone source PDF page."
        ],
        [
          "assets/images/pdf/year-2/class-9/session-10/explore-y2-c9-s10-page-18.jpg",
          "Learning Page",
          "Integrated Smart System Capstone source PDF page."
        ]
      ],
      "codes": {
        "y2c9s10-explore-main-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
        "y2c9s10-explore-try-code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}\n\n// Try changing one threshold, pin, or output response and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "#define SENSOR_PIN 2\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
      "steps": [
        [
          "Read the input",
          "The project starts by reading the integrated capstone response input from the connected sensor."
        ],
        [
          "Process the condition",
          "Arduino compares the input with a condition or threshold."
        ],
        [
          "Trigger the output",
          "The system responds using an LED, buzzer, servo, or display."
        ],
        [
          "Repeat continuously",
          "loop() keeps checking the input so the model stays interactive."
        ],
        [
          "Test physically",
          "Students change the real-world condition and observe the output response."
        ]
      ],
      "hardware": {
        "title": "Level 2 Sensational Sensors Session 10 Hardware Explanation",
        "intro": "This hardware explanation is shared across Classes 6, 7, 8, and 9 for this Level 2 Sensational Sensors session. The projects become more complex by class, but the core component behavior remains the same.",
        "items": [
          [
            "assets/images/hardware-y2/session-10/hardware-01.png",
            "Integrated Sensors",
            "Integrated Sensors is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how integrated sensors changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-02.png",
            "TM1637 Display",
            "TM1637 Display is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how tm1637 display changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-03.png",
            "Sound/Light Logic",
            "Sound/Light Logic is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how sound/light logic changes the system response when the input condition changes or the output is triggered."
          ],
          [
            "assets/images/hardware-y2/session-10/hardware-04.png",
            "Capstone System",
            "Capstone System is used as part of the Level 2 Sensational Sensors smart-system activity. It connects the physical world to Arduino through sensing, display, movement, sound, or light output.",
            "In the project, students observe how capstone system changes the system response when the input condition changes or the output is triggered."
          ]
        ]
      }
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Elaborate PDF pending for this session.",
      "materials": [
        [
          "assets/images/pdf/year-2/session-10-cover.jpg",
          "Elaborate PDF Pending",
          "Add the Session 10 Elaborate PDF later to unlock physical build source pages."
        ],
        [
          "assets/images/pdf/year-2/session-10-cover.jpg",
          "Materials Pending",
          "The material list will be rendered from the Elaborate PDF after it is added."
        ]
      ],
      "projects": [
        {
          "title": "Level 2 Sensational Sensors Class 9 Build Pending",
          "download": null,
          "pages": [],
          "working": "The Elaborate PDF for this session is not in the workspace yet. Add it later and regenerate the content to show physical build pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Advanced Integration Model.",
      "challengeCode": "#define SENSOR_PIN ____\n#define DISPLAY_CLK 8\n#define DISPLAY_DIO 9\n\nvoid setup() {\n  pinMode(SENSOR_PIN, INPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(SENSOR_PIN);\n  // Integrated system response goes here.\n}",
      "questions": [
        [
          "What is Level 2 Sensational Sensors Class 9 Session 10 focused on?",
          [
            "Advanced Integration Model",
            "Paper folding only",
            "Unrelated LED blink"
          ],
          0
        ],
        [
          "Which session theme matches this lesson?",
          [
            "Integrated Smart System Capstone",
            "Cooking process",
            "No electronics"
          ],
          0
        ],
        [
          "Which phase gives the source code pages?",
          [
            "Explore",
            "Index",
            "Home only"
          ],
          0
        ],
        [
          "Which phase gives the physical build pages?",
          [
            "Elaborate",
            "Evaluate",
            "Logo popup"
          ],
          0
        ],
        [
          "What should sensor pins match?",
          [
            "The physical wiring",
            "The page color",
            "The browser zoom"
          ],
          0
        ],
        [
          "What does pinMode() prepare?",
          [
            "A pin for input/output",
            "A PDF title",
            "A score popup"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats system behavior",
            "Runs once only",
            "Selects year"
          ],
          0
        ],
        [
          "Why are sensors important in Level 2 Sensational Sensors?",
          [
            "They let Arduino detect real-world conditions",
            "They replace all code",
            "They are only decoration"
          ],
          0
        ],
        [
          "What is an output response?",
          [
            "Light, sound, movement, or display change",
            "Closing the browser",
            "Changing file name"
          ],
          0
        ],
        [
          "What does Try This Yourself do?",
          [
            "Practices a variation",
            "Deletes the build",
            "Skips the session"
          ],
          0
        ],
        [
          "What should students observe after upload?",
          [
            "Input-output behavior",
            "Only the navbar",
            "Only the logo"
          ],
          0
        ],
        [
          "What is a smart system?",
          [
            "A system that reacts using inputs and logic",
            "A static paper template",
            "A normal folder"
          ],
          0
        ],
        [
          "Why is a display useful?",
          [
            "It shows count, value, or state",
            "It powers the USB cable",
            "It replaces sensors"
          ],
          0
        ],
        [
          "Why is a buzzer useful?",
          [
            "It gives an audible alert",
            "It stores code",
            "It cuts templates"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This exact session understanding",
            "Typing speed",
            "Image size"
          ],
          0
        ]
      ]
    }
  }
});
