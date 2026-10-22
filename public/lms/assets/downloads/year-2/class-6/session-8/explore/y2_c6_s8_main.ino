#define TOUCH_PIN 2     // Touch sensor connected to D2
#define BUTTON_PIN 5    // Push button connected to D5
#define LED_PIN 6       // 1W LED connected to D6

bool ledState = false;
// Stores LED state

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  // Button connected to GND when pressed
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  // LED initially OFF
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  int buttonState = digitalRead(BUTTON_PIN);
  // If touch sensor is touched, turn LED ON
  if (touchState == HIGH) {
    ledState = true;
  }
  // If push button is pressed, turn LED OFF
  if (buttonState == LOW) {
    // because INPUT_PULLUP is used
    ledState = false;
  }
  // Update LED output
  digitalWrite(LED_PIN, ledState ? HIGH : LOW);
}
