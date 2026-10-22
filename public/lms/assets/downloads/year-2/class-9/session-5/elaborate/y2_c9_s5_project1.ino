// Session 5 Grade 9 Project 1
// Smart Tap
// Hand near tap = water droplet comes out
#include <Servo.h>

const int irSensor = 2;
const int servoPin = 3;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
Servo tapServo;

void setup() {
  pinMode(irSensor, INPUT);
  tapServo.attach(servoPin);
  tapServo.write(0);
  // tap off
}

void loop() {
  if (digitalRead(irSensor) == IR_DETECTED) {
    tapServo.write(90);
    // water droplet out
  } else {
    tapServo.write(0);
    // water droplet back
  }
}
