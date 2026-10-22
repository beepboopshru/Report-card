// Session 2 Grade 9
// Shout Meter
// More sound = Servo moves more
#include <Servo.h>

const int soundSensor = A0;
const int servoPin = 4;
Servo meterServo;

void setup() {
  meterServo.attach(servoPin);
  meterServo.write(0);
}

void loop() {
  int soundValue = analogRead(soundSensor);
  int angle = map(soundValue, 300, 900, 0, 180);
  angle = constrain(angle, 0, 180);
  meterServo.write(angle);
  delay(100);
}
