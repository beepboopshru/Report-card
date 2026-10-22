// Session 1 Grade 7
// Iron Man / Lamp - LDR Auto 1W LED
const int ldrPin = A0;
const int led = 6;
int darkValue = 500;
// adjust after testing

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  if (ldrValue > darkValue) {
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(led, LOW);
  }
}
