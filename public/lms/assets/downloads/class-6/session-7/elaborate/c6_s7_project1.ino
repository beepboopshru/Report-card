/*
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int touchSensor = 2;
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
}
