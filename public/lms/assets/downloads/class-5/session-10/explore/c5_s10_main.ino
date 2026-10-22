const int buttonPin = 2;
const int motorPin = 5;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(motorPin, OUTPUT);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    digitalWrite(motorPin, HIGH);
  } else {
    digitalWrite(motorPin, LOW);
  }
}
