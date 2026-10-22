/*
ScienceUtsav Arduino Code - Touch to Change Pattern
Touch Sensor = D2
String LED = D5
*/ const int touchSensor = 2;
const int stringLed = 5;
int pattern = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(stringLed, OUTPUT);
}

void loop() {
  bool touchState = digitalRead(touchSensor);
  // Change pattern on every new touch
  if (touchState == HIGH && lastTouchState == LOW) {
    pattern++;
    if (pattern > 3) {
      pattern = 0;
    }
    delay(300);
  }
  lastTouchState = touchState;
  // Pattern 0: LED OFF
  if (pattern == 0) {
    analogWrite(stringLed, 0);
  }
  // Pattern 1: Fade in and fade out
  if (pattern == 1) {
    for (int brightness = 0; brightness <= 255; brightness += 5) {
      analogWrite(stringLed, brightness);
      delay(20);
    }
    for (int brightness = 255; brightness >= 0; brightness -= 5) {
      analogWrite(stringLed, brightness);
      delay(20);
    }
  }
  // Pattern 2: Slow blinking
  if (pattern == 2) {
    analogWrite(stringLed, 255);
    delay(500);
    analogWrite(stringLed, 0);
    delay(500);
  }
  // Pattern 3: Fast blinking
  if (pattern == 3) {
    analogWrite(stringLed, 255);
    delay(100);
    analogWrite(stringLed, 0);
    delay(100);
  }
}
