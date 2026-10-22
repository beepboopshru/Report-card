const int ledPin = 5;
const int buzzerPin = 7;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, 60);
  tone(buzzerPin, 250);
  delay(500);
  analogWrite(ledPin, 150);
  tone(buzzerPin, 500);
  delay(500);
  analogWrite(ledPin, 255);
  tone(buzzerPin, 800);
  delay(500);
  noTone(buzzerPin);
  delay(300);
}
