#define LDR_PIN 2  // LDR sensor connected to D2
#define LED_PIN 3  // LED connected to D3

void setup() {
  pinMode(LDR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
}

void loop() {
  int ldrstate = digitalRead(LDR_PIN);
  if (ldrstate == HIGH) {
    digitalWrite(LED_PIN, HIGH);
    // Turn LED ON
  } else {
    digitalWrite(LED_PIN, LOW);
    // Turn LED OFF
  }
}
