// Session 2 Grade 9
// Sound Level Meter
// For RGB LED project, D12 is always HIGH
const int soundSensor = A0;
const int redLED = 10;
const int yellowLED = 11;
const int alwaysHighPin = 12;

void setup() {
  pinMode(redLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
  pinMode(alwaysHighPin, OUTPUT);
  digitalWrite(alwaysHighPin, HIGH);
  // D12 always HIGH
}

void loop() {
  int soundValue = analogRead(soundSensor);
  digitalWrite(alwaysHighPin, HIGH);
  // keep D12 always HIGH
  if (soundValue < 450) {
    digitalWrite(redLED, LOW);
    digitalWrite(yellowLED, LOW);
  } else if (soundValue < 700) {
    digitalWrite(redLED, LOW);
    digitalWrite(yellowLED, HIGH);
  } else {
    digitalWrite(redLED, HIGH);
    digitalWrite(yellowLED, HIGH);
  }
  delay(100);
}
