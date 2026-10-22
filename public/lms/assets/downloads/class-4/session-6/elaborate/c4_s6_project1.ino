#include <TM1637Display.h>

const int pushSwitch = 5;
const int buzzer = 6;
const int CLK = 9;
const int DIO = 8;
TM1637Display display(CLK, DIO);
int secondsValue = 0;
bool running = false;
bool lastButtonState = HIGH;
unsigned long previousMillis = 0;
unsigned long buttonPressStart = 0;
bool buttonHeld = false;

void setup() {
  pinMode(pushSwitch, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}

void loop() {
  bool buttonState = digitalRead(pushSwitch);
  // When button is first pressed
  if (buttonState == LOW && lastButtonState == HIGH) {
    buttonPressStart = millis();
    buttonHeld = false;
  }
  // If button is held for 3 seconds
  if (buttonState == LOW && buttonHeld == false) {
    if (millis() - buttonPressStart >= 3000) {
      secondsValue = 0;
      running = false;
      display.showNumberDec(secondsValue, true);
      // Reset buzzer sound
      digitalWrite(buzzer, HIGH);
      delay(300);
      digitalWrite(buzzer, LOW);
      buttonHeld = true;
    }
  }
  // When button is released
  if (buttonState == HIGH && lastButtonState == LOW) {
    if (buttonHeld == false) {
      running = !running;
      // Start/Pause buzzer sound
      digitalWrite(buzzer, HIGH);
      delay(150);
      digitalWrite(buzzer, LOW);
    }
    delay(300);
  }
  // Timer counting
  if (running && millis() - previousMillis >= 1000) {
    previousMillis = millis();
    secondsValue++;
    if (secondsValue > 9999) {
      secondsValue = 0;
    }
    display.showNumberDec(secondsValue, true);
  }
  lastButtonState = buttonState;
}
