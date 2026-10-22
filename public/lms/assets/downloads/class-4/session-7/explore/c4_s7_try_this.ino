const int touchSensor = 3;
const int dipLed1 = 6;
const int dipLed2 = 7;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dipLed1, OUTPUT);
  pinMode(dipLed2, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(dipLed1, HIGH);
    digitalWrite(dipLed2, HIGH);
  } else {
    digitalWrite(dipLed1, LOW);
    digitalWrite(dipLed2, LOW);
  }
}
