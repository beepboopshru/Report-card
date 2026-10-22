const int touchPin = 2;
const int ldrPin = A1;
const int ledPin = 5;
const int buzzerPin = 7;

void setup() {
  pinMode(touchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  bool touch = digitalRead(touchPin) == LOW;
  int lightValue = analogRead(ldrPin);
  if (touch && lightValue < 400) {
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 800);
  } else {
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
  }
}
