const int redPin = 5;
const int greenPin = 6;

void setup() {
}

void loop() {
  for (int value = 0; value <= 255; value += 10) {
    analogWrite(redPin, value);
    analogWrite(greenPin, 255 - value);
    delay(40);
  }
  for (int value = 255; value >= 0; value -= 10) {
    analogWrite(redPin, value);
    analogWrite(greenPin, 255 - value);
    delay(40);
  }
}
