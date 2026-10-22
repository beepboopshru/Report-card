// Session 8 Grade 7
// Dancing Robot
// IR detects person = RGB and 7 segment dance pattern starts
// Push button turns it OFF
// D12 is kept always HIGH for RGB project
#include <TM1637Display.h>

const int irSensor = 2;
const int pushButton = 5;
const int redPin = 10;
const int greenPin = 11;
const int bluePin = 12;
const int CLK = 9;
const int DIO = 8;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
TM1637Display display(CLK, DIO);
bool danceOff = false;
int patternNumber = 0;

void setup() {
  pinMode(irSensor, INPUT);
  pinMode(pushButton, INPUT_PULLUP);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  digitalWrite(bluePin, HIGH);
  // D12 always HIGH
  display.setBrightness(7);
  display.showNumberDec(0, true);
}

void loop() {
  digitalWrite(bluePin, HIGH);
  // keep D12 always HIGH
  if (digitalRead(pushButton) == LOW) {
    danceOff = true;
    allOffExceptD12();
    display.showNumberDec(0, true);
    delay(300);
  }
  if (digitalRead(irSensor) == IR_DETECTED) {
    danceOff = false;
  }
  if (digitalRead(irSensor) == IR_DETECTED && !danceOff) {
    dancePattern();
  } else {
    allOffExceptD12();
  }
}

void dancePattern() {
  patternNumber++;
  if (patternNumber > 9) patternNumber = 1;
  display.showNumberDec(patternNumber, true);
  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, HIGH);
  delay(200);
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, HIGH);
  digitalWrite(bluePin, HIGH);
  delay(200);
  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, HIGH);
  digitalWrite(bluePin, HIGH);
  delay(200);
}

void allOffExceptD12() {
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, HIGH);
}
