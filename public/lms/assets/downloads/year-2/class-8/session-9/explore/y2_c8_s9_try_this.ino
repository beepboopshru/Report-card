#define LASER_PIN 2   // Laser diode on D2
#define LDR_PIN 3     // LDR sensor on D3
#define LED1_PIN 5    // LED1 on D5
#define LED2_PIN 6    // LED2 on D6

void setup() {
  pinMode(LASER_PIN, OUTPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  digitalWrite(LASER_PIN, HIGH);
  // Laser ON
  digitalWrite(LED1_PIN, LOW);
  digitalWrite(LED2_PIN, LOW);
}

void loop() {
  int ldrState = digitalRead(LDR_PIN);
  if (ldrState == HIGH) {
    // Beam normal
    digitalWrite(LED1_PIN, LOW);
    digitalWrite(LED2_PIN, LOW);
  } else {
    // Beam broken
    digitalWrite(LED1_PIN, HIGH);
    digitalWrite(LED2_PIN, HIGH);
  }
}
