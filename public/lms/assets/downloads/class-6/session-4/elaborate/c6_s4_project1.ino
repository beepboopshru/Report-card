/*
Simple Arduino Code
Pin logic based on updated component list
and custom switch PCB logic.
*/ const int twoWaySwitch = 5;

void setup() {
  pinMode(twoWaySwitch, OUTPUT);
}

void loop() {
  digitalWrite(twoWaySwitch, HIGH);
}
