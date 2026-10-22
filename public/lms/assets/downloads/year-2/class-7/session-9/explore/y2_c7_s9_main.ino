#define LASER_PIN 2 // Laser diode connected to D2
#define LDR_PIN 3  // LDR sensor connected to D3
#define BUZZER_PIN 5 // Buzzer connected to D5

void setup() {
  pinMode(LASER_PIN, OUTPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(LASER_PIN, HIGH);
  // Turn ON laser initially
  digitalWrite(BUZZER_PIN, LOW);
  // Keep buzzer OFF
}

void loop() {
  int ldrState = digitalRead(LDR_PIN);
  // Read LDR state
  if (ldrState == HIGH) {
    // Laser beam detected normally
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
  } else {
    // Laser beam blocked
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON (Alarm)
  }
}
