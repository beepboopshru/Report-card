/*
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int touchSensor = 2;
const int led = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) digitalWrite(led, HIGH);
  else digitalWrite(led, LOW);
}
