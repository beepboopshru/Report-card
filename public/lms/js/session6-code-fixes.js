(function () {
  const lessons = window.LMS_CONTENT || window.lessonContent || {};

  const code = {
    c4Main: `#include <TM1637Display.h> // Include library for 4-digit 7-segment display
#define CLK 8 // Clock pin connected to D8
#define DIO 9 // Data pin connected to D9

TM1637Display display(CLK, DIO); // Create display object

void setup() {
  display.setBrightness(7); // Set display brightness (range 0 to 7)
}

void loop() {
  static int count = 0; // Start from 0 and store the count
  display.showNumberDec(count); // Show the number on display
  delay(500); // Wait for 0.5 seconds
  count++; // Increase the number

  if (count == 10) { // Reset to 0 after 9
    count = 0;
  }
}`,
    c4Try: `#include <TM1637Display.h>
#define CLK 8
#define DIO 9

TM1637Display display(CLK, DIO);

void setup() {
  display.setBrightness(7);
}

void loop() {
  static int count = 0;
  display.showNumberDec(count);
  delay(500);
  count = (count + 1) % 10; // Automatically loops 0 -> 9 -> 0
}`,
    c5Main: `#include <TM1637Display.h> // Include library for 4-digit 7-segment display
#define CLK 8 // Clock pin connected to D8
#define DIO 9 // Data pin connected to D9
#define BUTTON_PIN 5 // Push button connected to D5

TM1637Display display(CLK, DIO); // Create display object

int count = 0; // Variable to store button press count
int lastButtonState = LOW;

void setup() {
  pinMode(BUTTON_PIN, INPUT); // Set button pin as input
  display.setBrightness(7); // Set display brightness (0 to 7)
  display.showNumberDec(0); // Initialize display with 0
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  // Detect button press (LOW to HIGH transition)
  if (buttonState == HIGH && lastButtonState == LOW) {
    count++; // Increment count
    if (count > 9999) count = 0; // Reset after 9999
    display.showNumberDec(count); // Display the count
    delay(200); // Debounce delay
  }

  lastButtonState = buttonState; // Store last button state
}`,
    c5Try: `#include <TM1637Display.h>
#define CLK 8
#define DIO 9
#define BUTTON_PIN 5

TM1637Display display(CLK, DIO);

int count = 0;
bool running = false; // Start/Stop flag
int lastButtonState = LOW;
unsigned long lastPressTime = 0;
int pressCount = 0;

void setup() {
  pinMode(BUTTON_PIN, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  // Detect button press
  if (buttonState == HIGH && lastButtonState == LOW) {
    pressCount++;
    lastPressTime = millis();
    delay(50); // debounce
  }

  // Check for double press within 400ms
  if (pressCount == 2 && (millis() - lastPressTime) < 400) {
    running = !running; // Toggle start/stop
    pressCount = 0;
    delay(200);
  }

  // Reset if too slow (not a double press)
  if ((millis() - lastPressTime) > 400) {
    pressCount = 0;
  }

  // Counting logic
  if (running) {
    display.showNumberDec(count);
    count++;
    if (count > 9999) count = 0;
    delay(500);
  }

  lastButtonState = buttonState;
}`,
    c6Main: `#include <TM1637Display.h> // Include library for 4-digit 7-segment display
#define CLK 8 // Clock pin connected to D8
#define DIO 9 // Data pin connected to D9
#define BUTTON_PIN 6 // Push button connected to D6

TM1637Display display(CLK, DIO); // Create display object

int count = 0; // Variable to store button press count
int lastButtonState = LOW;

void setup() {
  pinMode(BUTTON_PIN, INPUT); // Set button pin as input
  display.setBrightness(7); // Set display brightness (0 to 7)
  display.showNumberDec(0); // Initialize display with 0
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  // Detect button press (LOW to HIGH transition)
  if (buttonState == HIGH && lastButtonState == LOW) {
    count++; // Increment count
    if (count > 9999) count = 0; // Reset after 9999
    display.showNumberDec(count); // Display the count
    delay(200); // Debounce delay
  }

  lastButtonState = buttonState; // Store last button state
}`,
    c6Try: `#include <TM1637Display.h>
#define CLK 8
#define DIO 9
#define BUTTON_PIN 5

TM1637Display display(CLK, DIO);

int count = 0;
int lastButtonState = LOW;

void setup() {
  pinMode(BUTTON_PIN, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  // Detect button press
  if (buttonState == HIGH && lastButtonState == LOW) {
    count += 2; // Increase by 2 (even numbers)
    if (count > 9998) count = 2; // Reset safely within 4 digits
    display.showNumberDec(count);
    delay(200); // Debounce
  }

  lastButtonState = buttonState;
}`,
    c7Main: `// Sound Level -> TM1637 dB Display
// Sensor: analog output on A3
// Display: TM1637 4-digit (CLK=D8, DIO=D9)
// Board: Arduino UNO (or compatible)

#include <Arduino.h>
#include <TM1637Display.h>
#include <math.h>

#define SOUND_PIN A3 // Analog output from sound sensor
#define CLK_PIN 8 // TM1637 CLK
#define DIO_PIN 9 // TM1637 DIO

TM1637Display display(CLK_PIN, DIO_PIN);

// ---- Tuning knobs ----
const unsigned long SAMPLE_MS = 50; // sampling window
const float VCC_VOLTS = 5.0; // your board supply
const float REF_VOLTS = 0.010f; // ~10 mV reference for dB calc
const int CAL_OFFSET = 30; // shift reading up/down after log calc

void setup() {
  Serial.begin(9600);
  display.setBrightness(7); // 0..7
  display.clear();
}

int readDb() {
  unsigned long start = millis();
  int signalMax = 0;
  int signalMin = 1023;

  // Capture peak-to-peak over a short window
  while (millis() - start < SAMPLE_MS) {
    int sample = analogRead(SOUND_PIN);
    if (sample > signalMax) signalMax = sample;
    if (sample < signalMin) signalMin = sample;
  }

  int p2p = signalMax - signalMin; // peak-to-peak counts
  float volts = p2p * (VCC_VOLTS / 1023.0f); // convert to volts

  if (volts < 0.001f) volts = 0.001f;
  float dB = 20.0f * log10f(volts / REF_VOLTS);
  dB += CAL_OFFSET;

  if (dB < 0) dB = 0;
  if (dB > 99) dB = 99;

  return (int)(dB + 0.5f);
}

void loop() {
  int dB = readDb();

  Serial.print("Approx dB: ");
  Serial.println(dB);

  display.showNumberDec(dB, true);
  delay(50);
}`,
    c7Try: `#include <Arduino.h>
#include <TM1637Display.h>

#define SOUND_PIN A3
#define CLK_PIN 8
#define DIO_PIN 9

TM1637Display display(CLK_PIN, DIO_PIN);

// Clap settings
const int CLAP_THRESHOLD = 600; // Adjust based on your sensor
const int RESET_TIME = 3000; // 3 seconds

int count = 0;
unsigned long lastClapTime = 0;
bool clapDetected = false;

void setup() {
  Serial.begin(9600);
  display.setBrightness(7);
  display.showNumberDec(0);
}

void loop() {
  int soundValue = analogRead(SOUND_PIN);
  Serial.println(soundValue);

  // Detect clap (sound spike)
  if (soundValue > CLAP_THRESHOLD && !clapDetected) {
    count++; // Increase count
    if (count > 9999) count = 0;
    display.showNumberDec(count);
    lastClapTime = millis(); // Store clap time
    clapDetected = true; // Avoid multiple triggers
  }

  // Reset clap detection when sound goes low
  if (soundValue < CLAP_THRESHOLD - 50) {
    clapDetected = false;
  }

  // Reset after 3 seconds of no clap
  if (millis() - lastClapTime > RESET_TIME) {
    count = 0;
    display.showNumberDec(count);
  }

  delay(50);
}`
  };

  const updates = {
    "4-6": {
      downloads: [
        ["assets/downloads/class-4/session-6/explore/c4-session6-explore-code.zip", "Download Code ZIP", "primary"],
        ["assets/downloads/class-4/session-6/explore/c4-session6-try-this-code.zip", "Try Yourself ZIP", "secondary"]
      ],
      templates: { 3: "c4s6-explore-main-code", 4: "c4s6-explore-try-code" },
      codes: {
        "c4s6-explore-main-code": code.c4Main,
        "c4s6-explore-try-code": code.c4Try,
        "c4s6-elaborate-project1-code": code.c4Main,
        "c4s6-elaborate-project2-code": code.c4Try
      },
      explain: code.c4Main
    },
    "5-6": {
      downloads: [
        ["assets/downloads/class-5/session-6/explore/c5-session6-explore-code.zip", "Download Code ZIP", "primary"],
        ["assets/downloads/class-5/session-6/explore/c5-session6-try-this-code.zip", "Try Yourself ZIP", "secondary"]
      ],
      templates: { 3: "c5s6-explore-main-code", 5: "c5s6-explore-try-code", 6: "c5s6-explore-try-code" },
      codes: {
        "c5s6-explore-main-code": code.c5Main,
        "c5s6-explore-try-code": code.c5Try,
        "c5s6-elaborate-project1-code": code.c5Main
      },
      explain: code.c5Main
    },
    "6-6": {
      downloads: [
        ["assets/downloads/class-6/session-6/explore/c6-session6-explore-code.zip", "Download Code ZIP", "primary"],
        ["assets/downloads/class-6/session-6/explore/c6-session6-try-this-code.zip", "Try Yourself ZIP", "secondary"]
      ],
      templates: { 3: "c6s6-explore-main-code", 5: "c6s6-explore-try-code" },
      codes: {
        "c6s6-explore-main-code": code.c6Main,
        "c6s6-explore-try-code": code.c6Try,
        "c6s6-elaborate-project1-code": code.c6Main
      },
      explain: code.c6Main
    },
    "7-6": {
      downloads: [
        ["assets/downloads/class-7/session-6/explore/c7-session6-explore-code.zip", "Download Code ZIP", "primary"],
        ["assets/downloads/class-7/session-6/explore/c7-session6-try-this-code.zip", "Try Yourself ZIP", "secondary"]
      ],
      templates: { 3: "c7s6-explore-main-code", 4: "c7s6-explore-main-code", 5: "c7s6-explore-try-code", 6: "c7s6-explore-try-code" },
      codes: {
        "c7s6-explore-main-code": code.c7Main,
        "c7s6-explore-try-code": code.c7Try,
        "c7s6-elaborate-project1-code": code.c7Main
      },
      explain: code.c7Main
    }
  };

  Object.entries(updates).forEach(([lessonId, update]) => {
    const lesson = lessons[lessonId];
    if (!lesson || !lesson.explore || !lesson.elaborate) return;

    lesson.explore.downloads = update.downloads;
    lesson.explore.codes = Object.assign({}, lesson.explore.codes, update.codes);
    lesson.elaborate.codes = Object.assign({}, lesson.elaborate.codes, update.codes);
    lesson.explain.code = update.explain;

    Object.entries(update.templates).forEach(([index, templateId]) => {
      const page = lesson.explore.pages[Number(index)];
      if (page) page[3] = templateId;
    });
  });
})();
