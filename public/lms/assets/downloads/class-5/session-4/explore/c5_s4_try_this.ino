const int redPin = 5;
const int greenPin = 6;
const int bluePin = 7;

void setup() {
}

void loop() {
  analogWrite(redPin, 255);
  analogWrite(greenPin, 80);
  digitalWrite(bluePin, LOW);
  delay(800);
  analogWrite(redPin, 40);
  analogWrite(greenPin, 255);
  digitalWrite(bluePin, LOW);
  delay(800);
  analogWrite(redPin, 0);
  analogWrite(greenPin, 120);
  digitalWrite(bluePin, HIGH);
  delay(800);
}
