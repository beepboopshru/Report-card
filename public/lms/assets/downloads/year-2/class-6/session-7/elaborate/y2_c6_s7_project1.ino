// Session 7 Grade 6 Project 1
// Smart Car Counter
// Each car passing IR sensor = count increases
#include <TM1637Display.h>

const int irSensor = 2;
const int CLK = 9;
const int DIO = 8;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
TM1637Display display(CLK, DIO);
int carCount = 0;
bool lastIR = HIGH;

void setup() {
  pinMode(irSensor, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}

void loop() {
  bool currentIR = digitalRead(irSensor);
  if (currentIR == IR_DETECTED && lastIR != IR_DETECTED) {
    carCount++;
    if (carCount > 9999) carCount = 0;
    display.showNumberDec(carCount, true);
    delay(300);
  }
  lastIR = currentIR;
}
