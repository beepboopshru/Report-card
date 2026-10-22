// Session 3 Grade 7
// Taxi Gate / Barrier
// Tilt down = gate opens
#include <Servo.h>

const int tiltSensor = 2;
const int servoPin = 4;
const int TILT_ACTIVE = HIGH;
// change to LOW if opposite
Servo gateServo;

void setup() {
  pinMode(tiltSensor, INPUT);
  gateServo.attach(servoPin);
  gateServo.write(0);
  // gate closed
}

void loop() {
  if (digitalRead(tiltSensor) == TILT_ACTIVE) {
    gateServo.write(90);
    // gate open
  } else {
    gateServo.write(0);
    // gate closed
  }
}
