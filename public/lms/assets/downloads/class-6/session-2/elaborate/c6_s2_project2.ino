const int buzzer1 = 6;
const int buzzer2 = 7;

void setup() {
  pinMode(buzzer1, OUTPUT);
  pinMode(buzzer2, OUTPUT);
}

void loop() {
  digitalWrite(buzzer1, HIGH);
  digitalWrite(buzzer2, HIGH);
  delay(200);
  digitalWrite(buzzer1, LOW);
  digitalWrite(buzzer2, LOW);
  delay(200);
}
