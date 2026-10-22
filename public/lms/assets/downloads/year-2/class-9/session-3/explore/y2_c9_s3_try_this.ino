#include <Servo.h>
#define TILT_PIN 2 // Tilt sensor on D2
#define SERVO_PIN 3 // Servo on D3
#define LED_PIN 6 // LED on D6
#define BUZZER_PIN 5 // Buzzer on D5

Servo tiltServo;

void setup() {
  pinMode(TILT_PIN, INPUT);
  // Use INPUT_PULLUP if needed
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  tiltServo.attach(SERVO_PIN);
  tiltServo.write(0);
  // Start at 0Â°
  digitalWrite(LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  int tiltState = digitalRead(TILT_PIN);
  if (tiltState == HIGH) {
    tiltServo.write(180);
    // Move Servo
    digitalWrite(LED_PIN, HIGH);
    // LED ON
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON
  } else {
    tiltServo.write(0);
    // Reset Servo
    digitalWrite(LED_PIN, LOW);
    // LED OFF
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
  }
  delay(20);
}
