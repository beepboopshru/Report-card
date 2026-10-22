// Session 4 Grade 8
// Seatbelt / Headlight
// Magnet detected = car headlight ON
// RGB LED project: D12 is always HIGH
// Magnetic sensor used as DIGITAL sensor on A0
const int magneticSensor = A0;
const int redPin = 10;
const int greenPin = 11;
const int alwaysHighPin = 12;
const int MAGNET_DETECTED = LOW;
// change to HIGH if opposite

void setup() {
  pinMode(magneticSensor, INPUT);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(alwaysHighPin, OUTPUT);
  digitalWrite(alwaysHighPin, HIGH);
  // D12 always HIGH
}

void loop() {
  digitalWrite(alwaysHighPin, HIGH);
  // keep D12 always HIGH
  if (digitalRead(magneticSensor) == MAGNET_DETECTED) {
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, HIGH);
  } else {
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, LOW);
  }
}
