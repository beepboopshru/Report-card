// Session 10 Grade 7
// Hospital Patient Call System
// Touch sensor = doctor calls next patient, red status ON
// Patient taps magnet card to Hall sensor = status changes to green
// D12 is kept always HIGH for RGB project
// Hall sensor is used as DIGITAL sensor with digitalRead(A0)
#include <TM1637Display.h>

const int touchSensor = 2;
const int hallSensor = A0;
const int redPin = 10;
const int greenPin = 11;
const int bluePin = 12;
const int CLK = 9;
const int DIO = 8;
const int TOUCH_ACTIVE = HIGH;
// change to LOW if opposite
const int MAGNET_DETECTED = LOW;
// change to HIGH if opposite
TM1637Display display(CLK, DIO);
int patientNumber = 0;
bool patientInside = false;
bool lastTouch = LOW;
bool lastMagnet = HIGH;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(hallSensor, INPUT);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  digitalWrite(bluePin, HIGH);
  // D12 always HIGH
  display.setBrightness(7);
  display.showNumberDec(0, true);
  showGreenStatus();
}

void loop() {
  digitalWrite(bluePin, HIGH);
  // keep D12 always HIGH
  bool touchNow = digitalRead(touchSensor);
  bool magnetNow = digitalRead(hallSensor);
  if (touchNow == TOUCH_ACTIVE && lastTouch != TOUCH_ACTIVE) {
    patientNumber++;
    if (patientNumber > 9999) patientNumber = 1;
    patientInside = true;
    display.showNumberDec(patientNumber, true);
    showRedStatus();
    delay(300);
  }
  if (magnetNow == MAGNET_DETECTED && lastMagnet != MAGNET_DETECTED) {
    patientInside = false;
    showGreenStatus();
    delay(300);
  }
  lastTouch = touchNow;
  lastMagnet = magnetNow;
}

void showRedStatus() {
  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, HIGH);
}

void showGreenStatus() {
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, HIGH);
  digitalWrite(bluePin, HIGH);
}
