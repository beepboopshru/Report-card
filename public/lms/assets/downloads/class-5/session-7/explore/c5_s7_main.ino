const int touchSensor = 2;
const int led = 5;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(led, HIGH);
    // LED ON
  } else {
    digitalWrite(led, LOW);
    // LED OFF
  }
}
