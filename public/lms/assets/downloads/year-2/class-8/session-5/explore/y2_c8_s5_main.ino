// IR LED Detector using two LEDs on D5 (detected) and D6 (idle)
// Board: Arduino UNO (or compatible)
#define IR_PIN 2     // IR sensor connected to D2
#define LED_DETECTED 5  // LED that turns ON when something is detected
#define LED_IDLE 6    // LED that stays ON when nothing is detected

void setup() {
  pinMode(IR_PIN, INPUT);
  // Use INPUT for modules with onboard comparator
  pinMode(LED_DETECTED, OUTPUT);
  pinMode(LED_IDLE, OUTPUT);
  // Initial states: assume no detection
  digitalWrite(LED_DETECTED, LOW);
  digitalWrite(LED_IDLE, HIGH);
}

void loop() {
  int irState = digitalRead(IR_PIN);
  // Many IR obstacle sensors pull the output LOW when an object is detected.
  // If your module behaves opposite, swap HIGH/LOW in the condition below.
  bool detected = (irState == LOW);
  if (detected) {
    digitalWrite(LED_DETECTED, HIGH);
    // Turn ON D5 LED (detected)
    digitalWrite(LED_IDLE, LOW);
    // Turn OFF D6 LED
  } else {
    digitalWrite(LED_DETECTED, LOW);
    // Turn OFF D5 LED
    digitalWrite(LED_IDLE, HIGH);
    // Turn ON D6 LED (idle/clear)
  }
}
