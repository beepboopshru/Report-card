window.LMS_CONTENT = {
  "4-1": {
    grade: "4th Class",
    tier: "Beginner",
    session: "Session 1",
    topic: "Basics of Light and Sound Circuits",
    cover: "assets/images/pdf/year-1/session-1-cover.jpg",
    engage: {
      title: "Curiosity Kickoff",
      lead: "Lights are everywhere, but how does a small board control when they turn on, turn off, or blink?",
      triggers: [
        ["assets/images/real/class-4/session-1/desk-lamp.jpg", "Desk Lamp", "What tells a lamp to glow when we switch it on?", "A desk lamp is a familiar example of a simple light output. When the switch allows electricity to flow, the lamp turns on."],
        ["assets/images/real/class-4/session-1/traffic-light.jpg", "Traffic Light", "How do lights change at the right time?", "Traffic lights follow a planned sequence. One light turns on, waits, turns off, and the next light turns on."],
        ["assets/images/real/class-4/session-1/toy-light.jpg", "Toy Light", "How can a toy make a light blink again and again?", "Many toys use small circuits to create blinking or glowing effects."],
        ["assets/images/real/class-4/session-1/alarm-light.jpg", "Alarm Light", "Why do warning lights flash instead of staying on all the time?", "A flashing light catches attention quickly and is useful for warnings."],
        ["assets/images/real/class-4/session-1/night-light.jpg", "Night Light", "What makes a small light useful when the room is dark?", "A night light shows how even a small LED can create a useful visible result."]
      ],
      objectives: [
        "Identify an LED as a light output device.",
        "Understand that Arduino can control a light using a digital pin.",
        "Connect ON, OFF, and WAIT to a blinking pattern.",
        "Prepare students to observe the D5 and GND circuit in Explore.",
        "Build curiosity before reading the code and circuit steps."
      ]
    },
    explore: {
      title: "Hands-on Coding",
      note: "Beginner Project: Blink LED with Delay Patterns",
      downloads: [
        ["assets/downloads/class-4/session-1/explore/4th-class-beginner-arduino-code.zip", "Download Code ZIP", "primary"],
        ["assets/downloads/class-4/session-1/explore/try-this-yourself-code.zip", "Try Yourself ZIP", "secondary"]
      ],
      pages: [
        ["assets/images/pdf/class-4/session-1/explore-page-02-curiosity.jpg", "Curiosity Kickoff", "Light, sound, switch, and component introduction."],
        ["assets/images/pdf/class-4/session-1/explore-page-03.jpg", "Project Setup", "Materials, D5/GND connection, and circuit diagram."],
        ["assets/images/pdf/class-4/session-1/explore-page-04.jpg", "Main Code", "LED blink program.", "explore-main-code"],
        ["assets/images/pdf/class-4/session-1/explore-page-05.jpg", "Try This Yourself", "Practice code variation.", "explore-try-code"]
      ],
      codes: {
        "explore-main-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(500);\n  digitalWrite(ledPin, LOW);\n  delay(500);\n}",
        "explore-try-code": "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(200);\n  digitalWrite(ledPin, LOW);\n  delay(200);\n  digitalWrite(ledPin, HIGH);\n  delay(800);\n  digitalWrite(ledPin, LOW);\n  delay(800);\n}"
      }
    },
    explain: {
      code: "const int ledPin = 5;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(500);\n  digitalWrite(ledPin, LOW);\n  delay(500);\n}",
      steps: [
        ["Select the Pin", "const int ledPin = 5; stores the number 5 using the name ledPin."],
        ["Prepare the Pin", "pinMode(ledPin, OUTPUT); tells the Arduino that D5 will send a signal out."],
        ["Turn the LED On", "digitalWrite(ledPin, HIGH); sends an ON signal to D5."],
        ["Wait", "delay(500); pauses the program for 500 milliseconds."],
        ["Turn Off and Repeat", "digitalWrite(ledPin, LOW); turns the LED off, then loop repeats."]
      ]
    },
    elaborate: {
      title: "Physical Build",
      note: "Beginner Build: Desk Lamp and Alarm Bell Templates",
      materials: [
        ["assets/images/pdf/class-4/session-1/elaborate-page-02-fasteners.jpg", "Structure and Fasteners", "Spacers, screws, nuts, L clamp, Arduino with shield, and cable."],
        ["assets/images/pdf/class-4/session-1/elaborate-page-03-components.jpg", "Electronic Components", "LED PCB, buzzer PCB, switches, rocker switch PCB, and RMC connector."],
        ["assets/images/templates/class-4/session-1/beginner-elaborate-templates.png", "Templates", "Desk lamp and alarm bell templates for the beginner builds."]
      ],
      projects: [
        {
          title: "Project 1: Desk Lamp",
          download: ["assets/downloads/class-4/session-1/elaborate/elaborate-desk-lamp-code.zip", "Desk Lamp ZIP", "primary"],
          pages: [
            ["assets/images/pdf/class-4/session-1/elaborate-page-05.jpg", "Desk Lamp Circuit", "LED circuit diagram and connection template."],
            ["assets/images/pdf/class-4/session-1/elaborate-page-06.jpg", "Desk Lamp Assembly", "LED build steps 1-4."],
            ["assets/images/pdf/class-4/session-1/elaborate-page-07.jpg", "Desk Lamp Template", "Final template attachment."],
            ["assets/images/pdf/class-4/session-1/elaborate-page-08.jpg", "Desk Lamp Code Page", "Arduino code reference.", "elaborate-desk-lamp-code"]
          ],
          working: "The desk lamp project uses an LED as the light source. When the circuit is powered and the switch path is ON, current flows through the LED module and the lamp glows."
        },
        {
          title: "Project 2: Alarm Bell",
          download: ["assets/downloads/class-4/session-1/elaborate/elaborate-alarm-bell-code.zip", "Alarm Bell ZIP", "secondary"],
          pages: [
            ["assets/images/pdf/class-4/session-1/elaborate-page-09.jpg", "Alarm Bell Circuit", "Buzzer circuit diagram and connection template."],
            ["assets/images/pdf/class-4/session-1/elaborate-page-10.jpg", "Alarm Bell Assembly", "Push button and buzzer build steps."],
            ["assets/images/pdf/class-4/session-1/elaborate-page-11.jpg", "Alarm Bell Template", "Final alarm template attachment."],
            ["assets/images/pdf/class-4/session-1/elaborate-page-12.jpg", "Alarm Bell Code Page", "Arduino code reference.", "elaborate-alarm-bell-code"]
          ],
          working: "The alarm bell project uses a buzzer as the sound output. When the circuit is powered, the buzzer receives an electrical signal and produces sound."
        }
      ],
      codes: {
        "elaborate-desk-lamp-code": "const int led = 6;\n\nvoid setup() {\n  pinMode(led, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led, HIGH);\n}",
        "elaborate-alarm-bell-code": "const int buzzer = 6;\n\nvoid setup() {\n  pinMode(buzzer, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(buzzer, HIGH);\n}"
      }
    }
  },
  "5-1": {
    grade: "5th Class",
    tier: "Intermediate",
    session: "Session 1",
    topic: "Outputs and Inputs Overview",
    cover: "assets/images/pdf/year-1/session-1-cover.jpg",
    engage: {
      title: "Curiosity Kickoff",
      lead: "How can a simple switch decide when a light or buzzer should work?",
      triggers: [
        ["assets/images/real/class-5/session-1/g5-rocker-switch.jpg", "Room Switch", "How does one switch control a fan or light?", "A room switch opens or closes an electrical path. This helps students understand how a rocker switch can control whether an output works."],
        ["assets/images/real/class-5/session-1/g5-doorbell-button.jpg", "Doorbell Button", "Why does a bell ring only when the button is pressed?", "A doorbell button completes a circuit for a short time. This connects directly to input-output thinking."],
        ["assets/images/real/class-5/session-1/g5-remote-control.jpg", "Remote Button", "How can one button make a device respond?", "Remote buttons send a command. In this lesson, students see a simpler version: a switch allows an LED or buzzer to respond."],
        ["assets/images/real/class-5/session-1/g5-power-strip.jpg", "Power Strip Switch", "Why can one switch control power to many devices?", "A power strip switch controls the supply path. It shows how manual control can decide whether devices receive power."],
        ["assets/images/real/class-5/session-1/g5-elevator-buttons.jpg", "Elevator Button", "What happens after we press a button?", "An elevator button is an input. The system reads the input and creates an output, such as light, sound, or movement."]
      ],
      objectives: [
        "Understand a rocker switch as a manual ON/OFF control.",
        "Use Arduino output pins to control one LED.",
        "Connect a green SMD LED with RMC wires.",
        "Compare the main code with a changed-pin practice code.",
        "Recognize how switches support simple input-output behavior."
      ]
    },
    explore: {
      title: "Hands-on Coding",
      note: "Intermediate Project: Outputs and Inputs Overview",
      downloads: [
        ["assets/downloads/class-5/session-1/explore/g5-session1-explore-code.zip", "Download Code ZIP", "primary"],
        ["assets/downloads/class-5/session-1/explore/g5-session1-try-this-code.zip", "Try Yourself ZIP", "secondary"]
      ],
      pages: [
        ["assets/images/pdf/class-5/session-1/explore-g5-page-06.jpg", "Project Setup", "Materials, D6/GND connection, and circuit guide."],
        ["assets/images/pdf/class-5/session-1/explore-g5-page-07.jpg", "Main Code", "Rocker switch LED output program.", "g5-explore-main-code"],
        ["assets/images/pdf/class-5/session-1/explore-g5-page-08.jpg", "Try This Yourself", "Changed-pin practice code.", "g5-explore-try-code"]
      ],
      codes: {
        "g5-explore-main-code": "const int led = 7;\n\nvoid setup() {\n  pinMode(led, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led, HIGH);\n}",
        "g5-explore-try-code": "const int led = 5;\n\nvoid setup() {\n  pinMode(led, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led, HIGH);\n}"
      }
    },
    explain: {
      code: "const int led = 7;\n\nvoid setup() {\n  pinMode(led, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led, HIGH);\n}",
      steps: [
        ["Select the Output Pin", "const int led = 7; gives the LED pin a simple name."],
        ["Set Output Mode", "pinMode(led, OUTPUT); prepares the pin to send a signal."],
        ["Keep LED On", "digitalWrite(led, HIGH); keeps the LED output active."],
        ["Manual Control", "The rocker switch controls whether current can flow to the LED."],
        ["Try Another Pin", "Changing the pin number helps students understand independent Arduino outputs."]
      ]
    },
    elaborate: {
      title: "Physical Build",
      note: "Intermediate Build: LED Lantern and Buzzer Alert Templates",
      materials: [
        ["assets/images/pdf/class-4/session-1/elaborate-page-02-fasteners.jpg", "Structure and Fasteners", "Spacers, screws, nuts, L clamp, Arduino with shield, and cable."],
        ["assets/images/pdf/class-4/session-1/elaborate-page-03-components.jpg", "Electronic Components", "LED PCB, buzzer PCB, switches, rocker switch PCB, and RMC connector."],
        ["assets/images/templates/class-5/session-1/class-5-templates-enhanced.png", "Templates", "Lantern and alert templates for the intermediate builds."]
      ],
      projects: [
        {
          title: "Project 1: LED Lantern",
          download: ["assets/downloads/class-5/session-1/elaborate/g5-lantern-code.zip", "Lantern ZIP", "primary"],
          pages: [
            ["assets/images/pdf/class-5/session-1/elaborate-g5-page-13.jpg", "Lantern Circuit", "LED circuit diagram and connection template."],
            ["assets/images/pdf/class-5/session-1/elaborate-g5-page-14.jpg", "Lantern Assembly", "Switch PCB and LED mounting steps."],
            ["assets/images/pdf/class-5/session-1/elaborate-g5-page-15.jpg", "Lantern Template", "Template attachment and completion."],
            ["assets/images/pdf/class-5/session-1/elaborate-g5-page-16.jpg", "Lantern Code Page", "Arduino code reference.", "g5-elaborate-lantern-code"]
          ],
          working: "The lantern project uses the rocker switch to control an LED output. When the switch path is ON, current reaches the LED and the lantern glows."
        },
        {
          title: "Project 2: Buzzer Alert",
          download: ["assets/downloads/class-5/session-1/elaborate/g5-buzzer-alert-code.zip", "Buzzer Alert ZIP", "secondary"],
          pages: [
            ["assets/images/pdf/class-5/session-1/elaborate-g5-page-17.jpg", "Buzzer Circuit", "Buzzer circuit diagram and connection template."],
            ["assets/images/pdf/class-5/session-1/elaborate-g5-page-18.jpg", "Buzzer Assembly", "Push button and buzzer setup."],
            ["assets/images/pdf/class-5/session-1/elaborate-g5-page-19.jpg", "Buzzer Template", "Template placement on board."],
            ["assets/images/pdf/class-5/session-1/elaborate-g5-page-20.jpg", "Buzzer Code Page", "Arduino code reference.", "g5-elaborate-buzzer-code"]
          ],
          working: "The buzzer alert project uses a buzzer as the output. When the circuit is active, electrical energy is converted into sound."
        }
      ],
      codes: {
        "g5-elaborate-lantern-code": "const int led = 6;\n\nvoid setup() {\n  pinMode(led, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led, HIGH);\n}",
        "g5-elaborate-buzzer-code": "const int buzzer = 6;\n\nvoid setup() {\n  pinMode(buzzer, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(buzzer, HIGH);\n}"
      }
    }
  },
  "6-1": {
    grade: "6th Class",
    tier: "Advanced",
    session: "Session 1",
    topic: "Pin Usage Basics",
    cover: "assets/images/pdf/year-1/session-1-cover.jpg",
    engage: {
      title: "Curiosity Kickoff",
      lead: "How can one Arduino control many lights in a planned sequence?",
      triggers: [
        ["assets/images/real/class-6/session-1/traffic-light-sequence.jpg", "Traffic Light Sequence", "How do lights turn on one after another?", "Traffic signals show how different lights can follow a planned order. This connects to controlling red, green, and yellow LEDs with separate pins."],
        ["assets/images/real/class-6/session-1/signal-light.jpg", "Warning Signal", "Why do warning lights blink in patterns?", "A warning light uses timing to catch attention. Students use this idea to understand delay and repeated output control."],
        ["assets/images/real/class-6/session-1/toy-pattern.jpg", "Toy Light Pattern", "How can a toy create different light effects?", "Light-up toys often use repeated patterns. Arduino can create similar patterns by changing which output pin is HIGH."],
        ["assets/images/real/class-6/session-1/multi-output-control.jpg", "Multiple Outputs", "How can one controller handle more than one device?", "A controller can send signals through different pins. Each pin can control one output independently."],
        ["assets/images/real/class-6/session-1/indicator-light.jpg", "Indicator Lights", "Why do machines use different colored lights?", "Different colors can show different states. In this session, each LED color is controlled by a different Arduino pin."]
      ],
      objectives: [
        "Use multiple Arduino output pins.",
        "Connect three LEDs to D5, D6, and D7.",
        "Understand sequence and timing in LED patterns.",
        "Compare main code with a changed sequence.",
        "Recognize how multiple outputs work as one system."
      ]
    },
    explore: {
      title: "Hands-on Coding",
      note: "Advanced Project: Pin Usage Basics",
      downloads: [
        ["assets/downloads/class-6/session-1/explore/c6-session1-explore-code.zip", "Download Code ZIP", "primary"],
        ["assets/downloads/class-6/session-1/explore/c6-session1-try-this-code.zip", "Try Yourself ZIP", "secondary"]
      ],
      pages: [
        ["assets/images/pdf/class-6/session-1/explore-c6-page-09.jpg", "Project Setup", "Three LED materials and D5/D6/D7 connection guide."],
        ["assets/images/pdf/class-6/session-1/explore-c6-page-10.jpg", "Main Code", "Three-LED sequence program.", "c6-explore-main-code"],
        ["assets/images/pdf/class-6/session-1/explore-c6-page-11.jpg", "Try This Yourself", "Changed LED sequence practice.", "c6-explore-try-code"],
        ["assets/images/pdf/class-6/session-1/explore-c6-page-12.jpg", "Learning Objective", "Advanced learning outcomes for multiple outputs."]
      ],
      codes: {
        "c6-explore-main-code": "const int led1 = 5;\nconst int led2 = 6;\nconst int led3 = 7;\n\nvoid setup() {\n  pinMode(led1, OUTPUT);\n  pinMode(led2, OUTPUT);\n  pinMode(led3, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led1, HIGH);\n  digitalWrite(led2, LOW);\n  digitalWrite(led3, LOW);\n  delay(300);\n  digitalWrite(led1, LOW);\n  digitalWrite(led2, HIGH);\n  digitalWrite(led3, LOW);\n  delay(300);\n  digitalWrite(led1, LOW);\n  digitalWrite(led2, LOW);\n  digitalWrite(led3, HIGH);\n  delay(300);\n}",
        "c6-explore-try-code": "const int led1 = 5;\nconst int led2 = 6;\nconst int led3 = 7;\n\nvoid setup() {\n  pinMode(led1, OUTPUT);\n  pinMode(led2, OUTPUT);\n  pinMode(led3, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led1, HIGH);\n  digitalWrite(led2, HIGH);\n  digitalWrite(led3, LOW);\n  delay(250);\n  digitalWrite(led1, LOW);\n  digitalWrite(led2, HIGH);\n  digitalWrite(led3, HIGH);\n  delay(250);\n  digitalWrite(led1, HIGH);\n  digitalWrite(led2, LOW);\n  digitalWrite(led3, HIGH);\n  delay(250);\n  digitalWrite(led1, LOW);\n  digitalWrite(led2, LOW);\n  digitalWrite(led3, LOW);\n  delay(250);\n}"
      }
    },
    explain: {
      code: "const int led1 = 5;\nconst int led2 = 6;\nconst int led3 = 7;\n\nvoid setup() {\n  pinMode(led1, OUTPUT);\n  pinMode(led2, OUTPUT);\n  pinMode(led3, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led1, HIGH);\n  digitalWrite(led2, LOW);\n  digitalWrite(led3, LOW);\n  delay(300);\n  digitalWrite(led1, LOW);\n  digitalWrite(led2, HIGH);\n  digitalWrite(led3, LOW);\n  delay(300);\n  digitalWrite(led1, LOW);\n  digitalWrite(led2, LOW);\n  digitalWrite(led3, HIGH);\n  delay(300);\n}",
      steps: [
        ["Name Three Pins", "led1, led2, and led3 are names for pins D5, D6, and D7."],
        ["Prepare Outputs", "Each LED pin is set as OUTPUT so Arduino can control it."],
        ["Control One LED at a Time", "The code turns one LED HIGH while keeping the others LOW."],
        ["Use Timing", "delay(300) keeps each visible state long enough to observe."],
        ["Create a Sequence", "The loop repeats the red, green, yellow sequence again and again."]
      ]
    },
    elaborate: {
      title: "Physical Build",
      note: "Advanced Build: Messenger and SOS Templates",
      materials: [
        ["assets/images/pdf/class-6/session-1/elaborate-c6-page-02.jpg", "Structure and Fasteners", "Spacers, screws, nuts, L clamp, Arduino with shield, and cable."],
        ["assets/images/pdf/class-6/session-1/elaborate-c6-page-03.jpg", "Electronic Components", "LED PCB, buzzer PCB, switches, rocker switch PCB, and RMC connector."],
        ["assets/images/templates/class-6/session-1/class-6-templates-enhanced.png", "Templates", "Messenger and SOS templates for the advanced builds."]
      ],
      projects: [
        {
          title: "Project 1: Messenger",
          download: ["assets/downloads/class-6/session-1/elaborate/c6-messenger-code.zip", "Messenger ZIP", "primary"],
          pages: [
            ["assets/images/pdf/class-6/session-1/elaborate-c6-page-21.jpg", "Messenger Circuit", "LED circuit diagram and connection template."],
            ["assets/images/pdf/class-6/session-1/elaborate-c6-page-22.jpg", "Messenger Assembly", "Switch PCB, LED stand, and template setup."],
            ["assets/images/pdf/class-6/session-1/elaborate-c6-page-23.jpg", "Messenger Complete", "Messenger model ready for exploration."],
            ["assets/images/pdf/class-6/session-1/elaborate-c6-page-24.jpg", "Messenger Code Page", "Arduino blink code reference.", "c6-elaborate-messenger-code"]
          ],
          working: "The messenger project uses an LED output to create a visible blinking message effect. The Arduino turns the LED on and off using timing."
        },
        {
          title: "Project 2: SOS Alarm",
          download: ["assets/downloads/class-6/session-1/elaborate/c6-sos-alarm-code.zip", "SOS Alarm ZIP", "secondary"],
          pages: [
            ["assets/images/pdf/class-6/session-1/elaborate-c6-page-25.jpg", "SOS Circuit", "Buzzer circuit diagram and connection template."],
            ["assets/images/pdf/class-6/session-1/elaborate-c6-page-26.jpg", "SOS Assembly", "Push button, buzzer, stands, and template setup."],
            ["assets/images/pdf/class-6/session-1/elaborate-c6-page-27.jpg", "SOS Complete", "SOS model ready for emergency trigger activity."],
            ["assets/images/pdf/class-6/session-1/elaborate-c6-page-28.jpg", "SOS Code Page", "Buzzer code reference.", "c6-elaborate-sos-code"]
          ],
          working: "The SOS alarm project uses a buzzer output to make an alert. The buzzer sounds when the circuit receives the output signal."
        }
      ],
      codes: {
        "c6-elaborate-messenger-code": "const int led = 6;\n\nvoid setup() {\n  pinMode(led, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led, HIGH);\n  delay(1000);\n  digitalWrite(led, LOW);\n  delay(1000);\n}",
        "c6-elaborate-sos-code": "const int buzzer = 6;\n\nvoid setup() {\n  pinMode(buzzer, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(buzzer, HIGH);\n}"
      }
    }
  },
  "7-1": {
    grade: "7th Class",
    tier: "Expert",
    session: "Session 1",
    topic: "System Design Thinking with Arduino",
    cover: "assets/images/pdf/year-1/session-1-cover.jpg",
    engage: {
      title: "Curiosity Kickoff",
      lead: "How can an electronic system respond when a trigger is pressed?",
      triggers: [
        ["assets/images/real/class-7/session-1/alarm-system.jpg", "Alarm System", "Why do alarms use sound or flashing light?", "Alarm systems use outputs to warn people quickly. This connects to buzzer and LED outputs."],
        ["assets/images/real/class-7/session-1/button-trigger.jpg", "Button Trigger", "Why does a doorbell respond only after pressing a button?", "A button can act as a trigger that starts an output."],
        ["assets/images/real/class-7/session-1/system-input.jpg", "System Input", "What happens after a system receives an input?", "A system reads an input and produces a response, such as light or sound."],
        ["assets/images/real/class-7/session-1/remote-trigger.jpg", "Remote Trigger", "How can one command control a device?", "A trigger command can make an output device respond immediately."],
        ["assets/images/real/class-7/session-1/switch-system.jpg", "Control Switch", "How does a switch become part of a bigger system?", "A switch is a small control element inside a full input-output system."]
      ],
      objectives: [
        "Understand simple system behavior using Arduino.",
        "Recognize a buzzer as a sound output.",
        "Connect trigger thinking to alarms and alerts.",
        "Compare main buzzer code with a changed-pin variation.",
        "Prepare for integrated physical builds."
      ]
    },
    explore: {
      title: "Hands-on Coding",
      note: "Expert Project: System Design Thinking with Arduino",
      downloads: [
        ["assets/downloads/class-7/session-1/explore/c7-session1-explore-code.zip", "Download Code ZIP", "primary"],
        ["assets/downloads/class-7/session-1/explore/c7-session1-try-this-code.zip", "Try Yourself ZIP", "secondary"]
      ],
      pages: [
        ["assets/images/pdf/class-7/session-1/explore-c7-page-13.jpg", "Project Setup", "Buzzer system materials and connection guide."],
        ["assets/images/pdf/class-7/session-1/explore-c7-page-14.jpg", "Main Code", "Buzzer output code.", "c7-explore-main-code"],
        ["assets/images/pdf/class-7/session-1/explore-c7-page-15.jpg", "Try This Yourself", "Changed buzzer pin practice.", "c7-explore-try-code"],
        ["assets/images/pdf/class-7/session-1/explore-c7-page-16.jpg", "Learning Objective", "Expert system-thinking outcomes."]
      ],
      codes: {
        "c7-explore-main-code": "const int buzzer = 5;\n\nvoid setup() {\n  pinMode(buzzer, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(buzzer, HIGH);\n}",
        "c7-explore-try-code": "const int buzzer = 7;\n\nvoid setup() {\n  pinMode(buzzer, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(buzzer, HIGH);\n}"
      }
    },
    explain: {
      code: "const int buzzer = 5;\n\nvoid setup() {\n  pinMode(buzzer, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(buzzer, HIGH);\n}",
      steps: [
        ["Select the Buzzer Pin", "const int buzzer = 5; gives the buzzer pin a clear name."],
        ["Prepare Output", "pinMode(buzzer, OUTPUT); prepares the pin to send an output signal."],
        ["Activate Sound", "digitalWrite(buzzer, HIGH); sends the ON signal to the buzzer."],
        ["Think as a System", "The buzzer is the output response of a simple alarm system."],
        ["Try Another Pin", "Changing the buzzer pin helps students understand system wiring choices."]
      ]
    },
    elaborate: {
      title: "Physical Build",
      note: "Expert Build: Winking Smiley and Pikachu Templates",
      materials: [
        ["assets/images/pdf/class-7/session-1/elaborate-c7-page-02.jpg", "Structure and Fasteners", "Spacers, screws, nuts, L clamp, Arduino with shield, and cable."],
        ["assets/images/pdf/class-7/session-1/elaborate-c7-page-03.jpg", "Electronic Components", "LED PCB, buzzer PCB, switches, rocker switch PCB, and RMC connector."],
        ["assets/images/templates/class-7/session-1/class-7-templates-enhanced.png", "Templates", "Winking smiley and Pikachu templates for the expert builds."]
      ],
      projects: [
        {
          title: "Project 1: Winking Smiley",
          download: ["assets/downloads/class-7/session-1/elaborate/c7-smiley-code.zip", "Smiley ZIP", "primary"],
          pages: [
            ["assets/images/pdf/class-7/session-1/elaborate-c7-page-29.jpg", "Smiley Circuit", "LED circuit diagram and connection template."],
            ["assets/images/pdf/class-7/session-1/elaborate-c7-page-30.jpg", "Smiley Assembly", "Switch PCB and LED stand setup."],
            ["assets/images/pdf/class-7/session-1/elaborate-c7-page-31.jpg", "Smiley Template", "Template attachment and completion."],
            ["assets/images/pdf/class-7/session-1/elaborate-c7-page-32.jpg", "Smiley Code Page", "LED blink code reference.", "c7-elaborate-smiley-code"]
          ],
          working: "The winking smiley project uses a blinking LED output to create a visual expression effect."
        },
        {
          title: "Project 2: Pikachu",
          download: ["assets/downloads/class-7/session-1/elaborate/c7-pikachu-code.zip", "Pikachu ZIP", "secondary"],
          pages: [
            ["assets/images/pdf/class-7/session-1/elaborate-c7-page-33.jpg", "Pikachu Circuit", "LED circuit diagram and connection template."],
            ["assets/images/pdf/class-7/session-1/elaborate-c7-page-34.jpg", "Pikachu Assembly", "LED, buzzer, stands, and board setup."],
            ["assets/images/pdf/class-7/session-1/elaborate-c7-page-35.jpg", "Pikachu Template", "Template folding and final placement."],
            ["assets/images/pdf/class-7/session-1/elaborate-c7-page-36.jpg", "Pikachu Code Page", "LED blink code reference.", "c7-elaborate-pikachu-code"]
          ],
          working: "The Pikachu project uses an LED output to create a light-up character model, connecting code behavior to a finished craft object."
        }
      ],
      codes: {
        "c7-elaborate-smiley-code": "const int led = 6;\n\nvoid setup() {\n  pinMode(led, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led, HIGH);\n  delay(500);\n  digitalWrite(led, LOW);\n  delay(500);\n}",
        "c7-elaborate-pikachu-code": "const int led = 6;\n\nvoid setup() {\n  pinMode(led, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(led, HIGH);\n  delay(500);\n  digitalWrite(led, LOW);\n  delay(500);\n}"
      }
    }
  }
};

