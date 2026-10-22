// Session 6 Grade 7 Project 1
// Automatic Door
// IR detected = door opens for 5 seconds and closes
#include <Servo.h>

const int irSensor = 2;
const int servoPin = 3;
const int IR_DETECTED = LOW ;
// change to HIGH if opposite
Servo doorServo;

void setup() {
  pinMode(irSensor , INPUT);
  doorServo.attach(servoPin);
  doorServo.write(0);
  // door closed
}

void loop() {
  if (digitalRead(irSensor) == IR_DETECTED) {
    doorServo.write(90);
    // door open
    delay(5000);
    doorServo.write(0);
    // door close
    delay(500);
  }
}
