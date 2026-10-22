#include <Servo.h>
#define SERVO1_PIN 2   // First Servo on D2
#define SERVO2_PIN 3   // Second Servo on D3

Servo servo1;
Servo servo2;

void setup() {
  servo1.attach(SERVO1_PIN);
  servo2.attach(SERVO2_PIN);
}

void loop() {
  // 0 â†’ 180
  for (int angle = 0; angle <= 180; angle++) {
    servo1.write(angle);
    servo2.write(angle);
    delay(15);
  }
  // 180 â†’ 0
  for (int angle = 180; angle >= 0; angle--) {
    servo1.write(angle);
    servo2.write(angle);
    delay(15);
  }
}
