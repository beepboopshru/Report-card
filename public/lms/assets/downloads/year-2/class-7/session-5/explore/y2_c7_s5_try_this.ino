#define IR_PIN 2     // IR sensor connected to D2
#define BUZZ1_PIN 5  // Buzzer 1 on D5
#define BUZZ2_PIN 4  // Buzzer 2 on D4
#define LED_PIN 6    // LED on D6 (opposite behavior)

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(BUZZ1_PIN, OUTPUT);
  pinMode(BUZZ2_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(BUZZ1_PIN, LOW);
  digitalWrite(BUZZ2_PIN, LOW);
  digitalWrite(LED_PIN, LOW);
}

void loop() {
  int IRState = digitalRead(IR_PIN);
  if (IRState == LOW) {
    digitalWrite(BUZZ1_PIN, HIGH);
    // Buzzer 1 ON
    digitalWrite(BUZZ2_PIN, HIGH);
    // Buzzer 2 ON
    digitalWrite(LED_PIN, LOW);
    // LED OFF
  } else {
    digitalWrite(BUZZ1_PIN, LOW);
    // Buzzer 1 OFF
    digitalWrite(BUZZ2_PIN, LOW);
    // Buzzer 2 OFF
    digitalWrite(LED_PIN, HIGH);
    // LED ON
  }
}
