// Session 6 Grade 6 Project 1
// Dog Tail Movement
// IR detected = dog tail moves
#include <Servo.h>

const int irSensor = 2;
const int servoPin = 3;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
Servo tailServo;

void setup() {
  pinMode(irSensor, INPUT);
  tailServo.attach(servoPin);
  tailServo.write(90);
}

void loop() {
  if (digitalRead(irSensor) == IR_DETECTED) {
    for (int i = 0; i < 3; i++) {
      tailServo.write(40);
      delay(300);
      tailServo.write(140);
      delay(300);
    }
    tailServo.write(90);
  }
}
