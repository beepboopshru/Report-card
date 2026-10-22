// Session 7 Grade 9 Project 2
// Stopwatch
// Push button cycles: START -> PAUSE -> RESET
// Touch sensor can also reset anytime
#include <TM1637Display.h>

const int touchSensor = 2;
const int pushButton = 5;
const int CLK = 9;
const int DIO = 8;
const int TOUCH_ACTIVE = HIGH;
// change to LOW if opposite
TM1637Display display(CLK, DIO);
int mode = 0;
// 0 reset, 1 running, 2 paused
unsigned long startMillis = 0;
unsigned long pausedTime = 0;
unsigned long elapsedMillis = 0;
bool lastButton = HIGH;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(pushButton, INPUT_PULLUP);
  display.setBrightness(7);
  showTime(0);
}
