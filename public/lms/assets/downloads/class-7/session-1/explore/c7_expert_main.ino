/*
Simple Alarm Sound
Buzzer connected to pin 5
*/ const int buzzer = 5;

void setup() {
  pinMode(buzzer, OUTPUT);
}

void loop() {
  digitalWrite(buzzer, HIGH);
}
