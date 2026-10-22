/*
Simple Alarm Sound
Buzzer connected to pin 7
*/ const int buzzer = 7;

void setup() {
  pinMode(buzzer, OUTPUT);
}

void loop() {
  digitalWrite(buzzer, HIGH);
}
