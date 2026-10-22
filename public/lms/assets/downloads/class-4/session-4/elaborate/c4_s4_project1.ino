/*
Simple Arduino Code
Pin logic based on updated component list and custom switch PCB logic.
*/ const int limitSwitch = 5;

void setup() {
  pinMode(limitSwitch, OUTPUT);
}

void loop() {
  digitalWrite(limitSwitch, HIGH);
}
