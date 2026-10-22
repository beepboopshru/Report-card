#define TILT_PIN 2    // Tilt sensor connected to D2
#define BUZZER_PIN 7  // Buzzer connected to D7
#define LED1_PIN 6    // First LED on D6
#define LED2_PIN 5    // Second LED on D5

void setup() {
  pinMode(TILT_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(LED1_PIN, LOW);
  digitalWrite(LED2_PIN, LOW);
}

void loop() {
  int tiltState = digitalRead(TILT_PIN);
  if (tiltState == HIGH) {
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON
    digitalWrite(LED1_PIN, HIGH);
    // LED1 ON
    digitalWrite(LED2_PIN, HIGH);
    // LED2 ON
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
    digitalWrite(LED1_PIN, LOW);
    // LED1 OFF
    digitalWrite(LED2_PIN, LOW);
    // LED2 OFF
  }
}
