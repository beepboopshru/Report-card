#include <Servo.h>
#define TOUCH_PIN 2    // Touch sensor on D2
#define SERVO_PIN 3    // Servo on D3
#define BUZZER_PIN 5   // Buzzer on D5

Servo myServo;

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  myServo.attach(SERVO_PIN);
  myServo.write(0);
  // Start at 0Â°
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  if (touchState == HIGH) {
    // Touch detected
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON
    // Move from 0 â†’ 180
    for (int angle = 0; angle <= 180; angle++) {
      myServo.write(angle);
      delay(10);
    }
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
    myServo.write(0);
    // Return to 0Â°
  }
}

}
