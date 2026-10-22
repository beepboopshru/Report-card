/*
Simple Arduino Code
Pin logic based on updated component list and custom
switch PCB logic.
*/ const int potSensor = A0;
const int oneWLed = 5;

void setup() {
  pinMode(oneWLed, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int potValue = analogRead(potSensor);
  int brightness = map(potValue, 0, 1023, 0, 255);
  analogWrite(oneWLed, brightness);
  Serial.println(potValue);
  delay(50);
}
