#define IR_PIN 2  // IR sensor connected to D2
#define BUZZ_PIN 5 // Buzzer connected to D5
#define LED_PIN 6 // LED connected to D6 (works opposite to buzzer)

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(BUZZ_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(BUZZ_PIN, LOW);
  digitalWrite(LED_PIN, LOW);
}

void loop() {
  int IRState = digitalRead(IR_PIN);
  if (IRState == LOW) {
    digitalWrite(BUZZ_PIN, HIGH);
    // Turn buzzer ON
    digitalWrite(LED_PIN, LOW);
    // LED OFF (opposite behavior)
  } else {
    digitalWrite(BUZZ_PIN, LOW);
    // Turn buzzer OFF
    digitalWrite(LED_PIN, HIGH);
    // LED ON (opposite behavior)
  }
}