Object.assign(window.LMS_CONTENT["4-1"], {
  evaluate: {
    challenge: "Complete the missing parts so the LED on D5 blinks with a delay.",
    questions: [
      ["Which pin controls the red LED in the beginner project?", ["D2", "D5", "D7"], 1],
      ["What does delay(500) create?", ["A half-second wait", "A pin change", "A USB upload"], 0],
      ["What does digitalWrite(ledPin, HIGH) do?", ["Turns the LED on", "Turns the LED off", "Changes wire color"], 0],
      ["What does digitalWrite(ledPin, LOW) do?", ["Turns the LED off", "Starts the computer", "Changes the LED to green"], 0],
      ["Which function runs again and again?", ["setup()", "loop()", "pinMode()"], 1],
      ["Which function runs once when Arduino starts?", ["loop()", "delay()", "setup()"], 2],
      ["What is the LED in this project?", ["Input device", "Output device", "Storage device"], 1],
      ["Which cable connects Arduino to the computer?", ["USB cable", "RMC wire", "Template"], 0],
      ["What happens if the delay value is smaller?", ["Blink becomes faster", "LED disappears", "Pin becomes input"], 0],
      ["What is the return path of the circuit called?", ["D5", "GND", "USB"], 1],
      ["Which side of LED is positive?", ["Anode", "Cathode", "GND"], 0],
      ["Which side of LED is negative?", ["Anode", "Cathode", "D5"], 1],
      ["Why is LED polarity important?", ["LED works in one direction", "It stores code", "It changes the template"], 0],
      ["What does pinMode(ledPin, OUTPUT) prepare?", ["The LED pin", "The PDF page", "The keyboard"], 0],
      ["What is the main pattern in this class?", ["Blink ON and OFF", "Read a sensor", "Move a motor"], 0]
    ]
  }
});

