// Session 6 Grade 7 Project 2
// Robo Hand Hi
// Touch detected = robot waves hand
#include <Servo.h>

const int TOUCH_PIN = 2;
const int SERVO_PIN = 3;
Servo myServo;

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  myServo.attach(SERVO_PIN);
  myServo.write(0);
  // Hand starts down/at rest
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  if (touchState == HIGH) {
    // The Waving Sequence (2 quick shakes)
    for (int i = 0; i < 2; i++) {
      myServo.write(75);
      // Move up to wave (75Â° keeps it a bit tighter/faster than
      90Â°) delay(200);
      // Quick pause at the top
      myServo.write(15);
      // Move back down
      delay(200);
      // Quick pause at the bottom
    }
    myServo.write(0);
    // Put the hand back to rest position
    delay(500);
    // Cooldown so it doesn't immediately wave again if you linger
    your finger
  }
}
