// Session 4 Grade 7
// Washing Machine
// Plug with magnet near socket sensor = motor
rotates // Magnetic sensor used as DIGITAL sensor on A0
const int magneticSensor = A0;
const int motor = 5;
const int MAGNET_DETECTED = LOW;
// change to
HIGH if opposite void setup() {
  pinMode(magneticSensor, INPUT);
  pinMode(motor, OUTPUT);
}

void loop() {
  if (digitalRead(magneticSensor) == MAGNET_DETECTED) {
    digitalWrite(motor, HIGH);
  } else {
    digitalWrite(motor, LOW);
  }
}
