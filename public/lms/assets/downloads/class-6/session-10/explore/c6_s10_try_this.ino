const int potPin = A0;
const int motorPin = 5;

void setup() {
  pinMode(motorPin, OUTPUT);
}

void loop() {
  int value = analogRead(potPin);
  if (value < 341) {
    analogWrite(motorPin, 80);
  } else if (value < 682) {
    analogWrite(motorPin, 160);
  } else {
    analogWrite(motorPin, 255);
  }
}
