// Session 7 Grade 9 Project 1
// Entry Exit Occupancy Counter
// IR1 = person entered, IR2 = person left
// Display shows number of persons inside
#include <TM1637Display.h>

const int entryIR = 2;
const int exitIR = 3;
const int CLK = 9;
const int DIO = 8;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
TM1637Display display(CLK, DIO);
int insideCount = 0;
bool lastEntry = HIGH;
bool lastExit = HIGH;

void setup() {
  pinMode(entryIR, INPUT);
  pinMode(exitIR, INPUT);
  display.setBrightness(7);
  display.showNumberDec(insideCount, true);
}
