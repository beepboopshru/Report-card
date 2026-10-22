// Session 1 Grade 6
// Sheep / Cow - LDR Auto String LED
const int ldrPin = A0;
const int stringLED = 5;
int darkValue = 500;
// adjust after testing

void setup() {
  pinMode(stringLED, OUTPUT);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  if (ldrValue > darkValue) {
    digitalWrite(stringLED, HIGH);
    // dark = LED ON
  } else {
    digitalWrite(stringLED, LOW);
    // bright = LED OFF
  }
}
