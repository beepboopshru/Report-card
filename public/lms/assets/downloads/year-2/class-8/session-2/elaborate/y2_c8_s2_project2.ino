// Session 2 Grade 8
// Body Builder
// Sound detected = Servo moves arm like bicep movement
#include <Servo.h>

const int soundSensor = A0;
const int servoPin = 4;
int soundLimit = 600;
// adjust after testing
Servo bodyServo;

void setup() {
  bodyServo.attach(servoPin);
  bodyServo.write(0);
}

void loop() {
  int soundValue = analogRead(soundSensor);
  if (soundValue > soundLimit) {
    for (int i = 0; i < 3; i++) {
      bodyServo.write(90);
      delay(400);
      bodyServo.write(0);
      delay(400);
    }
  }
}
