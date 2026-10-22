// Session 6 Grade 8 Project 2
// Robo Hi With Touch
// Touch sensor touched = robot waves hand
#include <Servo.h>

const int touchSensor = 2;
const int servoPin = 3;
const int TOUCH_ACTIVE = HIGH;
// change to LOW if opposite
Servo handServo;

void setup() {
  pinMode(touchSensor, INPUT);
  handServo.attach(servoPin);
  handServo.write(90);
}

void loop() {
  if (digitalRead(touchSensor) == TOUCH_ACTIVE) {
    for (int i = 0; i < 3; i++) {
      handServo.write(30);
      delay(400);
      handServo.write(120);
      delay(400);
    }
    handServo.write(90);
    delay(500);
  }
}
