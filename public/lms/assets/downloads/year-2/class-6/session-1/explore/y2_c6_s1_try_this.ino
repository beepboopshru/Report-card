#define LDR_PIN 2   // LDR sensor connected to D2
#define LED1_PIN 3  // First LED connected to D3
#define LED2_PIN 4  // Second LED connected to D4

void setup() {
  pinMode(LDR_PIN, INPUT);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  digitalWrite(LED1_PIN, LOW);
  digitalWrite(LED2_PIN, LOW);
}

void loop() {
  int ldrstate = digitalRead(LDR_PIN);
  if (ldrstate == HIGH) {
    digitalWrite(LED1_PIN, HIGH);
    // LED1 ON
    digitalWrite(LED2_PIN, HIGH);
    // LED2 ON
  } else {
    digitalWrite(LED1_PIN, LOW);
    // LED1 OFF
    digitalWrite(LED2_PIN, LOW);
    // LED2 OFF
  }
}
