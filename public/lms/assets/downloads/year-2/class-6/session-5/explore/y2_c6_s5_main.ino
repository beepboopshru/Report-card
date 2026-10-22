#define IR_PIN 2  // IR sensor connected to D2
#define LED_PIN 6  // LED connected to D3

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
}

void loop() {
  int IRState = digitalRead(IR_PIN);
  if (IRState == LOW) {
    digitalWrite(LED_PIN, HIGH);
    // Turn LED ON
  } else {
    digitalWrite(LED_PIN, LOW);
    // Turn LED OFF
  }
}
