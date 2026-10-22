#define BUTTON_PIN 6
#define MOTOR_PIN 5

bool motorState = false;
bool lastButtonState = HIGH;
bool currentButtonState;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  // Button connected between D2 and GND
  pinMode(MOTOR_PIN, OUTPUT);
  digitalWrite(MOTOR_PIN, LOW);
  // Motor OFF initially
}

void loop() {
  currentButtonState = digitalRead(BUTTON_PIN);
  // Detect button press (HIGH -> LOW)
  if (lastButtonState == HIGH && currentButtonState == LOW) {
    motorState = !motorState;
    // Toggle motor state
    if (motorState) {
      digitalWrite(MOTOR_PIN, HIGH);
      // Motor ON
    } else {
      digitalWrite(MOTOR_PIN, LOW);
      // Motor OFF
    }
    delay(200);
    // Simple debounce
  }
  lastButtonState = currentButtonState;
}
