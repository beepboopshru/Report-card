#include <Servo.h>
#define IR_PIN 2      // IR sensor on D2
#define SERVO_PIN 3   // Servo on D3
#define LED_PIN 5     // LED on D5

Servo myServo;

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  myServo.attach(SERVO_PIN);
  myServo.write(0);
  // Start at 0Â°
  digitalWrite(LED_PIN, LOW);
}

void loop() {
  int irState = digitalRead(IR_PIN);
  if (irState == LOW) {
    // Object detected
    digitalWrite(LED_PIN, HIGH);
    // LED ON
    // Move Servo 0 â†’ 180
    for (int angle = 0; angle <= 180; angle++) {
      myServo.write(angle);
      delay(10);
    }
  } else {
    digitalWrite(LED_PIN, LOW);
    // LED OFF
    myServo.write(0);
    // Return to 0Â°
  }
}
