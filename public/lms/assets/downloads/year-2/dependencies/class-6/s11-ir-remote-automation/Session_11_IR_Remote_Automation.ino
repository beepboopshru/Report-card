// Session 11 - Grade 6: IR control
// Arduino UNO
#include <IRremote.hpp>

const byte IR_PIN=2,LED_PIN=7;

void setup() {
  IrReceiver.begin(IR_PIN);
  pinMode(LED_PIN,OUTPUT);
}

void loop() {
  if(!IrReceiver.decode())return;
  byte c=IrReceiver.decodedIRData.command;
  IrReceiver.resume();
  if(c==0x45)digitalWrite(LED_PIN,!digitalRead(LED_PIN));
}
