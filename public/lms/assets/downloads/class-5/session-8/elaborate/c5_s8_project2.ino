/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int ldrSensor = 2;
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
}
