const int buttonPin = 2;
const int motorPin = 5;
const int ledPin = 6;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(motorPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    digitalWrite(motorPin, HIGH);
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(motorPin, LOW);
    digitalWrite(ledPin, LOW);
  }
}
