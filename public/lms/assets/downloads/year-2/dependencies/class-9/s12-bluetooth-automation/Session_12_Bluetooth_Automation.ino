// Session 12 - Grade 9: HM-10 automation
// Arduino UNO
#include <SoftwareSerial.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2);
SoftwareSerial hm10(8,9);
const byte LED=7,RELAY=4;

void setLoad(bool on) {
  digitalWrite(LED,on);
  digitalWrite(RELAY,on?LOW:HIGH);
  lcd.clear();
  lcd.print(on?"Appliance ON":"Appliance OFF");
}

void setup() {
  pinMode(LED,OUTPUT);
  pinMode(RELAY,OUTPUT);
  hm10.begin(9600);
  lcd.init();
  lcd.backlight();
  setLoad(false);
}

void loop() {
  if(hm10.available()) {
    char c=hm10.read();
    if(c=='1'||c=='A')setLoad(true);
    if(c=='0'||c=='B')setLoad(false);
  }
}
