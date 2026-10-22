// Session 7 Grade 8 Project 2
// Scoreboard
// Touch selects Team A or Team B, Push increases selected team score
// Display format: A score on left two digits, B score on right two digits
#include <TM1637Display.h>

const int touchSensor = 2;
const int pushButton = 5;
const int CLK = 9;
const int DIO = 8;
const int TOUCH_ACTIVE = HIGH;
// change to LOW if opposite
TM1637Display display(CLK, DIO);
int scoreA = 0;
int scoreB = 0;
int selectedTeam = 1;
// 1 = Team A, 2 = Team B
bool lastTouch = LOW;
bool lastButton = HIGH;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(pushButton, INPUT_PULLUP);
  display.setBrightness(7);
  showScore();
}

void loop() {
  bool touchNow = digitalRead(touchSensor);
  bool buttonNow = digitalRead(pushButton);
  if (touchNow == TOUCH_ACTIVE && lastTouch != TOUCH_ACTIVE) {
    selectedTeam = (selectedTeam == 1) ? 2 : 1;
    blinkSelectedTeam();
    delay(300);
  }
  if (buttonNow == LOW && lastButton == HIGH) {
    if (selectedTeam == 1) {
      scoreA++;
      if (scoreA > 99) scoreA = 0;
    } else {
      scoreB++;
      if (scoreB > 99) scoreB = 0;
    }
    showScore();
    delay(300);
  }
  lastTouch = touchNow;
  lastButton = buttonNow;
}

void showScore() {
  int displayValue = scoreA * 100 + scoreB;
  display.showNumberDec(displayValue, true);
}

void blinkSelectedTeam() {
  display.showNumberDec(selectedTeam, true);
  delay(500);
  showScore();
}
