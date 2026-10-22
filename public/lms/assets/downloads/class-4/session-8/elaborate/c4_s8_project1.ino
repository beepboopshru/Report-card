/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int ldrSensor = 2;
// 3-pin LDR digital OUT
const int pushSwitch = 5;
const int buzzer = 6;
const int DARK_STATE = LOW;
// If LDR works opposite, change LOW to HIGH
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
}
