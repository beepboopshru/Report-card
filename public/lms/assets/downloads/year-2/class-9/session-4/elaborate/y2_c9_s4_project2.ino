// Session 4 Grade 9
// Magnetic Locker
// Magnet detected = door opens
// Magnetic sensor used as DIGITAL sensor on A0
#include <Servo.h>

const int magneticSensor = A0;
const int servoPin = 4;
const int MAGNET_DETECTED = LOW;
// change to HIGH if opposite
Servo lockerServo;

void setup() {
  pinMode(magneticSensor, INPUT);
  lockerServo.attach(servoPin);
  lockerServo.write(0);
  // locker closed
}

void loop() {
  if (digitalRead(magneticSensor) == MAGNET_DETECTED) {
    lockerServo.write(90);
    // locker open
  } else {
    lockerServo.write(0);
    // locker closed
  }
}
