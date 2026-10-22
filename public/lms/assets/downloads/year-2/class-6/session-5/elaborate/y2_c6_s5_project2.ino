// Session 5 Grade 6 Project 2
// Smart Trashcan Lid
// Person near dustbin = lid opens for 5 seconds
#include <Servo.h>

const int irSensor = 2;
const int servoPin = 3;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
Servo lidServo;

void setup() {
  pinMode(irSensor, INPUT);
  lidServo.attach(servoPin);
  lidServo.write(0);
  // lid closed
}

void loop() {
  if (digitalRead(irSensor) == IR_DETECTED) {
    lidServo.write(90);
    // lid open
    delay(5000);
    lidServo.write(0);
    // lid close
    delay(500);
  }
}
