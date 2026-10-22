const int led1 = 4;
const int led2 = 6;
const int led3 = 7;

void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
}

void loop() {
  digitalWrite(led1, HIGH);
  digitalWrite(led2, HIGH);
  digitalWrite(led3, HIGH);
  delay(500);
  digitalWrite(led1, LOW);
  delay(300);
  digitalWrite(led2, LOW);
  delay(300);
  digitalWrite(led3, LOW);
  delay(500);
}
