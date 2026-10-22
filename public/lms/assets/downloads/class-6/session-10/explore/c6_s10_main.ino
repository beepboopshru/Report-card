const int potPin = A0;
const int motorPin1 = 5;
const int motorPin2 = 6;

void setup() {
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
}

void loop() {
  int value = analogRead(potPin);
  if (value < 512) {
    analogWrite(motorPin1, map(value, 0, 511, 0, 255));
    digitalWrite(motorPin2, LOW);
  } else {
    digitalWrite(motorPin1, LOW);
    analogWrite(motorPin2, map(value, 512, 1023, 0, 255));
  }
}
