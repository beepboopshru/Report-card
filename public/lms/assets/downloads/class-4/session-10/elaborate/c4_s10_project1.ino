/*
ScienceUtsav Arduino Code
Touch Controlled Motor Speed
Touch Sensor = D2
DC Motor PWM Pin = D5
*/ const int touchSensor = 2;
const int dcMotor = 5;
int speedLevel = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dcMotor, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool touchState = digitalRead(touchSensor);
  // Detect one touch at a time
  if (touchState == HIGH && lastTouchState == LOW) {
    speedLevel++;
    if (speedLevel > 3) {
      speedLevel = 0;
    }
    delay(300);
  }
  lastTouchState = touchState;
  if (speedLevel == 0) {
    analogWrite(dcMotor, 0);
    // Motor OFF
    Serial.println("Motor OFF");
  }
  if (speedLevel == 1) {
    analogWrite(dcMotor, 27);
    // Slow speed
    Serial.println("Slow Speed");
  }
  if (speedLevel == 2) {
    analogWrite(dcMotor, 30);
    // Medium speed
    Serial.println("Medium Speed");
  }
  if (speedLevel == 3) {
    analogWrite(dcMotor, 33);
    // High speed
    Serial.println("High Speed");
  }
}
