#include <Arduino.h>
#include <TM1637Display.h>
#include <math.h>
#define SOUND_PIN A3
#define CLK_PIN   8
#define DIO_PIN   9
#define LED_PIN    6   // LED on D6
#define BUZZER_PIN 5   // Buzzer on D5

TM1637Display display(CLK_PIN, DIO_PIN);
// ---- Tuning knobs ----
const unsigned long SAMPLE_MS = 50;
const float VCC_VOLTS = 5.0;
const float REF_VOLTS = 0.010f;
const int CAL_OFFSET= 30;
// Threshold for alert
const int SOUND_THRESHOLD = 60;
// dB level for LED & buzzer

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  display.setBrightness(7);
  display.clear();
}

int readDb() {
  unsigned long start = millis();
  int signalMax = 0;
  int signalMin = 1023;
  while (millis() - start < SAMPLE_MS) {
    int sample = analogRead(SOUND_PIN);
    if (sample > signalMax) signalMax = sample;
    if (sample < signalMin) signalMin = sample;
  }
  int p2p = signalMax - signalMin;
  float volts = p2p * (VCC_VOLTS / 1023.0f);
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
  // LED + Buzzer control
  if (dB >= SOUND_THRESHOLD) {
    digitalWrite(LED_PIN, HIGH);
    // LED ON
    digitalWrite(BUZZER_PIN, HIGH);
    // Buzzer ON
  } else {
    digitalWrite(LED_PIN, LOW);
    // LED OFF
    digitalWrite(BUZZER_PIN, LOW);
    // Buzzer OFF
  }
  delay(50);
}
