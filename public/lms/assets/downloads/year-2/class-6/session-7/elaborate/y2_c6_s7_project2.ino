// Session 7 Grade 6 Project 2
// Speedometer
// Car crosses IR1 then IR2 = speed value shown on 7 segment
#include <TM1637Display.h>

const int irSensor1 = 2;
const int irSensor2 = 3;
const int CLK = 9;
const int DIO = 8;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
const float distanceCM = 20.0;
// distance between two IR sensors
TM1637Display display(CLK, DIO);
unsigned long startTime = 0;
bool timingStarted = false;
bool lastIR1 = HIGH;
bool lastIR2 = HIGH;

void setup() {
  pinMode(irSensor1, INPUT);
  pinMode(irSensor2, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}
