#define HALL_PIN 2    // Hall sensor output pin
#define BUZZ1_PIN 6   // Buzzer 1
#define BUZZ2_PIN 7   // Buzzer 2

void setup() {
  pinMode(HALL_PIN, INPUT);
  pinMode(BUZZ1_PIN, OUTPUT);
  pinMode(BUZZ2_PIN, OUTPUT);
  digitalWrite(BUZZ1_PIN, LOW);
  digitalWrite(BUZZ2_PIN, LOW);
}

void loop() {
  int hallState = digitalRead(HALL_PIN);
  if (hallState == LOW) {
    // Magnet detected
    digitalWrite(BUZZ1_PIN, HIGH);
    // Buzzer 1 ON
    digitalWrite(BUZZ2_PIN, HIGH);
    // Buzzer 2 ON
  } else {
    digitalWrite(BUZZ1_PIN, LOW);
    // Buzzer 1 OFF
    digitalWrite(BUZZ2_PIN, LOW);
    // Buzzer 2 OFF
  }
}
