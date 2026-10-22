/*
Simple Arduino Code
Pin logic based on updated component list and custom switch PCB logic.
*/ const int toggleSwitch = 5;

void setup() {
  pinMode(toggleSwitch, OUTPUT);
}

void loop() {
  digitalWrite(toggleSwitch, HIGH);
}
