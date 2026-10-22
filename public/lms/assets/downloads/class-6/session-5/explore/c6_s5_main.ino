const int switch1 = 2;
const int switch2 = 3;
const int andLed = 5;
const int orLed = 6;

void setup() {
  pinMode(switch1, INPUT_PULLUP);
  pinMode(switch2, INPUT_PULLUP);
  pinMode(andLed, OUTPUT);
  pinMode(orLed, OUTPUT);
}

void loop() {
  bool a = digitalRead(switch1) == LOW;
  bool b = digitalRead(switch2) == LOW;
  digitalWrite(andLed, a && b);
  digitalWrite(orLed, a || b);
}
