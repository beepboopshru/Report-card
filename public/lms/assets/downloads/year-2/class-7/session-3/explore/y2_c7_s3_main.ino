#define TILT_PIN 2  // Tilt sensor connected to D2
#define BUZZER_PIN 7 // Buzzer connected to D7
#define LED_PIN 6   // LED connected to D6

void setup() {
  pinMode(TILT_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(LED_PIN, LOW);
}

void loop() {
  int tiltState = digitalRead(TILT_PIN);
  if (tiltState == HIGH) {
    digitalWrite(BUZZER_PIN, HIGH);
    // Turn buzzer ON
    digitalWrite(LED_PIN, HIGH);
    // Turn LED ON
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    // Turn buzzer OFF
    digitalWrite(LED_PIN, LOW);
    // Turn LED OFF
  }
}