Object.assign(window.LMS_CONTENT["5-1"], {
  evaluate: {
    challenge: "Complete the missing parts for a switch-controlled LED output.",
    questions: [
      ["Which topic best matches Class 5 Session 1?", ["Multiple LEDs", "Outputs and Inputs Overview", "Servo motor"], 1],
      ["Which switch is used in the Class 5 project?", ["Rocker switch", "Slide sensor", "Potentiometer"], 0],
      ["Which LED color is listed in the Explore materials?", ["Green", "Red", "Blue"], 0],
      ["What does a rocker switch do?", ["Turns a circuit ON or OFF", "Uploads code", "Measures temperature"], 0],
      ["What does digitalWrite(led, HIGH) do in the main code?", ["Keeps LED ON", "Keeps LED OFF", "Deletes the pin"], 0],
      ["Which pin appears in the main Class 5 code?", ["7", "3", "12"], 0],
      ["Which pin appears in the Try This Yourself code?", ["5", "9", "A1"], 0],
      ["Why compare main and try code?", ["To see what changed", "To erase Arduino", "To change the book"], 0],
      ["What is the role of pinMode(led, OUTPUT)?", ["Set LED pin as output", "Set USB as input", "Start buzzer"], 0],
      ["Which component makes manual control possible?", ["Rocker switch PCB", "Paper template only", "Spacer screw only"], 0],
      ["What happens when switch path is OFF?", ["Current is blocked", "LED becomes a buzzer", "Arduino uploads code"], 0],
      ["What kind of device is the LED?", ["Output", "Input", "Memory"], 0],
      ["What do RMC wires help connect?", ["Modules to Arduino/shield", "Only paper", "Only laptop screen"], 0],
      ["What is the Class 5 Elaborate LED project called?", ["LED Lantern", "Pikachu", "Traffic robot"], 0],
      ["What is the Class 5 second Elaborate output?", ["Buzzer alert", "Water pump", "Display"], 0]
    ]
  }
});

