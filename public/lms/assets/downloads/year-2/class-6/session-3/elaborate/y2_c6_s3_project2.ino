//Session 3 Grade 6
// Bike Stand
// Stand open = LED OFF
// Stand released = LED ON
const int tiltSensor = 2;
const int led = 6;
const int STAND_OPEN = HIGH;
// change to LOW if opposite

void setup() {
  pinMode(tiltSensor, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(tiltSensor) == STAND_OPEN) {
    digitalWrite(led, LOW);
  } else {
    digitalWrite(led, HIGH);
  }
}
