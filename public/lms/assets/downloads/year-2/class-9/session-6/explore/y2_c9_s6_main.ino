#include <Servo.h>
#define IR_PIN 2      // IR sensor on D2
#define SERVO_PIN 3   // Servo on D3

Servo myServo;

void setup() {
  pinMode(IR_PIN, INPUT);
  myServo.attach(SERVO_PIN);
  myServo.write(0);
  // Start at 0Â°
}

void loop() {
  int irState = digitalRead(IR_PIN);
  if (irState == LOW) {
    // Object detected
    // Move from 0 â†’ 180
    for (int angle = 0; angle <= 180; angle++) {
      myServo.write(angle);
      delay(10);
    }
  } else {
    // Return to 0
    myServo.write(0);
  }
}
