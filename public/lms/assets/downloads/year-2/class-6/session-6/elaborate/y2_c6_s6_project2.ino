// Session 6 Grade 6 Project 2
// Crocodile Face Movement
// IR detected = crocodile face moves
#include <Servo.h>

const int irSensor = 2;
const int servoPin = 3;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
Servo faceServo;

void setup() {
  pinMode(irSensor, INPUT);
  faceServo.attach(servoPin);
  faceServo.write(0);
}

void loop() {
  if (digitalRead(irSensor) == IR_DETECTED) {
    faceServo.write(90);
    delay(1000);
    faceServo.write(0);
    delay(500);
  }
}
