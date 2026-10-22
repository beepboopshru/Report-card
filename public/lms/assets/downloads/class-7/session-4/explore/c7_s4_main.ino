const int redPin = 5;
const int greenPin = 6;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
}

void loop() {
  for (int value = 0; value <= 255; value += 5) {
    analogWrite(redPin, value);
    analogWrite(greenPin, 255 - value);
    delay(30);
  }
}
