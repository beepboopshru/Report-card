// Session 3 Grade 6
// Exhaust Fan
// Tilt sensor tilted = fan motor ON
const int tiltSensor = 2;
const int motor = 5;
const int TILT_ACTIVE = HIGH;
// change to LOW if opposite

void setup() {
  pinMode(tiltSensor, INPUT);
  pinMode(motor, OUTPUT);
}

void loop() {
  if (digitalRead(tiltSensor) == TILT_ACTIVE) {
    digitalWrite(motor, HIGH);
  } else {
    digitalWrite(motor, LOW);
  }
}
