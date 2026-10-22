const int dipLed1 = 4;
const int dipLed2 = 5;
const int dipLed3 = 6;
const int dipLed4 = 7;

void setup() {
  pinMode(dipLed1, OUTPUT);
  pinMode(dipLed2, OUTPUT);
  pinMode(dipLed3, OUTPUT);
  pinMode(dipLed4, OUTPUT);
}

void loop() {
  // All 4 LEDs ON together
  digitalWrite(dipLed1, HIGH);
  digitalWrite(dipLed2, HIGH);
  digitalWrite(dipLed3, HIGH);
  digitalWrite(dipLed4, HIGH);
  delay(500);
  // OFF one by one
  digitalWrite(dipLed1, LOW);
  delay(300);
  digitalWrite(dipLed2, LOW);
  delay(300);
  digitalWrite(dipLed3, LOW);
  delay(300);
  digitalWrite(dipLed4, LOW);
  delay(500);
}
