#define LASER_PIN 2   // Laser diode on D2
#define LDR_PIN 3     // LDR sensor on D3
#define IR_PIN 4      // IR sensor on D4
#define LED1_PIN 5    // LED1 on D5
#define LED2_PIN 6    // LED2 on D6

void setup() {
  pinMode(LASER_PIN, OUTPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(IR_PIN, INPUT);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  digitalWrite(LASER_PIN, HIGH);
  // Laser ON
  digitalWrite(LED1_PIN, LOW);
  digitalWrite(LED2_PIN, LOW);
}

void loop() {
  int ldrState = digitalRead(LDR_PIN);
  int irState = digitalRead(IR_PIN);
  // IR usually LOW when object detected
  bool irDetected = (irState == LOW);
  bool beamBroken = (ldrState == LOW);
  if (beamBroken || irDetected) {
    // Alarm condition
    digitalWrite(LED1_PIN, HIGH);
    digitalWrite(LED2_PIN, HIGH);
  } else {
    // Normal condition
    digitalWrite(LED1_PIN, LOW);
    digitalWrite(LED2_PIN, LOW);
  }
}
