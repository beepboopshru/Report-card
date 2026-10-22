// Session 7 Grade 8 Project 1
// Elevator Floor System
// Touch selects target floor, push confirms travel
// Green LED = going up, Red LED = going down
#include <TM1637Display.h>

const int touchSensor = 2;
const int pushButton = 7;
const int redLED = 10;
const int greenLED = 11;
const int CLK = 9;
const int DIO = 8;
const int TOUCH_ACTIVE = HIGH;
// change to LOW if opposite
TM1637Display display(CLK, DIO);
int currentFloor = 1;
int targetFloor = 1;
bool lastTouch = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(pushButton, INPUT_PULLUP);
  pinMode(redLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(currentFloor, true);
}

void loop() {
  bool touchNow = digitalRead(touchSensor);
  if (touchNow == TOUCH_ACTIVE && lastTouch != TOUCH_ACTIVE) {
    targetFloor++;
    if (targetFloor > 9) targetFloor = 1;
    display.showNumberDec(targetFloor, true);
    delay(300);
  }
  if (digitalRead(pushButton) == LOW) {
    moveToTargetFloor();
  }
  lastTouch = touchNow;
}

void moveToTargetFloor() {
  if (targetFloor > currentFloor) {
    digitalWrite(greenLED, HIGH);
    digitalWrite(redLED, LOW);
    while (currentFloor < targetFloor) {
      currentFloor++;
      display.showNumberDec(currentFloor, true);
      delay(800);
    }
  } else if (targetFloor < currentFloor) {
    digitalWrite(greenLED, LOW);
    digitalWrite(redLED, HIGH);
    while (currentFloor > targetFloor) {
      currentFloor--;
      display.showNumberDec(currentFloor, true);
      delay(800);
    }
  }
  digitalWrite(greenLED, LOW);
  digitalWrite(redLED, LOW);
  delay(300);
}
