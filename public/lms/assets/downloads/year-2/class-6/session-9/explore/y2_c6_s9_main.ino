#define LASER_PIN 2   // Laser diode on D2
#define LDR_PIN 3     // LDR sensor on D3
#define LED_PIN 5     // LED on D5

void setup() {
  pinMode(LASER_PIN, OUTPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LASER_PIN, HIGH);
  // Laser ON
  digitalWrite(LED_PIN, LOW);
  // LED OFF initially
}

void loop() {
  int ldrState = digitalRead(LDR_PIN);
  if (ldrState == HIGH) {
    // Laser hitting LDR
    digitalWrite(LED_PIN, HIGH);
    // LED ON
  } else {
    // Laser NOT hitting LDR
    digitalWrite(LED_PIN, LOW);
    // LED OFF
  }
}
