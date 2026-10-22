#define SOUND_PIN A3 // Analog output pin from sound sensor
#define LED_PIN 5   // LED connected to D5

void setup() {
  Serial.begin(9600);
  // Start the Serial Monitor
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int soundValue = analogRead(SOUND_PIN);
  // Read the sound sensor value (0-1023)
  Serial.print("Sound value: ");
  Serial.println(soundValue);
  // Print the sound value
  int brightness = map(soundValue, 0, 1023, 0, 255);
  // Map to PWM range
  analogWrite(LED_PIN, brightness);
  // Adjust LED brightness
  delay(100);
  // Small delay to smooth the readings
}
