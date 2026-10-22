// Session 1 Grade 8
// Lamp - LDR Auto Yellow LED
const int ldrPin = A0;
const int yellowLED = 6;
int darkValue = 500;
// adjust after testing

void setup() {
  pinMode(yellowLED, OUTPUT);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  if (ldrValue > darkValue) {
    digitalWrite(yellowLED, HIGH);
  } else {
    digitalWrite(yellowLED, LOW);
  }
}
