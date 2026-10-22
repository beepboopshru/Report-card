// Session 4 Grade 7
// Magnetic Table Lamp
// Plug with magnet near socket sensor = LED ON
// Magnetic sensor used as DIGITAL sensor on A0
const int magneticSensor = A0;
const int led = 6;
const int MAGNET_DETECTED = LOW;
// change to HIGH if
opposite void setup() {
  pinMode(magneticSensor, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(magneticSensor) == MAGNET_DETECTED) {
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(led, LOW);
  }
}
