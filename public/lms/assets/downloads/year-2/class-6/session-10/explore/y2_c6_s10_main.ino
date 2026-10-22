#include <TM1637Display.h>
#define CLK 8
#define DIO 9
#define IR_PIN 2   // IR sensor on D2

TM1637Display display(CLK, DIO);
int count = 0;
int lastIRState = HIGH;

void setup() {
  pinMode(IR_PIN, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0);
}

void loop() {
  int irState = digitalRead(IR_PIN);
  // Detect object (LOW = detected for most IR sensors)
  if (irState == LOW && lastIRState == HIGH) {
    count++;
    if (count == 10) count = 0;
    display.showNumberDec(count);
    delay(200);
    // debounce
  }
  lastIRState = irState;
}
