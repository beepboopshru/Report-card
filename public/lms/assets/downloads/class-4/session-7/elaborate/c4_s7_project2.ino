/*
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int touchSensor = 2;
const int yellowLed1 = 5;
const int yellowLed2 = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(yellowLed1, OUTPUT);
  pinMode(yellowLed2, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(yellowLed1, HIGH);
    delay(150);
    digitalWrite(yellowLed1, LOW);
    digitalWrite(yellowLed2, HIGH);
    delay(150);
    digitalWrite(yellowLed2, LOW);
  } else {
    digitalWrite(yellowLed1, LOW);
    digitalWrite(yellowLed2, LOW);
  }
}
