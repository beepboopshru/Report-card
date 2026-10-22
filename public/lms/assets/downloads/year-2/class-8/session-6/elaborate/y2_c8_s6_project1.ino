// Session 6 Grade 8 Project 1
// Crane Movement
// Touch sensor touched = crane arm goes down and up
#include <Servo.h>

const int touchSensor = 2;
const int servoPin = 3;
const int TOUCH_ACTIVE = HIGH;
// change to LOW if opposite
Servo craneServo;

void setup() {
  pinMode(touchSensor, INPUT);
  craneServo.attach(servoPin);
  craneServo.write(0);
  // crane up
}

void loop() {
  if (digitalRead(touchSensor) == TOUCH_ACTIVE) {
    craneServo.write(100);
    // crane down
    delay(1000);
    craneServo.write(0);
    // crane up
    delay(500);
  }
}
