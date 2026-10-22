#define TOUCH_PIN 2     // Touch sensor on D2
#define BUZZER_PIN 5    // Buzzer on D5

int count = 0;
// Store touch count
int lastTouchState = LOW;
// Store previous state

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
}

// Function to beep 'n' times

void beep(int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    // ON
    delay(200);
    digitalWrite(BUZZER_PIN, LOW);
    // OFF
    delay(200);
  }
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  // Detect touch (LOW â†’ HIGH)
  if (touchState == HIGH && lastTouchState == LOW) {
    count++;
    if (count >= 1 && count <= 4) {
      beep(count);
      // Beep based on count
    } else {
      count = 0;
      // Reset after 4
    }
    delay(200);
    // Debounce
  }
  lastTouchState = touchState;
}
