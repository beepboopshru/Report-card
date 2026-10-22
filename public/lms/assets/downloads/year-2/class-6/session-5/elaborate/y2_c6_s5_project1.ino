// Session 5 Grade 6 Project 1
// Wall Parking Alert
// Object near wall = buzzer ON
const int irSensor = 2;
const int buzzer = 5;
const int IR_DETECTED = LOW;
// change to HIGH if opposite

void setup() {
  pinMode(irSensor, INPUT);
  pinMode(buzzer, OUTPUT);
  digitalWrite(buzzer, LOW);
}

void loop() {
  if (digitalRead(irSensor) == IR_DETECTED) {
    digitalWrite(buzzer, HIGH);
  } else {
    digitalWrite(buzzer, LOW);
  }
}
