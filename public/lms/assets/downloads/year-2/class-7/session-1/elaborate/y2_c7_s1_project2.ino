#define LDR_PIN 2     // LDR sensor connected to D2
#define LED_PIN 6     // Only one LED on D6
#define BUZZER_PIN 5  // Buzzer on D5

void setup() {
  pinMode(LDR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  int ldrstate = digitalRead(LDR_PIN);
  if (ldrstate == HIGH) {
    digitalWrite(LED_PIN, HIGH);
    // LED ON
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON
  } else {
    digitalWrite(LED_PIN, LOW);
    // LED OFF
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
  }
}
