/*
ScienceUtsav Arduino Code
Touch Sensor with 4 LED Patterns
Touch Sensor = D2
LEDs = D4, D5, D6, D7
*/ const int touchSensor = 2;
const int leds[] = {
  4,
  5,
  6,
  7
};
int touchCount = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  for (int i = 0; i < 4; i++) {
    pinMode(leds[i], OUTPUT);
  }
}

void allLeds(bool state) {
  for (int i = 0; i < 4; i++) {
    digitalWrite(leds[i], state);
  }
}

void loop() {
  bool touchState = digitalRead(touchSensor);
  if (touchState == HIGH && lastTouchState == LOW) {
    touchCount = (touchCount + 1) % 5;
    delay(300);
  }
  lastTouchState = touchState;
  switch (touchCount) {
    case 0: // All LEDs OFF
    allLeds(LOW);
    break;
    case 1: // All LEDs ON
    allLeds(HIGH);
    break;
    case 2: // One by one blinking
    for (int i = 0; i < 4; i++) {
      allLeds(LOW);
      digitalWrite(leds[i], HIGH);
      delay(200);
    }
    break;
    case 3: // Alternate LEDs
    digitalWrite(leds[0], HIGH);
    digitalWrite(leds[1], LOW);
    digitalWrite(leds[2], HIGH);
    digitalWrite(leds[3], LOW);
    delay(300);
    digitalWrite(leds[0], LOW);
    digitalWrite(leds[1], HIGH);
    digitalWrite(leds[2], LOW);
    digitalWrite(leds[3], HIGH);
    delay(300);
    break;
    case 4: // Fast blinking
    allLeds(HIGH);
    delay(150);
    allLeds(LOW);
    delay(150);
    break;
  }
}
