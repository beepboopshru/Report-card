// Session 3 Grade 9
// Auto Reverse Gear
// Push button = motor forward
// Tilt + push button = motor reverse
const int tiltSensor = 2;
const int motorPin1 = 5;
const int motorPin2 = 6;
const int pushButton = 7;
const int TILT_ACTIVE = HIGH;
// change to LOW if opposite

void setup() {
  pinMode(tiltSensor, INPUT);
  pinMode(pushButton, INPUT_PULLUP);
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
  stopMotor();
}
