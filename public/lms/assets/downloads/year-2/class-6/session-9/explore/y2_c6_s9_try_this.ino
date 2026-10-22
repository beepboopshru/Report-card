#define LASER_PIN 2   // Laser diode on D2
#define LDR_PIN 3     // LDR sensor on D3
#define BUZZER_PIN 5  // Buzzer on D5

void setup() {
  pinMode(LASER_PIN, OUTPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(LASER_PIN, HIGH);
  // Laser ON
  digitalWrite(BUZZER_PIN, LOW);
  // Buzzer OFF initially
}

void loop() {
  int ldrState = digitalRead(LDR_PIN);
  if (ldrState == HIGH) {
    // Laser hitting LDR
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON
  } else {
    // Laser NOT hitting LDR
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
  }
}
