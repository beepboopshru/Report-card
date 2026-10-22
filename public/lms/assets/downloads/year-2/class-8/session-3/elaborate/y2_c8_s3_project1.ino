// Session 3 Grade 8
// Railway Track
// Tilt down = track moves into correct position
#include <Servo.h>

const int tiltSensor = 2;
const int servoPin = 4;
const int TILT_ACTIVE = HIGH;
// change to LOW if
opposite Servo trackServo;

void setup() {
  pinMode(tiltSensor, INPUT);
  trackServo.attach(servoPin);
  trackServo.write(0);
  // track open / wrong position
}

void loop() {
  if (digitalRead(tiltSensor) == TILT_ACTIVE) {
    trackServo.write(90);
    // track correct position
  } else {
    trackServo.write(0);
  }
}
