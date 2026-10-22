/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int ldrSensor = 2;
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
}
