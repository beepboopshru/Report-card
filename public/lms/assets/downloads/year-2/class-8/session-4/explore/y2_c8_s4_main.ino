// Hall Sensor with Buzzer and LED (opposite behavior)
// Board: Arduino UNO (or compatible)
#define HALL_PIN 2  // Hall sensor output pin
#define BUZZ_PIN 6  // Buzzer pin (active on detection)
#define LED_PIN 5  // LED pin (opposite behavior)

void setup() {
  pinMode(HALL_PIN, INPUT);
  pinMode(BUZZ_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(BUZZ_PIN, LOW);
  digitalWrite(LED_PIN, HIGH);
  // Default: LED ON when no magnet
}

void loop() {
  int hallState = digitalRead(HALL_PIN);
  if (hallState == LOW) {
    // Magnet detected (output LOW)
    digitalWrite(BUZZ_PIN, HIGH);
    // Turn ON buzzer
    digitalWrite(LED_PIN, LOW);
    // Turn OFF LED (opposite)
  } else {
    digitalWrite(BUZZ_PIN, LOW);
    // Turn OFF buzzer
    digitalWrite(LED_PIN, HIGH);
    // Turn ON LED (opposite)
  }
}
