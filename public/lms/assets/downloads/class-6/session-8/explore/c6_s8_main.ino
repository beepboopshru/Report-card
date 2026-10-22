const int ldrPin = A1;
const int buzzerPin = 7;

void setup() {
}

void loop() {
  int lightValue = analogRead(ldrPin);
  if (lightValue < 300) {
    tone(buzzerPin, 1000);
  } else {
    noTone(buzzerPin);
  }
}
