const int switch1 = 2;
const int switch2 = 3;
const int ledPin = 5;

void setup() {
  pinMode(switch1, INPUT_PULLUP);
  pinMode(switch2, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  bool active = digitalRead(switch1) == LOW || digitalRead(switch2) == LOW;
  digitalWrite(ledPin, active ? HIGH : LOW);
}

// Try changing one pin, delay, or threshold and test again.
