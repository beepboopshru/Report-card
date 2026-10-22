const int potPin = A0;
// Potentiometer connected to A0
const int motorPin = 5;
// PWM pin connected to motor driver

void setup() {
  pinMode(motorPin, OUTPUT);
}

void loop() {
  // Read the potentiometer value (0 to 1023)
  int potValue = analogRead(potPin);
  // Convert it to PWM value (0 to 255)
  int motorSpeed = map(potValue, 0, 1023, 0, 255);
  // Set motor speed
  analogWrite(motorPin, motorSpeed);
  delay(10);
}
