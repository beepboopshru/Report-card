// Generated curriculum data for Level 1 Creative Automation Sessions 2 and 3.
Object.assign(window.LMS_CONTENT, {
  "4-2": {
    "grade": "4th Class",
    "tier": "Beginner",
    "session": "Session 2",
    "topic": "Sequential Lighting and Switching Systems",
    "cover": "assets/images/pdf/year-1/session-2-cover.jpg",
    "engage": {
      "title": "Curiosity Kickoff",
      "lead": "Before coding Blink LED with Delay 3 Patterns, students connect the idea to devices they already see in real life.",
      "triggers": [
        [
          "assets/images/real/class-4/session-2/real-world-output.jpg",
          "Sequential warning light",
          "What makes this device turn on at the correct moment?",
          "A controller or switch decides when electricity reaches the output."
        ],
        [
          "assets/images/real/class-4/session-2/timing-example.jpg",
          "Timed blink pattern",
          "Why is timing important in this example?",
          "Timing changes whether an output feels fast, slow, urgent, or calm."
        ],
        [
          "assets/images/real/class-4/session-2/control-system.jpg",
          "Output control board",
          "How does one small signal create a visible or audible result?",
          "The signal from a pin can control an LED, buzzer, or color module."
        ],
        [
          "assets/images/real/class-4/session-2/daily-device.jpg",
          "Daily switching system",
          "What would happen if the connection or pin number changed?",
          "The code and wiring must match for the project to respond correctly."
        ],
        [
          "assets/images/real/class-4/session-2/student-trigger.jpg",
          "Student light experiment",
          "How can students test the same idea safely on Arduino?",
          "They start with a simple circuit, upload code, observe, and then change one value at a time."
        ]
      ],
      "objectives": [
        "Understand the real-world need for Blink LED with Delay 3 Patterns.",
        "Connect the project to Arduino input/output behavior.",
        "Identify the main device and pin focus for this class.",
        "Read the source PDF project before building.",
        "Prepare to test one changed Try This Yourself version."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Blink LED with Delay 3 Patterns",
      "downloads": [
        [
          "assets/downloads/class-4/session-2/explore/c4-session2-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-4/session-2/explore/c4-session2-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-4/session-2/explore-c4-s2-page-03.jpg",
          "Project Setup",
          "Blink LED with Delay 3 Patterns source PDF page."
        ],
        [
          "assets/images/pdf/class-4/session-2/explore-c4-s2-page-04.jpg",
          "Main Code",
          "Blink LED with Delay 3 Patterns source PDF page.",
          "c4s2-explore-main-code"
        ],
        [
          "assets/images/pdf/class-4/session-2/explore-c4-s2-page-05.jpg",
          "Try This Yourself",
          "Blink LED with Delay 3 Patterns source PDF page.",
          "c4s2-explore-try-code"
        ]
      ],
      "codes": {
        "c4s2-explore-main-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(200);\n  digitalWrite(ledPin, LOW);\n  delay(200);\n  digitalWrite(ledPin, HIGH);\n  delay(500);\n  digitalWrite(ledPin, LOW);\n  delay(500);\n  digitalWrite(ledPin, HIGH);\n  delay(1000);\n  digitalWrite(ledPin, LOW);\n  delay(1000);\n}",
        "c4s2-explore-try-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(150);\n  digitalWrite(ledPin, LOW);\n  delay(150);\n  digitalWrite(ledPin, HIGH);\n  delay(400);\n  digitalWrite(ledPin, LOW);\n  delay(400);\n  digitalWrite(ledPin, HIGH);\n  delay(900);\n  digitalWrite(ledPin, LOW);\n  delay(900);\n}"
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(200);\n  digitalWrite(ledPin, LOW);\n  delay(200);\n  digitalWrite(ledPin, HIGH);\n  delay(500);\n  digitalWrite(ledPin, LOW);\n  delay(500);\n  digitalWrite(ledPin, HIGH);\n  delay(1000);\n  digitalWrite(ledPin, LOW);\n  delay(1000);\n}",
      "steps": [
        [
          "Name the LED pin",
          "ledPin stores the Arduino pin number so the same name can be reused."
        ],
        [
          "Set output mode",
          "pinMode prepares the LED pin to send electricity out."
        ],
        [
          "Create short and long flashes",
          "digitalWrite turns the LED on and off while delay controls how long each state stays visible."
        ],
        [
          "Build a pattern",
          "Using several delay values creates a 3-step or 4-step blink rhythm."
        ],
        [
          "Repeat forever",
          "loop repeats the complete pattern until power is removed."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Beginner Build: Blink LED with Delay 3 Patterns",
      "materials": [
        [
          "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ],
        [
          "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-08.jpg",
          "Templates",
          "Templates used for Police Light Pattern and Multi-Light Alert Build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Police Light Pattern",
          "download": [
            "assets/downloads/class-4/session-2/elaborate/c4-session2-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-04.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-05.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-06.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-07.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-08.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c4s2-elaborate-project1-code"
            ]
          ],
          "working": "Police Light Pattern shows how Blink LED with Delay 3 Patterns becomes a physical model. Students upload the code, power the circuit, and observe the light, sound, or color response on the template."
        },
        {
          "title": "Project 2: Multi-Light Alert Build",
          "download": [
            "assets/downloads/class-4/session-2/elaborate/c4-session2-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-10.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-11.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-2/elaborate-c4-s2-page-12.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c4s2-elaborate-project2-code"
            ]
          ],
          "working": "Multi-Light Alert Build extends the same class concept with a second build. Students compare what changed in the wiring, output behavior, and code pattern."
        }
      ],
      "codes": {
        "c4s2-elaborate-project1-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(200);\n  digitalWrite(ledPin, LOW);\n  delay(200);\n  digitalWrite(ledPin, HIGH);\n  delay(500);\n  digitalWrite(ledPin, LOW);\n  delay(500);\n  digitalWrite(ledPin, HIGH);\n  delay(1000);\n  digitalWrite(ledPin, LOW);\n  delay(1000);\n}",
        "c4s2-elaborate-project2-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(150);\n  digitalWrite(ledPin, LOW);\n  delay(150);\n  digitalWrite(ledPin, HIGH);\n  delay(400);\n  digitalWrite(ledPin, LOW);\n  delay(400);\n  digitalWrite(ledPin, HIGH);\n  delay(900);\n  digitalWrite(ledPin, LOW);\n  delay(900);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Blink LED with Delay 3 Patterns.",
      "questions": [
        [
          "What is the Class 4 Session 2 topic?",
          [
            "Blink LED with Delay 3 Patterns",
            "Servo walking robot",
            "Temperature sensor"
          ],
          0
        ],
        [
          "Which page phase gives the source project setup?",
          [
            "Explore",
            "Evaluate",
            "Index"
          ],
          0
        ],
        [
          "Which phase explains the code line by line?",
          [
            "Explain",
            "Engage",
            "Elaborate"
          ],
          0
        ],
        [
          "What should match between code and wiring?",
          [
            "Pin numbers",
            "Page color",
            "Browser size"
          ],
          0
        ],
        [
          "What does setup() do?",
          [
            "Runs once to prepare pins",
            "Runs only after test submit",
            "Deletes wiring"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats the behavior",
            "Prints the PDF",
            "Locks the session"
          ],
          0
        ],
        [
          "Which function creates the wait time?",
          [
            "delay()",
            "digitalRead()",
            "tone()"
          ],
          0
        ],
        [
          "What happens with smaller delay values?",
          [
            "Faster blink",
            "No upload",
            "More pages"
          ],
          0
        ],
        [
          "Which device is the main output?",
          [
            "LED",
            "Push button",
            "USB cable"
          ],
          0
        ],
        [
          "What does HIGH usually do to an LED output?",
          [
            "Turns it on",
            "Makes it input",
            "Closes browser"
          ],
          0
        ],
        [
          "Why use more than one delay value?",
          [
            "To create a pattern",
            "To change grade",
            "To move folders"
          ],
          0
        ],
        [
          "What pin is used for ledPin in the PDF code?",
          [
            "D5",
            "D9",
            "A0"
          ],
          0
        ],
        [
          "What is the Try This Yourself code for?",
          [
            "Practice a small variation",
            "Skip testing",
            "Remove the circuit"
          ],
          0
        ],
        [
          "What does LOW usually do?",
          [
            "Turns output off",
            "Uploads code",
            "Starts class select"
          ],
          0
        ],
        [
          "What material carries the connection?",
          [
            "RMC wires",
            "Logo",
            "CSS file"
          ],
          0
        ]
      ]
    }
  },
  "5-2": {
    "grade": "5th Class",
    "tier": "Intermediate",
    "session": "Session 2",
    "topic": "Sequential Lighting and Switching Systems",
    "cover": "assets/images/pdf/year-1/session-2-cover.jpg",
    "engage": {
      "title": "Curiosity Kickoff",
      "lead": "Before coding Blink LED with Delay 4 Patterns, students connect the idea to devices they already see in real life.",
      "triggers": [
        [
          "assets/images/real/class-5/session-2/real-world-output.jpg",
          "Sequential warning light",
          "What makes this device turn on at the correct moment?",
          "A controller or switch decides when electricity reaches the output."
        ],
        [
          "assets/images/real/class-5/session-2/timing-example.jpg",
          "Timed blink pattern",
          "Why is timing important in this example?",
          "Timing changes whether an output feels fast, slow, urgent, or calm."
        ],
        [
          "assets/images/real/class-5/session-2/control-system.jpg",
          "Output control board",
          "How does one small signal create a visible or audible result?",
          "The signal from a pin can control an LED, buzzer, or color module."
        ],
        [
          "assets/images/real/class-5/session-2/daily-device.jpg",
          "Daily switching system",
          "What would happen if the connection or pin number changed?",
          "The code and wiring must match for the project to respond correctly."
        ],
        [
          "assets/images/real/class-5/session-2/student-trigger.jpg",
          "Student light experiment",
          "How can students test the same idea safely on Arduino?",
          "They start with a simple circuit, upload code, observe, and then change one value at a time."
        ]
      ],
      "objectives": [
        "Understand the real-world need for Blink LED with Delay 4 Patterns.",
        "Connect the project to Arduino input/output behavior.",
        "Identify the main device and pin focus for this class.",
        "Read the source PDF project before building.",
        "Prepare to test one changed Try This Yourself version."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Blink LED with Delay 4 Patterns",
      "downloads": [
        [
          "assets/downloads/class-5/session-2/explore/c5-session2-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-5/session-2/explore/c5-session2-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-5/session-2/explore-c5-s2-page-06.jpg",
          "Project Setup",
          "Blink LED with Delay 4 Patterns source PDF page."
        ],
        [
          "assets/images/pdf/class-5/session-2/explore-c5-s2-page-07.jpg",
          "Main Code",
          "Blink LED with Delay 4 Patterns source PDF page.",
          "c5s2-explore-main-code"
        ],
        [
          "assets/images/pdf/class-5/session-2/explore-c5-s2-page-08.jpg",
          "Try This Yourself",
          "Blink LED with Delay 4 Patterns source PDF page.",
          "c5s2-explore-try-code"
        ]
      ],
      "codes": {
        "c5s2-explore-main-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(100);\n  digitalWrite(ledPin, LOW);\n  delay(100);\n  digitalWrite(ledPin, HIGH);\n  delay(200);\n  digitalWrite(ledPin, LOW);\n  delay(200);\n  digitalWrite(ledPin, HIGH);\n  delay(400);\n  digitalWrite(ledPin, LOW);\n  delay(400);\n  digitalWrite(ledPin, HIGH);\n  delay(800);\n  digitalWrite(ledPin, LOW);\n  delay(800);\n}",
        "c5s2-explore-try-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(100);\n  digitalWrite(ledPin, LOW);\n  delay(100);\n  digitalWrite(ledPin, HIGH);\n  delay(300);\n  digitalWrite(ledPin, LOW);\n  delay(300);\n  digitalWrite(ledPin, HIGH);\n  delay(600);\n  digitalWrite(ledPin, LOW);\n  delay(600);\n  digitalWrite(ledPin, HIGH);\n  delay(1000);\n  digitalWrite(ledPin, LOW);\n  delay(1000);\n}"
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(100);\n  digitalWrite(ledPin, LOW);\n  delay(100);\n  digitalWrite(ledPin, HIGH);\n  delay(200);\n  digitalWrite(ledPin, LOW);\n  delay(200);\n  digitalWrite(ledPin, HIGH);\n  delay(400);\n  digitalWrite(ledPin, LOW);\n  delay(400);\n  digitalWrite(ledPin, HIGH);\n  delay(800);\n  digitalWrite(ledPin, LOW);\n  delay(800);\n}",
      "steps": [
        [
          "Name the LED pin",
          "ledPin stores the Arduino pin number so the same name can be reused."
        ],
        [
          "Set output mode",
          "pinMode prepares the LED pin to send electricity out."
        ],
        [
          "Create short and long flashes",
          "digitalWrite turns the LED on and off while delay controls how long each state stays visible."
        ],
        [
          "Build a pattern",
          "Using several delay values creates a 3-step or 4-step blink rhythm."
        ],
        [
          "Repeat forever",
          "loop repeats the complete pattern until power is removed."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Intermediate Build: Blink LED with Delay 4 Patterns",
      "materials": [
        [
          "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ],
        [
          "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-17.jpg",
          "Templates",
          "Templates used for Peacock LED Pattern and Buzzer Alert Build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Peacock LED Pattern",
          "download": [
            "assets/downloads/class-5/session-2/elaborate/c5-session2-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-13.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-14.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-15.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-16.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-17.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c5s2-elaborate-project1-code"
            ]
          ],
          "working": "Peacock LED Pattern shows how Blink LED with Delay 4 Patterns becomes a physical model. Students upload the code, power the circuit, and observe the light, sound, or color response on the template."
        },
        {
          "title": "Project 2: Buzzer Alert Build",
          "download": [
            "assets/downloads/class-5/session-2/elaborate/c5-session2-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-18.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-19.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-20.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-2/elaborate-c5-s2-page-21.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c5s2-elaborate-project2-code"
            ]
          ],
          "working": "Buzzer Alert Build extends the same class concept with a second build. Students compare what changed in the wiring, output behavior, and code pattern."
        }
      ],
      "codes": {
        "c5s2-elaborate-project1-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(100);\n  digitalWrite(ledPin, LOW);\n  delay(100);\n  digitalWrite(ledPin, HIGH);\n  delay(200);\n  digitalWrite(ledPin, LOW);\n  delay(200);\n  digitalWrite(ledPin, HIGH);\n  delay(400);\n  digitalWrite(ledPin, LOW);\n  delay(400);\n  digitalWrite(ledPin, HIGH);\n  delay(800);\n  digitalWrite(ledPin, LOW);\n  delay(800);\n}",
        "c5s2-elaborate-project2-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(100);\n  digitalWrite(ledPin, LOW);\n  delay(100);\n  digitalWrite(ledPin, HIGH);\n  delay(300);\n  digitalWrite(ledPin, LOW);\n  delay(300);\n  digitalWrite(ledPin, HIGH);\n  delay(600);\n  digitalWrite(ledPin, LOW);\n  delay(600);\n  digitalWrite(ledPin, HIGH);\n  delay(1000);\n  digitalWrite(ledPin, LOW);\n  delay(1000);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Blink LED with Delay 4 Patterns.",
      "questions": [
        [
          "What is the Class 5 Session 2 topic?",
          [
            "Blink LED with Delay 4 Patterns",
            "Servo walking robot",
            "Temperature sensor"
          ],
          0
        ],
        [
          "Which page phase gives the source project setup?",
          [
            "Explore",
            "Evaluate",
            "Index"
          ],
          0
        ],
        [
          "Which phase explains the code line by line?",
          [
            "Explain",
            "Engage",
            "Elaborate"
          ],
          0
        ],
        [
          "What should match between code and wiring?",
          [
            "Pin numbers",
            "Page color",
            "Browser size"
          ],
          0
        ],
        [
          "What does setup() do?",
          [
            "Runs once to prepare pins",
            "Runs only after test submit",
            "Deletes wiring"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats the behavior",
            "Prints the PDF",
            "Locks the session"
          ],
          0
        ],
        [
          "Which function creates the wait time?",
          [
            "delay()",
            "digitalRead()",
            "tone()"
          ],
          0
        ],
        [
          "What happens with smaller delay values?",
          [
            "Faster blink",
            "No upload",
            "More pages"
          ],
          0
        ],
        [
          "Which device is the main output?",
          [
            "LED",
            "Push button",
            "USB cable"
          ],
          0
        ],
        [
          "What does HIGH usually do to an LED output?",
          [
            "Turns it on",
            "Makes it input",
            "Closes browser"
          ],
          0
        ],
        [
          "Why use more than one delay value?",
          [
            "To create a pattern",
            "To change grade",
            "To move folders"
          ],
          0
        ],
        [
          "What pin is used for ledPin in the PDF code?",
          [
            "D5",
            "D9",
            "A0"
          ],
          0
        ],
        [
          "What is the Try This Yourself code for?",
          [
            "Practice a small variation",
            "Skip testing",
            "Remove the circuit"
          ],
          0
        ],
        [
          "What does LOW usually do?",
          [
            "Turns output off",
            "Uploads code",
            "Starts class select"
          ],
          0
        ],
        [
          "What material carries the connection?",
          [
            "RMC wires",
            "Logo",
            "CSS file"
          ],
          0
        ]
      ]
    }
  },
  "6-2": {
    "grade": "6th Class",
    "tier": "Advanced",
    "session": "Session 2",
    "topic": "Sequential Lighting and Switching Systems",
    "cover": "assets/images/pdf/year-1/session-2-cover.jpg",
    "engage": {
      "title": "Curiosity Kickoff",
      "lead": "Before coding Buzzer System, students connect the idea to devices they already see in real life.",
      "triggers": [
        [
          "assets/images/real/class-6/session-2/real-world-output.jpg",
          "Sequential warning light",
          "What makes this device turn on at the correct moment?",
          "A controller or switch decides when electricity reaches the output."
        ],
        [
          "assets/images/real/class-6/session-2/timing-example.jpg",
          "Timed blink pattern",
          "Why is timing important in this example?",
          "Timing changes whether an output feels fast, slow, urgent, or calm."
        ],
        [
          "assets/images/real/class-6/session-2/control-system.jpg",
          "Output control board",
          "How does one small signal create a visible or audible result?",
          "The signal from a pin can control an LED, buzzer, or color module."
        ],
        [
          "assets/images/real/class-6/session-2/daily-device.jpg",
          "Daily switching system",
          "What would happen if the connection or pin number changed?",
          "The code and wiring must match for the project to respond correctly."
        ],
        [
          "assets/images/real/class-6/session-2/student-trigger.jpg",
          "Student light experiment",
          "How can students test the same idea safely on Arduino?",
          "They start with a simple circuit, upload code, observe, and then change one value at a time."
        ]
      ],
      "objectives": [
        "Understand the real-world need for Buzzer System.",
        "Connect the project to Arduino input/output behavior.",
        "Identify the main device and pin focus for this class.",
        "Read the source PDF project before building.",
        "Prepare to test one changed Try This Yourself version."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: Buzzer System",
      "downloads": [
        [
          "assets/downloads/class-6/session-2/explore/c6-session2-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-6/session-2/explore/c6-session2-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-6/session-2/explore-c6-s2-page-09.jpg",
          "Project Setup",
          "Buzzer System source PDF page."
        ],
        [
          "assets/images/pdf/class-6/session-2/explore-c6-s2-page-10.jpg",
          "Main Code",
          "Buzzer System source PDF page.",
          "c6s2-explore-main-code"
        ],
        [
          "assets/images/pdf/class-6/session-2/explore-c6-s2-page-11.jpg",
          "Try This Yourself",
          "Buzzer System source PDF page.",
          "c6s2-explore-try-code"
        ]
      ],
      "codes": {
        "c6s2-explore-main-code": "void setup() {\n  pinMode(6, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(6, HIGH);\n  delay(200);\n  digitalWrite(6, LOW);\n  delay(200);\n}",
        "c6s2-explore-try-code": "const int buzzer1 = 6;\nconst int buzzer2 = 7;\n\nvoid setup() {\n  pinMode(buzzer1, OUTPUT);\n  pinMode(buzzer2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(buzzer1, HIGH);\n  digitalWrite(buzzer2, HIGH);\n  delay(200);\n  digitalWrite(buzzer1, LOW);\n  digitalWrite(buzzer2, LOW);\n  delay(200);\n}"
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "void setup() {\n  pinMode(6, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(6, HIGH);\n  delay(200);\n  digitalWrite(6, LOW);\n  delay(200);\n}",
      "steps": [
        [
          "Prepare the buzzer pin",
          "pinMode(6, OUTPUT) makes D6 a sound-output pin."
        ],
        [
          "Turn sound on",
          "digitalWrite(6, HIGH) activates the buzzer."
        ],
        [
          "Pause briefly",
          "delay(200) keeps the sound on long enough to hear."
        ],
        [
          "Turn sound off",
          "digitalWrite(6, LOW) stops the buzzer output."
        ],
        [
          "Create a beep",
          "Repeating ON and OFF creates a clear buzzer beep pattern."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Advanced Build: Buzzer System",
      "materials": [
        [
          "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ],
        [
          "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-24.jpg",
          "Templates",
          "Templates used for Triple LED Template and Pattern Template Build."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Triple LED Template",
          "download": [
            "assets/downloads/class-6/session-2/elaborate/c6-session2-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-22.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-23.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-24.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c6s2-elaborate-project1-code"
            ]
          ],
          "working": "Triple LED Template shows how Buzzer System becomes a physical model. Students upload the code, power the circuit, and observe the light, sound, or color response on the template."
        },
        {
          "title": "Project 2: Pattern Template Build",
          "download": [
            "assets/downloads/class-6/session-2/elaborate/c6-session2-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-25.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-26.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-27.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-2/elaborate-c6-s2-page-28.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c6s2-elaborate-project2-code"
            ]
          ],
          "working": "Pattern Template Build extends the same class concept with a second build. Students compare what changed in the wiring, output behavior, and code pattern."
        }
      ],
      "codes": {
        "c6s2-elaborate-project1-code": "void setup() {\n  pinMode(6, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(6, HIGH);\n  delay(200);\n  digitalWrite(6, LOW);\n  delay(200);\n}",
        "c6s2-elaborate-project2-code": "const int buzzer1 = 6;\nconst int buzzer2 = 7;\n\nvoid setup() {\n  pinMode(buzzer1, OUTPUT);\n  pinMode(buzzer2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(buzzer1, HIGH);\n  digitalWrite(buzzer2, HIGH);\n  delay(200);\n  digitalWrite(buzzer1, LOW);\n  digitalWrite(buzzer2, LOW);\n  delay(200);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Buzzer System.",
      "questions": [
        [
          "What is the Class 6 Session 2 topic?",
          [
            "Buzzer System",
            "Servo walking robot",
            "Temperature sensor"
          ],
          0
        ],
        [
          "Which page phase gives the source project setup?",
          [
            "Explore",
            "Evaluate",
            "Index"
          ],
          0
        ],
        [
          "Which phase explains the code line by line?",
          [
            "Explain",
            "Engage",
            "Elaborate"
          ],
          0
        ],
        [
          "What should match between code and wiring?",
          [
            "Pin numbers",
            "Page color",
            "Browser size"
          ],
          0
        ],
        [
          "What does setup() do?",
          [
            "Runs once to prepare pins",
            "Runs only after test submit",
            "Deletes wiring"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats the behavior",
            "Prints the PDF",
            "Locks the session"
          ],
          0
        ],
        [
          "Which device makes sound?",
          [
            "Buzzer",
            "LED",
            "Template"
          ],
          0
        ],
        [
          "Which pin is used in the main buzzer code?",
          [
            "D6",
            "D2",
            "A1"
          ],
          0
        ],
        [
          "What creates a beep pattern?",
          [
            "Turning buzzer HIGH and LOW with delay",
            "Only opening PDF",
            "Changing title"
          ],
          0
        ],
        [
          "What delay is used in the main code?",
          [
            "200 ms",
            "900 ms",
            "1 second only"
          ],
          0
        ],
        [
          "How many buzzers are in the Try This code?",
          [
            "Two",
            "Zero",
            "Four LEDs"
          ],
          0
        ],
        [
          "What does digitalWrite(6, LOW) do?",
          [
            "Stops the buzzer output",
            "Starts RGB",
            "Reads a button"
          ],
          0
        ],
        [
          "What is a buzzer?",
          [
            "Sound output device",
            "Input cable",
            "Fastener"
          ],
          0
        ],
        [
          "Why use OUTPUT for a buzzer pin?",
          [
            "Arduino must send a signal",
            "Arduino must read a file",
            "The logo needs it"
          ],
          0
        ],
        [
          "What should students observe?",
          [
            "On-off sound pattern",
            "Only paper folding",
            "Mouse click"
          ],
          0
        ]
      ]
    }
  },
  "7-2": {
    "grade": "7th Class",
    "tier": "Expert",
    "session": "Session 2",
    "topic": "Sequential Lighting and Switching Systems",
    "cover": "assets/images/pdf/year-1/session-2-cover.jpg",
    "engage": {
      "title": "Curiosity Kickoff",
      "lead": "Before coding Advanced LED Patterns with Loops, students connect the idea to devices they already see in real life.",
      "triggers": [
        [
          "assets/images/real/class-7/session-2/real-world-output.jpg",
          "Sequential warning light",
          "What makes this device turn on at the correct moment?",
          "A controller or switch decides when electricity reaches the output."
        ],
        [
          "assets/images/real/class-7/session-2/timing-example.jpg",
          "Timed blink pattern",
          "Why is timing important in this example?",
          "Timing changes whether an output feels fast, slow, urgent, or calm."
        ],
        [
          "assets/images/real/class-7/session-2/control-system.jpg",
          "Output control board",
          "How does one small signal create a visible or audible result?",
          "The signal from a pin can control an LED, buzzer, or color module."
        ],
        [
          "assets/images/real/class-7/session-2/daily-device.jpg",
          "Daily switching system",
          "What would happen if the connection or pin number changed?",
          "The code and wiring must match for the project to respond correctly."
        ],
        [
          "assets/images/real/class-7/session-2/student-trigger.jpg",
          "Student light experiment",
          "How can students test the same idea safely on Arduino?",
          "They start with a simple circuit, upload code, observe, and then change one value at a time."
        ]
      ],
      "objectives": [
        "Understand the real-world need for Advanced LED Patterns with Loops.",
        "Connect the project to Arduino input/output behavior.",
        "Identify the main device and pin focus for this class.",
        "Read the source PDF project before building.",
        "Prepare to test one changed Try This Yourself version."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: Advanced LED Patterns with Loops",
      "downloads": [
        [
          "assets/downloads/class-7/session-2/explore/c7-session2-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-7/session-2/explore/c7-session2-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-7/session-2/explore-c7-s2-page-12.jpg",
          "Project Setup",
          "Advanced LED Patterns with Loops source PDF page."
        ],
        [
          "assets/images/pdf/class-7/session-2/explore-c7-s2-page-13.jpg",
          "Main Code",
          "Advanced LED Patterns with Loops source PDF page.",
          "c7s2-explore-main-code"
        ],
        [
          "assets/images/pdf/class-7/session-2/explore-c7-s2-page-14.jpg",
          "Try This Yourself",
          "Advanced LED Patterns with Loops source PDF page.",
          "c7s2-explore-try-code"
        ],
        [
          "assets/images/pdf/class-7/session-2/explore-c7-s2-page-15.jpg",
          "Learning Outcome",
          "Advanced LED Patterns with Loops source PDF page."
        ]
      ],
      "codes": {
        "c7s2-explore-main-code": "const int led1 = 4;\nconst int led2 = 6;\nconst int led3 = 7;\n\nvoid setup() {\n  pinMode(led1, OUTPUT);\n  pinMode(led2, OUTPUT);\n  pinMode(led3, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led1, HIGH);\n  digitalWrite(led2, HIGH);\n  digitalWrite(led3, HIGH);\n  delay(500);\n  digitalWrite(led1, LOW);\n  delay(300);\n  digitalWrite(led2, LOW);\n  delay(300);\n  digitalWrite(led3, LOW);\n  delay(500);\n}",
        "c7s2-explore-try-code": "const int led1 = 4;\nconst int led2 = 5;\nconst int led3 = 6;\nconst int led4 = 7;\n\nvoid setup() {\n  pinMode(led1, OUTPUT);\n  pinMode(led2, OUTPUT);\n  pinMode(led3, OUTPUT);\n  pinMode(led4, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led1, HIGH);\n  digitalWrite(led2, HIGH);\n  digitalWrite(led3, HIGH);\n  digitalWrite(led4, HIGH);\n  delay(500);\n  digitalWrite(led1, LOW);\n  delay(300);\n  digitalWrite(led2, LOW);\n  delay(300);\n  digitalWrite(led3, LOW);\n  delay(300);\n  digitalWrite(led4, LOW);\n  delay(500);\n}"
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int led1 = 4;\nconst int led2 = 6;\nconst int led3 = 7;\n\nvoid setup() {\n  pinMode(led1, OUTPUT);\n  pinMode(led2, OUTPUT);\n  pinMode(led3, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led1, HIGH);\n  digitalWrite(led2, HIGH);\n  digitalWrite(led3, HIGH);\n  delay(500);\n  digitalWrite(led1, LOW);\n  delay(300);\n  digitalWrite(led2, LOW);\n  delay(300);\n  digitalWrite(led3, LOW);\n  delay(500);\n}",
      "steps": [
        [
          "Name multiple LEDs",
          "Each LED gets a separate variable for its Arduino pin."
        ],
        [
          "Set all pins as outputs",
          "Every LED pin must be prepared in setup."
        ],
        [
          "Turn all LEDs on",
          "The main pattern lights all LEDs together first."
        ],
        [
          "Turn LEDs off one by one",
          "Separate LOW commands create a sequence."
        ],
        [
          "Use delay for rhythm",
          "Delay controls the time gap between each output change."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Expert Build: Advanced LED Patterns with Loops",
      "materials": [
        [
          "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ],
        [
          "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-32.jpg",
          "Templates",
          "Templates used for Converter LED Pattern and DIP LED Template."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Converter LED Pattern",
          "download": [
            "assets/downloads/class-7/session-2/elaborate/c7-session2-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-29.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-30.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-31.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-32.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c7s2-elaborate-project1-code"
            ]
          ],
          "working": "Converter LED Pattern shows how Advanced LED Patterns with Loops becomes a physical model. Students upload the code, power the circuit, and observe the light, sound, or color response on the template."
        },
        {
          "title": "Project 2: DIP LED Template",
          "download": [
            "assets/downloads/class-7/session-2/elaborate/c7-session2-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-33.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-34.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-35.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-36.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-37.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-38.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-2/elaborate-c7-s2-page-39.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c7s2-elaborate-project2-code"
            ]
          ],
          "working": "DIP LED Template extends the same class concept with a second build. Students compare what changed in the wiring, output behavior, and code pattern."
        }
      ],
      "codes": {
        "c7s2-elaborate-project1-code": "const int led1 = 4;\nconst int led2 = 6;\nconst int led3 = 7;\n\nvoid setup() {\n  pinMode(led1, OUTPUT);\n  pinMode(led2, OUTPUT);\n  pinMode(led3, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led1, HIGH);\n  digitalWrite(led2, HIGH);\n  digitalWrite(led3, HIGH);\n  delay(500);\n  digitalWrite(led1, LOW);\n  delay(300);\n  digitalWrite(led2, LOW);\n  delay(300);\n  digitalWrite(led3, LOW);\n  delay(500);\n}",
        "c7s2-elaborate-project2-code": "const int led1 = 4;\nconst int led2 = 5;\nconst int led3 = 6;\nconst int led4 = 7;\n\nvoid setup() {\n  pinMode(led1, OUTPUT);\n  pinMode(led2, OUTPUT);\n  pinMode(led3, OUTPUT);\n  pinMode(led4, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led1, HIGH);\n  digitalWrite(led2, HIGH);\n  digitalWrite(led3, HIGH);\n  digitalWrite(led4, HIGH);\n  delay(500);\n  digitalWrite(led1, LOW);\n  delay(300);\n  digitalWrite(led2, LOW);\n  delay(300);\n  digitalWrite(led3, LOW);\n  delay(300);\n  digitalWrite(led4, LOW);\n  delay(500);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Advanced LED Patterns with Loops.",
      "questions": [
        [
          "What is the Class 7 Session 2 topic?",
          [
            "Advanced LED Patterns with Loops",
            "Servo walking robot",
            "Temperature sensor"
          ],
          0
        ],
        [
          "Which page phase gives the source project setup?",
          [
            "Explore",
            "Evaluate",
            "Index"
          ],
          0
        ],
        [
          "Which phase explains the code line by line?",
          [
            "Explain",
            "Engage",
            "Elaborate"
          ],
          0
        ],
        [
          "What should match between code and wiring?",
          [
            "Pin numbers",
            "Page color",
            "Browser size"
          ],
          0
        ],
        [
          "What does setup() do?",
          [
            "Runs once to prepare pins",
            "Runs only after test submit",
            "Deletes wiring"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats the behavior",
            "Prints the PDF",
            "Locks the session"
          ],
          0
        ],
        [
          "How many LEDs are in the main code?",
          [
            "Three",
            "One",
            "Two buzzers"
          ],
          0
        ],
        [
          "What happens first in the main pattern?",
          [
            "All LEDs turn on together",
            "All pins become input",
            "Sound stops"
          ],
          0
        ],
        [
          "What does off one by one mean?",
          [
            "LEDs turn LOW in order",
            "PDF pages close",
            "USB changes color"
          ],
          0
        ],
        [
          "Which pins are named in the main code?",
          [
            "4, 6, 7",
            "2, 3, 5",
            "A0, A1, A2"
          ],
          0
        ],
        [
          "How many LEDs are in the Try This code?",
          [
            "Four",
            "One",
            "None"
          ],
          0
        ],
        [
          "Why name led1, led2, led3?",
          [
            "Separate control",
            "Better logo",
            "Download folder"
          ],
          0
        ],
        [
          "What does delay(300) do?",
          [
            "Creates gap between off steps",
            "Reads button",
            "Starts buzzer tone"
          ],
          0
        ],
        [
          "What is a sequence?",
          [
            "A planned order of outputs",
            "A material list only",
            "A class button"
          ],
          0
        ],
        [
          "What is the expert skill here?",
          [
            "Coordinating patterns",
            "Only blinking once",
            "Only selecting class"
          ],
          0
        ]
      ]
    }
  },
  "4-3": {
    "grade": "4th Class",
    "tier": "Beginner",
    "session": "Session 3",
    "topic": "Color Mixing and Interactive RGB Systems",
    "cover": "assets/images/pdf/year-1/session-3-cover.jpg",
    "engage": {
      "title": "Curiosity Kickoff",
      "lead": "Before coding Push Button Basic, students connect the idea to devices they already see in real life.",
      "triggers": [
        [
          "assets/images/real/class-4/session-3/real-world-output.jpg",
          "Button controlled light",
          "What makes this device turn on at the correct moment?",
          "A controller or switch decides when electricity reaches the output."
        ],
        [
          "assets/images/real/class-4/session-3/timing-example.jpg",
          "Doorbell style trigger",
          "Why is timing important in this example?",
          "Timing changes whether an output feels fast, slow, urgent, or calm."
        ],
        [
          "assets/images/real/class-4/session-3/control-system.jpg",
          "Color change display",
          "How does one small signal create a visible or audible result?",
          "The signal from a pin can control an LED, buzzer, or color module."
        ],
        [
          "assets/images/real/class-4/session-3/daily-device.jpg",
          "Interactive project model",
          "What would happen if the connection or pin number changed?",
          "The code and wiring must match for the project to respond correctly."
        ],
        [
          "assets/images/real/class-4/session-3/student-trigger.jpg",
          "Input and output response",
          "How can students test the same idea safely on Arduino?",
          "They start with a simple circuit, upload code, observe, and then change one value at a time."
        ]
      ],
      "objectives": [
        "Understand the real-world need for Push Button Basic.",
        "Connect the project to Arduino input/output behavior.",
        "Identify the main device and pin focus for this class.",
        "Read the source PDF project before building.",
        "Prepare to test one changed Try This Yourself version."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Beginner Project: Push Button Basic",
      "downloads": [
        [
          "assets/downloads/class-4/session-3/explore/c4-session3-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-4/session-3/explore/c4-session3-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-4/session-3/explore-c4-s3-page-04.jpg",
          "Project Setup",
          "Push Button Basic source PDF page."
        ],
        [
          "assets/images/pdf/class-4/session-3/explore-c4-s3-page-05.jpg",
          "Main Code",
          "Push Button Basic source PDF page.",
          "c4s3-explore-main-code"
        ],
        [
          "assets/images/pdf/class-4/session-3/explore-c4-s3-page-06.jpg",
          "Try This Yourself",
          "Push Button Basic source PDF page.",
          "c4s3-explore-try-code"
        ]
      ],
      "codes": {
        "c4s3-explore-main-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "c4s3-explore-try-code": "const int switchPin = 3;\nconst int ledPin = 6;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}"
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
      "steps": [
        [
          "Name input and output pins",
          "switchPin reads the button and ledPin controls the LED."
        ],
        [
          "Use INPUT_PULLUP",
          "The button reads HIGH normally and LOW when pressed."
        ],
        [
          "Read the button",
          "digitalRead checks the button state inside loop."
        ],
        [
          "Use if else logic",
          "The LED turns on only when the pressed condition is true."
        ],
        [
          "Connect action to result",
          "Pressing the button becomes the trigger for light."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Beginner Build: Push Button Basic",
      "materials": [
        [
          "assets/images/pdf/class-4/session-3/elaborate-c4-s3-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-4/session-3/elaborate-c4-s3-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ],
        [
          "assets/images/pdf/class-4/session-3/elaborate-c4-s3-page-08.jpg",
          "Templates",
          "Templates used for Shadow Light Model."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Shadow Light Model",
          "download": [
            "assets/downloads/class-4/session-3/elaborate/c4-session3-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-4/session-3/elaborate-c4-s3-page-04.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-3/elaborate-c4-s3-page-05.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-3/elaborate-c4-s3-page-06.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-3/elaborate-c4-s3-page-07.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-4/session-3/elaborate-c4-s3-page-08.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c4s3-elaborate-project1-code"
            ]
          ],
          "working": "Shadow Light Model shows how Push Button Basic becomes a physical model. Students upload the code, power the circuit, and observe the light, sound, or color response on the template."
        }
      ],
      "codes": {
        "c4s3-elaborate-project1-code": "const int switchPin = 2;\nconst int ledPin = 5;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Push Button Basic.",
      "questions": [
        [
          "What is the Class 4 Session 3 topic?",
          [
            "Push Button Basic",
            "Servo walking robot",
            "Temperature sensor"
          ],
          0
        ],
        [
          "Which page phase gives the source project setup?",
          [
            "Explore",
            "Evaluate",
            "Index"
          ],
          0
        ],
        [
          "Which phase explains the code line by line?",
          [
            "Explain",
            "Engage",
            "Elaborate"
          ],
          0
        ],
        [
          "What should match between code and wiring?",
          [
            "Pin numbers",
            "Page color",
            "Browser size"
          ],
          0
        ],
        [
          "What does setup() do?",
          [
            "Runs once to prepare pins",
            "Runs only after test submit",
            "Deletes wiring"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats the behavior",
            "Prints the PDF",
            "Locks the session"
          ],
          0
        ],
        [
          "Which input is used?",
          [
            "Push button",
            "Buzzer",
            "RGB LED"
          ],
          0
        ],
        [
          "What does INPUT_PULLUP help read?",
          [
            "Button state",
            "LED brightness",
            "PDF cover"
          ],
          0
        ],
        [
          "When does the LED turn on?",
          [
            "When button is pressed",
            "When page loads",
            "When ZIP opens"
          ],
          0
        ],
        [
          "What does digitalRead() do?",
          [
            "Reads input state",
            "Turns LED red",
            "Downloads code"
          ],
          0
        ],
        [
          "Which two devices are paired?",
          [
            "Button and LED",
            "Two buzzers",
            "Four LEDs"
          ],
          0
        ],
        [
          "What does LOW mean with INPUT_PULLUP button?",
          [
            "Pressed",
            "Always off",
            "USB missing"
          ],
          0
        ],
        [
          "What happens when button is released?",
          [
            "LED turns off",
            "Score opens",
            "Code deletes"
          ],
          0
        ],
        [
          "What logic is introduced?",
          [
            "if else",
            "array only",
            "analog tone"
          ],
          0
        ],
        [
          "What should the student test?",
          [
            "Press and release response",
            "Only folder names",
            "Logo popup"
          ],
          0
        ]
      ]
    }
  },
  "5-3": {
    "grade": "5th Class",
    "tier": "Intermediate",
    "session": "Session 3",
    "topic": "Color Mixing and Interactive RGB Systems",
    "cover": "assets/images/pdf/year-1/session-3-cover.jpg",
    "engage": {
      "title": "Curiosity Kickoff",
      "lead": "Before coding Push Button with Buzzer, students connect the idea to devices they already see in real life.",
      "triggers": [
        [
          "assets/images/real/class-5/session-3/real-world-output.jpg",
          "Button controlled light",
          "What makes this device turn on at the correct moment?",
          "A controller or switch decides when electricity reaches the output."
        ],
        [
          "assets/images/real/class-5/session-3/timing-example.jpg",
          "Doorbell style trigger",
          "Why is timing important in this example?",
          "Timing changes whether an output feels fast, slow, urgent, or calm."
        ],
        [
          "assets/images/real/class-5/session-3/control-system.jpg",
          "Color change display",
          "How does one small signal create a visible or audible result?",
          "The signal from a pin can control an LED, buzzer, or color module."
        ],
        [
          "assets/images/real/class-5/session-3/daily-device.jpg",
          "Interactive project model",
          "What would happen if the connection or pin number changed?",
          "The code and wiring must match for the project to respond correctly."
        ],
        [
          "assets/images/real/class-5/session-3/student-trigger.jpg",
          "Input and output response",
          "How can students test the same idea safely on Arduino?",
          "They start with a simple circuit, upload code, observe, and then change one value at a time."
        ]
      ],
      "objectives": [
        "Understand the real-world need for Push Button with Buzzer.",
        "Connect the project to Arduino input/output behavior.",
        "Identify the main device and pin focus for this class.",
        "Read the source PDF project before building.",
        "Prepare to test one changed Try This Yourself version."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Intermediate Project: Push Button with Buzzer",
      "downloads": [
        [
          "assets/downloads/class-5/session-3/explore/c5-session3-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-5/session-3/explore/c5-session3-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-5/session-3/explore-c5-s3-page-07.jpg",
          "Project Setup",
          "Push Button with Buzzer source PDF page."
        ],
        [
          "assets/images/pdf/class-5/session-3/explore-c5-s3-page-08.jpg",
          "Main Code",
          "Push Button with Buzzer source PDF page.",
          "c5s3-explore-main-code"
        ],
        [
          "assets/images/pdf/class-5/session-3/explore-c5-s3-page-09.jpg",
          "Try This Yourself",
          "Push Button with Buzzer source PDF page.",
          "c5s3-explore-try-code"
        ]
      ],
      "codes": {
        "c5s3-explore-main-code": "const int switchPin = 3;\nconst int buzzerPin = 6;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(buzzerPin, HIGH);\n  } else {\n    digitalWrite(buzzerPin, LOW);\n  }\n}",
        "c5s3-explore-try-code": "const int switchPin = 4;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(buzzerPin, HIGH);\n  } else {\n    digitalWrite(buzzerPin, LOW);\n  }\n}"
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int switchPin = 3;\nconst int buzzerPin = 6;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(buzzerPin, HIGH);\n  } else {\n    digitalWrite(buzzerPin, LOW);\n  }\n}",
      "steps": [
        [
          "Name the button and buzzer",
          "switchPin reads input and buzzerPin controls sound."
        ],
        [
          "Prepare both pins",
          "The button is INPUT_PULLUP and the buzzer is OUTPUT."
        ],
        [
          "Check the press",
          "digitalRead finds whether the button is pressed."
        ],
        [
          "Control the buzzer",
          "The buzzer sounds when the button reads LOW."
        ],
        [
          "Stop on release",
          "The else part turns the buzzer off when the button is released."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Intermediate Build: Push Button with Buzzer",
      "materials": [
        [
          "assets/images/pdf/class-5/session-3/elaborate-c5-s3-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-5/session-3/elaborate-c5-s3-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ],
        [
          "assets/images/pdf/class-5/session-3/elaborate-c5-s3-page-13.jpg",
          "Templates",
          "Templates used for Push Button RGB Model."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Push Button RGB Model",
          "download": [
            "assets/downloads/class-5/session-3/elaborate/c5-session3-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-5/session-3/elaborate-c5-s3-page-09.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-3/elaborate-c5-s3-page-10.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-3/elaborate-c5-s3-page-11.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-3/elaborate-c5-s3-page-12.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-5/session-3/elaborate-c5-s3-page-13.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c5s3-elaborate-project1-code"
            ]
          ],
          "working": "Push Button RGB Model shows how Push Button with Buzzer becomes a physical model. Students upload the code, power the circuit, and observe the light, sound, or color response on the template."
        }
      ],
      "codes": {
        "c5s3-elaborate-project1-code": "const int switchPin = 3;\nconst int buzzerPin = 6;\n\nvoid setup() {\n  pinMode(switchPin, INPUT_PULLUP);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  if (digitalRead(switchPin) == LOW) {\n    digitalWrite(buzzerPin, HIGH);\n  } else {\n    digitalWrite(buzzerPin, LOW);\n  }\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for Push Button with Buzzer.",
      "questions": [
        [
          "What is the Class 5 Session 3 topic?",
          [
            "Push Button with Buzzer",
            "Servo walking robot",
            "Temperature sensor"
          ],
          0
        ],
        [
          "Which page phase gives the source project setup?",
          [
            "Explore",
            "Evaluate",
            "Index"
          ],
          0
        ],
        [
          "Which phase explains the code line by line?",
          [
            "Explain",
            "Engage",
            "Elaborate"
          ],
          0
        ],
        [
          "What should match between code and wiring?",
          [
            "Pin numbers",
            "Page color",
            "Browser size"
          ],
          0
        ],
        [
          "What does setup() do?",
          [
            "Runs once to prepare pins",
            "Runs only after test submit",
            "Deletes wiring"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats the behavior",
            "Prints the PDF",
            "Locks the session"
          ],
          0
        ],
        [
          "Which output is controlled by button?",
          [
            "Buzzer",
            "RGB only",
            "Motor"
          ],
          0
        ],
        [
          "Which pin is buzzerPin in main code?",
          [
            "D6",
            "D10",
            "A0"
          ],
          0
        ],
        [
          "Which pin is switchPin in main code?",
          [
            "D3",
            "D7",
            "A1"
          ],
          0
        ],
        [
          "When should the buzzer sound?",
          [
            "Button pressed",
            "Button released",
            "Before upload"
          ],
          0
        ],
        [
          "What stops the buzzer?",
          [
            "digitalWrite LOW",
            "delay only",
            "class select"
          ],
          0
        ],
        [
          "What does INPUT_PULLUP mean normally?",
          [
            "HIGH until pressed",
            "LOW forever",
            "PWM value"
          ],
          0
        ],
        [
          "What does the Try code change?",
          [
            "Pins",
            "PDF title",
            "Logo file"
          ],
          0
        ],
        [
          "Which phase builds the model?",
          [
            "Elaborate",
            "Evaluate",
            "Engage only"
          ],
          0
        ],
        [
          "What result should students hear?",
          [
            "Sound response",
            "Color mixing only",
            "No output"
          ],
          0
        ]
      ]
    }
  },
  "6-3": {
    "grade": "6th Class",
    "tier": "Advanced",
    "session": "Session 3",
    "topic": "Color Mixing and Interactive RGB Systems",
    "cover": "assets/images/pdf/year-1/session-3-cover.jpg",
    "engage": {
      "title": "Curiosity Kickoff",
      "lead": "Before coding RGB Control by Push Button, students connect the idea to devices they already see in real life.",
      "triggers": [
        [
          "assets/images/real/class-6/session-3/real-world-output.jpg",
          "Button controlled light",
          "What makes this device turn on at the correct moment?",
          "A controller or switch decides when electricity reaches the output."
        ],
        [
          "assets/images/real/class-6/session-3/timing-example.jpg",
          "Doorbell style trigger",
          "Why is timing important in this example?",
          "Timing changes whether an output feels fast, slow, urgent, or calm."
        ],
        [
          "assets/images/real/class-6/session-3/control-system.jpg",
          "Color change display",
          "How does one small signal create a visible or audible result?",
          "The signal from a pin can control an LED, buzzer, or color module."
        ],
        [
          "assets/images/real/class-6/session-3/daily-device.jpg",
          "Interactive project model",
          "What would happen if the connection or pin number changed?",
          "The code and wiring must match for the project to respond correctly."
        ],
        [
          "assets/images/real/class-6/session-3/student-trigger.jpg",
          "Input and output response",
          "How can students test the same idea safely on Arduino?",
          "They start with a simple circuit, upload code, observe, and then change one value at a time."
        ]
      ],
      "objectives": [
        "Understand the real-world need for RGB Control by Push Button.",
        "Connect the project to Arduino input/output behavior.",
        "Identify the main device and pin focus for this class.",
        "Read the source PDF project before building.",
        "Prepare to test one changed Try This Yourself version."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Advanced Project: RGB Control by Push Button",
      "downloads": [
        [
          "assets/downloads/class-6/session-3/explore/c6-session3-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-6/session-3/explore/c6-session3-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-6/session-3/explore-c6-s3-page-10.jpg",
          "Project Setup",
          "RGB Control by Push Button source PDF page."
        ],
        [
          "assets/images/pdf/class-6/session-3/explore-c6-s3-page-11.jpg",
          "Main Code",
          "RGB Control by Push Button source PDF page.",
          "c6s3-explore-main-code"
        ],
        [
          "assets/images/pdf/class-6/session-3/explore-c6-s3-page-12.jpg",
          "Code Explanation",
          "RGB Control by Push Button source PDF page."
        ],
        [
          "assets/images/pdf/class-6/session-3/explore-c6-s3-page-13.jpg",
          "Try This Yourself",
          "RGB Control by Push Button source PDF page.",
          "c6s3-explore-try-code"
        ],
        [
          "assets/images/pdf/class-6/session-3/explore-c6-s3-page-14.jpg",
          "Try This Yourself Continued",
          "RGB Control by Push Button source PDF page.",
          "c6s3-explore-try-code"
        ]
      ],
      "codes": {
        "c6s3-explore-main-code": "const int pushSwitch = 5;\nconst int rgbRed = 10;\nconst int rgbGreen = 12;\nconst int rgbBlue = 13;\n\nvoid setup() {\n  pinMode(pushSwitch, INPUT_PULLUP);\n  pinMode(rgbRed, OUTPUT);\n  pinMode(rgbGreen, OUTPUT);\n  pinMode(rgbBlue, OUTPUT);\n}\n\nvoid loop() {\n  int switchState = digitalRead(pushSwitch);\n  if (switchState == LOW) {\n    digitalWrite(rgbRed, HIGH);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, HIGH);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, HIGH);\n    delay(500);\n  } else {\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n  }\n}",
        "c6s3-explore-try-code": "const int pushSwitch = 2;\nconst int rgbRed = 10;\nconst int rgbGreen = 12;\nconst int rgbBlue = 13;\n\nvoid setup() {\n  pinMode(pushSwitch, INPUT_PULLUP);\n  pinMode(rgbRed, OUTPUT);\n  pinMode(rgbGreen, OUTPUT);\n  pinMode(rgbBlue, OUTPUT);\n}\n\nvoid loop() {\n  int switchState = digitalRead(pushSwitch);\n  if (switchState == LOW) {\n    digitalWrite(rgbRed, HIGH);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, HIGH);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, HIGH);\n    delay(500);\n  } else {\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n  }\n}"
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int pushSwitch = 5;\nconst int rgbRed = 10;\nconst int rgbGreen = 12;\nconst int rgbBlue = 13;\n\nvoid setup() {\n  pinMode(pushSwitch, INPUT_PULLUP);\n  pinMode(rgbRed, OUTPUT);\n  pinMode(rgbGreen, OUTPUT);\n  pinMode(rgbBlue, OUTPUT);\n}\n\nvoid loop() {\n  int switchState = digitalRead(pushSwitch);\n  if (switchState == LOW) {\n    digitalWrite(rgbRed, HIGH);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, HIGH);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, HIGH);\n    delay(500);\n  } else {\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n  }\n}",
      "steps": [
        [
          "Read the push switch",
          "The program stores the button state in switchState."
        ],
        [
          "Prepare RGB pins",
          "Red, green, and blue pins are separate outputs."
        ],
        [
          "Use conditional color control",
          "The RGB LED changes colors only while the button is pressed."
        ],
        [
          "Sequence colors",
          "Red, green, and blue each stay on for 500 milliseconds."
        ],
        [
          "Turn all colors off",
          "When the button is released, all RGB pins are LOW."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Advanced Build: RGB Control by Push Button",
      "materials": [
        [
          "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ],
        [
          "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-19.jpg",
          "Templates",
          "Templates used for Joker RGB Model and Parrot Template Swap."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Joker RGB Model",
          "download": [
            "assets/downloads/class-6/session-3/elaborate/c6-session3-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-14.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-15.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-16.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-17.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-18.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-19.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c6s3-elaborate-project1-code"
            ]
          ],
          "working": "Joker RGB Model shows how RGB Control by Push Button becomes a physical model. Students upload the code, power the circuit, and observe the light, sound, or color response on the template."
        },
        {
          "title": "Project 2: Parrot Template Swap",
          "download": [
            "assets/downloads/class-6/session-3/elaborate/c6-session3-project2-code.zip",
            "Project 2 ZIP",
            "secondary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-6/session-3/elaborate-c6-s3-page-20.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c6s3-elaborate-project2-code"
            ]
          ],
          "working": "Parrot Template Swap extends the same class concept with a second build. Students compare what changed in the wiring, output behavior, and code pattern."
        }
      ],
      "codes": {
        "c6s3-elaborate-project1-code": "const int pushSwitch = 5;\nconst int rgbRed = 10;\nconst int rgbGreen = 12;\nconst int rgbBlue = 13;\n\nvoid setup() {\n  pinMode(pushSwitch, INPUT_PULLUP);\n  pinMode(rgbRed, OUTPUT);\n  pinMode(rgbGreen, OUTPUT);\n  pinMode(rgbBlue, OUTPUT);\n}\n\nvoid loop() {\n  int switchState = digitalRead(pushSwitch);\n  if (switchState == LOW) {\n    digitalWrite(rgbRed, HIGH);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, HIGH);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, HIGH);\n    delay(500);\n  } else {\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n  }\n}",
        "c6s3-elaborate-project2-code": "const int pushSwitch = 2;\nconst int rgbRed = 10;\nconst int rgbGreen = 12;\nconst int rgbBlue = 13;\n\nvoid setup() {\n  pinMode(pushSwitch, INPUT_PULLUP);\n  pinMode(rgbRed, OUTPUT);\n  pinMode(rgbGreen, OUTPUT);\n  pinMode(rgbBlue, OUTPUT);\n}\n\nvoid loop() {\n  int switchState = digitalRead(pushSwitch);\n  if (switchState == LOW) {\n    digitalWrite(rgbRed, HIGH);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, HIGH);\n    digitalWrite(rgbBlue, LOW);\n    delay(500);\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, HIGH);\n    delay(500);\n  } else {\n    digitalWrite(rgbRed, LOW);\n    digitalWrite(rgbGreen, LOW);\n    digitalWrite(rgbBlue, LOW);\n  }\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for RGB Control by Push Button.",
      "questions": [
        [
          "What is the Class 6 Session 3 topic?",
          [
            "RGB Control by Push Button",
            "Servo walking robot",
            "Temperature sensor"
          ],
          0
        ],
        [
          "Which page phase gives the source project setup?",
          [
            "Explore",
            "Evaluate",
            "Index"
          ],
          0
        ],
        [
          "Which phase explains the code line by line?",
          [
            "Explain",
            "Engage",
            "Elaborate"
          ],
          0
        ],
        [
          "What should match between code and wiring?",
          [
            "Pin numbers",
            "Page color",
            "Browser size"
          ],
          0
        ],
        [
          "What does setup() do?",
          [
            "Runs once to prepare pins",
            "Runs only after test submit",
            "Deletes wiring"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats the behavior",
            "Prints the PDF",
            "Locks the session"
          ],
          0
        ],
        [
          "Which output module is controlled?",
          [
            "RGB LED",
            "Single buzzer only",
            "Servo"
          ],
          0
        ],
        [
          "Which colors are sequenced?",
          [
            "Red, green, blue",
            "Black, white, grey",
            "Only yellow"
          ],
          0
        ],
        [
          "What reads the button?",
          [
            "digitalRead(pushSwitch)",
            "analogWrite only",
            "noTone"
          ],
          0
        ],
        [
          "What stores the button value?",
          [
            "switchState",
            "scoreText",
            "sessionCard"
          ],
          0
        ],
        [
          "What happens when switch is not pressed?",
          [
            "All RGB colors off",
            "Buzzer rings",
            "ZIP opens"
          ],
          0
        ],
        [
          "Which pin controls red in the main code?",
          [
            "10",
            "5",
            "7"
          ],
          0
        ],
        [
          "What creates the color sequence timing?",
          [
            "delay(500)",
            "INPUT_PULLUP",
            "download"
          ],
          0
        ],
        [
          "Why use three RGB pins?",
          [
            "Each color channel is separate",
            "One is for logo",
            "They are pages"
          ],
          0
        ],
        [
          "What is the main system idea?",
          [
            "Button triggers color cycle",
            "LED always glows only",
            "No input needed"
          ],
          0
        ]
      ]
    }
  },
  "7-3": {
    "grade": "7th Class",
    "tier": "Expert",
    "session": "Session 3",
    "topic": "Color Mixing and Interactive RGB Systems",
    "cover": "assets/images/pdf/year-1/session-3-cover.jpg",
    "engage": {
      "title": "Curiosity Kickoff",
      "lead": "Before coding LED Dimmer and Buzzer Tones, students connect the idea to devices they already see in real life.",
      "triggers": [
        [
          "assets/images/real/class-7/session-3/real-world-output.jpg",
          "Button controlled light",
          "What makes this device turn on at the correct moment?",
          "A controller or switch decides when electricity reaches the output."
        ],
        [
          "assets/images/real/class-7/session-3/timing-example.jpg",
          "Doorbell style trigger",
          "Why is timing important in this example?",
          "Timing changes whether an output feels fast, slow, urgent, or calm."
        ],
        [
          "assets/images/real/class-7/session-3/control-system.jpg",
          "Color change display",
          "How does one small signal create a visible or audible result?",
          "The signal from a pin can control an LED, buzzer, or color module."
        ],
        [
          "assets/images/real/class-7/session-3/daily-device.jpg",
          "Interactive project model",
          "What would happen if the connection or pin number changed?",
          "The code and wiring must match for the project to respond correctly."
        ],
        [
          "assets/images/real/class-7/session-3/student-trigger.jpg",
          "Input and output response",
          "How can students test the same idea safely on Arduino?",
          "They start with a simple circuit, upload code, observe, and then change one value at a time."
        ]
      ],
      "objectives": [
        "Understand the real-world need for LED Dimmer and Buzzer Tones.",
        "Connect the project to Arduino input/output behavior.",
        "Identify the main device and pin focus for this class.",
        "Read the source PDF project before building.",
        "Prepare to test one changed Try This Yourself version."
      ]
    },
    "explore": {
      "title": "Hands-on Coding",
      "note": "Expert Project: LED Dimmer and Buzzer Tones",
      "downloads": [
        [
          "assets/downloads/class-7/session-3/explore/c7-session3-explore-code.zip",
          "Download Code ZIP",
          "primary"
        ],
        [
          "assets/downloads/class-7/session-3/explore/c7-session3-try-this-code.zip",
          "Try Yourself ZIP",
          "secondary"
        ]
      ],
      "pages": [
        [
          "assets/images/pdf/class-7/session-3/explore-c7-s3-page-15.jpg",
          "Project Setup",
          "LED Dimmer and Buzzer Tones source PDF page."
        ],
        [
          "assets/images/pdf/class-7/session-3/explore-c7-s3-page-16.jpg",
          "Main Code",
          "LED Dimmer and Buzzer Tones source PDF page.",
          "c7s3-explore-main-code"
        ],
        [
          "assets/images/pdf/class-7/session-3/explore-c7-s3-page-17.jpg",
          "Try This Yourself",
          "LED Dimmer and Buzzer Tones source PDF page.",
          "c7s3-explore-try-code"
        ],
        [
          "assets/images/pdf/class-7/session-3/explore-c7-s3-page-18.jpg",
          "Learning Outcome",
          "LED Dimmer and Buzzer Tones source PDF page."
        ]
      ],
      "codes": {
        "c7s3-explore-main-code": "const int ledPin = 5;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(ledPin, 80);\n  tone(buzzerPin, 300);\n  delay(700);\n  analogWrite(ledPin, 180);\n  tone(buzzerPin, 600);\n  delay(700);\n  analogWrite(ledPin, 255);\n  tone(buzzerPin, 900);\n  delay(700);\n  noTone(buzzerPin);\n}",
        "c7s3-explore-try-code": "const int ledPin = 5;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(ledPin, 60);\n  tone(buzzerPin, 250);\n  delay(500);\n  analogWrite(ledPin, 150);\n  tone(buzzerPin, 500);\n  delay(500);\n  analogWrite(ledPin, 255);\n  tone(buzzerPin, 800);\n  delay(500);\n  noTone(buzzerPin);\n  delay(300);\n}"
      }
    },
    "explain": {
      "title": "Deep Learning",
      "code": "const int ledPin = 5;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(ledPin, 80);\n  tone(buzzerPin, 300);\n  delay(700);\n  analogWrite(ledPin, 180);\n  tone(buzzerPin, 600);\n  delay(700);\n  analogWrite(ledPin, 255);\n  tone(buzzerPin, 900);\n  delay(700);\n  noTone(buzzerPin);\n}",
      "steps": [
        [
          "Name LED and buzzer pins",
          "The code controls brightness through ledPin and sound through buzzerPin."
        ],
        [
          "Prepare outputs",
          "Both devices are set as OUTPUT in setup."
        ],
        [
          "Use analogWrite",
          "analogWrite changes LED brightness using values from 0 to 255."
        ],
        [
          "Use tone",
          "tone creates buzzer sound at different frequencies."
        ],
        [
          "Stop sound",
          "noTone stops the buzzer after the tone sequence."
        ]
      ]
    },
    "elaborate": {
      "title": "Physical Build",
      "note": "Expert Build: LED Dimmer and Buzzer Tones",
      "materials": [
        [
          "assets/images/pdf/class-7/session-3/elaborate-c7-s3-page-02.jpg",
          "Structure and Fasteners",
          "Baseboard, spacers, screws, nuts, clamps, Arduino shield, and cable from the Elaborate PDF."
        ],
        [
          "assets/images/pdf/class-7/session-3/elaborate-c7-s3-page-03.jpg",
          "Electronic Components",
          "Class components and modules required for the physical build."
        ],
        [
          "assets/images/pdf/class-7/session-3/elaborate-c7-s3-page-26.jpg",
          "Templates",
          "Templates used for Transparent Acrylic RGB Model."
        ]
      ],
      "projects": [
        {
          "title": "Project 1: Transparent Acrylic RGB Model",
          "download": [
            "assets/downloads/class-7/session-3/elaborate/c7-session3-project1-code.zip",
            "Project 1 ZIP",
            "primary"
          ],
          "pages": [
            [
              "assets/images/pdf/class-7/session-3/elaborate-c7-s3-page-21.jpg",
              "Connection and Setup",
              "Connection and Setup from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-3/elaborate-c7-s3-page-22.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-3/elaborate-c7-s3-page-23.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-3/elaborate-c7-s3-page-24.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-3/elaborate-c7-s3-page-25.jpg",
              "Build Step",
              "Build Step from the Elaborate PDF."
            ],
            [
              "assets/images/pdf/class-7/session-3/elaborate-c7-s3-page-26.jpg",
              "Code File Page",
              "Code File Page from the Elaborate PDF.",
              "c7s3-elaborate-project1-code"
            ]
          ],
          "working": "Transparent Acrylic RGB Model shows how LED Dimmer and Buzzer Tones becomes a physical model. Students upload the code, power the circuit, and observe the light, sound, or color response on the template."
        }
      ],
      "codes": {
        "c7s3-elaborate-project1-code": "const int ledPin = 5;\nconst int buzzerPin = 7;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(ledPin, 80);\n  tone(buzzerPin, 300);\n  delay(700);\n  analogWrite(ledPin, 180);\n  tone(buzzerPin, 600);\n  delay(700);\n  analogWrite(ledPin, 255);\n  tone(buzzerPin, 900);\n  delay(700);\n  noTone(buzzerPin);\n}"
      }
    },
    "evaluate": {
      "title": "Assessment",
      "challenge": "Complete the missing parts for LED Dimmer and Buzzer Tones.",
      "questions": [
        [
          "What is the Class 7 Session 3 topic?",
          [
            "LED Dimmer and Buzzer Tones",
            "Servo walking robot",
            "Temperature sensor"
          ],
          0
        ],
        [
          "Which page phase gives the source project setup?",
          [
            "Explore",
            "Evaluate",
            "Index"
          ],
          0
        ],
        [
          "Which phase explains the code line by line?",
          [
            "Explain",
            "Engage",
            "Elaborate"
          ],
          0
        ],
        [
          "What should match between code and wiring?",
          [
            "Pin numbers",
            "Page color",
            "Browser size"
          ],
          0
        ],
        [
          "What does setup() do?",
          [
            "Runs once to prepare pins",
            "Runs only after test submit",
            "Deletes wiring"
          ],
          0
        ],
        [
          "What does loop() do?",
          [
            "Repeats the behavior",
            "Prints the PDF",
            "Locks the session"
          ],
          0
        ],
        [
          "Which function controls LED brightness?",
          [
            "analogWrite",
            "digitalRead",
            "pinMode only"
          ],
          0
        ],
        [
          "What value means full PWM brightness?",
          [
            "255",
            "5",
            "7"
          ],
          0
        ],
        [
          "Which function makes buzzer tone?",
          [
            "tone",
            "LOW",
            "setup"
          ],
          0
        ],
        [
          "Which function stops buzzer tone?",
          [
            "noTone",
            "delay",
            "INPUT_PULLUP"
          ],
          0
        ],
        [
          "Which two outputs work together?",
          [
            "LED and buzzer",
            "Button and PDF",
            "Logo and index"
          ],
          0
        ],
        [
          "What changes when frequency changes?",
          [
            "Sound pitch",
            "Class number",
            "Folder name"
          ],
          0
        ],
        [
          "What does delay(700) hold?",
          [
            "Each brightness-tone step",
            "Only test score",
            "Class selection"
          ],
          0
        ],
        [
          "Which pin is buzzerPin?",
          [
            "D7",
            "D3",
            "A5"
          ],
          0
        ],
        [
          "What does this expert project combine?",
          [
            "Light dimming and sound tones",
            "Only templates",
            "Only one switch"
          ],
          0
        ]
      ]
    }
  }
});
