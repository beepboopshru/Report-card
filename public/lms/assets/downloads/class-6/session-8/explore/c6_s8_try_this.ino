const int ldrPin = A1;
const int ledPin = 5;
const int buzzerPin = 7;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  if (lightValue < 300) {
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 1000);
  } else {
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
  }
}
