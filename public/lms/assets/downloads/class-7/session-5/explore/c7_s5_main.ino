const int switch1 = 2;
const int switch2 = 3;
const int ledPin = 5;

void setup() {
  pinMode(switch1, INPUT_PULLUP);
  pinMode(switch2, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  bool a = digitalRead(switch1) == LOW;
  bool b = digitalRead(switch2) == LOW;
  digitalWrite(ledPin, a != b);
}
