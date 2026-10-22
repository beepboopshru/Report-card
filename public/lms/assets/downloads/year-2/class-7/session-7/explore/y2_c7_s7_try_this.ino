#include <TM1637Display.h>
#define CLK 8
#define DIO 9
#define BUTTON_PIN 5

TM1637Display display(CLK, DIO);
int count = 0;
bool running = false;
// Start/Stop flag
int lastButtonState = LOW;
unsigned long lastPressTime = 0;
int pressCount = 0;

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
    // debounce
  }
  // Check for double press within 400ms
  if (pressCount == 2 && (millis() - lastPressTime) < 400) {
    running = !running;
    // Toggle start/stop
    pressCount = 0;
    delay(200);
  }
  // Reset if too slow (not a double press)
  if ((millis() - lastPressTime) > 400) {
    pressCount = 0;
  }
  // Counting logic
  if (running) {
    display.showNumberDec(count);
    count++;
    if (count > 9999) count = 0;
    delay(500);
  }
  lastButtonState = buttonState;
}
