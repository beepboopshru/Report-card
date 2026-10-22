#define HALL_PIN 2   // Hall sensor output pin
#define BUZZ1_PIN 6  // Buzzer 1
#define BUZZ2_PIN 5  // Buzzer 2

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
    // Buzzer1 ON
    digitalWrite(BUZZ2_PIN, HIGH);
    // Buzzer2 ON
  } else {
    digitalWrite(BUZZ1_PIN, LOW);
    // Buzzer1 OFF
    digitalWrite(BUZZ2_PIN, LOW);
    // Buzzer2 OFF
  }
}
