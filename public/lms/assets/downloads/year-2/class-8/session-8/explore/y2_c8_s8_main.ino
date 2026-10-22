// Touch Sensor with Two LEDs
// D6 LED lights when sensor output is LOW
// D7 LED lights when sensor output is HIGH
#define TOUCH_PIN 2 // Touch sensor connected to D2
#define LED_LOW 6  // LED for LOW state on D6
#define LED_HIGH 7  // LED for HIGH state on D7

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  // Touch sensor input
  pinMode(LED_LOW, OUTPUT);
  // LED for LOW state
  pinMode(LED_HIGH, OUTPUT);
  // LED for HIGH state
  digitalWrite(LED_LOW, LOW);
  digitalWrite(LED_HIGH, LOW);
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  if (touchState == HIGH) {
    // Touch detected â†’ turn ON LED_HIGH, OFF LED_LOW
    digitalWrite(LED_HIGH, HIGH);
    digitalWrite(LED_LOW, LOW);
  } else {
    // No touch â†’ turn ON LED_LOW, OFF LED_HIGH
    digitalWrite(LED_HIGH, LOW);
    digitalWrite(LED_LOW, HIGH);
  }
}
