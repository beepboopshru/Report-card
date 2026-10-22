#define SOUND_PIN A3   // Analog output pin from sound sensor
#define LED_PIN 6      // LED moved to D6 (PWM pin)
#define BUZZER_PIN 5   // Buzzer connected to D5

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  int soundValue = analogRead(SOUND_PIN);
  // Read sound (0â€“1023)
  Serial.print("Sound value: ");
  Serial.println(soundValue);
  int brightness = map(soundValue, 0, 1023, 0, 255);
  analogWrite(LED_PIN, brightness);
  // LED brightness based on sound
  // Buzzer logic (turn ON if sound is loud)
  if (soundValue > 500) {
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
  }
  delay(100);
}
