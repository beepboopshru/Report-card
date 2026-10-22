#define IR_PIN 2          // IR sensor connected to D2
#define LED_DETECTED 5    // LED for detection
#define LED_IDLE 6        // LED for idle state
#define LED_EXTRA 7       // Extra LED (same as detected)

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED_DETECTED, OUTPUT);
  pinMode(LED_IDLE, OUTPUT);
  pinMode(LED_EXTRA, OUTPUT);
  // Initial state
  digitalWrite(LED_DETECTED, LOW);
  digitalWrite(LED_IDLE, HIGH);
  digitalWrite(LED_EXTRA, LOW);
}

void loop() {
  int irState = digitalRead(IR_PIN);
  bool detected = (irState == LOW);
  if (detected) {
    digitalWrite(LED_DETECTED, HIGH);
    // Detected LED ON
    digitalWrite(LED_EXTRA, HIGH);
    // Extra LED ON
    digitalWrite(LED_IDLE, LOW);
    // Idle LED OFF
  } else {
    digitalWrite(LED_DETECTED, LOW);
    // Detected LED OFF
    digitalWrite(LED_EXTRA, LOW);
    // Extra LED OFF
    digitalWrite(LED_IDLE, HIGH);
    // Idle LED ON
  }
}
