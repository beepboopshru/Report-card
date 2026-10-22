// Session 11 - Grade 9: IR control
// Arduino UNO
#include <IRremote.hpp>
#include <Adafruit_NeoPixel.h>

const byte IR_PIN=2,STRIP_PIN=3,LED_PIN=7;
Adafruit_NeoPixel strip(30,STRIP_PIN,NEO_GRB+NEO_KHZ800);

void setup() {
  IrReceiver.begin(IR_PIN);
  strip.begin();
  strip.clear();
  strip.show();
  pinMode(LED_PIN,OUTPUT);
}

void loop() {
  if(!IrReceiver.decode())return;
  byte c=IrReceiver.decodedIRData.command;
  IrReceiver.resume();
  if(c==0x45)digitalWrite(LED_PIN,!digitalRead(LED_PIN));
  if(c==0x45) {
    strip.fill(strip.Color(255,255,255));
    strip.show();
  }
  if(c==0x46) {
    strip.fill(strip.Color(0,0,255));
    strip.show();
  }
  if(c==0x47) {
    strip.clear();
    strip.show();
  }
}
