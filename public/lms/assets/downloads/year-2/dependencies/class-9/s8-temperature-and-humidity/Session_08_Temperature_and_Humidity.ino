// Session 8 - Grade 9: Climate controller
// Arduino UNO
#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2);
#define DHTTYPE DHT11

const byte DHT_PIN=2,BUZZER=5,MOTOR_CONTROL=6;
const float LIMIT=30;
DHT dht(DHT_PIN,DHTTYPE);

void setup() {
  pinMode(BUZZER,OUTPUT);
  pinMode(MOTOR_CONTROL,OUTPUT);
  dht.begin();
  lcd.init();
  lcd.backlight();
}

void loop() {
  float h=dht.readHumidity(),t=dht.readTemperature();
  if(isnan(t)||isnan(h))return;
  bool hot=t>=LIMIT;
  lcd.setCursor(0,0);
  lcd.print("Temp: ");
  lcd.print(t,1);
  lcd.print(" C  ");
  lcd.setCursor(0,1);
  lcd.print("Humidity: ");
  lcd.print(h,0);
  lcd.print("% ");
  digitalWrite(MOTOR_CONTROL,hot);
  if(hot)tone(BUZZER,1200,180);
  delay(1000);
}
