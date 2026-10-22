#include <Servo.h>

Servo doorServo;
int irSensor = 2;
int servoPin = 3;
int IR_ACTIVE = LOW;
// Change to HIGH if opposite

void setup() {
  pinMode(irSensor, INPUT);
  doorServo.attach(servoPin);
  doorServo.write(130);
  // Door closed
}

void loop() {
  if (digitalRead(irSensor) == IR_ACTIVE) {
    delay(1000);
    // IR detected for 5 seconds
    // Open door smoothly
    for (int i = 130; i >= 30; i--) {
      doorServo.write(i);
      delay(40);
    }
    delay(5000);
    // Door open for 5 seconds
    for (int i = 30; i <= 130; i++) {
      doorServo.write(i);
      delay(25);
      // Close door smoothly
    }
  }
}
