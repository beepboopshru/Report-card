const int redPin = 5;
const int greenPin = 6;
const int bluePin = 7;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  analogWrite(redPin, 255);
  analogWrite(greenPin, 50);
  digitalWrite(bluePin, LOW);
  delay(1000);
  analogWrite(redPin, 100);
  analogWrite(greenPin, 255);
  digitalWrite(bluePin, LOW);
  delay(1000);
  analogWrite(redPin, 50);
  analogWrite(greenPin, 50);
  digitalWrite(bluePin, HIGH);
  delay(1000);
}
