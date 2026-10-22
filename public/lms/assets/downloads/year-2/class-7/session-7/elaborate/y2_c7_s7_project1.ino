// Session 7 Grade 7 Project 2
// Petrol Bunk Meter
// Hold touch sensor = petrol value increases on 7 segment
#include <TM1637Display.h>

const int touchSensor = 2;
const int CLK = 9;
const int DIO = 8;
const int TOUCH_ACTIVE = HIGH;
// change to LOW if opposite
TM1637Display display(CLK, DIO);
int petrolValue = 0;
unsigned long lastUpdate = 0;

void setup() {
  pinMode(touchSensor, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}

void loop() {
  if (digitalRead(touchSensor) == TOUCH_ACTIVE) {
    if (millis() - lastUpdate > 300) {
      petrolValue++;
      if (petrolValue > 9999) petrolValue = 0;
      display.showNumberDec(petrolValue, true);
      lastUpdate = millis();
    }
  }
}
