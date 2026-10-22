#define TOUCH_PIN 2   // Touch sensor connected to D2
#define LED_LOW 6     // LED for LOW state
#define LED_HIGH 7    // LED for HIGH state
#define BUZZER_PIN 5  // Buzzer on D5

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  pinMode(LED_LOW, OUTPUT);
  pinMode(LED_HIGH, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(LED_LOW, LOW);
  digitalWrite(LED_HIGH, LOW);
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  int touchState = digitalRead(TOUCH_PIN);
  if (touchState == HIGH) {
    // Touch detected
    digitalWrite(LED_HIGH, HIGH);
    digitalWrite(LED_LOW, LOW);
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON
  } else {
    // No touch
    digitalWrite(LED_HIGH, LOW);
    digitalWrite(LED_LOW, HIGH);
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
  }
}
