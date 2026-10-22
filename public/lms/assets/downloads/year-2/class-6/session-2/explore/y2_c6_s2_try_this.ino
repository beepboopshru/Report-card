#define SOUND_PIN A0    // Sound sensor on A0
#define BUZZER_PIN 5    // Buzzer on D5

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  int soundValue = analogRead(SOUND_PIN);
  // Read sound (0â€“1023)
  Serial.print("Sound value: ");
  Serial.println(soundValue);
  // If sound is loud, turn buzzer ON
  if (soundValue > 500) {
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
  }
  delay(100);
}
