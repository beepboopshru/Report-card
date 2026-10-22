#define SOUND_PIN A0   // Analog output pin from sound sensor

void setup() {
  Serial.begin(9600);
  // Start the Serial Monitor
}

void loop() {
  int soundValue = analogRead(SOUND_PIN);
  // Read the sound sensor value (0-1023)
  Serial.print("Sound value: ");
  Serial.println(soundValue);
  // Print the sound value
  delay(100);
  // Small delay to smooth the readings
}
