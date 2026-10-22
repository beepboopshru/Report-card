// Session 2 Grade 6
// Birthday Party / Cake
// Sound Sensor + LED Only
// Blow / sound detected = LED OFF, then reset ON
const int soundSensor = A0;
const int led = 6;
int soundLimit = 600;
// adjust after testing

void setup() {
  pinMode(led, OUTPUT);
  digitalWrite(led, HIGH);
  // candle LED ON initially
}

void loop() {
  int soundValue = analogRead(soundSensor);
  if (soundValue > soundLimit) {
    digitalWrite(led, LOW);
    // candle OFF
    delay(3000);
    // stay OFF for 3 seconds
    digitalWrite(led, HIGH);
    // reset candle ON
  }
}
