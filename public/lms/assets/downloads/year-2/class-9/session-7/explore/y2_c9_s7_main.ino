// Sound Level â†’ TM1637 dB Display
// Sensor: analog output on A3
// Display: TM1637 4-digit (CLK=D8, DIO=D9)
// Board: Arduino UNO (or compatible)
#include <Arduino.h>
#include <TM1637Display.h>
#include <math.h>
#define SOUND_PIN A3 // Analog output from sound sensor
#define CLK_PIN 8  // TM1637 CLK
#define DIO_PIN 9  // TM1637 DIO

TM1637Display display(CLK_PIN, DIO_PIN);
// ---- Tuning knobs ----
const unsigned long SAMPLE_MS = 50;
// sampling window
const float VCC_VOLTS = 5.0;
// your board supply
const float REF_VOLTS = 0.010f;
// ~10 mV reference for dB calc
const int CAL_OFFSET= 30;
// shift reading up/down after log calc

void setup() {
  Serial.begin(9600);
  display.setBrightness(7);
  // 0..7
  display.clear();
}

int readDb() {
  unsigned long start = millis();
  int signalMax = 0;
  int signalMin = 1023;
  // Capture peak-to-peak over a short window
  while (millis() - start < SAMPLE_MS) {
    int sample = analogRead(SOUND_PIN);
    if (sample > signalMax) signalMax = sample;
    if (sample < signalMin) signalMin = sample;
  }
  int p2p = signalMax - signalMin;
  // peak-to-peak counts
  float volts = p2p * (VCC_VOLTS / 1023.0f);
  // convert to volts
  if (volts < 0.001f) volts = 0.001f;
  float dB = 20.0f * log10f(volts / REF_VOLTS);
  dB += CAL_OFFSET;
  if (dB < 0) dB = 0;
  if (dB > 99) dB = 99;
  return (int)(dB + 0.5f);
}

void loop() {
  int dB = readDb();
  Serial.print("Approx dB: ");
  Serial.println(dB);
  display.showNumberDec(dB, true);
  delay(50);
}
