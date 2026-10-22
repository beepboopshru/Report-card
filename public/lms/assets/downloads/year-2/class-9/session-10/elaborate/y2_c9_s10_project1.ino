// Session 10 Grade 9
// Smart Bathroom Timer + Mirror Light
// Hall sensor detects door closed and shows closed minutes on 7
segment // IR sensor detects person near mirror and turns string LED ON
// Hall sensor is used as DIGITAL sensor with digitalRead(A0)
#include <TM1637Display.h>

const int hallSensor = A0;
const int irSensor = 2;
const int stringLED = 5;
const int CLK = 9;
const int DIO = 8;
const int MAGNET_DETECTED = LOW;
// change to HIGH if opposite
const int IR_DETECTED = LOW;
// change to HIGH if opposite
TM1637Display display(CLK, DIO);
bool doorClosed = false;
unsigned long doorCloseStart = 0;

void setup() {
  pinMode(hallSensor, INPUT);
  pinMode(irSensor, INPUT);
  pinMode(stringLED, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}
