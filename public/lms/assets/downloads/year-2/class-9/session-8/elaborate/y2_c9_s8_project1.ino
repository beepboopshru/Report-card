// Session 8 Grade 9
// LDR Alarm Timer
// LDR detects light/dark change and timer starts
// Push button turns off / resets the timer
#include <TM1637Display.h>

const int ldrSensor = A0;
const int pushButton = 5;
const int CLK = 9;
const int DIO = 8;
int darkValue = 500;
// adjust based on room light
TM1637Display display(CLK, DIO);
bool timerRunning = false;
unsigned long startTime = 0;

void setup() {
  pinMode(pushButton, INPUT_PULLUP);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}
