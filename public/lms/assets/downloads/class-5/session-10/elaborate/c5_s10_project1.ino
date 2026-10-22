/*
ScienceUtsav Arduino Code
Touch Controlled Motor Speed with Continuous Cartoon Sound
Project: Tom & Jerry Tom Leg Movement Illusion
Touch Sensor = D2
DC Motor PWM Pin = D5
Buzzer = D6
*/ const int touchSensor = 2;
const int dcMotor = 5;
const int buzzer = 6;
int speedLevel = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dcMotor, OUTPUT);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool touchState = digitalRead(touchSensor);
  // Detect one touch at a time
  if (touchState == HIGH && lastTouchState == LOW) {
    speedLevel++;
    if (speedLevel > 4) {
      speedLevel = 0;
    }
    delay(300);
  }
  lastTouchState = touchState;
  // Speed Level 0: Motor OFF
  if (speedLevel == 0) {
    analogWrite(dcMotor, 0);
    noTone(buzzer);
    Serial.println("Motor OFF");
  }
  // Speed Level 1: Slow motor + slow cartoon sound
  if (speedLevel == 1) {
    analogWrite(dcMotor, 28);
    tone(buzzer, 700);
    delay(120);
    tone(buzzer, 900);
    delay(120);
    Serial.println("Slow Speed");
  }
  // Speed Level 2: Medium motor + medium cartoon sound
  if (speedLevel == 2) {
    analogWrite(dcMotor, 30);
    tone(buzzer, 800);
    delay(90);
    tone(buzzer, 1100);
    delay(90);
    Serial.println("Medium Speed");
  }
  // Speed Level 3: Fast motor + fast cartoon sound
  if (speedLevel == 3) {
    analogWrite(dcMotor, 33);
    tone(buzzer, 900);
    delay(60);
    tone(buzzer, 1300);
    delay(60);
    Serial.println("High Speed");
  }
  // Speed Level 4: Full speed + very fast cartoon sound
  if (speedLevel == 4) {
    analogWrite(dcMotor, 35);
    tone(buzzer, 1000);
    delay(40);
    tone(buzzer, 1400);
    delay(40);
    tone(buzzer, 1800);
    delay(40);
    Serial.println("Full Speed");
  }
}
