#define HALL_PIN 2  // Hall sensor output pin
#define LED_PIN 3  // LED pin

void setup() {
  pinMode(HALL_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int hallState = digitalRead(HALL_PIN);
  if (hallState == LOW) {
    // Magnet detected (output LOW)
    digitalWrite(LED_PIN, HIGH);
    // Turn ON LED
  } else {
    digitalWrite(LED_PIN, LOW);
    // Turn OFF LED
  }
}
