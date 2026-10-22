// Session 3 Grade 7
// Taxi Meter
// Tilt meter down = price starts increasing
#include <TM1637Display.h>

const int tiltSensor = 2;
const int buzzer = 7;
const int CLK = 9;
const int DIO = 8;
const int TILT_ACTIVE = HIGH;
// change to LOW if opposite
TM1637Display display(CLK, DIO);
int price = 0;
unsigned long lastUpdate = 0;

void setup() {
  pinMode(tiltSensor, INPUT);
  pinMode(buzzer, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}

void loop() {
  if (digitalRead(tiltSensor) == TILT_ACTIVE) {
    if (millis() - lastUpdate > 700) {
      price = price + 5;
      if (price > 9999) {
        price = 0;
      }
      display.showNumberDec(price, true);
      digitalWrite(buzzer, HIGH);
      delay(100);
      digitalWrite(buzzer, LOW);
      lastUpdate = millis();
    }
  } else {
    price = 0;
    display.showNumberDec(0, true);
  }
}
