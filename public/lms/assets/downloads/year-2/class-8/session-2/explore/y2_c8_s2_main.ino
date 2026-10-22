#define SOUND_PIN A3  // Sound sensor on A3
#define LED1_PIN 5    // LED1 on D5
#define LED2_PIN 6    // LED2 on D6
#define LED3_PIN 3    // LED3 on D3

void setup() {
  Serial.begin(9600);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  pinMode(LED3_PIN, OUTPUT);
}

void loop() {
  int soundValue = analogRead(SOUND_PIN);
  Serial.print("Sound value: ");
  Serial.println(soundValue);
  int brightness = map(soundValue, 0, 1023, 0, 255);
  // Apply same brightness to all LEDs
  analogWrite(LED1_PIN, brightness);
  analogWrite(LED2_PIN, brightness);
  analogWrite(LED3_PIN, brightness);
  delay(100);
}
