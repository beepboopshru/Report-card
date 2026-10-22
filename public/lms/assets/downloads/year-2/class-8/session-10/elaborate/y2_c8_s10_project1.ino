// Session 10 Grade 8
// Classroom Noise Meter + Emergency System
// Sound sensor value shown on 7 segment
// High noise = buzzer warning
// Touch sensor = emergency buzzer pattern
#include <TM1637Display.h>

const int soundSensor = A0;
const int touchSensor = 2;
const int buzzer = 7;
const int CLK = 9;
const int DIO = 8;
const int TOUCH_ACTIVE = HIGH;
// change to LOW if opposite
int noiseLimit = 700;
TM1637Display display(CLK, DIO);

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(buzzer, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(0, true);
}

void loop() {
  int soundValue = analogRead(soundSensor);
  int noiseLevel = map(soundValue, 0, 1023, 0, 9999);
  display.showNumberDec(noiseLevel, true);
  if (digitalRead(touchSensor) == TOUCH_ACTIVE) {
    emergencyAlarm();
  } else if (soundValue > noiseLimit) {
    digitalWrite(buzzer, HIGH);
    delay(100);
    digitalWrite(buzzer, LOW);
    delay(100);
  } else {
    digitalWrite(buzzer, LOW);
  }
}

void emergencyAlarm() {
  for (int i = 0; i < 5; i++) {
    digitalWrite(buzzer, HIGH);
    delay(150);
    digitalWrite(buzzer, LOW);
    delay(150);
  }
}
