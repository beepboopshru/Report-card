#include <TM1637Display.h> // Include library for 4-digit 7-segment display
#define CLK 8 // Clock pin connected to D8
#define DIO 9 // Data pin connected to D9

TM1637Display display(CLK, DIO);
// Create display object

void setup() {
  display.setBrightness(7);
  // Set display brightness (range 0 to 7)
}

void loop() {
  static int count = 0;
  // Start from 0 and store the count
  display.showNumberDec(count);
  // Show the number on display
  delay(500);
  // Wait for 0.5 seconds
  count++;
  // Increase the number
  if (count == 10) {
    // Reset to 0 after 9
    count = 0;
  }
}