Object.assign(window.LMS_CONTENT["6-1"], {
  evaluate: {
    challenge: "Complete the missing parts for a three-LED sequence.",
    questions: [
      ["What is the Class 6 tier?", ["Advanced", "Beginner", "Expert"], 0],
      ["How many LEDs are used in Explore?", ["Three", "One", "Five"], 0],
      ["Which pins are used for the three LEDs?", ["D5, D6, D7", "D1, D2, D3", "A0, A1, A2"], 0],
      ["Why are led1, led2, led3 named separately?", ["To control separate outputs", "To connect USB", "To change PDF"], 0],
      ["What does a sequence mean?", ["Outputs turn on in planned order", "All wires are removed", "Code is deleted"], 0],
      ["What does delay(300) do?", ["Keeps each state visible", "Turns all pins into inputs", "Changes LED color permanently"], 0],
      ["In the main code, when led1 is HIGH, what are led2 and led3?", ["LOW", "HIGH", "INPUT"], 0],
      ["Why use multiple pins?", ["Each pin can control a different output", "Only one pin exists", "Pins are decorative"], 0],
      ["What does the Try This code change?", ["Pattern and timing", "Arduino board name", "USB cable"], 0],
      ["Which real-life system uses light sequencing?", ["Traffic light", "Water bottle", "Notebook"], 0],
      ["What does OUTPUT mean?", ["Arduino sends signal out", "Arduino reads button only", "Arduino sleeps"], 0],
      ["What does LOW usually mean for an LED output?", ["OFF", "ON", "Upload"], 0],
      ["What is the Messenger Elaborate project output?", ["LED", "Motor", "Screen"], 0],
      ["What is the SOS Elaborate project output?", ["Buzzer", "Servo", "Camera"], 0],
      ["What is the main skill in Class 6 Session 1?", ["Coordinating multiple outputs", "Drawing only", "Typing names"], 0]
    ]
  }
});

