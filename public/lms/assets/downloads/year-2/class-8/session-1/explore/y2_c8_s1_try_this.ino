#define LDR_PIN 2     // LDR sensor on D2
#define BUZZER_PIN 6  // Buzzer on D6

void setup() {
  pinMode(LDR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  int ldrstate = digitalRead(LDR_PIN);
  if (ldrstate == HIGH) {
    digitalWrite(BUZZER_PIN, HIGH);
    // Bright â†’ Buzzer ON
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    // Dark â†’ Buzzer OFF
  }
}
