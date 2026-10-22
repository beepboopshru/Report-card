// Session 11 - Grade 8: IR control
// Arduino UNO
#include <IRremote.hpp>

const byte IR_PIN=2,MA1=10,MA2=11;

void setup() {
  IrReceiver.begin(IR_PIN);
  pinMode(MA1,OUTPUT);
  pinMode(MA2,OUTPUT);
}

void loop() {
  if(!IrReceiver.decode())return;
  byte c=IrReceiver.decodedIRData.command;
  IrReceiver.resume();
  if(c==0x47) {
    digitalWrite(MA1,HIGH);
    digitalWrite(MA2,LOW);
  }
  if(c==0x44) {
    digitalWrite(MA1,LOW);
    digitalWrite(MA2,HIGH);
  }
  if(c==0x40) {
    digitalWrite(MA1,LOW);
    digitalWrite(MA2,LOW);
  }
}
