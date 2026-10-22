#define LDR_PIN 2      // LDR sensor on D2
#define LED1_PIN 3     // LED1 on D3
#define LED2_PIN 4     // LED2 on D4
#define LED3_PIN 5     // LED3 on D5
#define BUZZER_PIN 6   // Buzzer on D6

void setup() {
  pinMode(LDR_PIN, INPUT);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  pinMode(LED3_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(LED1_PIN, LOW);
  digitalWrite(LED2_PIN, LOW);
  digitalWrite(LED3_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  int ldrState = digitalRead(LDR_PIN);
  // Most LDR modules: LOW = dark, HIGH = bright
  if (ldrState == LOW) {
    // Dark â†’ turn everything ON
    digitalWrite(LED1_PIN, HIGH);
    digitalWrite(LED2_PIN, HIGH);
    digitalWrite(LED3_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);
  } else {
    // Bright â†’ turn everything OFF
    digitalWrite(LED1_PIN, LOW);
    digitalWrite(LED2_PIN, LOW);
    digitalWrite(LED3_PIN, LOW);
    digitalWrite(BUZZER_PIN, LOW);
  }
}
