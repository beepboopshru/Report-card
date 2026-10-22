// Session 6 Grade 9 Project 1
// Touch Servo Gate
// Touch sensor touched = gate opens for 5 seconds
#include <Servo.h>

const int touchSensor = 2;
const int servoPin = 3;
const int TOUCH_ACTIVE = HIGH;
// change to LOW if opposite
Servo gateServo;

void setup() {
  pinMode(touchSensor, INPUT);
  gateServo.attach(servoPin);
  gateServo.write(0);
  // gate closed
}

void loop() {
  if (digitalRead(touchSensor) == TOUCH_ACTIVE) {
    gateServo.write(90);
    // gate open
    delay(5000);
    gateServo.write(0);
    // gate close
    delay(500);
  }
}
