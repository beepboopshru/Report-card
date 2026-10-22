#include <TM1637Display.h>

const int pushSwitch = 5;
const int buzzer = 6;
const int CLK = 9;
const int DIO = 8;
TM1637Display display(CLK, DIO);
int timerValue = 10;
bool timerRunning = false;
unsigned long previousMillis = 0;

void setup() {
  pinMode(pushSwitch, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(timerValue, true);
}

void loop() {
  if (digitalRead(pushSwitch) == LOW) {
    timerRunning = true;
    timerValue = 10;
    previousMillis = millis();
    display.showNumberDec(timerValue, true);
    // Start beep
    digitalWrite(buzzer, HIGH);
    delay(200);
    digitalWrite(buzzer, LOW);
    delay(300);
  }
  if (timerRunning && millis() - previousMillis >= 1000) {
    previousMillis = millis();
    timerValue--;
    display.showNumberDec(timerValue, true);
    if (timerValue <= 0) {
      timerRunning = false;
      display.showNumberDec(0, true);
      // Time over buzzer sound
      digitalWrite(buzzer, HIGH);
      delay(200);
      digitalWrite(buzzer, LOW);
      delay(100);
      digitalWrite(buzzer, HIGH);
      delay(200);
      digitalWrite(buzzer, LOW);
      delay(100);
      digitalWrite(buzzer, HIGH);
      delay(500);
      digitalWrite(buzzer, LOW);
    }
  }
}
