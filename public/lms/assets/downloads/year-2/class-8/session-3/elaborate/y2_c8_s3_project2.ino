//Session 3 Grade 8
// Counter
// Every tilt = count increases by 1
#include <TM1637Display.h>

const int tiltSensor = 2;
const int CLK = 9;
const int DIO = 8;
const int TILT_ACTIVE = HIGH;
// change to LOW if opposite
TM1637Display display(CLK, DIO);
int countValue = 0;
bool lastTiltState = LOW;

void setup() {
  pinMode(tiltSensor, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}

void loop() {
  bool currentTilt = digitalRead(tiltSensor);
  if (currentTilt == TILT_ACTIVE && lastTiltState != TILT_ACTIVE) {
    countValue++;
    if (countValue > 9999) {
      countValue = 0;
    }
    display.showNumberDec(countValue, true);
    delay(300);
  }
  lastTiltState = currentTilt;
}
