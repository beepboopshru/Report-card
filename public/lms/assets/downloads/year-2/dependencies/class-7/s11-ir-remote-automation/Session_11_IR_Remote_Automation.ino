// Session 11 - Grade 7: IR control
// Arduino UNO
#include <IRremote.hpp>
#include <Adafruit_NeoPixel.h>

const byte IR_PIN=2,STRIP_PIN=3;
Adafruit_NeoPixel strip(30,STRIP_PIN,NEO_GRB+NEO_KHZ800);

void setup() {
  IrReceiver.begin(IR_PIN);
  strip.begin();
  strip.clear();
  strip.show();
}

void loop() {
  if(!IrReceiver.decode())return;
  byte c=IrReceiver.decodedIRData.command;
  IrReceiver.resume();
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
