#define SOUND_PIN A3 // Analog output pin from sound sensor
#define LED_PIN1 5   // LED1 connected to D5
#define LED_PIN2 6   // LED2 connected to D6

void setup() {
  Serial.begin(9600);
  // Start the Serial Monitor
  pinMode(LED_PIN1, OUTPUT);
  pinMode(LED_PIN2, OUTPUT);
}

void loop() {
  int soundValue = analogRead(SOUND_PIN);
  // Read the sound sensor value (0-1023)
  Serial.print("Sound value: ");
  Serial.println(soundValue);
  // Print the sound value
  int brightness = map(soundValue, 0, 1023, 0, 255);
  // Map to PWM range
  analogWrite(LED_PIN1, brightness);
  // Control LED1 brightness
  analogWrite(LED_PIN2, brightness);
  // Control LED2 brightness
  delay(100);
  // Small delay to smooth the readings
}
