// Session 5 Grade 8 Project 2
// Panda Face Movement
// Person near panda = face tilts
#include <Servo.h>

const int irSensor = 2;
const int servoPin = 3;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
Servo faceServo;

void setup() {
  pinMode(irSensor, INPUT);
  faceServo.attach(servoPin);
  faceServo.write(90);
  // center position
}

void loop() {
  if (digitalRead(irSensor) == IR_DETECTED) {
    faceServo.write(50);
    delay(500);
    faceServo.write(130);
    delay(500);
    faceServo.write(90);
    delay(500);
  }
}
