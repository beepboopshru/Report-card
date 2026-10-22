const int touchPin = 2;
const int ldrPin = A1;
const int ledPin = 5;

void setup() {
  pinMode(touchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  bool touched = digitalRead(touchPin) == LOW;
  if (touched && lightValue < 500) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}
