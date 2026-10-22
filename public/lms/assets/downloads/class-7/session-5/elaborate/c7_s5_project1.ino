/*
Simple Arduino Code
Pin logic based on updated component list and custom
switch PCB logic.
*/ const int potSensor = A0;
const int dcMotor = 5;

void setup() {
  pinMode(dcMotor, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int potValue = analogRead(potSensor);
  int motorSpeed = map(potValue, 0, 1023, 0, 255);
  analogWrite(dcMotor, motorSpeed);
  Serial.println(potValue);
  delay(50);
}
