const int touchSensor = 2;
const int stringLed = 5;
const int dipLed = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(stringLed, OUTPUT);
  pinMode(dipLed, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(stringLed, HIGH);
    digitalWrite(dipLed, HIGH);
  } else {
    digitalWrite(stringLed, LOW);
    digitalWrite(dipLed, LOW);
  }
}
