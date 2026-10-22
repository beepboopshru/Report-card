/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int touchSensor = 2;
const int dipLed = 5;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dipLed, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) digitalWrite(dipLed, HIGH);
  else digitalWrite(dipLed, LOW);
}
