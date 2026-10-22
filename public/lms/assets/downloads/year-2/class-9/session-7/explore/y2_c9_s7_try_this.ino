#include <Arduino.h>
#include <TM1637Display.h>
#define SOUND_PIN A3
#define CLK_PIN   8
#define DIO_PIN   9

TM1637Display display(CLK_PIN, DIO_PIN);
// Clap settings
const int CLAP_THRESHOLD = 600;
// Adjust based on your sensor
const int RESET_TIME = 3000;
// 3 seconds
int count = 0;
unsigned long lastClapTime = 0;
bool clapDetected = false;

void setup() {
  Serial.begin(9600);
  display.setBrightness(7);
  display.showNumberDec(0);
}

void loop() {
  int soundValue = analogRead(SOUND_PIN);
  Serial.println(soundValue);
  // Detect clap (sound spike)
  if (soundValue > CLAP_THRESHOLD && !clapDetected) {
    count++;
    // Increase count
    if (count > 9999) count = 0;
    display.showNumberDec(count);
    lastClapTime = millis();
    // Store clap time
    clapDetected = true;
    // Avoid multiple triggers
  }
  // Reset clap detection when sound goes low
  if (soundValue < CLAP_THRESHOLD - 50) {
    clapDetected = false;
  }
  // Reset after 3 seconds of no clap
  if (millis() - lastClapTime > RESET_TIME) {
    count = 0;
    display.showNumberDec(count);
  }
  delay(50);
}
