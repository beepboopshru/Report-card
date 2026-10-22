#include <Servo.h>
#define TOUCH_PIN 2   // Touch sensor on D2
#define SERVO_PIN 3   // Servo on D3

Servo myServo;

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  myServo.attach(SERVO_PIN);
  myServo.write(0);
  // Start at 0Â°
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  if (touchState == HIGH) {
    // Touch detected
    // Move from 0 â†’ 180
    for (int angle = 0; angle <= 180; angle++) {
      myServo.write(angle);
      delay(10);
    }
  } else {
    myServo.write(0);
    // Return to 0Â°
  }
}
