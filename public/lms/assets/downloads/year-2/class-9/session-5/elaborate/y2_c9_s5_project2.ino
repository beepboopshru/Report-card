// Session 5 Grade 9 Project 2
// IR Servo Gate
// IR detected = gate opens for 5 seconds
#include <Servo.h>

const int irSensor = 2;
const int servoPin = 3;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
Servo gateServo;

void setup() {
  pinMode(irSensor, INPUT);
  gateServo.attach(servoPin);
  gateServo.write(0);
  // gate closed
}

void loop() {
  if (digitalRead(irSensor) == IR_DETECTED) {
    gateServo.write(90);
    // gate open
    delay(5000);
    gateServo.write(0);
    // gate closed
    delay(500);
  }
}
