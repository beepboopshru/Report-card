#define HALL_PIN 2    // Hall sensor output pin
#define BUZZ1_PIN 6   // Buzzer 1
#define BUZZ2_PIN 7   // Buzzer 2
#define LED1_PIN 5    // LED 1
#define LED2_PIN 4    // LED 2

void setup() {
  pinMode(HALL_PIN, INPUT);
  pinMode(BUZZ1_PIN, OUTPUT);
  pinMode(BUZZ2_PIN, OUTPUT);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  // Default state (no magnet)
  digitalWrite(BUZZ1_PIN, LOW);
  digitalWrite(BUZZ2_PIN, LOW);
  digitalWrite(LED1_PIN, HIGH);
  digitalWrite(LED2_PIN, HIGH);
}

void loop() {
  int hallState = digitalRead(HALL_PIN);
  if (hallState == LOW) {
    // Magnet detected
    // Buzzers ON
    digitalWrite(BUZZ1_PIN, HIGH);
    digitalWrite(BUZZ2_PIN, HIGH);
    // LEDs OFF (opposite behavior)
    digitalWrite(LED1_PIN, LOW);
    digitalWrite(LED2_PIN, LOW);
  } else {
    // Buzzers OFF
    digitalWrite(BUZZ1_PIN, LOW);
    digitalWrite(BUZZ2_PIN, LOW);
    // LEDs ON
    digitalWrite(LED1_PIN, HIGH);
    digitalWrite(LED2_PIN, HIGH);
  }
}
