#include <TM1637Display.h>

const int redLed = 5;
const int yellowLed = 6;
const int greenLed = 7;
// TM1637 pins
const int CLK = 9;
const int DIO = 8;
TM1637Display display(CLK, DIO);

void setup() {
  pinMode(redLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
  display.setBrightness(7);
  display.clear();
}

void loop() {
  // RED - 30 seconds
  digitalWrite(redLed, HIGH);
  digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, LOW);
  countdown(30);
  // YELLOW - 5 seconds
  digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, HIGH);
  digitalWrite(greenLed, LOW);
  countdown(5);
  // GREEN - 10 seconds
  digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, HIGH);
  countdown(10);
}

void countdown(int seconds) {
  for (int i = seconds; i >= 0; i--) {
    display.showNumberDec(i, true);
    delay(1000);
  }
}
