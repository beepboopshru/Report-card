#define LASER_PIN 2   // Laser diode on D2
#define LDR_PIN 3     // LDR sensor on D3
#define LED_PIN 5     // LED on D5
#define BUZZER_PIN 6  // Buzzer on D6

void setup() {
  pinMode(LASER_PIN, OUTPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(LASER_PIN, HIGH);
  // Laser ON
  digitalWrite(LED_PIN, LOW);
  // LED OFF initially
  digitalWrite(BUZZER_PIN, LOW);
  // Buzzer OFF initially
}

void loop() {
  int ldrState = digitalRead(LDR_PIN);
  if (ldrState == HIGH) {
    // Beam normal
    digitalWrite(LED_PIN, LOW);
    digitalWrite(BUZZER_PIN, LOW);
  } else {
    // Beam broken â†’ Alarm
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);
  }
}
