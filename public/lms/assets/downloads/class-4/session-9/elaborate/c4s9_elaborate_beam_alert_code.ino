/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int ldrSensor = 2;
const int laser = 3;
// 3-pin laser SIGNAL pin
const int led = 5;
const int buzzer = 6;
const int BEAM_BROKEN_STATE = LOW;
// If opposite, change LOW to HIGH

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
}
