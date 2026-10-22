#include <TM1637Display.h>
#define CLK 8
#define DIO 9
#define BUTTON_PIN 5

TM1637Display display(CLK, DIO);
int count = 0;
bool running = false;
int lastButtonState = LOW;
unsigned long lastPressTime = 0;
int pressCount = 0;
unsigned long lastCountTime = 0;

void setup() {
  pinMode(BUTTON_PIN, INPUT);
  display.setBrightness(7);
  display.showNumberDec(0);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  // Detect button press
  if (buttonState == HIGH && lastButtonState == LOW) {
    pressCount++;
    lastPressTime = millis();
    delay(50);
  }
  // Double press detection (within 400 ms)
  if (pressCount == 2 && (millis() - lastPressTime) < 400) {
    running = true;
    count = 1;
    // Start from 1
    display.showNumberDec(count);
    lastCountTime = millis();
    pressCount = 0;
    delay(200);
  }
  // Reset press count if too slow
  if ((millis() - lastPressTime) > 400) {
    pressCount = 0;
  }
  // Auto counting
  if (running) {
    if (millis() - lastCountTime >= 500) {
      count++;
      if (count > 9999) count = 1;
      display.showNumberDec(count);
      lastCountTime = millis();
    }
    // Stop and reset after 3 seconds
    if (millis() - lastPressTime > 3000) {
      running = false;
      count = 0;
      display.showNumberDec(0);
    }
  }
  lastButtonState = buttonState;
}