Object.assign(window.LMS_CONTENT["7-1"], {
  evaluate: {
    challenge: "Complete the missing parts for a simple buzzer output system.",
    questions: [
      ["What is the Class 7 tier?", ["Expert", "Beginner", "Intermediate"], 0],
      ["Which output device is central in the Explore project?", ["Buzzer", "Three LEDs", "Motor"], 0],
      ["Which pin is used for the main buzzer code?", ["D5", "D2", "A0"], 0],
      ["Which pin is used in Try This Yourself?", ["D7", "D4", "A3"], 0],
      ["What does digitalWrite(buzzer, HIGH) do?", ["Turns buzzer ON", "Turns buzzer OFF", "Uploads a file"], 0],
      ["What does pinMode(buzzer, OUTPUT) prepare?", ["Buzzer pin as output", "Button as paper", "USB as LED"], 0],
      ["What does system thinking mean here?", ["Input/output parts work as one behavior", "Only one wire is used", "No code is needed"], 0],
      ["What does a buzzer produce?", ["Sound", "Light only", "Water"], 0],
      ["Why are alarms useful?", ["They alert people quickly", "They hide signals", "They erase code"], 0],
      ["What kind of output is a buzzer?", ["Sound output", "Storage output", "Drawing output"], 0],
      ["What is the Winking Smiley project output?", ["Blinking LED", "Temperature", "Motor speed"], 0],
      ["What is the Pikachu project output?", ["Light-up character", "Water alarm", "Keyboard"], 0],
      ["What should happen after changing buzzer pin?", ["Wire/code should match", "Remove Arduino", "Ignore GND"], 0],
      ["Which function repeats the buzzer behavior?", ["loop()", "setup()", "const"], 0],
      ["What is the main idea of Class 7 Session 1?", ["Simple alarm/system response", "Only timing LEDs", "Only fasteners"], 0]
    ]
  }
});



