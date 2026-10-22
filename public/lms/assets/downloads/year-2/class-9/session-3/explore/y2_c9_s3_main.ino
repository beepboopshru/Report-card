/// Tilt â†’ Servo demo
// Moves a Servo on D3 to 180Â° when the tilt sensor is HIGH, and back to 0Â° otherwise.
#include <Servo.h>
#define TILT_PIN 2   // Tilt sensor connected to D2 (digital input)
#define SERVO_PIN 3  // Servo signal connected to D3

Servo tiltServo;

void setup() {
  pinMode(TILT_PIN, INPUT);
  // Use INPUT_PULLUP if your tilt switch is wired to GND
  tiltServo.attach(SERVO_PIN);
  tiltServo.write(0);
  // Start at 0Â°
}

void loop() {
  int tiltState = digitalRead(TILT_PIN);
  if (tiltState == HIGH) {
    tiltServo.write(180);
    // Tilt detected â†’ move to 180Â°
  } else {
    tiltServo.write(0);
    // No tilt â†’ move back to 0Â°
  }
  delay(20);
  // small delay to reduce jitter
}
