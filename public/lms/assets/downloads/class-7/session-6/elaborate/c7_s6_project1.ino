#include <TM1637Display.h>

const int touchWire = 5;
// Buzz wire input D5
const int restartButton = 7;
// Push button D6
const int buzzer = 6;
const int CLK = 9;
const int DIO = 8;
TM1637Display display(CLK, DIO);
int chances = 3;
bool lastTouch = HIGH;

void setup() {
  pinMode(touchWire, INPUT_PULLUP);
  pinMode(restartButton, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(chances, true);
}

void loop() {
  bool touched = digitalRead(touchWire);
  if (chances > 0) {
    if (touched == LOW && lastTouch == HIGH) {
      chances--;
      display.showNumberDec(chances, true);
      tone(buzzer, 1200);
      delay(300);
      noTone(buzzer);
      delay(300);
    }
    lastTouch = touched;
  }
  // Game over
  if (chances == 0) {
    display.showNumberDec(0, true);
    tone(buzzer, 500);
    delay(500);
    noTone(buzzer);
    // Wait until restart button is pressed
    while (digitalRead(restartButton) == HIGH) {
      display.showNumberDec(0, true);
    }
    // Restart game
    chances = 3;
    lastTouch = HIGH;
    display.showNumberDec(chances, true);
    delay(500);
  }
}
