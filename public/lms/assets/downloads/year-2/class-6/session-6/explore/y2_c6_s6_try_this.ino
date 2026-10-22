#include <Servo.h>
#define SERVO_PIN 2   // Servo on D2

Servo myServo;

void setup() {
  myServo.attach(SERVO_PIN);
}

void loop() {
  // Move from 0Â° to 90Â°
  for (int angle = 0; angle <= 90; angle++) {
    myServo.write(angle);
    delay(15);
  }
  // Move back from 90Â° to 0Â°
  for (int angle = 90; angle >= 0; angle--) {
    myServo.write(angle);
    delay(15);
  }
}
