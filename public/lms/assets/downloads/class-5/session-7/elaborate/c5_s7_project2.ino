/*
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int touchSensor = 2;
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
}
