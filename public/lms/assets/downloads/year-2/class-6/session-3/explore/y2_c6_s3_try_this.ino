#define TILT_PIN 2     // Tilt sensor on D2
#define BUZZER_PIN 3   // Buzzer on D3
#define LED_PIN 5      // LED on D5

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
    // Buzzer ON
    digitalWrite(LED_PIN, HIGH);
    // LED ON
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
    digitalWrite(LED_PIN, LOW);
    // LED OFF
  }
}
