#define TILT_PIN 2 // Tilt sensor connected to D2
#define BUZZER_PIN 3 // Buzzer connected to D3

void setup() {
  pinMode(TILT_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  int tiltState = digitalRead(TILT_PIN);
  if (tiltState == HIGH) {
    digitalWrite(BUZZER_PIN, HIGH);
    // Turn buzzer ON
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    // Turn buzzer OFF
  }
}
