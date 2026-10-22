const int ledPin = 5;
const int buzzerPin = 7;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, 80);
  tone(buzzerPin, 300);
  delay(700);
  analogWrite(ledPin, 180);
  tone(buzzerPin, 600);
  delay(700);
  analogWrite(ledPin, 255);
  tone(buzzerPin, 900);
  delay(700);
  noTone(buzzerPin);
}
