#include <TM1637Display.h>
#define CLK 8
#define DIO 9
#define BUTTON_PIN 5

TM1637Display display(CLK, DIO);
int count = 0;
int lastButtonState = LOW;

void setup() {
  pinMode(BUTTON_PIN, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  // Detect button press
  if (buttonState == HIGH && lastButtonState == LOW) {
    count += 2;
    // Increase by 2 (even numbers)
    if (count > 9998) count = 2;
    // Reset safely within 4 digits
    display.showNumberDec(count);
    delay(200);
    // Debounce
  }
  lastButtonState = buttonState;
}
