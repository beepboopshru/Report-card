#define IR_PIN   2    // IR sensor connected to D2
#define LED1_PIN 3    // LED1 on D3
#define LED2_PIN 4    // LED2 on D4

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  digitalWrite(LED1_PIN, LOW);
  digitalWrite(LED2_PIN, LOW);
}

void loop() {
  int IRState = digitalRead(IR_PIN);
  if (IRState == LOW) {
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
