// Generated curriculum data for Level 1 Creative Automation Sessions 4 to 10. Sessions 6 and 9 Explore remain pending until PDFs are added.
Object.assign(window.LMS_CONTENT, {
  "4-4": {
    "grade": "4th Class",
    "tier": "Beginner",
    "session": "Session 4",
    "topic": "Smart Switching and Door Sensor Automation",
    "cover": "assets/images/pdf/year-1/session-4-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Smart Switching and Door Sensor Automation. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Door open sensor",
          "Where do we see door open sensor in daily life?",
          "Door open sensor connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Fridge door light",
          "Where do we see fridge door light in daily life?",
          "Fridge door light connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Car door warning",
          "Where do we see car door warning in daily life?",
          "Car door warning connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Wardrobe light switch",
          "Where do we see wardrobe light switch in daily life?",
          "Wardrobe light switch connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Factory limit stop",
          "Where do we see factory limit stop in daily life?",
          "Factory limit stop connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Smart Switching and Door Sensor Automation to daily-life applications.",
        "Identify the main behavior in Session 4.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Limit Switch basic",
      "downloads": [
        [
          "assets/downloads/class-4/session-4/explore/c4-session4-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-4/session-4/explore/c4-session4-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-4/session-4/explore-c4-s4-page-01.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-4/explore-c4-s4-page-02.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-4/explore-c4-s4-page-03.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-4/explore-c4-s4-page-04.jpg",
          "Project Setup",
          "Beginner source setup page."
        ],
        [
          "assets/images/pdf/class-4/session-4/explore-c4-s4-page-05.jpg",
          "Main Code",
          "Smart Switching and Door Sensor Automation source PDF code page.",
          "c4s4-explore-main-code"
        ],
        [
          "assets/images/pdf/class-4/session-4/explore-c4-s4-page-06.jpg",
          "Try This Yourself",
          "Smart Switching and Door Sensor Automation source PDF practice page.",
          "c4s4-explore-try-code"
        ]
      ],
      "codes": {
        "c4s4-explore-main-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c4s4-explore-try-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "steps": [
        [
          "Switch input",
          "The switch gives a digital condition."
        ],
        [
          "Condition logic",
          "if/else chooses the response."
        ],
        [
          "Output control",
          "Lights or buzzers respond to the switch."
        ],
        [
          "Pin matching",
          "Code pins must match connections."
        ],
        [
          "Real use",
          "Door and two-way switching use this idea."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Beginner Build: Session 4 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Beginner Session 4 Build",
          "download": [
            "assets/downloads/class-4/session-4/elaborate/c4-session4-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-06.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-07.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-08.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-09.jpg",
              "Code File Page",
              "Code File Page from the Session 4 Elaborate PDF.",
              "c4s4-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Smart Switching and Door Sensor Automation in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Beginner Session 4 Build",
          "download": [
            "assets/downloads/class-4/session-4/elaborate/c4-session4-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-10.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-11.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-4/elaborate-c4-s4-page-12.jpg",
              "Code File Page",
              "Code File Page from the Session 4 Elaborate PDF.",
              "c4s4-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Smart Switching and Door Sensor Automation in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c4s4-elaborate-project1-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c4s4-elaborate-project2-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Limit Switch basic.",
      "challengeCode": "const int switchPin = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "questions": [
        [
          "What is Class 4 Session 4 about?",
          [
            "Limit Switch basic",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Smart Switching and Door Sensor Automation",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Door open sensor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "5-4": {
    "grade": "5th Class",
    "tier": "Intermediate",
    "session": "Session 4",
    "topic": "Smart Switching and Door Sensor Automation",
    "cover": "assets/images/pdf/year-1/session-4-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Smart Switching and Door Sensor Automation. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Door open sensor",
          "Where do we see door open sensor in daily life?",
          "Door open sensor connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Fridge door light",
          "Where do we see fridge door light in daily life?",
          "Fridge door light connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Car door warning",
          "Where do we see car door warning in daily life?",
          "Car door warning connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Wardrobe light switch",
          "Where do we see wardrobe light switch in daily life?",
          "Wardrobe light switch connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Factory limit stop",
          "Where do we see factory limit stop in daily life?",
          "Factory limit stop connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Smart Switching and Door Sensor Automation to daily-life applications.",
        "Identify the main behavior in Session 4.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Mood Lamp",
      "downloads": [
        [
          "assets/downloads/class-5/session-4/explore/c5-session4-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-5/session-4/explore/c5-session4-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-5/session-4/explore-c5-s4-page-01.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-4/explore-c5-s4-page-02.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-4/explore-c5-s4-page-03.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-4/explore-c5-s4-page-07.jpg",
          "Project Setup",
          "Intermediate source setup page."
        ],
        [
          "assets/images/pdf/class-5/session-4/explore-c5-s4-page-08.jpg",
          "Main Code",
          "Smart Switching and Door Sensor Automation source PDF code page.",
          "c5s4-explore-main-code"
        ],
        [
          "assets/images/pdf/class-5/session-4/explore-c5-s4-page-09.jpg",
          "Try This Yourself",
          "Smart Switching and Door Sensor Automation source PDF practice page.",
          "c5s4-explore-try-code"
        ]
      ],
      "codes": {
        "c5s4-explore-main-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c5s4-explore-try-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "steps": [
        [
          "Switch input",
          "The switch gives a digital condition."
        ],
        [
          "Condition logic",
          "if/else chooses the response."
        ],
        [
          "Output control",
          "Lights or buzzers respond to the switch."
        ],
        [
          "Pin matching",
          "Code pins must match connections."
        ],
        [
          "Real use",
          "Door and two-way switching use this idea."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Intermediate Build: Session 4 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Intermediate Session 4 Build",
          "download": [
            "assets/downloads/class-5/session-4/elaborate/c5-session4-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-13.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-14.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-15.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-16.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-17.jpg",
              "Code File Page",
              "Code File Page from the Session 4 Elaborate PDF.",
              "c5s4-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Smart Switching and Door Sensor Automation in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Intermediate Session 4 Build",
          "download": [
            "assets/downloads/class-5/session-4/elaborate/c5-session4-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-18.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-19.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-4/elaborate-c5-s4-page-20.jpg",
              "Code File Page",
              "Code File Page from the Session 4 Elaborate PDF.",
              "c5s4-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Smart Switching and Door Sensor Automation in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c5s4-elaborate-project1-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c5s4-elaborate-project2-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Mood Lamp.",
      "challengeCode": "const int switchPin = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "questions": [
        [
          "What is Class 5 Session 4 about?",
          [
            "Mood Lamp",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Smart Switching and Door Sensor Automation",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Door open sensor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "6-4": {
    "grade": "6th Class",
    "tier": "Advanced",
    "session": "Session 4",
    "topic": "Smart Switching and Door Sensor Automation",
    "cover": "assets/images/pdf/year-1/session-4-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Smart Switching and Door Sensor Automation. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Door open sensor",
          "Where do we see door open sensor in daily life?",
          "Door open sensor connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Fridge door light",
          "Where do we see fridge door light in daily life?",
          "Fridge door light connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Car door warning",
          "Where do we see car door warning in daily life?",
          "Car door warning connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Wardrobe light switch",
          "Where do we see wardrobe light switch in daily life?",
          "Wardrobe light switch connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Factory limit stop",
          "Where do we see factory limit stop in daily life?",
          "Factory limit stop connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Smart Switching and Door Sensor Automation to daily-life applications.",
        "Identify the main behavior in Session 4.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Advanced RGB Mixing Logic",
      "downloads": [
        [
          "assets/downloads/class-6/session-4/explore/c6-session4-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-6/session-4/explore/c6-session4-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-6/session-4/explore-c6-s4-page-01.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-4/explore-c6-s4-page-02.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-4/explore-c6-s4-page-03.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-4/explore-c6-s4-page-10.jpg",
          "Project Setup",
          "Advanced source setup page."
        ],
        [
          "assets/images/pdf/class-6/session-4/explore-c6-s4-page-11.jpg",
          "Main Code",
          "Smart Switching and Door Sensor Automation source PDF code page.",
          "c6s4-explore-main-code"
        ],
        [
          "assets/images/pdf/class-6/session-4/explore-c6-s4-page-12.jpg",
          "Try This Yourself",
          "Smart Switching and Door Sensor Automation source PDF practice page.",
          "c6s4-explore-try-code"
        ],
        [
          "assets/images/pdf/class-6/session-4/explore-c6-s4-page-13.jpg",
          "Learning Page",
          "Smart Switching and Door Sensor Automation source PDF page."
        ]
      ],
      "codes": {
        "c6s4-explore-main-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c6s4-explore-try-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "steps": [
        [
          "Switch input",
          "The switch gives a digital condition."
        ],
        [
          "Condition logic",
          "if/else chooses the response."
        ],
        [
          "Output control",
          "Lights or buzzers respond to the switch."
        ],
        [
          "Pin matching",
          "Code pins must match connections."
        ],
        [
          "Real use",
          "Door and two-way switching use this idea."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Advanced Build: Session 4 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-6/session-4/elaborate-c6-s4-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-6/session-4/elaborate-c6-s4-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Advanced Session 4 Build",
          "download": [
            "assets/downloads/class-6/session-4/elaborate/c6-session4-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-4/elaborate-c6-s4-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-4/elaborate-c6-s4-page-22.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-4/elaborate-c6-s4-page-23.jpg",
              "Code File Page",
              "Code File Page from the Session 4 Elaborate PDF.",
              "c6s4-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Smart Switching and Door Sensor Automation in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Advanced Session 4 Build",
          "download": [
            "assets/downloads/class-6/session-4/elaborate/c6-session4-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-4/elaborate-c6-s4-page-24.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-4/elaborate-c6-s4-page-25.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-4/elaborate-c6-s4-page-26.jpg",
              "Code File Page",
              "Code File Page from the Session 4 Elaborate PDF.",
              "c6s4-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Smart Switching and Door Sensor Automation in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c6s4-elaborate-project1-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c6s4-elaborate-project2-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Advanced RGB Mixing Logic.",
      "challengeCode": "const int switchPin = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "questions": [
        [
          "What is Class 6 Session 4 about?",
          [
            "Advanced RGB Mixing Logic",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Smart Switching and Door Sensor Automation",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Door open sensor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "7-4": {
    "grade": "7th Class",
    "tier": "Expert",
    "session": "Session 4",
    "topic": "Smart Switching and Door Sensor Automation",
    "cover": "assets/images/pdf/year-1/session-4-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Smart Switching and Door Sensor Automation. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Door open sensor",
          "Where do we see door open sensor in daily life?",
          "Door open sensor connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Fridge door light",
          "Where do we see fridge door light in daily life?",
          "Fridge door light connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Car door warning",
          "Where do we see car door warning in daily life?",
          "Car door warning connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Wardrobe light switch",
          "Where do we see wardrobe light switch in daily life?",
          "Wardrobe light switch connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Factory limit stop",
          "Where do we see factory limit stop in daily life?",
          "Factory limit stop connects to Smart Switching and Door Sensor Automation because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Smart Switching and Door Sensor Automation to daily-life applications.",
        "Identify the main behavior in Session 4.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: PWM Control for Smooth Transitions",
      "downloads": [
        [
          "assets/downloads/class-7/session-4/explore/c7-session4-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-7/session-4/explore/c7-session4-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-7/session-4/explore-c7-s4-page-01.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-4/explore-c7-s4-page-02.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-4/explore-c7-s4-page-03.jpg",
          "Curiosity Kickoff",
          "Smart Switching and Door Sensor Automation source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-4/explore-c7-s4-page-14.jpg",
          "Project Setup",
          "Expert source setup page."
        ],
        [
          "assets/images/pdf/class-7/session-4/explore-c7-s4-page-15.jpg",
          "Main Code",
          "Smart Switching and Door Sensor Automation source PDF code page.",
          "c7s4-explore-main-code"
        ],
        [
          "assets/images/pdf/class-7/session-4/explore-c7-s4-page-16.jpg",
          "Try This Yourself",
          "Smart Switching and Door Sensor Automation source PDF practice page.",
          "c7s4-explore-try-code"
        ],
        [
          "assets/images/pdf/class-7/session-4/explore-c7-s4-page-17.jpg",
          "Learning Page",
          "Smart Switching and Door Sensor Automation source PDF page."
        ]
      ],
      "codes": {
        "c7s4-explore-main-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c7s4-explore-try-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "steps": [
        [
          "Switch input",
          "The switch gives a digital condition."
        ],
        [
          "Condition logic",
          "if/else chooses the response."
        ],
        [
          "Output control",
          "Lights or buzzers respond to the switch."
        ],
        [
          "Pin matching",
          "Code pins must match connections."
        ],
        [
          "Real use",
          "Door and two-way switching use this idea."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Expert Build: Session 4 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-7/session-4/elaborate-c7-s4-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-7/session-4/elaborate-c7-s4-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Expert Session 4 Build",
          "download": [
            "assets/downloads/class-7/session-4/elaborate/c7-session4-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-4/elaborate-c7-s4-page-27.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-4/elaborate-c7-s4-page-28.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-4/elaborate-c7-s4-page-29.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-4/elaborate-c7-s4-page-30.jpg",
              "Code File Page",
              "Code File Page from the Session 4 Elaborate PDF.",
              "c7s4-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Smart Switching and Door Sensor Automation in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Expert Session 4 Build",
          "download": [
            "assets/downloads/class-7/session-4/elaborate/c7-session4-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-4/elaborate-c7-s4-page-31.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-4/elaborate-c7-s4-page-32.jpg",
              "Build Step",
              "Build Step from the Session 4 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-4/elaborate-c7-s4-page-33.jpg",
              "Code File Page",
              "Code File Page from the Session 4 Elaborate PDF.",
              "c7s4-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Smart Switching and Door Sensor Automation in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c7s4-elaborate-project1-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c7s4-elaborate-project2-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for PWM Control for Smooth Transitions.",
      "challengeCode": "const int switchPin = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "questions": [
        [
          "What is Class 7 Session 4 about?",
          [
            "PWM Control for Smooth Transitions",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Smart Switching and Door Sensor Automation",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Door open sensor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "4-5": {
    "grade": "4th Class",
    "tier": "Beginner",
    "session": "Session 5",
    "topic": "Button and Switch Logic",
    "cover": "assets/images/pdf/year-1/session-5-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Button and Switch Logic. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Wall switch memory",
          "Where do we see wall switch memory in daily life?",
          "Wall switch memory connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Fan speed knob",
          "Where do we see fan speed knob in daily life?",
          "Fan speed knob connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Two-way staircase switch",
          "Where do we see two-way staircase switch in daily life?",
          "Two-way staircase switch connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Appliance mode selector",
          "Where do we see appliance mode selector in daily life?",
          "Appliance mode selector connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Security switch panel",
          "Where do we see security switch panel in daily life?",
          "Security switch panel connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Button and Switch Logic to daily-life applications.",
        "Identify the main behavior in Session 5.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Toggle Switch Basics",
      "downloads": [
        [
          "assets/downloads/class-4/session-5/explore/c4-session5-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-4/session-5/explore/c4-session5-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-4/session-5/explore-c4-s5-page-01.jpg",
          "Curiosity Kickoff",
          "Button and Switch Logic source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-5/explore-c4-s5-page-02.jpg",
          "Curiosity Kickoff",
          "Button and Switch Logic source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-5/explore-c4-s5-page-03.jpg",
          "Main Code",
          "Button and Switch Logic source PDF code page.",
          "c4s5-explore-main-code"
        ],
        [
          "assets/images/pdf/class-4/session-5/explore-c4-s5-page-04.jpg",
          "Try This Yourself",
          "Button and Switch Logic source PDF practice page.",
          "c4s5-explore-try-code"
        ]
      ],
      "codes": {
        "c4s5-explore-main-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
        "c4s5-explore-try-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
      "steps": [
        [
          "Switch input",
          "The switch gives a digital condition."
        ],
        [
          "Condition logic",
          "if/else chooses the response."
        ],
        [
          "Output control",
          "Lights or buzzers respond to the switch."
        ],
        [
          "Pin matching",
          "Code pins must match connections."
        ],
        [
          "Real use",
          "Door and two-way switching use this idea."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Beginner Build: Session 5 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Beginner Session 5 Build",
          "download": [
            "assets/downloads/class-4/session-5/elaborate/c4-session5-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-06.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-07.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-08.jpg",
              "Code File Page",
              "Code File Page from the Session 5 Elaborate PDF.",
              "c4s5-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Button and Switch Logic in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Beginner Session 5 Build",
          "download": [
            "assets/downloads/class-4/session-5/elaborate/c4-session5-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-10.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-11.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-5/elaborate-c4-s5-page-12.jpg",
              "Code File Page",
              "Code File Page from the Session 5 Elaborate PDF.",
              "c4s5-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Button and Switch Logic in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c4s5-elaborate-project1-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
        "c4s5-elaborate-project2-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Toggle Switch Basics.",
      "challengeCode": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Class 4 Session 5 about?",
          [
            "Toggle Switch Basics",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Button and Switch Logic",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Wall switch memory",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "5-5": {
    "grade": "5th Class",
    "tier": "Intermediate",
    "session": "Session 5",
    "topic": "Button and Switch Logic",
    "cover": "assets/images/pdf/year-1/session-5-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Button and Switch Logic. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Wall switch memory",
          "Where do we see wall switch memory in daily life?",
          "Wall switch memory connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Fan speed knob",
          "Where do we see fan speed knob in daily life?",
          "Fan speed knob connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Two-way staircase switch",
          "Where do we see two-way staircase switch in daily life?",
          "Two-way staircase switch connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Appliance mode selector",
          "Where do we see appliance mode selector in daily life?",
          "Appliance mode selector connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Security switch panel",
          "Where do we see security switch panel in daily life?",
          "Security switch panel connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Button and Switch Logic to daily-life applications.",
        "Identify the main behavior in Session 5.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Intermediate Button and Switch Logic",
      "downloads": [
        [
          "assets/downloads/class-5/session-5/explore/c5-session5-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-5/session-5/explore/c5-session5-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [],
      "codes": {
        "c5s5-explore-main-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
        "c5s5-explore-try-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
      "steps": [
        [
          "Switch input",
          "The switch gives a digital condition."
        ],
        [
          "Condition logic",
          "if/else chooses the response."
        ],
        [
          "Output control",
          "Lights or buzzers respond to the switch."
        ],
        [
          "Pin matching",
          "Code pins must match connections."
        ],
        [
          "Real use",
          "Door and two-way switching use this idea."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Intermediate Build: Session 5 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Intermediate Session 5 Build",
          "download": [
            "assets/downloads/class-5/session-5/elaborate/c5-session5-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-13.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-14.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-15.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-16.jpg",
              "Code File Page",
              "Code File Page from the Session 5 Elaborate PDF.",
              "c5s5-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Button and Switch Logic in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Intermediate Session 5 Build",
          "download": [
            "assets/downloads/class-5/session-5/elaborate/c5-session5-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-17.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-18.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-19.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-5/elaborate-c5-s5-page-20.jpg",
              "Code File Page",
              "Code File Page from the Session 5 Elaborate PDF.",
              "c5s5-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Button and Switch Logic in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c5s5-elaborate-project1-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
        "c5s5-elaborate-project2-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Intermediate Button and Switch Logic.",
      "challengeCode": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Class 5 Session 5 about?",
          [
            "Intermediate Button and Switch Logic",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Button and Switch Logic",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Wall switch memory",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "6-5": {
    "grade": "6th Class",
    "tier": "Advanced",
    "session": "Session 5",
    "topic": "Button and Switch Logic",
    "cover": "assets/images/pdf/year-1/session-5-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Button and Switch Logic. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Wall switch memory",
          "Where do we see wall switch memory in daily life?",
          "Wall switch memory connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Fan speed knob",
          "Where do we see fan speed knob in daily life?",
          "Fan speed knob connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Two-way staircase switch",
          "Where do we see two-way staircase switch in daily life?",
          "Two-way staircase switch connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Appliance mode selector",
          "Where do we see appliance mode selector in daily life?",
          "Appliance mode selector connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Security switch panel",
          "Where do we see security switch panel in daily life?",
          "Security switch panel connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Button and Switch Logic to daily-life applications.",
        "Identify the main behavior in Session 5.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Logic Gates with Switches",
      "downloads": [
        [
          "assets/downloads/class-6/session-5/explore/c6-session5-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-6/session-5/explore/c6-session5-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-6/session-5/explore-c6-s5-page-01.jpg",
          "Curiosity Kickoff",
          "Button and Switch Logic source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-5/explore-c6-s5-page-05.jpg",
          "Project Setup",
          "Advanced source setup page."
        ],
        [
          "assets/images/pdf/class-6/session-5/explore-c6-s5-page-06.jpg",
          "Main Code",
          "Button and Switch Logic source PDF code page.",
          "c6s5-explore-main-code"
        ],
        [
          "assets/images/pdf/class-6/session-5/explore-c6-s5-page-07.jpg",
          "Try This Yourself",
          "Button and Switch Logic source PDF practice page.",
          "c6s5-explore-try-code"
        ]
      ],
      "codes": {
        "c6s5-explore-main-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
        "c6s5-explore-try-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
      "steps": [
        [
          "Switch input",
          "The switch gives a digital condition."
        ],
        [
          "Condition logic",
          "if/else chooses the response."
        ],
        [
          "Output control",
          "Lights or buzzers respond to the switch."
        ],
        [
          "Pin matching",
          "Code pins must match connections."
        ],
        [
          "Real use",
          "Door and two-way switching use this idea."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Advanced Build: Session 5 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Advanced Session 5 Build",
          "download": [
            "assets/downloads/class-6/session-5/elaborate/c6-session5-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-22.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-23.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-24.jpg",
              "Code File Page",
              "Code File Page from the Session 5 Elaborate PDF.",
              "c6s5-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Button and Switch Logic in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Advanced Session 5 Build",
          "download": [
            "assets/downloads/class-6/session-5/elaborate/c6-session5-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-25.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-26.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-27.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-5/elaborate-c6-s5-page-28.jpg",
              "Code File Page",
              "Code File Page from the Session 5 Elaborate PDF.",
              "c6s5-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Button and Switch Logic in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c6s5-elaborate-project1-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
        "c6s5-elaborate-project2-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Logic Gates with Switches.",
      "challengeCode": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Class 6 Session 5 about?",
          [
            "Logic Gates with Switches",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Button and Switch Logic",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Wall switch memory",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "7-5": {
    "grade": "7th Class",
    "tier": "Expert",
    "session": "Session 5",
    "topic": "Button and Switch Logic",
    "cover": "assets/images/pdf/year-1/session-5-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Button and Switch Logic. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Wall switch memory",
          "Where do we see wall switch memory in daily life?",
          "Wall switch memory connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Fan speed knob",
          "Where do we see fan speed knob in daily life?",
          "Fan speed knob connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Two-way staircase switch",
          "Where do we see two-way staircase switch in daily life?",
          "Two-way staircase switch connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Appliance mode selector",
          "Where do we see appliance mode selector in daily life?",
          "Appliance mode selector connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Security switch panel",
          "Where do we see security switch panel in daily life?",
          "Security switch panel connects to Button and Switch Logic because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Button and Switch Logic to daily-life applications.",
        "Identify the main behavior in Session 5.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Two Way Switch Wiring and Logic",
      "downloads": [
        [
          "assets/downloads/class-7/session-5/explore/c7-session5-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-7/session-5/explore/c7-session5-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-7/session-5/explore-c7-s5-page-01.jpg",
          "Curiosity Kickoff",
          "Button and Switch Logic source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-5/explore-c7-s5-page-08.jpg",
          "Project Setup",
          "Expert source setup page."
        ],
        [
          "assets/images/pdf/class-7/session-5/explore-c7-s5-page-09.jpg",
          "Main Code",
          "Button and Switch Logic source PDF code page.",
          "c7s5-explore-main-code"
        ],
        [
          "assets/images/pdf/class-7/session-5/explore-c7-s5-page-10.jpg",
          "Try This Yourself",
          "Button and Switch Logic source PDF practice page.",
          "c7s5-explore-try-code"
        ],
        [
          "assets/images/pdf/class-7/session-5/explore-c7-s5-page-11.jpg",
          "Learning Page",
          "Button and Switch Logic source PDF page."
        ]
      ],
      "codes": {
        "c7s5-explore-main-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
        "c7s5-explore-try-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
      "steps": [
        [
          "Switch input",
          "The switch gives a digital condition."
        ],
        [
          "Condition logic",
          "if/else chooses the response."
        ],
        [
          "Output control",
          "Lights or buzzers respond to the switch."
        ],
        [
          "Pin matching",
          "Code pins must match connections."
        ],
        [
          "Real use",
          "Door and two-way switching use this idea."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Expert Build: Session 5 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Expert Session 5 Build",
          "download": [
            "assets/downloads/class-7/session-5/elaborate/c7-session5-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-29.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-30.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-31.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-32.jpg",
              "Code File Page",
              "Code File Page from the Session 5 Elaborate PDF.",
              "c7s5-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Button and Switch Logic in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Expert Session 5 Build",
          "download": [
            "assets/downloads/class-7/session-5/elaborate/c7-session5-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-34.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-35.jpg",
              "Build Step",
              "Build Step from the Session 5 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-5/elaborate-c7-s5-page-36.jpg",
              "Code File Page",
              "Code File Page from the Session 5 Elaborate PDF.",
              "c7s5-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Button and Switch Logic in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c7s5-elaborate-project1-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
        "c7s5-elaborate-project2-code": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Two Way Switch Wiring and Logic.",
      "challengeCode": "const int switch1 = 2;\nconst int switch2 = 3;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(switch1, INPUT_PULLUP);\n  pinMode(switch2, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;\n  digitalWrite(ledPin, active ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Class 7 Session 5 about?",
          [
            "Two Way Switch Wiring and Logic",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Button and Switch Logic",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Wall switch memory",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "4-6": {
    "grade": "4th Class",
    "tier": "Beginner",
    "session": "Session 6",
    "topic": "Light and Sensor Practice Builds",
    "cover": "assets/images/pdf/year-1/session-6-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Light and Sensor Practice Builds. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Automatic room light",
          "Where do we see automatic room light in daily life?",
          "Automatic room light connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Streetlight sensor",
          "Where do we see streetlight sensor in daily life?",
          "Streetlight sensor connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Night security lamp",
          "Where do we see night security lamp in daily life?",
          "Night security lamp connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Garden light controller",
          "Where do we see garden light controller in daily life?",
          "Garden light controller connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Display brightness sensor",
          "Where do we see display brightness sensor in daily life?",
          "Display brightness sensor connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Light and Sensor Practice Builds to daily-life applications.",
        "Identify the main behavior in Session 6.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Explore PDF pending for this session. Add the Explore PDF later to unlock source project pages.",
      "downloads": [],
      "pages": [],
      "codes": {}
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int sensorPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Sensor input",
          "The sensor gives a digital condition."
        ],
        [
          "Output setup",
          "The output pin is prepared."
        ],
        [
          "Condition",
          "The code checks the sensor."
        ],
        [
          "Response",
          "The model reacts when triggered."
        ],
        [
          "Testing",
          "Students change the input and observe."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Beginner Build: Session 6 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Beginner Session 6 Build",
          "download": [
            "assets/downloads/class-4/session-6/elaborate/c4-session6-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-06.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-07.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-08.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-09.jpg",
              "Code File Page",
              "Code File Page from the Session 6 Elaborate PDF.",
              "c4s6-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-10.jpg",
              "Code File Page",
              "Code File Page from the Session 6 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light and Sensor Practice Builds in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Beginner Session 6 Build",
          "download": [
            "assets/downloads/class-4/session-6/elaborate/c4-session6-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-11.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-12.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-13.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-14.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-15.jpg",
              "Code File Page",
              "Code File Page from the Session 6 Elaborate PDF.",
              "c4s6-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/class-4/session-6/elaborate-c4-s6-page-16.jpg",
              "Code File Page",
              "Code File Page from the Session 6 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light and Sensor Practice Builds in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c4s6-elaborate-project1-code": "const int sensorPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}",
        "c4s6-elaborate-project2-code": "const int sensorPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Beginner Light and Sensor Practice Builds.",
      "challengeCode": "const int sensorPin = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Class 4 Session 6 about?",
          [
            "Beginner Light and Sensor Practice Builds",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Light and Sensor Practice Builds",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Automatic room light",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "5-6": {
    "grade": "5th Class",
    "tier": "Intermediate",
    "session": "Session 6",
    "topic": "Light and Sensor Practice Builds",
    "cover": "assets/images/pdf/year-1/session-6-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Light and Sensor Practice Builds. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Automatic room light",
          "Where do we see automatic room light in daily life?",
          "Automatic room light connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Streetlight sensor",
          "Where do we see streetlight sensor in daily life?",
          "Streetlight sensor connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Night security lamp",
          "Where do we see night security lamp in daily life?",
          "Night security lamp connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Garden light controller",
          "Where do we see garden light controller in daily life?",
          "Garden light controller connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Display brightness sensor",
          "Where do we see display brightness sensor in daily life?",
          "Display brightness sensor connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Light and Sensor Practice Builds to daily-life applications.",
        "Identify the main behavior in Session 6.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Explore PDF pending for this session. Add the Explore PDF later to unlock source project pages.",
      "downloads": [],
      "pages": [],
      "codes": {}
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int sensorPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Sensor input",
          "The sensor gives a digital condition."
        ],
        [
          "Output setup",
          "The output pin is prepared."
        ],
        [
          "Condition",
          "The code checks the sensor."
        ],
        [
          "Response",
          "The model reacts when triggered."
        ],
        [
          "Testing",
          "Students change the input and observe."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Intermediate Build: Session 6 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-5/session-6/elaborate-c5-s6-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-5/session-6/elaborate-c5-s6-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Intermediate Session 6 Build",
          "download": [
            "assets/downloads/class-5/session-6/elaborate/c5-session6-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-6/elaborate-c5-s6-page-17.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-6/elaborate-c5-s6-page-18.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-6/elaborate-c5-s6-page-19.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-6/elaborate-c5-s6-page-20.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-6/elaborate-c5-s6-page-21.jpg",
              "Code File Page",
              "Code File Page from the Session 6 Elaborate PDF.",
              "c5s6-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-5/session-6/elaborate-c5-s6-page-22.jpg",
              "Code File Page",
              "Code File Page from the Session 6 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light and Sensor Practice Builds in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c5s6-elaborate-project1-code": "const int sensorPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Intermediate Light and Sensor Practice Builds.",
      "challengeCode": "const int sensorPin = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Class 5 Session 6 about?",
          [
            "Intermediate Light and Sensor Practice Builds",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Light and Sensor Practice Builds",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Automatic room light",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "6-6": {
    "grade": "6th Class",
    "tier": "Advanced",
    "session": "Session 6",
    "topic": "Light and Sensor Practice Builds",
    "cover": "assets/images/pdf/year-1/session-6-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Light and Sensor Practice Builds. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Automatic room light",
          "Where do we see automatic room light in daily life?",
          "Automatic room light connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Streetlight sensor",
          "Where do we see streetlight sensor in daily life?",
          "Streetlight sensor connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Night security lamp",
          "Where do we see night security lamp in daily life?",
          "Night security lamp connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Garden light controller",
          "Where do we see garden light controller in daily life?",
          "Garden light controller connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Display brightness sensor",
          "Where do we see display brightness sensor in daily life?",
          "Display brightness sensor connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Light and Sensor Practice Builds to daily-life applications.",
        "Identify the main behavior in Session 6.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Explore PDF pending for this session. Add the Explore PDF later to unlock source project pages.",
      "downloads": [],
      "pages": [],
      "codes": {}
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int sensorPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Sensor input",
          "The sensor gives a digital condition."
        ],
        [
          "Output setup",
          "The output pin is prepared."
        ],
        [
          "Condition",
          "The code checks the sensor."
        ],
        [
          "Response",
          "The model reacts when triggered."
        ],
        [
          "Testing",
          "Students change the input and observe."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Advanced Build: Session 6 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-6/session-6/elaborate-c6-s6-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-6/session-6/elaborate-c6-s6-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Advanced Session 6 Build",
          "download": [
            "assets/downloads/class-6/session-6/elaborate/c6-session6-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-6/elaborate-c6-s6-page-23.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-6/elaborate-c6-s6-page-24.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-6/elaborate-c6-s6-page-25.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-6/elaborate-c6-s6-page-26.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-6/elaborate-c6-s6-page-27.jpg",
              "Code File Page",
              "Code File Page from the Session 6 Elaborate PDF.",
              "c6s6-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Light and Sensor Practice Builds in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c6s6-elaborate-project1-code": "const int sensorPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Advanced Light and Sensor Practice Builds.",
      "challengeCode": "const int sensorPin = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Class 6 Session 6 about?",
          [
            "Advanced Light and Sensor Practice Builds",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Light and Sensor Practice Builds",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Automatic room light",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "7-6": {
    "grade": "7th Class",
    "tier": "Expert",
    "session": "Session 6",
    "topic": "Light and Sensor Practice Builds",
    "cover": "assets/images/pdf/year-1/session-6-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Light and Sensor Practice Builds. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Automatic room light",
          "Where do we see automatic room light in daily life?",
          "Automatic room light connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Streetlight sensor",
          "Where do we see streetlight sensor in daily life?",
          "Streetlight sensor connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Night security lamp",
          "Where do we see night security lamp in daily life?",
          "Night security lamp connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Garden light controller",
          "Where do we see garden light controller in daily life?",
          "Garden light controller connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Display brightness sensor",
          "Where do we see display brightness sensor in daily life?",
          "Display brightness sensor connects to Light and Sensor Practice Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Light and Sensor Practice Builds to daily-life applications.",
        "Identify the main behavior in Session 6.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Explore PDF pending for this session. Add the Explore PDF later to unlock source project pages.",
      "downloads": [],
      "pages": [],
      "codes": {}
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int sensorPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}",
      "steps": [
        [
          "Sensor input",
          "The sensor gives a digital condition."
        ],
        [
          "Output setup",
          "The output pin is prepared."
        ],
        [
          "Condition",
          "The code checks the sensor."
        ],
        [
          "Response",
          "The model reacts when triggered."
        ],
        [
          "Testing",
          "Students change the input and observe."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Expert Build: Session 6 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Expert Session 6 Build",
          "download": [
            "assets/downloads/class-7/session-6/elaborate/c7-session6-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-28.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-29.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-30.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-31.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-32.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-33.jpg",
              "Build Step",
              "Build Step from the Session 6 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-34.jpg",
              "Code File Page",
              "Code File Page from the Session 6 Elaborate PDF.",
              "c7s6-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-7/session-6/elaborate-c7-s6-page-35.jpg",
              "Code File Page",
              "Code File Page from the Session 6 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light and Sensor Practice Builds in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c7s6-elaborate-project1-code": "const int sensorPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Expert Light and Sensor Practice Builds.",
      "challengeCode": "const int sensorPin = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  int sensorState = digitalRead(sensorPin);\n  digitalWrite(ledPin, sensorState == HIGH ? HIGH : LOW);\n}",
      "questions": [
        [
          "What is Class 7 Session 6 about?",
          [
            "Expert Light and Sensor Practice Builds",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Light and Sensor Practice Builds",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Automatic room light",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "4-7": {
    "grade": "4th Class",
    "tier": "Beginner",
    "session": "Session 7",
    "topic": "Touch-Based Smart Control Systems",
    "cover": "assets/images/pdf/year-1/session-7-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Touch-Based Smart Control Systems. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Touch lamp",
          "Where do we see touch lamp in daily life?",
          "Touch lamp connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Phone touch screen",
          "Where do we see phone touch screen in daily life?",
          "Phone touch screen connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Elevator touch panel",
          "Where do we see elevator touch panel in daily life?",
          "Elevator touch panel connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Touch kitchen switch",
          "Where do we see touch kitchen switch in daily life?",
          "Touch kitchen switch connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Interactive museum button",
          "Where do we see interactive museum button in daily life?",
          "Interactive museum button connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Touch-Based Smart Control Systems to daily-life applications.",
        "Identify the main behavior in Session 7.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Touch sensor  Basics",
      "downloads": [
        [
          "assets/downloads/class-4/session-7/explore/c4-session7-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-4/session-7/explore/c4-session7-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-4/session-7/explore-c4-s7-page-01.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-7/explore-c4-s7-page-02.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-7/explore-c4-s7-page-03.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-7/explore-c4-s7-page-04.jpg",
          "Project Setup",
          "Beginner source setup page."
        ],
        [
          "assets/images/pdf/class-4/session-7/explore-c4-s7-page-05.jpg",
          "Main Code",
          "Touch-Based Smart Control Systems source PDF code page.",
          "c4s7-explore-main-code"
        ],
        [
          "assets/images/pdf/class-4/session-7/explore-c4-s7-page-06.jpg",
          "Try This Yourself",
          "Touch-Based Smart Control Systems source PDF practice page.",
          "c4s7-explore-try-code"
        ]
      ],
      "codes": {
        "c4s7-explore-main-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c4s7-explore-try-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "steps": [
        [
          "Touch input",
          "The touch sensor detects a finger touch."
        ],
        [
          "Read state",
          "digitalRead checks the sensor."
        ],
        [
          "Output response",
          "LEDs or strings respond to touch."
        ],
        [
          "Patterns",
          "Advanced tasks can cycle patterns."
        ],
        [
          "Interaction",
          "Touch becomes the project trigger."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Beginner Build: Session 7 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Beginner Session 7 Build",
          "download": [
            "assets/downloads/class-4/session-7/elaborate/c4-session7-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-06.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-07.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-08.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF.",
              "c4s7-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Touch-Based Smart Control Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Beginner Session 7 Build",
          "download": [
            "assets/downloads/class-4/session-7/elaborate/c4-session7-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-10.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-11.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-7/elaborate-c4-s7-page-12.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF.",
              "c4s7-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Touch-Based Smart Control Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c4s7-elaborate-project1-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c4s7-elaborate-project2-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Touch sensor  Basics.",
      "challengeCode": "const int touchSensor = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "questions": [
        [
          "What is Class 4 Session 7 about?",
          [
            "Touch sensor  Basics",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Touch-Based Smart Control Systems",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Touch lamp",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "5-7": {
    "grade": "5th Class",
    "tier": "Intermediate",
    "session": "Session 7",
    "topic": "Touch-Based Smart Control Systems",
    "cover": "assets/images/pdf/year-1/session-7-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Touch-Based Smart Control Systems. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Touch lamp",
          "Where do we see touch lamp in daily life?",
          "Touch lamp connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Phone touch screen",
          "Where do we see phone touch screen in daily life?",
          "Phone touch screen connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Elevator touch panel",
          "Where do we see elevator touch panel in daily life?",
          "Elevator touch panel connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Touch kitchen switch",
          "Where do we see touch kitchen switch in daily life?",
          "Touch kitchen switch connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Interactive museum button",
          "Where do we see interactive museum button in daily life?",
          "Interactive museum button connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Touch-Based Smart Control Systems to daily-life applications.",
        "Identify the main behavior in Session 7.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Touch Sensor with LED",
      "downloads": [
        [
          "assets/downloads/class-5/session-7/explore/c5-session7-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-5/session-7/explore/c5-session7-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-5/session-7/explore-c5-s7-page-01.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-7/explore-c5-s7-page-02.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-7/explore-c5-s7-page-03.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-7/explore-c5-s7-page-07.jpg",
          "Project Setup",
          "Intermediate source setup page."
        ],
        [
          "assets/images/pdf/class-5/session-7/explore-c5-s7-page-08.jpg",
          "Main Code",
          "Touch-Based Smart Control Systems source PDF code page.",
          "c5s7-explore-main-code"
        ],
        [
          "assets/images/pdf/class-5/session-7/explore-c5-s7-page-09.jpg",
          "Try This Yourself",
          "Touch-Based Smart Control Systems source PDF practice page.",
          "c5s7-explore-try-code"
        ],
        [
          "assets/images/pdf/class-5/session-7/explore-c5-s7-page-10.jpg",
          "Learning Page",
          "Touch-Based Smart Control Systems source PDF page."
        ]
      ],
      "codes": {
        "c5s7-explore-main-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c5s7-explore-try-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "steps": [
        [
          "Touch input",
          "The touch sensor detects a finger touch."
        ],
        [
          "Read state",
          "digitalRead checks the sensor."
        ],
        [
          "Output response",
          "LEDs or strings respond to touch."
        ],
        [
          "Patterns",
          "Advanced tasks can cycle patterns."
        ],
        [
          "Interaction",
          "Touch becomes the project trigger."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Intermediate Build: Session 7 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Intermediate Session 7 Build",
          "download": [
            "assets/downloads/class-5/session-7/elaborate/c5-session7-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-13.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-14.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-15.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-16.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF.",
              "c5s7-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Touch-Based Smart Control Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Intermediate Session 7 Build",
          "download": [
            "assets/downloads/class-5/session-7/elaborate/c5-session7-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-17.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-18.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-19.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-7/elaborate-c5-s7-page-20.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF.",
              "c5s7-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Touch-Based Smart Control Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c5s7-elaborate-project1-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c5s7-elaborate-project2-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Touch Sensor with LED.",
      "challengeCode": "const int touchSensor = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "questions": [
        [
          "What is Class 5 Session 7 about?",
          [
            "Touch Sensor with LED",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Touch-Based Smart Control Systems",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Touch lamp",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "6-7": {
    "grade": "6th Class",
    "tier": "Advanced",
    "session": "Session 7",
    "topic": "Touch-Based Smart Control Systems",
    "cover": "assets/images/pdf/year-1/session-7-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Touch-Based Smart Control Systems. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Touch lamp",
          "Where do we see touch lamp in daily life?",
          "Touch lamp connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Phone touch screen",
          "Where do we see phone touch screen in daily life?",
          "Phone touch screen connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Elevator touch panel",
          "Where do we see elevator touch panel in daily life?",
          "Elevator touch panel connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Touch kitchen switch",
          "Where do we see touch kitchen switch in daily life?",
          "Touch kitchen switch connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Interactive museum button",
          "Where do we see interactive museum button in daily life?",
          "Interactive museum button connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Touch-Based Smart Control Systems to daily-life applications.",
        "Identify the main behavior in Session 7.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Touch Sensor With Led String",
      "downloads": [
        [
          "assets/downloads/class-6/session-7/explore/c6-session7-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-6/session-7/explore/c6-session7-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-6/session-7/explore-c6-s7-page-01.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-7/explore-c6-s7-page-02.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-7/explore-c6-s7-page-03.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-7/explore-c6-s7-page-11.jpg",
          "Project Setup",
          "Advanced source setup page."
        ],
        [
          "assets/images/pdf/class-6/session-7/explore-c6-s7-page-12.jpg",
          "Main Code",
          "Touch-Based Smart Control Systems source PDF code page.",
          "c6s7-explore-main-code"
        ],
        [
          "assets/images/pdf/class-6/session-7/explore-c6-s7-page-13.jpg",
          "Learning Page",
          "Touch-Based Smart Control Systems source PDF page."
        ],
        [
          "assets/images/pdf/class-6/session-7/explore-c6-s7-page-14.jpg",
          "Learning Page",
          "Touch-Based Smart Control Systems source PDF page."
        ],
        [
          "assets/images/pdf/class-6/session-7/explore-c6-s7-page-15.jpg",
          "Try This Yourself",
          "Touch-Based Smart Control Systems source PDF practice page.",
          "c6s7-explore-try-code"
        ]
      ],
      "codes": {
        "c6s7-explore-main-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c6s7-explore-try-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "steps": [
        [
          "Touch input",
          "The touch sensor detects a finger touch."
        ],
        [
          "Read state",
          "digitalRead checks the sensor."
        ],
        [
          "Output response",
          "LEDs or strings respond to touch."
        ],
        [
          "Patterns",
          "Advanced tasks can cycle patterns."
        ],
        [
          "Interaction",
          "Touch becomes the project trigger."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Advanced Build: Session 7 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Advanced Session 7 Build",
          "download": [
            "assets/downloads/class-6/session-7/elaborate/c6-session7-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-22.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-23.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-24.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF.",
              "c6s7-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Touch-Based Smart Control Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Advanced Session 7 Build",
          "download": [
            "assets/downloads/class-6/session-7/elaborate/c6-session7-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-25.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-26.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-27.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-7/elaborate-c6-s7-page-28.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF.",
              "c6s7-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Touch-Based Smart Control Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c6s7-elaborate-project1-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c6s7-elaborate-project2-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Touch Sensor With Led String.",
      "challengeCode": "const int touchSensor = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "questions": [
        [
          "What is Class 6 Session 7 about?",
          [
            "Touch Sensor With Led String",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Touch-Based Smart Control Systems",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Touch lamp",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "7-7": {
    "grade": "7th Class",
    "tier": "Expert",
    "session": "Session 7",
    "topic": "Touch-Based Smart Control Systems",
    "cover": "assets/images/pdf/year-1/session-7-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Touch-Based Smart Control Systems. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Touch lamp",
          "Where do we see touch lamp in daily life?",
          "Touch lamp connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Phone touch screen",
          "Where do we see phone touch screen in daily life?",
          "Phone touch screen connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Elevator touch panel",
          "Where do we see elevator touch panel in daily life?",
          "Elevator touch panel connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Touch kitchen switch",
          "Where do we see touch kitchen switch in daily life?",
          "Touch kitchen switch connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Interactive museum button",
          "Where do we see interactive museum button in daily life?",
          "Interactive museum button connects to Touch-Based Smart Control Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Touch-Based Smart Control Systems to daily-life applications.",
        "Identify the main behavior in Session 7.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Touch Sensor With Multiple LEDs",
      "downloads": [
        [
          "assets/downloads/class-7/session-7/explore/c7-session7-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-7/session-7/explore/c7-session7-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-7/session-7/explore-c7-s7-page-01.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-7/explore-c7-s7-page-02.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-7/explore-c7-s7-page-03.jpg",
          "Curiosity Kickoff",
          "Touch-Based Smart Control Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-7/explore-c7-s7-page-16.jpg",
          "Project Setup",
          "Expert source setup page."
        ],
        [
          "assets/images/pdf/class-7/session-7/explore-c7-s7-page-17.jpg",
          "Main Code",
          "Touch-Based Smart Control Systems source PDF code page.",
          "c7s7-explore-main-code"
        ],
        [
          "assets/images/pdf/class-7/session-7/explore-c7-s7-page-18.jpg",
          "Learning Page",
          "Touch-Based Smart Control Systems source PDF page."
        ],
        [
          "assets/images/pdf/class-7/session-7/explore-c7-s7-page-19.jpg",
          "Learning Page",
          "Touch-Based Smart Control Systems source PDF page."
        ],
        [
          "assets/images/pdf/class-7/session-7/explore-c7-s7-page-20.jpg",
          "Try This Yourself",
          "Touch-Based Smart Control Systems source PDF practice page.",
          "c7s7-explore-try-code"
        ],
        [
          "assets/images/pdf/class-7/session-7/explore-c7-s7-page-21.jpg",
          "Learning Page",
          "Touch-Based Smart Control Systems source PDF page."
        ]
      ],
      "codes": {
        "c7s7-explore-main-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c7s7-explore-try-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "steps": [
        [
          "Touch input",
          "The touch sensor detects a finger touch."
        ],
        [
          "Read state",
          "digitalRead checks the sensor."
        ],
        [
          "Output response",
          "LEDs or strings respond to touch."
        ],
        [
          "Patterns",
          "Advanced tasks can cycle patterns."
        ],
        [
          "Interaction",
          "Touch becomes the project trigger."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Expert Build: Session 7 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Expert Session 7 Build",
          "download": [
            "assets/downloads/class-7/session-7/elaborate/c7-session7-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-29.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-30.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-31.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-32.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF.",
              "c7s7-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-33.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF."
            ]
          ],
          "working": "This build applies Touch-Based Smart Control Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Expert Session 7 Build",
          "download": [
            "assets/downloads/class-7/session-7/elaborate/c7-session7-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-34.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-35.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-36.jpg",
              "Build Step",
              "Build Step from the Session 7 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-37.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF.",
              "c7s7-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/class-7/session-7/elaborate-c7-s7-page-38.jpg",
              "Code File Page",
              "Code File Page from the Session 7 Elaborate PDF."
            ]
          ],
          "working": "This build applies Touch-Based Smart Control Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c7s7-elaborate-project1-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c7s7-elaborate-project2-code": "const int touchSensor = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Touch Sensor With Multiple LEDs.",
      "challengeCode": "const int touchSensor = 2;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(touchSensor, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(touchSensor) == HIGH) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "questions": [
        [
          "What is Class 7 Session 7 about?",
          [
            "Touch Sensor With Multiple LEDs",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Touch-Based Smart Control Systems",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Touch lamp",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "4-8": {
    "grade": "4th Class",
    "tier": "Beginner",
    "session": "Session 8",
    "topic": "Light Sensing and Automatic Lighting Systems",
    "cover": "assets/images/pdf/year-1/session-8-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Light Sensing and Automatic Lighting Systems. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Automatic streetlight",
          "Where do we see automatic streetlight in daily life?",
          "Automatic streetlight connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Solar garden lamp",
          "Where do we see solar garden lamp in daily life?",
          "Solar garden lamp connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Car headlight sensor",
          "Where do we see car headlight sensor in daily life?",
          "Car headlight sensor connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Phone auto-brightness",
          "Where do we see phone auto-brightness in daily life?",
          "Phone auto-brightness connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Security beam alarm",
          "Where do we see security beam alarm in daily life?",
          "Security beam alarm connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Light Sensing and Automatic Lighting Systems to daily-life applications.",
        "Identify the main behavior in Session 8.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: LDR Sensor Basics",
      "downloads": [
        [
          "assets/downloads/class-4/session-8/explore/c4-session8-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-4/session-8/explore/c4-session8-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-4/session-8/explore-c4-s8-page-01.jpg",
          "Curiosity Kickoff",
          "Light Sensing and Automatic Lighting Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-8/explore-c4-s8-page-02.jpg",
          "Curiosity Kickoff",
          "Light Sensing and Automatic Lighting Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-8/explore-c4-s8-page-03.jpg",
          "Curiosity Kickoff",
          "Light Sensing and Automatic Lighting Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-8/explore-c4-s8-page-04.jpg",
          "Main Code",
          "Light Sensing and Automatic Lighting Systems source PDF code page.",
          "c4s8-explore-main-code"
        ],
        [
          "assets/images/pdf/class-4/session-8/explore-c4-s8-page-05.jpg",
          "Try This Yourself",
          "Light Sensing and Automatic Lighting Systems source PDF practice page.",
          "c4s8-explore-try-code"
        ]
      ],
      "codes": {
        "c4s8-explore-main-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
        "c4s8-explore-try-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
      "steps": [
        [
          "Light sensing",
          "The LDR changes value with light."
        ],
        [
          "Threshold",
          "The code compares light value with a limit."
        ],
        [
          "Automatic output",
          "The LED or buzzer responds automatically."
        ],
        [
          "Testing",
          "Covering the sensor changes the reading."
        ],
        [
          "System idea",
          "The project reacts to the environment."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Beginner Build: Session 8 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Beginner Session 8 Build",
          "download": [
            "assets/downloads/class-4/session-8/elaborate/c4-session8-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-06.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-07.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-08.jpg",
              "Code File Page",
              "Code File Page from the Session 8 Elaborate PDF.",
              "c4s8-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Light Sensing and Automatic Lighting Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Beginner Session 8 Build",
          "download": [
            "assets/downloads/class-4/session-8/elaborate/c4-session8-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-10.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-11.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-8/elaborate-c4-s8-page-12.jpg",
              "Code File Page",
              "Code File Page from the Session 8 Elaborate PDF.",
              "c4s8-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Light Sensing and Automatic Lighting Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c4s8-elaborate-project1-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
        "c4s8-elaborate-project2-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for LDR Sensor Basics.",
      "challengeCode": "const int ldrPin = A1;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
      "questions": [
        [
          "What is Class 4 Session 8 about?",
          [
            "LDR Sensor Basics",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Light Sensing and Automatic Lighting Systems",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Automatic streetlight",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "5-8": {
    "grade": "5th Class",
    "tier": "Intermediate",
    "session": "Session 8",
    "topic": "Light Sensing and Automatic Lighting Systems",
    "cover": "assets/images/pdf/year-1/session-8-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Light Sensing and Automatic Lighting Systems. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Automatic streetlight",
          "Where do we see automatic streetlight in daily life?",
          "Automatic streetlight connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Solar garden lamp",
          "Where do we see solar garden lamp in daily life?",
          "Solar garden lamp connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Car headlight sensor",
          "Where do we see car headlight sensor in daily life?",
          "Car headlight sensor connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Phone auto-brightness",
          "Where do we see phone auto-brightness in daily life?",
          "Phone auto-brightness connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Security beam alarm",
          "Where do we see security beam alarm in daily life?",
          "Security beam alarm connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Light Sensing and Automatic Lighting Systems to daily-life applications.",
        "Identify the main behavior in Session 8.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Automatic Light Control with LDR",
      "downloads": [
        [
          "assets/downloads/class-5/session-8/explore/c5-session8-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-5/session-8/explore/c5-session8-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-5/session-8/explore-c5-s8-page-01.jpg",
          "Curiosity Kickoff",
          "Light Sensing and Automatic Lighting Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-8/explore-c5-s8-page-02.jpg",
          "Curiosity Kickoff",
          "Light Sensing and Automatic Lighting Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-8/explore-c5-s8-page-06.jpg",
          "Project Setup",
          "Intermediate source setup page."
        ],
        [
          "assets/images/pdf/class-5/session-8/explore-c5-s8-page-07.jpg",
          "Main Code",
          "Light Sensing and Automatic Lighting Systems source PDF code page.",
          "c5s8-explore-main-code"
        ],
        [
          "assets/images/pdf/class-5/session-8/explore-c5-s8-page-08.jpg",
          "Try This Yourself",
          "Light Sensing and Automatic Lighting Systems source PDF practice page.",
          "c5s8-explore-try-code"
        ]
      ],
      "codes": {
        "c5s8-explore-main-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
        "c5s8-explore-try-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
      "steps": [
        [
          "Light sensing",
          "The LDR changes value with light."
        ],
        [
          "Threshold",
          "The code compares light value with a limit."
        ],
        [
          "Automatic output",
          "The LED or buzzer responds automatically."
        ],
        [
          "Testing",
          "Covering the sensor changes the reading."
        ],
        [
          "System idea",
          "The project reacts to the environment."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Intermediate Build: Session 8 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Intermediate Session 8 Build",
          "download": [
            "assets/downloads/class-5/session-8/elaborate/c5-session8-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-13.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-14.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-15.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-16.jpg",
              "Code File Page",
              "Code File Page from the Session 8 Elaborate PDF.",
              "c5s8-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Light Sensing and Automatic Lighting Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Intermediate Session 8 Build",
          "download": [
            "assets/downloads/class-5/session-8/elaborate/c5-session8-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-17.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-18.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-19.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-8/elaborate-c5-s8-page-20.jpg",
              "Code File Page",
              "Code File Page from the Session 8 Elaborate PDF.",
              "c5s8-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Light Sensing and Automatic Lighting Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c5s8-elaborate-project1-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
        "c5s8-elaborate-project2-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Automatic Light Control with LDR.",
      "challengeCode": "const int ldrPin = A1;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
      "questions": [
        [
          "What is Class 5 Session 8 about?",
          [
            "Automatic Light Control with LDR",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Light Sensing and Automatic Lighting Systems",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Automatic streetlight",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "6-8": {
    "grade": "6th Class",
    "tier": "Advanced",
    "session": "Session 8",
    "topic": "Light Sensing and Automatic Lighting Systems",
    "cover": "assets/images/pdf/year-1/session-8-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Light Sensing and Automatic Lighting Systems. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Automatic streetlight",
          "Where do we see automatic streetlight in daily life?",
          "Automatic streetlight connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Solar garden lamp",
          "Where do we see solar garden lamp in daily life?",
          "Solar garden lamp connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Car headlight sensor",
          "Where do we see car headlight sensor in daily life?",
          "Car headlight sensor connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Phone auto-brightness",
          "Where do we see phone auto-brightness in daily life?",
          "Phone auto-brightness connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Security beam alarm",
          "Where do we see security beam alarm in daily life?",
          "Security beam alarm connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Light Sensing and Automatic Lighting Systems to daily-life applications.",
        "Identify the main behavior in Session 8.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Laser LDR Beam Break Detection",
      "downloads": [
        [
          "assets/downloads/class-6/session-8/explore/c6-session8-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-6/session-8/explore/c6-session8-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-6/session-8/explore-c6-s8-page-01.jpg",
          "Curiosity Kickoff",
          "Light Sensing and Automatic Lighting Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-8/explore-c6-s8-page-02.jpg",
          "Curiosity Kickoff",
          "Light Sensing and Automatic Lighting Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-8/explore-c6-s8-page-09.jpg",
          "Project Setup",
          "Advanced source setup page."
        ],
        [
          "assets/images/pdf/class-6/session-8/explore-c6-s8-page-10.jpg",
          "Main Code",
          "Light Sensing and Automatic Lighting Systems source PDF code page.",
          "c6s8-explore-main-code"
        ],
        [
          "assets/images/pdf/class-6/session-8/explore-c6-s8-page-11.jpg",
          "Try This Yourself",
          "Light Sensing and Automatic Lighting Systems source PDF practice page.",
          "c6s8-explore-try-code"
        ]
      ],
      "codes": {
        "c6s8-explore-main-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
        "c6s8-explore-try-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
      "steps": [
        [
          "Light sensing",
          "The LDR changes value with light."
        ],
        [
          "Threshold",
          "The code compares light value with a limit."
        ],
        [
          "Automatic output",
          "The LED or buzzer responds automatically."
        ],
        [
          "Testing",
          "Covering the sensor changes the reading."
        ],
        [
          "System idea",
          "The project reacts to the environment."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Advanced Build: Session 8 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Advanced Session 8 Build",
          "download": [
            "assets/downloads/class-6/session-8/elaborate/c6-session8-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-22.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-23.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-24.jpg",
              "Code File Page",
              "Code File Page from the Session 8 Elaborate PDF.",
              "c6s8-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Light Sensing and Automatic Lighting Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Advanced Session 8 Build",
          "download": [
            "assets/downloads/class-6/session-8/elaborate/c6-session8-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-25.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-26.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-27.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-8/elaborate-c6-s8-page-28.jpg",
              "Code File Page",
              "Code File Page from the Session 8 Elaborate PDF.",
              "c6s8-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Light Sensing and Automatic Lighting Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c6s8-elaborate-project1-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
        "c6s8-elaborate-project2-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Laser LDR Beam Break Detection.",
      "challengeCode": "const int ldrPin = A1;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
      "questions": [
        [
          "What is Class 6 Session 8 about?",
          [
            "Laser LDR Beam Break Detection",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Light Sensing and Automatic Lighting Systems",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Automatic streetlight",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "7-8": {
    "grade": "7th Class",
    "tier": "Expert",
    "session": "Session 8",
    "topic": "Light Sensing and Automatic Lighting Systems",
    "cover": "assets/images/pdf/year-1/session-8-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Light Sensing and Automatic Lighting Systems. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Automatic streetlight",
          "Where do we see automatic streetlight in daily life?",
          "Automatic streetlight connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Solar garden lamp",
          "Where do we see solar garden lamp in daily life?",
          "Solar garden lamp connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Car headlight sensor",
          "Where do we see car headlight sensor in daily life?",
          "Car headlight sensor connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Phone auto-brightness",
          "Where do we see phone auto-brightness in daily life?",
          "Phone auto-brightness connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Security beam alarm",
          "Where do we see security beam alarm in daily life?",
          "Security beam alarm connects to Light Sensing and Automatic Lighting Systems because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Light Sensing and Automatic Lighting Systems to daily-life applications.",
        "Identify the main behavior in Session 8.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Sensor Fusion LDR and Touch",
      "downloads": [
        [
          "assets/downloads/class-7/session-8/explore/c7-session8-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-7/session-8/explore/c7-session8-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-7/session-8/explore-c7-s8-page-01.jpg",
          "Curiosity Kickoff",
          "Light Sensing and Automatic Lighting Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-8/explore-c7-s8-page-02.jpg",
          "Curiosity Kickoff",
          "Light Sensing and Automatic Lighting Systems source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-8/explore-c7-s8-page-12.jpg",
          "Project Setup",
          "Expert source setup page."
        ],
        [
          "assets/images/pdf/class-7/session-8/explore-c7-s8-page-13.jpg",
          "Main Code",
          "Light Sensing and Automatic Lighting Systems source PDF code page.",
          "c7s8-explore-main-code"
        ],
        [
          "assets/images/pdf/class-7/session-8/explore-c7-s8-page-14.jpg",
          "Try This Yourself",
          "Light Sensing and Automatic Lighting Systems source PDF practice page.",
          "c7s8-explore-try-code"
        ],
        [
          "assets/images/pdf/class-7/session-8/explore-c7-s8-page-15.jpg",
          "Learning Page",
          "Light Sensing and Automatic Lighting Systems source PDF page."
        ]
      ],
      "codes": {
        "c7s8-explore-main-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
        "c7s8-explore-try-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
      "steps": [
        [
          "Light sensing",
          "The LDR changes value with light."
        ],
        [
          "Threshold",
          "The code compares light value with a limit."
        ],
        [
          "Automatic output",
          "The LED or buzzer responds automatically."
        ],
        [
          "Testing",
          "Covering the sensor changes the reading."
        ],
        [
          "System idea",
          "The project reacts to the environment."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Expert Build: Session 8 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Expert Session 8 Build",
          "download": [
            "assets/downloads/class-7/session-8/elaborate/c7-session8-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-29.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-30.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-31.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-32.jpg",
              "Code File Page",
              "Code File Page from the Session 8 Elaborate PDF.",
              "c7s8-elaborate-project1-code"
            ]
          ],
          "working": "This build applies Light Sensing and Automatic Lighting Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Expert Session 8 Build",
          "download": [
            "assets/downloads/class-7/session-8/elaborate/c7-session8-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-34.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-35.jpg",
              "Build Step",
              "Build Step from the Session 8 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-36.jpg",
              "Code File Page",
              "Code File Page from the Session 8 Elaborate PDF.",
              "c7s8-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/class-7/session-8/elaborate-c7-s8-page-37.jpg",
              "Code File Page",
              "Code File Page from the Session 8 Elaborate PDF."
            ]
          ],
          "working": "This build applies Light Sensing and Automatic Lighting Systems in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c7s8-elaborate-project1-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
        "c7s8-elaborate-project2-code": "const int ldrPin = A1;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Sensor Fusion LDR and Touch.",
      "challengeCode": "const int ldrPin = A1;\nconst int ledPin = ____;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int lightValue = analogRead(ldrPin);\n  Serial.println(lightValue);\n  digitalWrite(ledPin, lightValue < 500 ? HIGH : LOW);\n  delay(300);\n}",
      "questions": [
        [
          "What is Class 7 Session 8 about?",
          [
            "Sensor Fusion LDR and Touch",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Light Sensing and Automatic Lighting Systems",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Automatic streetlight",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "4-9": {
    "grade": "4th Class",
    "tier": "Beginner",
    "session": "Session 9",
    "topic": "Sensor-Based Automation Builds",
    "cover": "assets/images/pdf/year-1/session-9-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Sensor-Based Automation Builds. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Smart dustbin sensor",
          "Where do we see smart dustbin sensor in daily life?",
          "Smart dustbin sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Parking gate sensor",
          "Where do we see parking gate sensor in daily life?",
          "Parking gate sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Hand dryer sensor",
          "Where do we see hand dryer sensor in daily life?",
          "Hand dryer sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Automatic tap sensor",
          "Where do we see automatic tap sensor in daily life?",
          "Automatic tap sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Visitor counter sensor",
          "Where do we see visitor counter sensor in daily life?",
          "Visitor counter sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Sensor-Based Automation Builds to daily-life applications.",
        "Identify the main behavior in Session 9.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Explore PDF pending for this session. Add the Explore PDF later to unlock source project pages.",
      "downloads": [],
      "pages": [],
      "codes": {}
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}",
      "steps": [
        [
          "Sensor input",
          "The sensor gives a digital condition."
        ],
        [
          "Output setup",
          "The output pin is prepared."
        ],
        [
          "Condition",
          "The code checks the sensor."
        ],
        [
          "Response",
          "The model reacts when triggered."
        ],
        [
          "Testing",
          "Students change the input and observe."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Beginner Build: Session 9 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Beginner Session 9 Build",
          "download": [
            "assets/downloads/class-4/session-9/elaborate/c4-session9-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-06.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-07.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-08.jpg",
              "Code File Page",
              "Code File Page from the Session 9 Elaborate PDF.",
              "c4s9-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-09.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-10.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-11.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-12.jpg",
              "Code File Page",
              "Code File Page from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-13.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-14.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-15.jpg",
              "Code File Page",
              "Code File Page from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-9/elaborate-c4-s9-page-16.jpg",
              "Code File Page",
              "Code File Page from the Session 9 Elaborate PDF."
            ]
          ],
          "working": "This build applies Sensor-Based Automation Builds in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c4s9-elaborate-project1-code": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Beginner Sensor-Based Automation Builds.",
      "challengeCode": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}",
      "questions": [
        [
          "What is Class 4 Session 9 about?",
          [
            "Beginner Sensor-Based Automation Builds",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Sensor-Based Automation Builds",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Smart dustbin sensor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "5-9": {
    "grade": "5th Class",
    "tier": "Intermediate",
    "session": "Session 9",
    "topic": "Sensor-Based Automation Builds",
    "cover": "assets/images/pdf/year-1/session-9-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Sensor-Based Automation Builds. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Smart dustbin sensor",
          "Where do we see smart dustbin sensor in daily life?",
          "Smart dustbin sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Parking gate sensor",
          "Where do we see parking gate sensor in daily life?",
          "Parking gate sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Hand dryer sensor",
          "Where do we see hand dryer sensor in daily life?",
          "Hand dryer sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Automatic tap sensor",
          "Where do we see automatic tap sensor in daily life?",
          "Automatic tap sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Visitor counter sensor",
          "Where do we see visitor counter sensor in daily life?",
          "Visitor counter sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Sensor-Based Automation Builds to daily-life applications.",
        "Identify the main behavior in Session 9.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Explore PDF pending for this session. Add the Explore PDF later to unlock source project pages.",
      "downloads": [],
      "pages": [],
      "codes": {}
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}",
      "steps": [
        [
          "Sensor input",
          "The sensor gives a digital condition."
        ],
        [
          "Output setup",
          "The output pin is prepared."
        ],
        [
          "Condition",
          "The code checks the sensor."
        ],
        [
          "Response",
          "The model reacts when triggered."
        ],
        [
          "Testing",
          "Students change the input and observe."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Intermediate Build: Session 9 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-5/session-9/elaborate-c5-s9-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-5/session-9/elaborate-c5-s9-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Intermediate Session 9 Build",
          "download": null,
          "pages": [
            [
              "assets/images/pdf/class-5/session-9/elaborate-c5-s9-page-04.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-5/session-9/elaborate-c5-s9-page-05.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-5/session-9/elaborate-c5-s9-page-06.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-5/session-9/elaborate-c5-s9-page-07.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-5/session-9/elaborate-c5-s9-page-08.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-5/session-9/elaborate-c5-s9-page-09.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-5/session-9/elaborate-c5-s9-page-10.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ]
          ],
          "working": "This build applies Sensor-Based Automation Builds using the Session 9 source pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Intermediate Sensor-Based Automation Builds.",
      "challengeCode": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}",
      "questions": [
        [
          "What is Class 5 Session 9 about?",
          [
            "Intermediate Sensor-Based Automation Builds",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Sensor-Based Automation Builds",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Smart dustbin sensor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "6-9": {
    "grade": "6th Class",
    "tier": "Advanced",
    "session": "Session 9",
    "topic": "Sensor-Based Automation Builds",
    "cover": "assets/images/pdf/year-1/session-9-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Sensor-Based Automation Builds. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Smart dustbin sensor",
          "Where do we see smart dustbin sensor in daily life?",
          "Smart dustbin sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Parking gate sensor",
          "Where do we see parking gate sensor in daily life?",
          "Parking gate sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Hand dryer sensor",
          "Where do we see hand dryer sensor in daily life?",
          "Hand dryer sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Automatic tap sensor",
          "Where do we see automatic tap sensor in daily life?",
          "Automatic tap sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Visitor counter sensor",
          "Where do we see visitor counter sensor in daily life?",
          "Visitor counter sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Sensor-Based Automation Builds to daily-life applications.",
        "Identify the main behavior in Session 9.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Explore PDF pending for this session. Add the Explore PDF later to unlock source project pages.",
      "downloads": [],
      "pages": [],
      "codes": {}
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}",
      "steps": [
        [
          "Sensor input",
          "The sensor gives a digital condition."
        ],
        [
          "Output setup",
          "The output pin is prepared."
        ],
        [
          "Condition",
          "The code checks the sensor."
        ],
        [
          "Response",
          "The model reacts when triggered."
        ],
        [
          "Testing",
          "Students change the input and observe."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Advanced Build: Session 9 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-6/session-9/elaborate-c6-s9-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-6/session-9/elaborate-c6-s9-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Advanced Session 9 Build",
          "download": null,
          "pages": [
            [
              "assets/images/pdf/class-6/session-9/elaborate-c6-s9-page-04.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-6/session-9/elaborate-c6-s9-page-05.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-6/session-9/elaborate-c6-s9-page-06.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-6/session-9/elaborate-c6-s9-page-07.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-6/session-9/elaborate-c6-s9-page-08.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-6/session-9/elaborate-c6-s9-page-09.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ],
            [
              "assets/images/pdf/class-6/session-9/elaborate-c6-s9-page-10.jpg",
              "Build Step",
              "Elaborate PDF source page."
            ]
          ],
          "working": "This build applies Sensor-Based Automation Builds using the Session 9 source pages."
        }
      ],
      "codes": {}
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Advanced Sensor-Based Automation Builds.",
      "challengeCode": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}",
      "questions": [
        [
          "What is Class 6 Session 9 about?",
          [
            "Advanced Sensor-Based Automation Builds",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Sensor-Based Automation Builds",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Smart dustbin sensor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "7-9": {
    "grade": "7th Class",
    "tier": "Expert",
    "session": "Session 9",
    "topic": "Sensor-Based Automation Builds",
    "cover": "assets/images/pdf/year-1/session-9-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Sensor-Based Automation Builds. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Smart dustbin sensor",
          "Where do we see smart dustbin sensor in daily life?",
          "Smart dustbin sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Parking gate sensor",
          "Where do we see parking gate sensor in daily life?",
          "Parking gate sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Hand dryer sensor",
          "Where do we see hand dryer sensor in daily life?",
          "Hand dryer sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Automatic tap sensor",
          "Where do we see automatic tap sensor in daily life?",
          "Automatic tap sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Visitor counter sensor",
          "Where do we see visitor counter sensor in daily life?",
          "Visitor counter sensor connects to Sensor-Based Automation Builds because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Sensor-Based Automation Builds to daily-life applications.",
        "Identify the main behavior in Session 9.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Explore PDF pending for this session. Add the Explore PDF later to unlock source project pages.",
      "downloads": [],
      "pages": [],
      "codes": {}
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}",
      "steps": [
        [
          "Sensor input",
          "The sensor gives a digital condition."
        ],
        [
          "Output setup",
          "The output pin is prepared."
        ],
        [
          "Condition",
          "The code checks the sensor."
        ],
        [
          "Response",
          "The model reacts when triggered."
        ],
        [
          "Testing",
          "Students change the input and observe."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Expert Build: Session 9 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-7/session-9/elaborate-c7-s9-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-7/session-9/elaborate-c7-s9-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Expert Session 9 Build",
          "download": [
            "assets/downloads/class-7/session-9/elaborate/c7-session9-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-9/elaborate-c7-s9-page-17.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-9/elaborate-c7-s9-page-18.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-9/elaborate-c7-s9-page-19.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-9/elaborate-c7-s9-page-20.jpg",
              "Code File Page",
              "Code File Page from the Session 9 Elaborate PDF.",
              "c7s9-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-7/session-9/elaborate-c7-s9-page-21.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-9/elaborate-c7-s9-page-22.jpg",
              "Build Step",
              "Build Step from the Session 9 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-9/elaborate-c7-s9-page-23.jpg",
              "Code File Page",
              "Code File Page from the Session 9 Elaborate PDF."
            ]
          ],
          "working": "This build applies Sensor-Based Automation Builds in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c7s9-elaborate-project1-code": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Expert Sensor-Based Automation Builds.",
      "challengeCode": "const int sensorPin = 2;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(sensorPin, INPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    tone(buzzerPin, 900);\n  } else {\n    noTone(buzzerPin);\n  }\n}",
      "questions": [
        [
          "What is Class 7 Session 9 about?",
          [
            "Expert Sensor-Based Automation Builds",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Sensor-Based Automation Builds",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Smart dustbin sensor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "4-10": {
    "grade": "4th Class",
    "tier": "Beginner",
    "session": "Session 10",
    "topic": "Motor and Advanced Control",
    "cover": "assets/images/pdf/year-1/session-10-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Motor and Advanced Control. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Toy car motor",
          "Where do we see toy car motor in daily life?",
          "Toy car motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Table fan motor",
          "Where do we see table fan motor in daily life?",
          "Table fan motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Robot wheel motor",
          "Where do we see robot wheel motor in daily life?",
          "Robot wheel motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Conveyor belt motor",
          "Where do we see conveyor belt motor in daily life?",
          "Conveyor belt motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Motor safety stop",
          "Where do we see motor safety stop in daily life?",
          "Motor safety stop connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Motor and Advanced Control to daily-life applications.",
        "Identify the main behavior in Session 10.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: DC Motor Basics",
      "downloads": [
        [
          "assets/downloads/class-4/session-10/explore/c4-session10-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-4/session-10/explore/c4-session10-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-4/session-10/explore-c4-s10-page-01.jpg",
          "Curiosity Kickoff",
          "Motor and Advanced Control source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-10/explore-c4-s10-page-02.jpg",
          "Curiosity Kickoff",
          "Motor and Advanced Control source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-10/explore-c4-s10-page-03.jpg",
          "Curiosity Kickoff",
          "Motor and Advanced Control source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-4/session-10/explore-c4-s10-page-04.jpg",
          "Main Code",
          "Motor and Advanced Control source PDF code page.",
          "c4s10-explore-main-code"
        ],
        [
          "assets/images/pdf/class-4/session-10/explore-c4-s10-page-05.jpg",
          "Try This Yourself",
          "Motor and Advanced Control source PDF practice page.",
          "c4s10-explore-try-code"
        ]
      ],
      "codes": {
        "c4s10-explore-main-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
        "c4s10-explore-try-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
      "steps": [
        [
          "Motor pins",
          "The motor pins control direction and movement."
        ],
        [
          "Output setup",
          "pinMode prepares the motor pins."
        ],
        [
          "Direction control",
          "One pin HIGH and one LOW runs the motor one way."
        ],
        [
          "Timing",
          "delay holds each motor action."
        ],
        [
          "Safety",
          "Code and wiring must match before testing."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Beginner Build: Session 10 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Beginner Session 10 Build",
          "download": [
            "assets/downloads/class-4/session-10/elaborate/c4-session10-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-05.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-06.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-07.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF.",
              "c4s10-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-08.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-09.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF."
            ]
          ],
          "working": "This build applies Motor and Advanced Control in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Beginner Session 10 Build",
          "download": [
            "assets/downloads/class-4/session-10/elaborate/c4-session10-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-10.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-11.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-12.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF.",
              "c4s10-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/class-4/session-10/elaborate-c4-s10-page-13.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF."
            ]
          ],
          "working": "This build applies Motor and Advanced Control in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c4s10-elaborate-project1-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
        "c4s10-elaborate-project2-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for DC Motor Basics.",
      "challengeCode": "const int motorPin1 = ____;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
      "questions": [
        [
          "What is Class 4 Session 10 about?",
          [
            "DC Motor Basics",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Motor and Advanced Control",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Toy car motor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "5-10": {
    "grade": "5th Class",
    "tier": "Intermediate",
    "session": "Session 10",
    "topic": "Motor and Advanced Control",
    "cover": "assets/images/pdf/year-1/session-10-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Motor and Advanced Control. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Toy car motor",
          "Where do we see toy car motor in daily life?",
          "Toy car motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Table fan motor",
          "Where do we see table fan motor in daily life?",
          "Table fan motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Robot wheel motor",
          "Where do we see robot wheel motor in daily life?",
          "Robot wheel motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Conveyor belt motor",
          "Where do we see conveyor belt motor in daily life?",
          "Conveyor belt motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Motor safety stop",
          "Where do we see motor safety stop in daily life?",
          "Motor safety stop connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Motor and Advanced Control to daily-life applications.",
        "Identify the main behavior in Session 10.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Motor ON OFF Control with Arduino",
      "downloads": [
        [
          "assets/downloads/class-5/session-10/explore/c5-session10-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-5/session-10/explore/c5-session10-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-5/session-10/explore-c5-s10-page-01.jpg",
          "Curiosity Kickoff",
          "Motor and Advanced Control source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-10/explore-c5-s10-page-02.jpg",
          "Curiosity Kickoff",
          "Motor and Advanced Control source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-5/session-10/explore-c5-s10-page-06.jpg",
          "Project Setup",
          "Intermediate source setup page."
        ],
        [
          "assets/images/pdf/class-5/session-10/explore-c5-s10-page-07.jpg",
          "Main Code",
          "Motor and Advanced Control source PDF code page.",
          "c5s10-explore-main-code"
        ],
        [
          "assets/images/pdf/class-5/session-10/explore-c5-s10-page-08.jpg",
          "Try This Yourself",
          "Motor and Advanced Control source PDF practice page.",
          "c5s10-explore-try-code"
        ]
      ],
      "codes": {
        "c5s10-explore-main-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
        "c5s10-explore-try-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
      "steps": [
        [
          "Motor pins",
          "The motor pins control direction and movement."
        ],
        [
          "Output setup",
          "pinMode prepares the motor pins."
        ],
        [
          "Direction control",
          "One pin HIGH and one LOW runs the motor one way."
        ],
        [
          "Timing",
          "delay holds each motor action."
        ],
        [
          "Safety",
          "Code and wiring must match before testing."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Intermediate Build: Session 10 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-5/session-10/elaborate-c5-s10-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-5/session-10/elaborate-c5-s10-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Intermediate Session 10 Build",
          "download": [
            "assets/downloads/class-5/session-10/elaborate/c5-session10-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-10/elaborate-c5-s10-page-14.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-10/elaborate-c5-s10-page-15.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-10/elaborate-c5-s10-page-16.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF.",
              "c5s10-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-5/session-10/elaborate-c5-s10-page-17.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-10/elaborate-c5-s10-page-18.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-10/elaborate-c5-s10-page-19.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF."
            ]
          ],
          "working": "This build applies Motor and Advanced Control in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c5s10-elaborate-project1-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Motor ON OFF Control with Arduino.",
      "challengeCode": "const int motorPin1 = ____;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
      "questions": [
        [
          "What is Class 5 Session 10 about?",
          [
            "Motor ON OFF Control with Arduino",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Motor and Advanced Control",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Toy car motor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "6-10": {
    "grade": "6th Class",
    "tier": "Advanced",
    "session": "Session 10",
    "topic": "Motor and Advanced Control",
    "cover": "assets/images/pdf/year-1/session-10-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Motor and Advanced Control. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Toy car motor",
          "Where do we see toy car motor in daily life?",
          "Toy car motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Table fan motor",
          "Where do we see table fan motor in daily life?",
          "Table fan motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Robot wheel motor",
          "Where do we see robot wheel motor in daily life?",
          "Robot wheel motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Conveyor belt motor",
          "Where do we see conveyor belt motor in daily life?",
          "Conveyor belt motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Motor safety stop",
          "Where do we see motor safety stop in daily life?",
          "Motor safety stop connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Motor and Advanced Control to daily-life applications.",
        "Identify the main behavior in Session 10.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Speed Control and Reverse Motor Logic",
      "downloads": [
        [
          "assets/downloads/class-6/session-10/explore/c6-session10-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-6/session-10/explore/c6-session10-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-6/session-10/explore-c6-s10-page-01.jpg",
          "Curiosity Kickoff",
          "Motor and Advanced Control source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-10/explore-c6-s10-page-02.jpg",
          "Curiosity Kickoff",
          "Motor and Advanced Control source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-6/session-10/explore-c6-s10-page-09.jpg",
          "Project Setup",
          "Advanced source setup page."
        ],
        [
          "assets/images/pdf/class-6/session-10/explore-c6-s10-page-10.jpg",
          "Main Code",
          "Motor and Advanced Control source PDF code page.",
          "c6s10-explore-main-code"
        ],
        [
          "assets/images/pdf/class-6/session-10/explore-c6-s10-page-11.jpg",
          "Try This Yourself",
          "Motor and Advanced Control source PDF practice page.",
          "c6s10-explore-try-code"
        ]
      ],
      "codes": {
        "c6s10-explore-main-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
        "c6s10-explore-try-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
      "steps": [
        [
          "Motor pins",
          "The motor pins control direction and movement."
        ],
        [
          "Output setup",
          "pinMode prepares the motor pins."
        ],
        [
          "Direction control",
          "One pin HIGH and one LOW runs the motor one way."
        ],
        [
          "Timing",
          "delay holds each motor action."
        ],
        [
          "Safety",
          "Code and wiring must match before testing."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Advanced Build: Session 10 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Advanced Session 10 Build",
          "download": [
            "assets/downloads/class-6/session-10/elaborate/c6-session10-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-20.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-21.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-22.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF.",
              "c6s10-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-23.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF."
            ]
          ],
          "working": "This build applies Motor and Advanced Control in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Advanced Session 10 Build",
          "download": [
            "assets/downloads/class-6/session-10/elaborate/c6-session10-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-24.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-25.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-26.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF.",
              "c6s10-elaborate-project2-code"
            ],
            [
              "assets/images/pdf/class-6/session-10/elaborate-c6-s10-page-27.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF."
            ]
          ],
          "working": "This build applies Motor and Advanced Control in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c6s10-elaborate-project1-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
        "c6s10-elaborate-project2-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Speed Control and Reverse Motor Logic.",
      "challengeCode": "const int motorPin1 = ____;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
      "questions": [
        [
          "What is Class 6 Session 10 about?",
          [
            "Speed Control and Reverse Motor Logic",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Motor and Advanced Control",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Toy car motor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  },
  "7-10": {
    "grade": "7th Class",
    "tier": "Expert",
    "session": "Session 10",
    "topic": "Motor and Advanced Control",
    "cover": "assets/images/pdf/year-1/session-10-cover.jpg",
    "engage": {
      "title": "Real-Life Curiosity Kickoff",
      "lead": "Start with real-life applications of Motor and Advanced Control. These examples prepare students for the same input-output idea in the project.",
      "triggers": [
        [
          "",
          "Toy car motor",
          "Where do we see toy car motor in daily life?",
          "Toy car motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Table fan motor",
          "Where do we see table fan motor in daily life?",
          "Table fan motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Robot wheel motor",
          "Where do we see robot wheel motor in daily life?",
          "Robot wheel motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Conveyor belt motor",
          "Where do we see conveyor belt motor in daily life?",
          "Conveyor belt motor connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ],
        [
          "",
          "Motor safety stop",
          "Where do we see motor safety stop in daily life?",
          "Motor safety stop connects to Motor and Advanced Control because it uses a sensor, switch, light, sound, or motor response in a real system."
        ]
      ],
      "objectives": [
        "Connect Motor and Advanced Control to daily-life applications.",
        "Identify the main behavior in Session 10.",
        "Prepare for the source PDF pages.",
        "Understand why the physical build matters.",
        "Get ready for the session-specific test."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Debugging Motor Control Interrupts Safety",
      "downloads": [
        [
          "assets/downloads/class-7/session-10/explore/c7-session10-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-7/session-10/explore/c7-session10-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-7/session-10/explore-c7-s10-page-01.jpg",
          "Curiosity Kickoff",
          "Motor and Advanced Control source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-10/explore-c7-s10-page-02.jpg",
          "Curiosity Kickoff",
          "Motor and Advanced Control source PDF introduction page."
        ],
        [
          "assets/images/pdf/class-7/session-10/explore-c7-s10-page-12.jpg",
          "Project Setup",
          "Expert source setup page."
        ],
        [
          "assets/images/pdf/class-7/session-10/explore-c7-s10-page-13.jpg",
          "Main Code",
          "Motor and Advanced Control source PDF code page.",
          "c7s10-explore-main-code"
        ],
        [
          "assets/images/pdf/class-7/session-10/explore-c7-s10-page-14.jpg",
          "Try This Yourself",
          "Motor and Advanced Control source PDF practice page.",
          "c7s10-explore-try-code"
        ],
        [
          "assets/images/pdf/class-7/session-10/explore-c7-s10-page-15.jpg",
          "Learning Page",
          "Motor and Advanced Control source PDF page."
        ]
      ],
      "codes": {
        "c7s10-explore-main-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
        "c7s10-explore-try-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
      "steps": [
        [
          "Motor pins",
          "The motor pins control direction and movement."
        ],
        [
          "Output setup",
          "pinMode prepares the motor pins."
        ],
        [
          "Direction control",
          "One pin HIGH and one LOW runs the motor one way."
        ],
        [
          "Timing",
          "delay holds each motor action."
        ],
        [
          "Safety",
          "Code and wiring must match before testing."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Expert Build: Session 10 source assembly pages",
      "materials": [
        [
          "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Expert Session 10 Build",
          "download": [
            "assets/downloads/class-7/session-10/elaborate/c7-session10-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-28.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-29.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-30.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-31.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF.",
              "c7s10-elaborate-project1-code"
            ],
            [
              "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-32.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF."
            ]
          ],
          "working": "This build applies Motor and Advanced Control in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        },
        {
          "title": "Project 2: Expert Session 10 Build",
          "download": [
            "assets/downloads/class-7/session-10/elaborate/c7-session10-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-34.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-35.jpg",
              "Build Step",
              "Build Step from the Session 10 Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-10/elaborate-c7-s10-page-36.jpg",
              "Code File Page",
              "Code File Page from the Session 10 Elaborate PDF.",
              "c7s10-elaborate-project2-code"
            ]
          ],
          "working": "This build applies Motor and Advanced Control in a physical model. Students assemble the parts, upload the code, and observe the input-output response."
        }
      ],
      "codes": {
        "c7s10-elaborate-project1-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
        "c7s10-elaborate-project2-code": "const int motorPin1 = 5;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}\n\n// Try changing one pin, delay, or threshold and test again."
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Debugging Motor Control Interrupts Safety.",
      "challengeCode": "const int motorPin1 = ____;\nconst int motorPin2 = 6;\n\nvoid setup() {\n  pinMode(motorPin1, OUTPUT);\n  pinMode(motorPin2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(motorPin1, HIGH);\n  digitalWrite(motorPin2, LOW);\n  delay(1000);\n  digitalWrite(motorPin1, LOW);\n  digitalWrite(motorPin2, HIGH);\n  delay(1000);\n}",
      "questions": [
        [
          "What is Class 7 Session 10 about?",
          [
            "Debugging Motor Control Interrupts Safety",
            "Unrelated drawing",
            "Typing practice"
          ],
          0
        ],
        [
          "Which theme matches this session?",
          [
            "Motor and Advanced Control",
            "Cooking only",
            "No electronics"
          ],
          0
        ],
        [
          "Which real-life example connects to this lesson?",
          [
            "Toy car motor",
            "Notebook cover",
            "Water bottle"
          ],
          0
        ],
        [
          "What should code pins match?",
          [
            "Physical wiring",
            "Page color",
            "Logo size"
          ],
          0
        ],
        [
          "Which phase shows source coding pages?",
          [
            "Explore",
            "Index",
            "Score modal"
          ],
          0
        ],
        [
          "Which phase shows physical assembly pages?",
          [
            "Elaborate",
            "Evaluate",
            "Home"
          ],
          0
        ],
        [
          "What does pinMode() do?",
          [
            "Prepares a pin",
            "Deletes code",
            "Downloads PDF"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats behavior",
            "Runs once",
            "Shows logo"
          ],
          0
        ],
        [
          "What does HIGH usually mean?",
          [
            "Output ON",
            "Output hidden",
            "Page end"
          ],
          0
        ],
        [
          "What does LOW usually mean?",
          [
            "Output OFF",
            "Input deleted",
            "Session locked"
          ],
          0
        ],
        [
          "Why use Try This Yourself?",
          [
            "Practice a changed version",
            "Skip learning",
            "Remove wiring"
          ],
          0
        ],
        [
          "Why check materials first?",
          [
            "Prepare parts before building",
            "Replace code",
            "Hide images"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "Real input/output behavior",
            "Only file names",
            "Only colors"
          ],
          0
        ],
        [
          "What does Evaluate test?",
          [
            "This session understanding",
            "Browser history",
            "PDF page size"
          ],
          0
        ],
        [
          "What should be done when Explore PDF is pending?",
          [
            "Add the PDF later and regenerate content",
            "Delete the session",
            "Ignore all phases"
          ],
          0
        ]
      ]
    }
  }
});
