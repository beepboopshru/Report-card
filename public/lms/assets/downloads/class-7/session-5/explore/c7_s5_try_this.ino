const int switch1 = 2;
const int switch2 = 3;
const int ledPin = 5;

void setup() {
  pinMode(switch1, INPUT_PULLUP);
  pinMode(switch2, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  bool firstState = digitalRead(switch1) == LOW;
  bool secondState = digitalRead(switch2) == LOW;
  if (firstState != secondState) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}
