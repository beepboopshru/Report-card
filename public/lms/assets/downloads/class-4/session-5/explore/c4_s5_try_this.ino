const int potPin = A0;
const int ledPin = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (analogRead(potPin) > 512) digitalWrite(ledPin, HIGH);
  else digitalWrite(ledPin, LOW);
}
