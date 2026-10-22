const int tiltPin = 2;
const int redLED = 7;
const int greenLED = 6;

void setup() {
  pinMode(tiltPin, INPUT_PULLUP);
  pinMode(redLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
}

void loop() {
  if (digitalRead(tiltPin) == LOW) {
    // Sensor in one position (e.g., Horizontal)
    digitalWrite(redLED, HIGH);
    digitalWrite(greenLED, LOW);
  } else {
    // Sensor in the other position (e.g., Tilted/Vertical)
    digitalWrite(redLED, LOW);
    digitalWrite(greenLED, HIGH);
  }
}
