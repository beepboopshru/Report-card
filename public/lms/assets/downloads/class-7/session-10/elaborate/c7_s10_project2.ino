/*
ScienceUtsav Arduino Code - Session 6 to 10
Corrected for 3-pin DIGITAL LDR module.
LDR uses digitalRead(), not analogRead().
*/ const int touchSensor = 2;
const int dcMotor1 = 5;
const int dcMotor2 = 6;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dcMotor1, OUTPUT);
  pinMode(dcMotor2, OUTPUT);
}

void loop() {
  if (digitalRead(touchSensor) == HIGH) {
    digitalWrite(dcMotor1, HIGH);
    digitalWrite(dcMotor2, HIGH);
  } else {
    digitalWrite(dcMotor1, LOW);
    digitalWrite(dcMotor2, LOW);
  }
}
