#define LASER_PIN 2   // Laser diode on D2
#define LDR_PIN 3     // LDR sensor on D3
#define IR_PIN 4      // IR sensor on D4
#define BUZZER_PIN 5  // Buzzer on D5

void setup() {
  pinMode(LASER_PIN, OUTPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(IR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(LASER_PIN, HIGH);
  // Laser ON
  digitalWrite(BUZZER_PIN, LOW);
  // Buzzer OFF
}

void loop() {
  int ldrState = digitalRead(LDR_PIN);
  int irState = digitalRead(IR_PIN);
  bool irDetected = (irState == LOW);
  // IR detection
  bool beamBroken = (ldrState == LOW);
  // Laser interruption
  if (beamBroken || irDetected) {
    digitalWrite(BUZZER_PIN, HIGH);
    // Alarm ON
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    // Alarm OFF
  }
}
