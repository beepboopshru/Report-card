(function () {
  const lessons = window.LMS_CONTENT || window.lessonContent || {};

  const code = {
    c4DeskLamp: `const int led = 6;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
}`,
    c4AlarmBell: `const int buzzer = 6;

void setup() {
  pinMode(buzzer, OUTPUT);
}

void loop() {
  digitalWrite(buzzer, HIGH);
}`,
    g5Main: `const int led = 7;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
}`,
    g5Try: `const int led = 5;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
}`,
    g5Buzzer: `const int buzzer = 6;

void setup() {
  pinMode(buzzer, OUTPUT);
}

void loop() {
  digitalWrite(buzzer, HIGH);
}`,
    c6Sos: `const int buzzer = 6;

void setup() {
  pinMode(buzzer, OUTPUT);
}

void loop() {
  digitalWrite(buzzer, HIGH);
}`,
    c7Main: `/*
Simple Alarm Sound
Buzzer connected to pin 5
*/
const int buzzer = 5;

void setup() {
  pinMode(buzzer, OUTPUT);
}

void loop() {
  digitalWrite(buzzer, HIGH);
}`,
    c7Try: `/*
Simple Alarm Sound
Buzzer connected to pin 7
*/
const int buzzer = 7;

void setup() {
  pinMode(buzzer, OUTPUT);
}

void loop() {
  digitalWrite(buzzer, HIGH);
}`
  };

  if (lessons["4-1"]) {
    lessons["4-1"].elaborate.codes["elaborate-desk-lamp-code"] = code.c4DeskLamp;
    lessons["4-1"].elaborate.codes["elaborate-alarm-bell-code"] = code.c4AlarmBell;
  }

  if (lessons["5-1"]) {
    lessons["5-1"].explore.codes["g5-explore-main-code"] = code.g5Main;
    lessons["5-1"].explore.codes["g5-explore-try-code"] = code.g5Try;
    lessons["5-1"].elaborate.codes["g5-elaborate-lantern-code"] = code.c4DeskLamp;
    lessons["5-1"].elaborate.codes["g5-elaborate-buzzer-code"] = code.g5Buzzer;
    lessons["5-1"].explain.code = code.g5Main;
  }

  if (lessons["6-1"]) {
    lessons["6-1"].elaborate.codes["c6-elaborate-sos-code"] = code.c6Sos;
  }

  if (lessons["7-1"]) {
    lessons["7-1"].explore.codes["c7-explore-main-code"] = code.c7Main;
    lessons["7-1"].explore.codes["c7-explore-try-code"] = code.c7Try;
    lessons["7-1"].explain.code = code.c7Main;
  }
})();
