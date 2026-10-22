#include <TM1637Display.h>
#define CLK 8
#define DIO 9

TM1637Display display(CLK, DIO);

void setup() {
  display.setBrightness(7);
}

void loop() {
  static int count = 0;
  display.showNumberDec(count);
  delay(500);
  count = (count + 1) % 10;
  // Automatically loops 0 â†’ 9 â†’ 0
}
