void setup() {
  pinMode(5, OUTPUT); // redled
  pinMode(6, OUTPUT); // blue led
}

void loop() {
  digitalWrite(5, HIGH);
  digitalWrite(6, LOW);
  delay(200);
  digitalWrite(5, LOW);
  digitalWrite(6, HIGH);
  delay(200);
}
