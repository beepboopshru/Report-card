// Session 3 - Grade 8: LCD selector
// Arduino UNO
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2);
const byte BTN=5,BUZZER=6;
byte mode=0;
bool last=HIGH;
unsigned long db=0;

void show() {
  const char* names[]= {
    "OFF",
    "SELECT 1",
    "WARNING",
    "ALERT"
  };
  lcd.clear();
  lcd.print("Mode:");
  lcd.setCursor(0,1);
  lcd.print(names[mode]);
  if(mode>1)tone(BUZZER,1000,100);
}

void setup() {
  pinMode(BTN,INPUT_PULLUP);
  pinMode(BUZZER,OUTPUT);
  lcd.init();
  lcd.backlight();
  show();
}

void loop() {
  bool b=digitalRead(BTN);
  if(last&&!b&&millis()-db>180) {
    mode=(mode+1)%4;
    db=millis();
    show();
  }
  last=b;
}
