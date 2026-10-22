#define TOUCH_PIN 2   // Touch sensor on D2
#define LED1_PIN 6    // LED1 on D6
#define LED2_PIN 5    // LED2 on D5
#define LED3_PIN 3    // LED3 on D3

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  pinMode(LED3_PIN, OUTPUT);
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  if (touchState == HIGH) {
    // Fade all LEDs together
    for (int brightness = 0; brightness <= 255; brightness++) {
      analogWrite(LED1_PIN, brightness);
      analogWrite(LED2_PIN, brightness);
      analogWrite(LED3_PIN, brightness);
      delay(5);
    }
  } else {
    // Turn all OFF
    analogWrite(LED1_PIN, 0);
    analogWrite(LED2_PIN, 0);
    analogWrite(LED3_PIN, 0);
  }
}
