const int touchSensor = 3;
const int dipLed = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dipLed, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) digitalWrite(dipLed, HIGH);
  else digitalWrite(dipLed, LOW);
}
