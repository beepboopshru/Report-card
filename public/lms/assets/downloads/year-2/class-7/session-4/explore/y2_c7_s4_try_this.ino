#define HALL_PIN 2   // Hall sensor output pin
#define LED1_PIN 6   // LED1 (same group)
#define LED2_PIN 5   // LED2 (opposite group)
#define LED3_PIN 4   // LED3 (same as LED1)
#define LED4_PIN 3   // LED4 (same as LED2)

void setup() {
  pinMode(HALL_PIN, INPUT);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  pinMode(LED3_PIN, OUTPUT);
  pinMode(LED4_PIN, OUTPUT);
}

void loop() {
  int hallState = digitalRead(HALL_PIN);
  if (hallState == LOW) {
    // Magnet detected
    // Group 1 LEDs ON
    digitalWrite(LED1_PIN, HIGH);
    digitalWrite(LED3_PIN, HIGH);
    // Group 2 LEDs OFF
    digitalWrite(LED2_PIN, LOW);
    digitalWrite(LED4_PIN, LOW);
  } else {
    // Group 1 LEDs OFF
    digitalWrite(LED1_PIN, LOW);
    digitalWrite(LED3_PIN, LOW);
    // Group 2 LEDs ON
    digitalWrite(LED2_PIN, HIGH);
    digitalWrite(LED4_PIN, HIGH);
  }
}
