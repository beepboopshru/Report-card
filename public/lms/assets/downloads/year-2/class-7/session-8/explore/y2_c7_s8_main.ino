#define TOUCH_PIN 2 // Touch sensor connected to D2
#define LED_PIN 6  // LED connected to D6

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  if (touchState == HIGH) {
    // When touch sensor is pressed
    for (int brightness = 0; brightness <= 255; brightness++) {
      analogWrite(LED_PIN, brightness);
      // Gradually increase LED brightness
      delay(5);
      // Smooth fade effect
    }
  } else {
    analogWrite(LED_PIN, 0);
    // Turn LED OFF when not touched
  }
}
