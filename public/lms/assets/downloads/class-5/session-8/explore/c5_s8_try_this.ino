const int ldrPin = A1;
const int led1 = 5;
const int led2 = 6;

void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  if (lightValue < 350) {
    digitalWrite(led1, HIGH);
    digitalWrite(led2, HIGH);
  } else if (lightValue < 600) {
    digitalWrite(led1, HIGH);
    digitalWrite(led2, LOW);
  } else {
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
  }
}
