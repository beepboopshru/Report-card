// Session 5 Grade 8 Project 1
// Crocodile Mouth
// Hand near crocodile = mouth opens and closes
#include <Servo.h>

const int irSensor = 2;
const int servoPin = 4;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
Servo mouthServo;

void setup() {
  pinMode(irSensor, INPUT);
  mouthServo.attach(servoPin);
  mouthServo.write(0);
  // mouth closed
}

void loop() {
  if (digitalRead(irSensor) == IR_DETECTED) {
    mouthServo.write(80);
    // mouth open
    delay(1000);
    mouthServo.write(0);
    // mouth closed
    delay(500);
  }
}
