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
    digitalWrite(LED_PIN, LOW);
    // Beam normal â†’ LED OFF
  } else {
    digitalWrite(LED_PIN, HIGH);
    // Beam broken â†’ LED ON
  }
}
