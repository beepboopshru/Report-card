// Session 5 Grade 7 Project 1
// Arch Entry Counter
// Each person detected by IR = count increases on 7 segment
#include <TM1637Display.h>

const int irSensor = 2;
const int CLK = 9;
const int DIO = 8;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
TM1637Display display(CLK, DIO);
int countValue = 0;
bool lastIR = HIGH;

void setup() {
  pinMode(irSensor, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}

void loop() {
  bool currentIR = digitalRead(irSensor);
  if (currentIR == IR_DETECTED && lastIR != IR_DETECTED) {
    countValue++;
    if (countValue > 9999) countValue = 0;
    display.showNumberDec(countValue, true);
    delay(300);
  }
  lastIR = currentIR;
}
