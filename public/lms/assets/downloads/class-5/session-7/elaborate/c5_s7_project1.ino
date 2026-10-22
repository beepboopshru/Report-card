/*
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int touchSensor = 2;
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
}
