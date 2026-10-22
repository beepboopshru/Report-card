const int limitSwitch = 2;
const int motorPin = 5;
const int ledPin = 6;

void setup() {
  pinMode(limitSwitch, INPUT_PULLUP);
  pinMode(motorPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(limitSwitch) == LOW) {
    digitalWrite(motorPin, LOW);
    digitalWrite(ledPin, HIGH);
    Serial.println("Safety stop active");
  } else {
    digitalWrite(motorPin, HIGH);
    digitalWrite(ledPin, LOW);
    Serial.println("Motor allowed to run");
  }
  delay(500);
}
