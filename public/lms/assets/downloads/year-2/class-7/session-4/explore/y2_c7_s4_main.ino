#define HALL_PIN 2 // Hall sensor output pin
#define LED_PIN1 6 // LED1 pin
#define LED_PIN2 5 // LED2 pin (opposite behavior)

void setup() {
  pinMode(HALL_PIN, INPUT);
  pinMode(LED_PIN1, OUTPUT);
  pinMode(LED_PIN2, OUTPUT);
}

void loop() {
  int hallState = digitalRead(HALL_PIN);
  if (hallState == LOW) {
    // Magnet detected (output LOW)
    digitalWrite(LED_PIN1, HIGH);
    // Turn ON LED at D6
    digitalWrite(LED_PIN2, LOW);
    // Turn OFF LED at D5 (opposite)
  } else {
    digitalWrite(LED_PIN1, LOW);
    // Turn OFF LED at D6
    digitalWrite(LED_PIN2, HIGH);
    // Turn ON LED at D5 (opposite)
  }
}
