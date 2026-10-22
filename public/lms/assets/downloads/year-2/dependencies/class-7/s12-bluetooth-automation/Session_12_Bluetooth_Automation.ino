// Session 12 - Grade 7: HM-10 automation
// Arduino UNO
#include <SoftwareSerial.h>

SoftwareSerial hm10(8,9);
const byte LED=7;

void setLoad(bool on) {
  digitalWrite(LED,on);
}

void setup() {
  pinMode(LED,OUTPUT);
  hm10.begin(9600);
  setLoad(false);
}

void loop() {
  if(hm10.available()) {
    char c=hm10.read();
    if(c=='1'||c=='A')setLoad(true);
    if(c=='0'||c=='B')setLoad(false);
  }
}
