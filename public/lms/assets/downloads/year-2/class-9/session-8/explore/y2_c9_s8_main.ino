#define TOUCH_PIN 2   // Touch sensor on D2
#define LED1 3        // LED1
#define LED2 4        // LED2
#define LED3 5        // LED3
#define LED4 6        // LED4

int count = 0;
// Store number of touches
int lastTouchState = LOW;
// Store previous touch state

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  pinMode(LED4, OUTPUT);
  // All LEDs OFF initially
  digitalWrite(LED1, LOW);
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, LOW);
  digitalWrite(LED4, LOW);
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  // Detect new touch (LOW â†’ HIGH)
  if (touchState == HIGH && lastTouchState == LOW) {
    count++;
    // Increase touch count
    if (count == 1) {
      digitalWrite(LED1, HIGH);
      // Turn ON LED1
    } else if (count == 2) {
      digitalWrite(LED2, HIGH);
      // Turn ON LED2
    } else if (count == 3) {
      digitalWrite(LED3, HIGH);
      // Turn ON LED3
    } else if (count == 4) {
      digitalWrite(LED4, HIGH);
      // Turn ON LED4
    } else {
      // Reset all LEDs
      digitalWrite(LED1, LOW);
      digitalWrite(LED2, LOW);
      digitalWrite(LED3, LOW);
      digitalWrite(LED4, LOW);
      count = 0;
      // Reset count
    }
    delay(200);
    // Debounce
  }
  lastTouchState = touchState;
  // Store current state
}
