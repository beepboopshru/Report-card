#define LDR_PIN 2 // LDR sensor connected to D2
#define LED_PIN1 6 // LED connected to D6
#define LED_PIN2 7 // LED connected to D7 (works opposite to D6)

void setup() {
  pinMode(LDR_PIN, INPUT);
  pinMode(LED_PIN1, OUTPUT);
  pinMode(LED_PIN2, OUTPUT);
  digitalWrite(LED_PIN1, LOW);
  digitalWrite(LED_PIN2, LOW);
}

void loop() {
  int ldrstate = digitalRead(LDR_PIN);
  if (ldrstate == HIGH) {
    digitalWrite(LED_PIN1, HIGH);
    // Turn LED at D6 ON
    digitalWrite(LED_PIN2, LOW);
    // Turn LED at D7 OFF (opposite behavior)
  } else {
    digitalWrite(LED_PIN1, LOW);
    // Turn LED at D6 OFF
    digitalWrite(LED_PIN2, HIGH);
    // Turn LED at D7 ON (opposite behavior)
  }
}
