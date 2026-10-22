// Session 10 Grade 6
// Smart Home With Counter and Automatic Night Light
// LDR controls 1W LED
// IR counts people entering and shows count on 7
segment #include <TM1637Display.h> const int ldrSensor = A0;
const int irSensor = 2;
const int led = 6;
const int CLK = 9;
const int DIO = 8;
const int IR_DETECTED = LOW;
// change to HIGH if
opposite int darkValue = 500;
// adjust based on room light
TM1637Display display(CLK, DIO);
int personCount = 0;
bool lastIR = HIGH;
