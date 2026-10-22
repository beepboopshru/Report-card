const int magneticSensor = A0;
const int motor = 5;
const int MAGNET_DETECTED = LOW;
// change
to HIGH if opposite void setup() {
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
