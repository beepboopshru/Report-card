#define LDR_PIN 2     // LDR sensor on D2
#define BUZZ1_PIN 6   // Buzzer 1 on D6
#define BUZZ2_PIN 7   // Buzzer 2 on D7 (opposite)

void setup() {
  pinMode(LDR_PIN, INPUT);
  pinMode(BUZZ1_PIN, OUTPUT);
  pinMode(BUZZ2_PIN, OUTPUT);
  digitalWrite(BUZZ1_PIN, LOW);
  digitalWrite(BUZZ2_PIN, LOW);
}

void loop() {
  int ldrstate = digitalRead(LDR_PIN);
  if (ldrstate == HIGH) {
    digitalWrite(BUZZ1_PIN, HIGH);
    // Buzzer1 ON
    digitalWrite(BUZZ2_PIN, LOW);
    // Buzzer2 OFF
  } else {
    digitalWrite(BUZZ1_PIN, LOW);
    // Buzzer1 OFF
    digitalWrite(BUZZ2_PIN, HIGH);
    // Buzzer2 ON
  }
}
