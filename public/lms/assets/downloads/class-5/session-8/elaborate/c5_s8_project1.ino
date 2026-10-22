/*
ScienceUtsav Arduino Code
Digital LDR + Push Switch OFF control
*/ const int ldrSensor = 2;
const int switchPin = 5;
const int led1 = 6;
const int led2 = 7;
const int DARK_STATE = HIGH;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
}

void loop() {
  bool darkDetected = digitalRead(ldrSensor) == DARK_STATE;
  bool switchPressed = digitalRead(switchPin) == LOW;
  if (switchPressed) {
    // Switch pressed means LEDs OFF
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
  } else {
    // LEDs ON only when dark
    digitalWrite(led1, darkDetected ? HIGH : LOW);
    digitalWrite(led2, darkDetected ? HIGH : LOW);
  }
}
