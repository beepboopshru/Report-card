(function () {
  const content = window.LMS_CONTENT || {};

  function replaceCodes(lessonId, phase, codes) {
    const lesson = content[lessonId];
    if (!lesson || !lesson[phase]) return;
    lesson[phase].codes = {
      ...(lesson[phase].codes || {}),
      ...codes
    };
  }

  const simpleCodeComment =
`/*
Simple Arduino Code
Pin logic based on updated component list and custom switch PCB logic.
*/`;

  const simpleCodeCommentWrapped =
`/*
Simple Arduino Code
Pin logic based on updated component list
and custom switch PCB logic.
*/`;

  replaceCodes("4-4", "explore", {
    "c4s4-explore-main-code":
`${simpleCodeComment}
const int limitSwitch = 7;

void setup() {
  pinMode(limitSwitch, OUTPUT);
}

void loop() {
  digitalWrite(limitSwitch, HIGH);
}`,
    "c4s4-explore-try-code":
`const int redPin = 5;
const int greenPin = 6;
const int bluePin = 7;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, HIGH);
  digitalWrite(bluePin, LOW);
  delay(1000);

  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, HIGH);
  digitalWrite(bluePin, HIGH);
  delay(1000);

  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, HIGH);
  delay(1000);
}`
  });

  replaceCodes("4-4", "elaborate", {
    "c4s4-elaborate-project1-code":
`${simpleCodeComment}
const int limitSwitch = 5;

void setup() {
  pinMode(limitSwitch, OUTPUT);
}

void loop() {
  digitalWrite(limitSwitch, HIGH);
}`,
    "c4s4-elaborate-project2-code":
`${simpleCodeComment}
const int limitSwitch = 5;

void setup() {
  pinMode(limitSwitch, OUTPUT);
}

void loop() {
  digitalWrite(limitSwitch, HIGH);
  delay(500);
  digitalWrite(limitSwitch, LOW);
  delay(500);
}`
  });

  replaceCodes("5-4", "explore", {
    "c5s4-explore-main-code":
`const int redPin = 5;
const int greenPin = 6;
const int bluePin = 7;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  analogWrite(redPin, 255);
  analogWrite(greenPin, 50);
  digitalWrite(bluePin, LOW);
  delay(1000);

  analogWrite(redPin, 100);
  analogWrite(greenPin, 255);
  digitalWrite(bluePin, LOW);
  delay(1000);

  analogWrite(redPin, 50);
  analogWrite(greenPin, 50);
  digitalWrite(bluePin, HIGH);
  delay(1000);
}`,
    "c5s4-explore-try-code":
`const int redPin = 5;
const int greenPin = 6;
const int bluePin = 7;

void setup() {
}

void loop() {
  analogWrite(redPin, 255);
  analogWrite(greenPin, 80);
  digitalWrite(bluePin, LOW);
  delay(800);

  analogWrite(redPin, 40);
  analogWrite(greenPin, 255);
  digitalWrite(bluePin, LOW);
  delay(800);

  analogWrite(redPin, 0);
  analogWrite(greenPin, 120);
  digitalWrite(bluePin, HIGH);
  delay(800);
}`
  });

  replaceCodes("5-4", "elaborate", {
    "c5s4-elaborate-project1-code":
`${simpleCodeComment}
const int toggleSwitch = 5;

void setup() {
  pinMode(toggleSwitch, OUTPUT);
}

void loop() {
  digitalWrite(toggleSwitch, HIGH);
}`,
    "c5s4-elaborate-project2-code":
`${simpleCodeComment}
const int toggleSwitch = 5;

void setup() {
  pinMode(toggleSwitch, OUTPUT);
}

void loop() {
  digitalWrite(toggleSwitch, HIGH);
}`
  });

  replaceCodes("6-4", "explore", {
    "c6s4-explore-main-code":
`const int button1 = 2;
const int button2 = 3;
const int redPin = 5;
const int greenPin = 6;
const int bluePin = 7;

void setup() {
  pinMode(button1, INPUT_PULLUP);
  pinMode(button2, INPUT_PULLUP);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  if (digitalRead(button1) == LOW) {
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, LOW);
    digitalWrite(bluePin, LOW);
  } else if (digitalRead(button2) == LOW) {
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, HIGH);
    digitalWrite(bluePin, LOW);
  } else {
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, LOW);
    digitalWrite(bluePin, HIGH);
  }
}`,
    "c6s4-explore-try-code":
`const int button1 = 2;
const int button2 = 3;
const int redPin = 5;
const int greenPin = 6;
const int bluePin = 7;

void setup() {
  pinMode(button1, INPUT_PULLUP);
  pinMode(button2, INPUT_PULLUP);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  bool firstPressed = digitalRead(button1) == LOW;
  bool secondPressed = digitalRead(button2) == LOW;

  if (firstPressed && secondPressed) {
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, HIGH);
    digitalWrite(bluePin, HIGH);
  } else if (firstPressed) {
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, LOW);
    digitalWrite(bluePin, LOW);
  } else if (secondPressed) {
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, HIGH);
    digitalWrite(bluePin, LOW);
  } else {
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, LOW);
    digitalWrite(bluePin, HIGH);
  }
}`
  });

  replaceCodes("6-4", "elaborate", {
    "c6s4-elaborate-project1-code":
`${simpleCodeCommentWrapped}
const int twoWaySwitch = 5;

void setup() {
  pinMode(twoWaySwitch, OUTPUT);
}

void loop() {
  digitalWrite(twoWaySwitch, HIGH);
}`,
    "c6s4-elaborate-project2-code":
`${simpleCodeComment}
const int twoWaySwitch = 5;

void setup() {
  pinMode(twoWaySwitch, OUTPUT);
}

void loop() {
  digitalWrite(twoWaySwitch, HIGH);
  delay(500);
  digitalWrite(twoWaySwitch, LOW);
  delay(500);
}`
  });

  replaceCodes("7-4", "explore", {
    "c7s4-explore-main-code":
`const int redPin = 5;
const int greenPin = 6;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
}

void loop() {
  for (int value = 0; value <= 255; value += 5) {
    analogWrite(redPin, value);
    analogWrite(greenPin, 255 - value);
    delay(30);
  }
}`,
    "c7s4-explore-try-code":
`const int redPin = 5;
const int greenPin = 6;

void setup() {
}

void loop() {
  for (int value = 0; value <= 255; value += 10) {
    analogWrite(redPin, value);
    analogWrite(greenPin, 255 - value);
    delay(40);
  }

  for (int value = 255; value >= 0; value -= 10) {
    analogWrite(redPin, value);
    analogWrite(greenPin, 255 - value);
    delay(40);
  }
}`
  });

  replaceCodes("7-4", "elaborate", {
    "c7s4-elaborate-project1-code":
`${simpleCodeComment}
const int twoWaySwitch = 5;

void setup() {
  pinMode(twoWaySwitch, OUTPUT);
}

void loop() {
  digitalWrite(twoWaySwitch, HIGH);
}`,
    "c7s4-elaborate-project2-code":
`${simpleCodeComment}
const int toggleSwitch = 5;

void setup() {
  pinMode(toggleSwitch, OUTPUT);
}

void loop() {
  digitalWrite(toggleSwitch, HIGH);
}`
  });

  const correctedModuleComment =
`/*
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/`;

  const potentiometerComment =
`/*
Simple Arduino Code
Pin logic based on updated component list and custom
switch PCB logic.
*/`;

  replaceCodes("4-5", "explore", {
    "c4s5-explore-main-code":
`const int potPin = A0;      // Potentiometer connected to A0
const int motorPin = 5;     // PWM pin connected to motor driver

void setup() {
  pinMode(motorPin, OUTPUT);
}

void loop() {
  // Read the potentiometer value (0 to 1023)
  int potValue = analogRead(potPin);

  // Convert it to PWM value (0 to 255)
  int motorSpeed = map(potValue, 0, 1023, 0, 255);

  // Set motor speed
  analogWrite(motorPin, motorSpeed);
  delay(10);
}`,
    "c4s5-explore-try-code":
`const int potPin = A0;
const int ledPin = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (analogRead(potPin) > 512)
    digitalWrite(ledPin, HIGH);
  else
    digitalWrite(ledPin, LOW);
}`
  });

  replaceCodes("4-5", "elaborate", {
    "c4s5-elaborate-project1-code":
`${potentiometerComment}
const int potSensor = A0;
const int dcMotor = 5;

void setup() {
  pinMode(dcMotor, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int potValue = analogRead(potSensor);
  int motorSpeed = map(potValue, 0, 1023, 0, 255);
  analogWrite(dcMotor, motorSpeed);
  Serial.println(potValue);
  delay(50);
}`,
    "c4s5-elaborate-project2-code":
`${potentiometerComment}
const int potSensor = A0;
const int oneWLed = 5;

void setup() {
  pinMode(oneWLed, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int potValue = analogRead(potSensor);
  int brightness = map(potValue, 0, 1023, 0, 255);
  analogWrite(oneWLed, brightness);
  Serial.println(potValue);
  delay(50);
}`
  });

  if (content["5-5"] && content["5-5"].explore) {
    content["5-5"].explore.codes = {};
    content["5-5"].explore.downloads = [];
  }

  for (const lessonId of ["5-5", "6-5", "7-5"]) {
    replaceCodes(lessonId, "elaborate", {
      [`c${lessonId[0]}s5-elaborate-project1-code`]:
`${potentiometerComment}
const int potSensor = A0;
const int dcMotor = 5;

void setup() {
  pinMode(dcMotor, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int potValue = analogRead(potSensor);
  int motorSpeed = map(potValue, 0, 1023, 0, 255);
  analogWrite(dcMotor, motorSpeed);
  Serial.println(potValue);
  delay(50);
}`,
      [`c${lessonId[0]}s5-elaborate-project2-code`]:
`${potentiometerComment}
const int potSensor = A0;
const int oneWLed = 6;

void setup() {
  pinMode(oneWLed, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int potValue = analogRead(potSensor);
  int brightness = map(potValue, 0, 1023, 0, 255);
  analogWrite(oneWLed, brightness);
  Serial.println(potValue);
  delay(50);
}`
    });
  }

  replaceCodes("6-5", "explore", {
    "c6s5-explore-main-code":
`const int switch1 = 2;
const int switch2 = 3;
const int andLed = 5;
const int orLed = 6;

void setup() {
  pinMode(switch1, INPUT_PULLUP);
  pinMode(switch2, INPUT_PULLUP);
  pinMode(andLed, OUTPUT);
  pinMode(orLed, OUTPUT);
}

void loop() {
  bool a = digitalRead(switch1) == LOW;
  bool b = digitalRead(switch2) == LOW;
  digitalWrite(andLed, a && b);
  digitalWrite(orLed, a || b);
}`,
    "c6s5-explore-try-code":
`const int switch1 = 2;
const int switch2 = 3;
const int andLed = 5;
const int orLed = 6;
const int xorLed = 7;

void setup() {
  pinMode(switch1, INPUT_PULLUP);
  pinMode(switch2, INPUT_PULLUP);
  pinMode(andLed, OUTPUT);
  pinMode(orLed, OUTPUT);
  pinMode(xorLed, OUTPUT);
}

void loop() {
  bool a = digitalRead(switch1) == LOW;
  bool b = digitalRead(switch2) == LOW;
  digitalWrite(andLed, a && b);
  digitalWrite(orLed, a || b);
  digitalWrite(xorLed, a != b);
}`
  });

  replaceCodes("7-5", "explore", {
    "c7s5-explore-main-code":
`const int switch1 = 2;
const int switch2 = 3;
const int ledPin = 5;

void setup() {
  pinMode(switch1, INPUT_PULLUP);
  pinMode(switch2, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  bool a = digitalRead(switch1) == LOW;
  bool b = digitalRead(switch2) == LOW;
  digitalWrite(ledPin, a != b);
}`,
    "c7s5-explore-try-code":
`const int switch1 = 2;
const int switch2 = 3;
const int ledPin = 5;

void setup() {
  pinMode(switch1, INPUT_PULLUP);
  pinMode(switch2, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  bool firstState = digitalRead(switch1) == LOW;
  bool secondState = digitalRead(switch2) == LOW;

  if (firstState != secondState) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`
  });

  replaceCodes("4-7", "explore", {
    "c4s7-explore-main-code":
`const int touchSensor = 3;
const int dipLed = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dipLed, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) digitalWrite(dipLed, HIGH);
  else digitalWrite(dipLed, LOW);
}`,
    "c4s7-explore-try-code":
`const int touchSensor = 3;
const int dipLed1 = 6;
const int dipLed2 = 7;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dipLed1, OUTPUT);
  pinMode(dipLed2, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(dipLed1, HIGH);
    digitalWrite(dipLed2, HIGH);
  } else {
    digitalWrite(dipLed1, LOW);
    digitalWrite(dipLed2, LOW);
  }
}`
  });

  replaceCodes("4-7", "elaborate", {
    "c4s7-elaborate-project1-code":
`/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/
const int touchSensor = 2;
const int dipLed = 5;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dipLed, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) digitalWrite(dipLed, HIGH);
  else digitalWrite(dipLed, LOW);
}`,
    "c4s7-elaborate-project2-code":
`${correctedModuleComment}
const int touchSensor = 2;
const int yellowLed1 = 5;
const int yellowLed2 = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(yellowLed1, OUTPUT);
  pinMode(yellowLed2, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(yellowLed1, HIGH);
    delay(150);
    digitalWrite(yellowLed1, LOW);
    digitalWrite(yellowLed2, HIGH);
    delay(150);
    digitalWrite(yellowLed2, LOW);
  } else {
    digitalWrite(yellowLed1, LOW);
    digitalWrite(yellowLed2, LOW);
  }
}`
  });

  replaceCodes("5-7", "explore", {
    "c5s7-explore-main-code":
`const int touchSensor = 2;
const int led = 5;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(led, HIGH);    // LED ON
  } else {
    digitalWrite(led, LOW);     // LED OFF
  }
}`,
    "c5s7-explore-try-code":
`const int touchSensor = 2;
const int led1 = 5;
const int led2 = 6;
const int led3 = 7;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(led1, HIGH);
    digitalWrite(led2, HIGH);
    digitalWrite(led3, HIGH);
  } else {
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);
  }
}`
  });

  replaceCodes("5-7", "elaborate", {
    "c5s7-elaborate-project1-code":
`${correctedModuleComment}
const int touchSensor = 2;
const int stringLed = 5;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(stringLed, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    for (int i = 0; i < 5; i++) {
      digitalWrite(stringLed, HIGH);
      delay(150);
      digitalWrite(stringLed, LOW);
      delay(150);
    }
  } else {
    digitalWrite(stringLed, LOW);
  }
}`,
    "c5s7-elaborate-project2-code":
`${correctedModuleComment}
const int touchSensor = 2;
const int redLed1 = 5;
const int redLed2 = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(redLed1, OUTPUT);
  pinMode(redLed2, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(redLed1, HIGH);
    digitalWrite(redLed2, HIGH);
  } else {
    digitalWrite(redLed1, LOW);
    digitalWrite(redLed2, LOW);
  }
}`
  });

  const touchPatternCode =
`const int touchSensor = 3;
const int stringLed = 7;
int pattern = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(stringLed, OUTPUT);
}

void loop() {
  bool touchState = digitalRead(touchSensor);

  // Change pattern on every new touch
  if (touchState == HIGH && lastTouchState == LOW) {
    pattern++;
    if (pattern > 3) {
      pattern = 0;
    }
    delay(300);
  }
  lastTouchState = touchState;

  // Pattern 0: LED OFF
  if (pattern == 0) {
    analogWrite(stringLed, 0);
  }

  // Pattern 1: Fade in and fade out
  if (pattern == 1) {
    for (int brightness = 0; brightness <= 255; brightness += 5) {
      analogWrite(stringLed, brightness);
      delay(20);
    }
    for (int brightness = 255; brightness >= 0; brightness -= 5) {
      analogWrite(stringLed, brightness);
      delay(20);
    }
  }

  // Pattern 2: Slow blinking
  if (pattern == 2) {
    analogWrite(stringLed, 255);
    delay(500);
    analogWrite(stringLed, 0);
    delay(500);
  }

  // Pattern 3: Fast blinking
  if (pattern == 3) {
    analogWrite(stringLed, 255);
    delay(100);
    analogWrite(stringLed, 0);
    delay(100);
  }
}`;

  replaceCodes("6-7", "explore", {
    "c6s7-explore-main-code": touchPatternCode,
    "c6s7-explore-try-code":
`const int touchSensor = 2;
const int stringLed = 5;
const int dipLed = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(stringLed, OUTPUT);
  pinMode(dipLed, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(stringLed, HIGH);
    digitalWrite(dipLed, HIGH);
  } else {
    digitalWrite(stringLed, LOW);
    digitalWrite(dipLed, LOW);
  }
}`
  });

  replaceCodes("6-7", "elaborate", {
    "c6s7-elaborate-project1-code":
`${correctedModuleComment}
const int touchSensor = 2;
const int dipLed1 = 5;
const int dipLed2 = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dipLed1, OUTPUT);
  pinMode(dipLed2, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(dipLed1, HIGH);
    delay(400);
    digitalWrite(dipLed2, HIGH);
    delay(400);
    digitalWrite(dipLed1, LOW);
    digitalWrite(dipLed2, LOW);
    delay(400);
  } else {
    digitalWrite(dipLed1, LOW);
    digitalWrite(dipLed2, LOW);
  }
}`,
    "c6s7-elaborate-project2-code":
`${correctedModuleComment}
const int touchSensor = 2;
const int led = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) digitalWrite(led, HIGH);
  else digitalWrite(led, LOW);
}`
  });

  const fourLedTouchCode =
`const int touchSensor = 2;
const int leds[] = {4, 5, 6, 7};
int touchCount = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  for (int i = 0; i < 4; i++) {
    pinMode(leds[i], OUTPUT);
  }
}

void allLeds(bool state) {
  for (int i = 0; i < 4; i++) {
    digitalWrite(leds[i], state);
  }
}

void loop() {
  bool touchState = digitalRead(touchSensor);
  if (touchState == HIGH && lastTouchState == LOW) {
    touchCount = (touchCount + 1) % 5;
    delay(300);
  }
  lastTouchState = touchState;

  switch (touchCount) {
    case 0: // All LEDs OFF
      allLeds(LOW);
      break;
    case 1: // All LEDs ON
      allLeds(HIGH);
      break;
    case 2: // One by one blinking
      for (int i = 0; i < 4; i++) {
        allLeds(LOW);
        digitalWrite(leds[i], HIGH);
        delay(200);
      }
      break;
    case 3: // Alternate LEDs
      digitalWrite(leds[0], HIGH);
      digitalWrite(leds[1], LOW);
      digitalWrite(leds[2], HIGH);
      digitalWrite(leds[3], LOW);
      delay(300);
      digitalWrite(leds[0], LOW);
      digitalWrite(leds[1], HIGH);
      digitalWrite(leds[2], LOW);
      digitalWrite(leds[3], HIGH);
      delay(300);
      break;
    case 4: // Fast blinking
      allLeds(HIGH);
      delay(150);
      allLeds(LOW);
      delay(150);
      break;
  }
}`;

  replaceCodes("7-7", "explore", {
    "c7s7-explore-main-code": fourLedTouchCode,
    "c7s7-explore-try-code":
`const int touchSensor = 2;
const int dipLed1 = 4;
const int dipLed2 = 5;
const int dipLed3 = 6;
const int dipLed4 = 7;
const int leds[] = {dipLed1, dipLed2, dipLed3, dipLed4};
int touchCount = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dipLed1, OUTPUT);
  pinMode(dipLed2, OUTPUT);
  pinMode(dipLed3, OUTPUT);
  pinMode(dipLed4, OUTPUT);
}`
  });

  replaceCodes("7-7", "elaborate", {
    "c7s7-elaborate-project1-code":
`/*
ScienceUtsav Arduino Code - Touch to Change Pattern
Touch Sensor = D2
String LED = D5
*/
${touchPatternCode
  .replace("const int touchSensor = 3;", "const int touchSensor = 2;")
  .replace("const int stringLed = 7;", "const int stringLed = 5;")}`,
    "c7s7-elaborate-project2-code":
`/*
ScienceUtsav Arduino Code
Touch Sensor with 4 LED Patterns
Touch Sensor = D2
LEDs = D4, D5, D6, D7
*/
${fourLedTouchCode}`
  });

  function attachCodeToPage(lessonId, phase, pageNumber, codeId) {
    const section = content[lessonId] && content[lessonId][phase];
    if (!section) return;
    const groups = phase === "elaborate"
      ? (section.projects || []).map((project) => project.pages || [])
      : [section.pages || []];
    for (const pages of groups) {
      const page = pages.find((item) => item[0].includes(`page-${String(pageNumber).padStart(2, "0")}.jpg`));
      if (page) page[3] = codeId;
    }
  }

  attachCodeToPage("6-7", "explore", 13, "c6s7-explore-main-code");
  attachCodeToPage("7-7", "explore", 18, "c7s7-explore-main-code");
  attachCodeToPage("7-7", "elaborate", 33, "c7s7-elaborate-project1-code");
  attachCodeToPage("7-7", "elaborate", 38, "c7s7-elaborate-project2-code");

  replaceCodes("4-8", "explore", {
    "c4s8-explore-main-code":
`const int ldrPin = A1;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  Serial.println(lightValue);
  delay(500);
}`,
    "c4s8-explore-try-code":
`const int ldrPin = A1;
const int ledPin = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  if (lightValue < 500) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`
  });

  replaceCodes("4-8", "elaborate", {
    "c4s8-elaborate-project1-code":
`/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/
const int ldrSensor = 2;      // 3-pin LDR digital OUT
const int pushSwitch = 5;
const int buzzer = 6;
const int DARK_STATE = LOW;   // If LDR works opposite, change LOW to HIGH
bool alarmOff = false;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(pushSwitch, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  bool darkDetected = digitalRead(ldrSensor) == DARK_STATE;
  if (digitalRead(pushSwitch) == LOW) {
    alarmOff = true;
    noTone(buzzer);
    delay(300);
  }
  if (darkDetected && !alarmOff) {
    tone(buzzer, 1200);
  } else {
    noTone(buzzer);
  }
  if (!darkDetected) alarmOff = false;
}`,
    "c4s8-elaborate-project2-code":
`/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/
const int ldrSensor = 2;
const int led = 6;
const int DARK_STATE = HIGH;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  bool darkDetected = digitalRead(ldrSensor) == DARK_STATE;
  digitalWrite(led, darkDetected ? HIGH : LOW);
}`
  });

  replaceCodes("5-8", "explore", {
    "c5s8-explore-main-code":
`const int ldrPin = A1;
const int ledPin = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  if (lightValue < 500) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`,
    "c5s8-explore-try-code":
`const int ldrPin = A1;
const int led1 = 5;
const int led2 = 6;

void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  if (lightValue < 350) {
    digitalWrite(led1, HIGH);
    digitalWrite(led2, HIGH);
  } else if (lightValue < 600) {
    digitalWrite(led1, HIGH);
    digitalWrite(led2, LOW);
  } else {
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
  }
}`
  });

  replaceCodes("5-8", "elaborate", {
    "c5s8-elaborate-project1-code":
`/*
ScienceUtsav Arduino Code
Digital LDR + Push Switch OFF control
*/
const int ldrSensor = 2;
const int switchPin = 5;
const int led1 = 6;
const int led2 = 7;
const int DARK_STATE = HIGH;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
}

void loop() {
  bool darkDetected = digitalRead(ldrSensor) == DARK_STATE;
  bool switchPressed = digitalRead(switchPin) == LOW;
  if (switchPressed) {
    // Switch pressed means LEDs OFF
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
  } else {
    // LEDs ON only when dark
    digitalWrite(led1, darkDetected ? HIGH : LOW);
    digitalWrite(led2, darkDetected ? HIGH : LOW);
  }
}`,
    "c5s8-elaborate-project2-code":
`/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/
const int ldrSensor = 2;
const int led1 = 5;
const int led2 = 6;
const int DARK_STATE = HIGH;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
}

void loop() {
  bool darkDetected = digitalRead(ldrSensor) == DARK_STATE;
  digitalWrite(led1, darkDetected ? HIGH : LOW);
  digitalWrite(led2, darkDetected ? HIGH : LOW);
}`
  });

  replaceCodes("6-8", "explore", {
    "c6s8-explore-main-code":
`const int ldrPin = A1;
const int buzzerPin = 7;

void setup() {
}

void loop() {
  int lightValue = analogRead(ldrPin);
  if (lightValue < 300) {
    tone(buzzerPin, 1000);
  } else {
    noTone(buzzerPin);
  }
}`,
    "c6s8-explore-try-code":
`const int ldrPin = A1;
const int ledPin = 5;
const int buzzerPin = 7;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  if (lightValue < 300) {
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 1000);
  } else {
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
  }
}`
  });

  replaceCodes("6-8", "elaborate", {
    "c6s8-elaborate-project1-code":
`/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/
const int ldrSensor = 2;
const int led = 6;
const int rgbRed = 10;
const int rgbGreen = 11;
const int rgbBlue = 12;
const int DARK_STATE = LOW;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(led, OUTPUT);
  pinMode(rgbRed, OUTPUT);
  pinMode(rgbGreen, OUTPUT);
  pinMode(rgbBlue, OUTPUT);
}

void loop() {
  bool darkDetected = digitalRead(ldrSensor) == DARK_STATE;
  if (darkDetected) {
    digitalWrite(led, HIGH);
    digitalWrite(rgbRed, HIGH);
    digitalWrite(rgbGreen, HIGH);
    digitalWrite(rgbBlue, HIGH);
  } else {
    digitalWrite(led, LOW);
    digitalWrite(rgbRed, LOW);
    digitalWrite(rgbGreen, LOW);
    digitalWrite(rgbBlue, LOW);
  }
}`,
    "c6s8-elaborate-project2-code":
`/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/
const int ldrSensor = 2;
const int led1 = 5;
const int led2 = 6;
const int DARK_STATE = HIGH;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
}

void loop() {
  bool darkDetected = digitalRead(ldrSensor) == DARK_STATE;
  digitalWrite(led1, darkDetected ? HIGH : LOW);
  digitalWrite(led2, darkDetected ? HIGH : LOW);
}`
  });

  replaceCodes("7-8", "explore", {
    "c7s8-explore-main-code":
`const int touchPin = 2;
const int ldrPin = A1;
const int ledPin = 5;

void setup() {
  pinMode(touchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  bool touched = digitalRead(touchPin) == LOW;
  if (touched && lightValue < 500) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`,
    "c7s8-explore-try-code":
`const int touchPin = 2;
const int ldrPin = A1;
const int ledPin = 5;
const int buzzerPin = 7;

void setup() {
  pinMode(touchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  bool touch = digitalRead(touchPin) == LOW;
  int lightValue = analogRead(ldrPin);
  if (touch && lightValue < 400) {
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 800);
  } else {
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
  }
}`
  });

  replaceCodes("7-8", "elaborate", {
    "c7s8-elaborate-project1-code":
`/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/
const int ldrSensor = 2;
const int led1 = 5;
const int led2 = 6;
const int DARK_STATE = HIGH;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
}

void loop() {
  bool darkDetected = digitalRead(ldrSensor) == DARK_STATE;
  digitalWrite(led1, darkDetected ? HIGH : LOW);
  digitalWrite(led2, darkDetected ? HIGH : LOW);
}`,
    "c7s8-elaborate-project2-code":
`/*
ScienceUtsav Arduino Code
Haunted Castle Smooth Light Effect
LDR Sensor = D2
String LED = D5
RGB Common Pin = D12
RGB Red = D13
RGB Green = D11
RGB Blue = D10
*/
const int ldrSensor = 2;
const int stringLed = 5;
const int rgbCommon = 12;
const int redLED = 13;
const int greenLED = 11;
const int blueLED = 10;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(stringLed, OUTPUT);
  pinMode(rgbCommon, OUTPUT);
  pinMode(redLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
  pinMode(blueLED, OUTPUT);
  digitalWrite(rgbCommon, HIGH);  // RGB 4th pin always HIGH
}

void loop() {
  if (digitalRead(ldrSensor) == HIGH) {
    // String LED fade in
    for (int brightness = 0; brightness <= 255; brightness = brightness + 5) {
      analogWrite(stringLed, brightness);
      // RGB red color ON
      digitalWrite(redLED, LOW);
      digitalWrite(greenLED, HIGH);
      digitalWrite(blueLED, HIGH);
      delay(30);
    }

    // String LED fade out
    for (int brightness = 255; brightness >= 0; brightness = brightness - 5) {
      analogWrite(stringLed, brightness);
      // RGB blue color ON
      digitalWrite(redLED, HIGH);
      digitalWrite(greenLED, HIGH);
      digitalWrite(blueLED, LOW);
      delay(30);
    }

    // String LED fade in again
    for (int brightness = 0; brightness <= 255; brightness = brightness + 5) {
      analogWrite(stringLed, brightness);
      // RGB purple color ON
      digitalWrite(redLED, LOW);
      digitalWrite(greenLED, HIGH);
      digitalWrite(blueLED, LOW);
      delay(30);
    }

    // String LED fade out again
    for (int brightness = 255; brightness >= 0; brightness = brightness - 5) {
      analogWrite(stringLed, brightness);
      // RGB green color ON
      digitalWrite(redLED, HIGH);
      digitalWrite(greenLED, LOW);
      digitalWrite(blueLED, HIGH);
      delay(30);
    }
  } else {
    // All lights OFF in bright light
    analogWrite(stringLed, 0);
    digitalWrite(redLED, HIGH);
    digitalWrite(greenLED, HIGH);
    digitalWrite(blueLED, HIGH);
  }
}`
  });

  attachCodeToPage("7-8", "elaborate", 37, "c7s8-elaborate-project2-code");

  replaceCodes("4-10", "explore", {
    "c4s10-explore-main-code":
`const int motorPin1 = 5;
const int motorPin2 = 6;

void setup() {
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
}

void loop() {
  digitalWrite(motorPin1, HIGH);
  digitalWrite(motorPin2, LOW);
  delay(2000);
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, LOW);
  delay(2000);
}`,
    "c4s10-explore-try-code":
`const int motorPin = 5;

void setup() {
  pinMode(motorPin, OUTPUT);
}

void loop() {
  digitalWrite(motorPin, HIGH);
  delay(1000);
  digitalWrite(motorPin, LOW);
  delay(500);
}`
  });

  replaceCodes("5-10", "explore", {
    "c5s10-explore-main-code":
`const int buttonPin = 2;
const int motorPin = 5;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(motorPin, OUTPUT);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    digitalWrite(motorPin, HIGH);
  } else {
    digitalWrite(motorPin, LOW);
  }
}`,
    "c5s10-explore-try-code":
`const int buttonPin = 2;
const int motorPin = 5;
const int ledPin = 6;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(motorPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    digitalWrite(motorPin, HIGH);
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(motorPin, LOW);
    digitalWrite(ledPin, LOW);
  }
}`
  });

  replaceCodes("6-10", "explore", {
    "c6s10-explore-main-code":
`const int potPin = A0;
const int motorPin1 = 5;
const int motorPin2 = 6;

void setup() {
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
}

void loop() {
  int value = analogRead(potPin);
  if (value < 512) {
    analogWrite(motorPin1, map(value, 0, 511, 0, 255));
    digitalWrite(motorPin2, LOW);
  } else {
    digitalWrite(motorPin1, LOW);
    analogWrite(motorPin2, map(value, 512, 1023, 0, 255));
  }
}`,
    "c6s10-explore-try-code":
`const int potPin = A0;
const int motorPin = 5;

void setup() {
  pinMode(motorPin, OUTPUT);
}

void loop() {
  int value = analogRead(potPin);
  if (value < 341) {
    analogWrite(motorPin, 80);
  } else if (value < 682) {
    analogWrite(motorPin, 160);
  } else {
    analogWrite(motorPin, 255);
  }
}`
  });

  replaceCodes("7-10", "explore", {
    "c7s10-explore-main-code":
`#define BUTTON_PIN 6
#define MOTOR_PIN 5

bool motorState = false;
bool lastButtonState = HIGH;
bool currentButtonState;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP); // Button connected between D2 and GND
  pinMode(MOTOR_PIN, OUTPUT);
  digitalWrite(MOTOR_PIN, LOW); // Motor OFF initially
}

void loop() {
  currentButtonState = digitalRead(BUTTON_PIN);

  // Detect button press (HIGH -> LOW)
  if (lastButtonState == HIGH && currentButtonState == LOW) {
    motorState = !motorState;    // Toggle motor state

    if (motorState) {
      digitalWrite(MOTOR_PIN, HIGH); // Motor ON
    } else {
      digitalWrite(MOTOR_PIN, LOW);   // Motor OFF
    }

    delay(200); // Simple debounce
  }

  lastButtonState = currentButtonState;
}`,
    "c7s10-explore-try-code":
`const int limitSwitch = 2;
const int motorPin = 5;
const int ledPin = 6;

void setup() {
  pinMode(limitSwitch, INPUT_PULLUP);
  pinMode(motorPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(limitSwitch) == LOW) {
    digitalWrite(motorPin, LOW);
    digitalWrite(ledPin, HIGH);
    Serial.println("Safety stop active");
  } else {
    digitalWrite(motorPin, HIGH);
    digitalWrite(ledPin, LOW);
    Serial.println("Motor allowed to run");
  }
  delay(500);
}`
  });

  const motorSpeedBody =
`const int touchSensor = 2;
const int dcMotor = 5;
int speedLevel = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dcMotor, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool touchState = digitalRead(touchSensor);

  // Detect one touch at a time
  if (touchState == HIGH && lastTouchState == LOW) {
    speedLevel++;
    if (speedLevel > 3) {
      speedLevel = 0;
    }
    delay(300);
  }
  lastTouchState = touchState;

  if (speedLevel == 0) {
    analogWrite(dcMotor, 0);      // Motor OFF
    Serial.println("Motor OFF");
  }

  if (speedLevel == 1) {
    analogWrite(dcMotor, 27);     // Slow speed
    Serial.println("Slow Speed");
  }

  if (speedLevel == 2) {
    analogWrite(dcMotor, 30);     // Medium speed
    Serial.println("Medium Speed");
  }

  if (speedLevel == 3) {
    analogWrite(dcMotor, 33);     // High speed
    Serial.println("High Speed");
  }
}`;

  const motorSpeedHeader =
`/*
ScienceUtsav Arduino Code
Touch Controlled Motor Speed
Touch Sensor = D2
DC Motor PWM Pin = D5
*/`;

  replaceCodes("4-10", "elaborate", {
    "c4s10-elaborate-project1-code": `${motorSpeedHeader}\n${motorSpeedBody}`,
    "c4s10-elaborate-project2-code": `${motorSpeedHeader}\n${motorSpeedBody}`
  });

  replaceCodes("5-10", "elaborate", {
    "c5s10-elaborate-project1-code":
`/*
ScienceUtsav Arduino Code
Touch Controlled Motor Speed with Continuous Cartoon Sound
Project: Tom & Jerry Tom Leg Movement Illusion
Touch Sensor = D2
DC Motor PWM Pin = D5
Buzzer = D6
*/
const int touchSensor = 2;
const int dcMotor = 5;
const int buzzer = 6;
int speedLevel = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dcMotor, OUTPUT);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool touchState = digitalRead(touchSensor);

  // Detect one touch at a time
  if (touchState == HIGH && lastTouchState == LOW) {
    speedLevel++;
    if (speedLevel > 4) {
      speedLevel = 0;
    }
    delay(300);
  }
  lastTouchState = touchState;

  // Speed Level 0: Motor OFF
  if (speedLevel == 0) {
    analogWrite(dcMotor, 0);
    noTone(buzzer);
    Serial.println("Motor OFF");
  }

  // Speed Level 1: Slow motor + slow cartoon sound
  if (speedLevel == 1) {
    analogWrite(dcMotor, 28);
    tone(buzzer, 700);
    delay(120);
    tone(buzzer, 900);
    delay(120);
    Serial.println("Slow Speed");
  }

  // Speed Level 2: Medium motor + medium cartoon sound
  if (speedLevel == 2) {
    analogWrite(dcMotor, 30);
    tone(buzzer, 800);
    delay(90);
    tone(buzzer, 1100);
    delay(90);
    Serial.println("Medium Speed");
  }

  // Speed Level 3: Fast motor + fast cartoon sound
  if (speedLevel == 3) {
    analogWrite(dcMotor, 33);
    tone(buzzer, 900);
    delay(60);
    tone(buzzer, 1300);
    delay(60);
    Serial.println("High Speed");
  }

  // Speed Level 4: Full speed + very fast cartoon sound
  if (speedLevel == 4) {
    analogWrite(dcMotor, 35);
    tone(buzzer, 1000);
    delay(40);
    tone(buzzer, 1400);
    delay(40);
    tone(buzzer, 1800);
    delay(40);
    Serial.println("Full Speed");
  }
}`
  });

  replaceCodes("6-10", "elaborate", {
    "c6s10-elaborate-project1-code": motorSpeedBody,
    "c6s10-elaborate-project2-code":
`const int touchSensor = 2;
const int dcMotor = 5;
const int ldrSensor = 3;
const int led = 6;

// Change HIGH to LOW if LED works opposite
const int LIGHT_STATE = HIGH;
int speedLevel = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dcMotor, OUTPUT);
  pinMode(ldrSensor, INPUT);
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool touchState = digitalRead(touchSensor);

  // Detect one touch at a time
  if (touchState == HIGH && lastTouchState == LOW) {
    speedLevel++;
    if (speedLevel > 3) {
      speedLevel = 0;
    }
    delay(300);
  }
  lastTouchState = touchState;

  // Motor speed control
  if (speedLevel == 0) {
    analogWrite(dcMotor, 0);
    Serial.println("Motor OFF");
  }
  if (speedLevel == 1) {
    analogWrite(dcMotor, 27);
    Serial.println("Slow Speed");
  }
  if (speedLevel == 2) {
    analogWrite(dcMotor, 30);
    Serial.println("Medium Speed");
  }
  if (speedLevel == 3) {
    analogWrite(dcMotor, 33);
    Serial.println("High Speed");
  }

  // LDR light control LED
  bool lightDetected = digitalRead(ldrSensor) == LIGHT_STATE;
  if (lightDetected) {
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(led, LOW);
  }
  delay(100);
}`
  });

  replaceCodes("7-10", "elaborate", {
    "c7s10-elaborate-project1-code": motorSpeedBody,
    "c7s10-elaborate-project2-code":
`/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/
const int touchSensor = 2;
const int dcMotor1 = 5;
const int dcMotor2 = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dcMotor1, OUTPUT);
  pinMode(dcMotor2, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(dcMotor1, HIGH);
    digitalWrite(dcMotor2, HIGH);
  } else {
    digitalWrite(dcMotor1, LOW);
    digitalWrite(dcMotor2, LOW);
  }
}`
  });

  function removeCodeFromPage(lessonId, phase, pageNumber) {
    const section = content[lessonId] && content[lessonId][phase];
    if (!section) return;
    const groups = phase === "elaborate"
      ? (section.projects || []).map((project) => project.pages || [])
      : [section.pages || []];
    for (const pages of groups) {
      const page = pages.find((item) => item[0].includes(`page-${String(pageNumber).padStart(2, "0")}.jpg`));
      if (page && page.length > 3) page.splice(3);
    }
  }

  removeCodeFromPage("4-10", "elaborate", 7);
  attachCodeToPage("4-10", "elaborate", 8, "c4s10-elaborate-project1-code");
  attachCodeToPage("4-10", "elaborate", 9, "c4s10-elaborate-project1-code");
  attachCodeToPage("4-10", "elaborate", 13, "c4s10-elaborate-project2-code");

  removeCodeFromPage("5-10", "elaborate", 16);
  attachCodeToPage("5-10", "elaborate", 17, "c5s10-elaborate-project1-code");
  attachCodeToPage("5-10", "elaborate", 18, "c5s10-elaborate-project1-code");
  attachCodeToPage("5-10", "elaborate", 19, "c5s10-elaborate-project1-code");

  attachCodeToPage("6-10", "elaborate", 23, "c6s10-elaborate-project1-code");
  attachCodeToPage("6-10", "elaborate", 27, "c6s10-elaborate-project2-code");
  attachCodeToPage("7-10", "elaborate", 32, "c7s10-elaborate-project1-code");

  const pinFiveBlink200 =
`void setup() {
  pinMode(5, OUTPUT);
}

void loop() {
  digitalWrite(5, HIGH);
  delay(200);
  digitalWrite(5, LOW);
  delay(200);
}`;

  replaceCodes("4-2", "elaborate", {
    "c4s2-elaborate-project2-code": pinFiveBlink200
  });

  replaceCodes("5-2", "elaborate", {
    "c5s2-elaborate-project2-code": pinFiveBlink200
  });

  replaceCodes("7-2", "elaborate", {
    "c7s2-elaborate-project1-code":
`const int dipLed1 = 4;
const int dipLed2 = 5;
const int dipLed3 = 6;
const int dipLed4 = 7;

void setup() {
  pinMode(dipLed1, OUTPUT);
  pinMode(dipLed2, OUTPUT);
  pinMode(dipLed3, OUTPUT);
  pinMode(dipLed4, OUTPUT);
}

void loop() {
  // All 4 LEDs ON together
  digitalWrite(dipLed1, HIGH);
  digitalWrite(dipLed2, HIGH);
  digitalWrite(dipLed3, HIGH);
  digitalWrite(dipLed4, HIGH);
  delay(500);

  // OFF one by one
  digitalWrite(dipLed1, LOW);
  delay(300);
  digitalWrite(dipLed2, LOW);
  delay(300);
  digitalWrite(dipLed3, LOW);
  delay(300);
  digitalWrite(dipLed4, LOW);
  delay(500);
}`,
    "c7s2-elaborate-project2-code":
`#define LED1 D5
#define LED2 D6
#define LED3 D7

void setup() {
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
}

void loop() {
  digitalWrite(LED1, HIGH);
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, HIGH);
  delay(300);

  digitalWrite(LED1, LOW);
  digitalWrite(LED2, HIGH);
  digitalWrite(LED3, LOW);
  delay(300);

  digitalWrite(LED1, HIGH);
  digitalWrite(LED2, HIGH);
  digitalWrite(LED3, HIGH);
  delay(200);

  digitalWrite(LED1, LOW);
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, LOW);
  delay(200);
}`
  });

  replaceCodes("5-3", "explore", {
    "c5s3-explore-main-code":
`const int switchPin = 3;
const int buzzerPin = 6;

void setup() {
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(switchPin) == LOW) {
    digitalWrite(buzzer, HIGH);
  } else {
    digitalWrite(buzzer, LOW);
  }
}`,
    "c5s3-explore-try-code":
`const int switchPin = 4;
const int buzzerPin = 7;

void setup() {
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(switchPin) == LOW) {
    digitalWrite(buzzer, HIGH);
  } else {
    digitalWrite(buzzer, LOW);
  }
}`
  });

  replaceCodes("7-3", "explore", {
    "c7s3-explore-main-code":
`const int ledPin = 5;
const int buzzerPin = 7;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, 80);
  tone(buzzerPin, 300);
  delay(700);
  analogWrite(ledPin, 180);
  tone(buzzerPin, 600);
  delay(700);
  analogWrite(ledPin, 255);
  tone(buzzerPin, 900);
  delay(700);
  noTone(buzzerPin);
}`,
    "c7s3-explore-try-code":
`const int ledPin = 5;
const int buzzerPin = 7;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, 60);
  tone(buzzerPin, 250);
  delay(500);
  analogWrite(ledPin, 150);
  tone(buzzerPin, 500);
  delay(500);
  analogWrite(ledPin, 255);
  tone(buzzerPin, 800);
  delay(500);
  noTone(buzzerPin);
  delay(300);
}`
  });

  replaceCodes("7-3", "elaborate", {
    "c7s3-elaborate-project1-code":
`void setup() {
  pinMode(5, OUTPUT);  //
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
}

void loop() {
  digitalWrite(5, HIGH);
  digitalWrite(6, HIGH);
  digitalWrite(7, HIGH);
}`
  });

  replaceCodes("4-6", "elaborate", {
    "c4s6-elaborate-project1-code":
`#include <TM1637Display.h>

const int pushSwitch = 5;
const int buzzer = 6;
const int CLK = 9;
const int DIO = 8;

TM1637Display display(CLK, DIO);

int secondsValue = 0;
bool running = false;
bool lastButtonState = HIGH;
unsigned long previousMillis = 0;
unsigned long buttonPressStart = 0;
bool buttonHeld = false;

void setup() {
  pinMode(pushSwitch, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}

void loop() {
  bool buttonState = digitalRead(pushSwitch);

  // When button is first pressed
  if (buttonState == LOW && lastButtonState == HIGH) {
    buttonPressStart = millis();
    buttonHeld = false;
  }

  // If button is held for 3 seconds
  if (buttonState == LOW && buttonHeld == false) {
    if (millis() - buttonPressStart >= 3000) {
      secondsValue = 0;
      running = false;
      display.showNumberDec(secondsValue, true);

      // Reset buzzer sound
      digitalWrite(buzzer, HIGH);
      delay(300);
      digitalWrite(buzzer, LOW);
      buttonHeld = true;
    }
  }

  // When button is released
  if (buttonState == HIGH && lastButtonState == LOW) {
    if (buttonHeld == false) {
      running = !running;

      // Start/Pause buzzer sound
      digitalWrite(buzzer, HIGH);
      delay(150);
      digitalWrite(buzzer, LOW);
    }
    delay(300);
  }

  // Timer counting
  if (running && millis() - previousMillis >= 1000) {
    previousMillis = millis();
    secondsValue++;
    if (secondsValue > 9999) {
      secondsValue = 0;
    }
    display.showNumberDec(secondsValue, true);
  }
  lastButtonState = buttonState;
}`,
    "c4s6-elaborate-project2-code":
`#include <TM1637Display.h>

const int pushSwitch = 5;
const int buzzer = 6;
const int CLK = 9;
const int DIO = 8;

TM1637Display display(CLK, DIO);

int timerValue = 10;
bool timerRunning = false;
unsigned long previousMillis = 0;

void setup() {
  pinMode(pushSwitch, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(timerValue, true);
}

void loop() {
  if (digitalRead(pushSwitch) == LOW) {
    timerRunning = true;
    timerValue = 10;
    previousMillis = millis();
    display.showNumberDec(timerValue, true);

    // Start beep
    digitalWrite(buzzer, HIGH);
    delay(200);
    digitalWrite(buzzer, LOW);
    delay(300);
  }

  if (timerRunning && millis() - previousMillis >= 1000) {
    previousMillis = millis();
    timerValue--;
    display.showNumberDec(timerValue, true);

    if (timerValue <= 0) {
      timerRunning = false;
      display.showNumberDec(0, true);

      // Time over buzzer sound
      digitalWrite(buzzer, HIGH);
      delay(200);
      digitalWrite(buzzer, LOW);
      delay(100);

      digitalWrite(buzzer, HIGH);
      delay(200);
      digitalWrite(buzzer, LOW);
      delay(100);

      digitalWrite(buzzer, HIGH);
      delay(500);
      digitalWrite(buzzer, LOW);
    }
  }
}`
  });

  const trafficCountdownCode =
`#include <TM1637Display.h>

const int redLed = 5;
const int yellowLed = 6;
const int greenLed = 7;

// TM1637 pins
const int CLK = 9;
const int DIO = 8;

TM1637Display display(CLK, DIO);

void setup() {
  pinMode(redLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(greenLed, OUTPUT);

  display.setBrightness(7);
  display.clear();
}

void loop() {
  // RED - 30 seconds
  digitalWrite(redLed, HIGH);
  digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, LOW);
  countdown(30);

  // YELLOW - 5 seconds
  digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, HIGH);
  digitalWrite(greenLed, LOW);
  countdown(5);

  // GREEN - 10 seconds
  digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, HIGH);
  countdown(10);
}

void countdown(int seconds) {
  for (int i = seconds; i >= 0; i--) {
    display.showNumberDec(i, true);
    delay(1000);
  }
}`;

  replaceCodes("5-6", "elaborate", {
    "c5s6-elaborate-project1-code": trafficCountdownCode
  });

  replaceCodes("6-6", "elaborate", {
    "c6s6-elaborate-project1-code": trafficCountdownCode
  });

  replaceCodes("7-6", "elaborate", {
    "c7s6-elaborate-project1-code":
`#include <TM1637Display.h>

const int touchWire = 5;   // Buzz wire input D5
const int restartButton = 7; // Push button D6
const int buzzer = 6;

const int CLK = 9;
const int DIO = 8;

TM1637Display display(CLK, DIO);

int chances = 3;
bool lastTouch = HIGH;

void setup() {
  pinMode(touchWire, INPUT_PULLUP);
  pinMode(restartButton, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);

  display.setBrightness(7);
  display.showNumberDec(chances, true);
}

void loop() {
  bool touched = digitalRead(touchWire);

  if (chances > 0) {
    if (touched == LOW && lastTouch == HIGH) {
      chances--;
      display.showNumberDec(chances, true);

      tone(buzzer, 1200);
      delay(300);
      noTone(buzzer);
      delay(300);
    }
    lastTouch = touched;
  }

  // Game over
  if (chances == 0) {
    display.showNumberDec(0, true);

    tone(buzzer, 500);
    delay(500);
    noTone(buzzer);

    // Wait until restart button is pressed
    while (digitalRead(restartButton) == HIGH) {
      display.showNumberDec(0, true);
    }

    // Restart game
    chances = 3;
    lastTouch = HIGH;
    display.showNumberDec(chances, true);
    delay(500);
  }
}`
  });

  attachCodeToPage("4-6", "elaborate", 10, "c4s6-elaborate-project1-code");
  attachCodeToPage("4-6", "elaborate", 16, "c4s6-elaborate-project2-code");
  attachCodeToPage("5-6", "elaborate", 22, "c5s6-elaborate-project1-code");
  attachCodeToPage("7-6", "elaborate", 35, "c7s6-elaborate-project1-code");

  const laserSecurityCode =
`/*
Laser Security System
Laser  -> D2
LDR DO -> D3
Buzzer -> D5

Buzzer ON when laser beam is disturbed.
*/
const int laserPin = 2;
const int ldrPin = 3;
const int buzzerPin = 5;

// Most LDR digital modules give HIGH when light is received.
// If your buzzer works opposite, change this to LOW.
const int LASER_RECEIVED_STATE = HIGH;

void setup() {
  pinMode(laserPin, OUTPUT);
  pinMode(ldrPin, INPUT);
  pinMode(buzzerPin, OUTPUT);

  digitalWrite(laserPin, HIGH);  // Laser always ON
  digitalWrite(buzzerPin, LOW);  // Buzzer OFF at start

  Serial.begin(9600);
}

void loop() {
  int ldrState = digitalRead(ldrPin);

  Serial.print("LDR State: ");
  Serial.println(ldrState);

  // If laser is not falling on LDR, buzzer turns ON
  if (ldrState != LASER_RECEIVED_STATE) {
    digitalWrite(buzzerPin, HIGH);  // Buzzer ON
  } else {
    digitalWrite(buzzerPin, LOW);   // Buzzer OFF
  }

  delay(50);
}`;

  replaceCodes("4-9", "elaborate", {
    "c4s9-elaborate-project1-code": laserSecurityCode,
    "c4s9-elaborate-beam-alert-code":
`/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/
const int ldrSensor = 2;
const int laser = 3;     // 3-pin laser SIGNAL pin
const int led = 5;
const int buzzer = 6;
const int BEAM_BROKEN_STATE = LOW; // If opposite, change LOW to HIGH

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(laser, OUTPUT);
  pinMode(led, OUTPUT);
  pinMode(buzzer, OUTPUT);
  digitalWrite(laser, HIGH);
}

void loop() {
  bool beamBroken = digitalRead(ldrSensor) == BEAM_BROKEN_STATE;

  if (beamBroken) {
    digitalWrite(led, HIGH);
    tone(buzzer, 1200);
  } else {
    digitalWrite(led, LOW);
    noTone(buzzer);
  }
}`
  });

  attachCodeToPage("4-9", "elaborate", 12, "c4s9-elaborate-project1-code");
  attachCodeToPage("4-9", "elaborate", 16, "c4s9-elaborate-beam-alert-code");

  replaceCodes("7-9", "elaborate", {
    "c7s9-elaborate-project1-code":
`/*
Laser Race Timer Project

Laser  -> D2
LDR DO -> D3
Button -> D4
Buzzer -> D5

TM1637 CLK -> D8
TM1637 DIO -> D9

Display format:
12:45 means 12 seconds and 45 centiseconds
*/
const int laserPin = 2;
const int ldrPin = 3;
const int buttonPin = 6;
const int buzzerPin = 5;

const int CLK = 8;
const int DIO = 9;

TM1637Display display(CLK, DIO);

// Most LDR digital modules give HIGH when laser/light falls on it.
// If your project works opposite, change HIGH to LOW.
const int LASER_RECEIVED_STATE = HIGH;

enum RaceState {
  IDLE,
  RUNNING,
  FINISHED
};

RaceState raceState = IDLE;
unsigned long raceStartTime = 0;
unsigned long finalTime = 0;
bool lastButtonState = HIGH;
unsigned long lastButtonPressTime = 0;
const unsigned long debounceDelay = 250;

// Ignore LDR for first 500 ms after race starts
// This avoids false trigger at starting time
const unsigned long startIgnoreTime = 500;

void showTime(unsigned long elapsedTime) {
  unsigned int centiseconds = (elapsedTime / 10) % 100;
  unsigned int seconds = (elapsedTime / 1000) % 100;

  int displayValue = (seconds * 100) + centiseconds;

  // Shows SS:CC
  display.showNumberDecEx(displayValue, 0b01000000, true);
}

void winningSound() {
  tone(buzzerPin, 1000, 150);
  delay(200);
  tone(buzzerPin, 1500, 150);
  delay(200);
  tone(buzzerPin, 2000, 250);
  delay(300);
  tone(buzzerPin, 2500, 400);
  delay(450);
  noTone(buzzerPin);
}

bool buttonPressedOnce() {
  bool currentButtonState = digitalRead(buttonPin);

  if (lastButtonState == HIGH && currentButtonState == LOW) {
    if (millis() - lastButtonPressTime > debounceDelay) {
      lastButtonPressTime = millis();
      lastButtonState = currentButtonState;
      return true;
    }
  }

  lastButtonState = currentButtonState;
  return false;
}

bool laserBeamDisturbed() {
  int ldrState = digitalRead(ldrPin);

  // If LDR is not receiving laser, beam is disturbed
  return ldrState != LASER_RECEIVED_STATE;
}

void startRace() {
  raceState = RUNNING;
  raceStartTime = millis();
  finalTime = 0;

  digitalWrite(laserPin, HIGH);
  noTone(buzzerPin);

  display.showNumberDecEx(0, 0b01000000, true);

  Serial.println("Race Started");
}

void finishRace() {
  raceState = FINISHED;
  finalTime = millis() - raceStartTime;

  digitalWrite(laserPin, LOW);
  showTime(finalTime);

  Serial.print("Winner Time: ");
  Serial.print(finalTime / 1000.0);
  Serial.println(" seconds");

  winningSound();
}

void setup() {
  pinMode(laserPin, OUTPUT);
  pinMode(ldrPin, INPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(buzzerPin, OUTPUT);

  digitalWrite(laserPin, LOW);
  digitalWrite(buzzerPin, LOW);

  display.setBrightness(7);
  display.showNumberDecEx(0, 0b01000000, true);

  Serial.begin(9600);
  Serial.println("Laser Race Timer Ready");
}

void loop() {
  if (buttonPressedOnce()) {
    startRace();
  }

  if (raceState == RUNNING) {
    unsigned long elapsedTime = millis() - raceStartTime;

    showTime(elapsedTime);

    // Check LDR only after small starting delay
    if (elapsedTime > startIgnoreTime) {
      if (laserBeamDisturbed()) {
        finishRace();
      }
    }
  }

  if (raceState == FINISHED) {
    // Timer stays frozen here.
    // Next button press will start next race.
  }
}`
  });

  attachCodeToPage("7-9", "elaborate", 21, "c7s9-elaborate-project1-code");
  attachCodeToPage("7-9", "elaborate", 22, "c7s9-elaborate-project1-code");
  attachCodeToPage("7-9", "elaborate", 23, "c7s9-elaborate-project1-code");
})();

// Keep the Explain code panel identical to the first complete code listing
// shown for that lesson in the source Explore PDF.
(function () {
  const content = window.LMS_CONTENT || {};
  for (const grade of [4, 5, 6, 7]) {
    for (let session = 1; session <= 10; session += 1) {
      const lesson = content[`${grade}-${session}`];
      if (!lesson || !lesson.explore || !lesson.explain) continue;
      const codePage = (lesson.explore.pages || []).find((page) => page[3]);
      const code = codePage && lesson.explore.codes
        ? lesson.explore.codes[codePage[3]]
        : "";
      if (code) lesson.explain.code = code;
    }
  }
})();
