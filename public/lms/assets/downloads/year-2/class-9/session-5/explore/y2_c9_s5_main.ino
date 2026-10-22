#define IR_PIN 2     // IR sensor on D2
#define LED1 3       // LED1
#define LED2 4       // LED2
#define LED3 5       // LED3
#define LED4 6       // LED4

int count = 0;
int lastIRState = HIGH;

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  pinMode(LED4, OUTPUT);
  // All OFF initially
  digitalWrite(LED1, LOW);
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, LOW);
  digitalWrite(LED4, LOW);
}

void loop() {
  int irState = digitalRead(IR_PIN);
  // Detect object (LOW = detected)
  if (irState == LOW && lastIRState == HIGH) {
    count++;
    // Control LEDs based on count
    if (count == 1) {
      digitalWrite(LED1, HIGH);
    } else if (count == 2) {
      digitalWrite(LED2, HIGH);
    } else if (count == 3) {
      digitalWrite(LED3, HIGH);
    } else if (count == 4) {
      digitalWrite(LED4, HIGH);
    } else {
      // Reset everything
      digitalWrite(LED1, LOW);
      digitalWrite(LED2, LOW);
      digitalWrite(LED3, LOW);
      digitalWrite(LED4, LOW);
      count = 0;
    }
    delay(200);
    // debounce
  }
  lastIRState = irState;
}
