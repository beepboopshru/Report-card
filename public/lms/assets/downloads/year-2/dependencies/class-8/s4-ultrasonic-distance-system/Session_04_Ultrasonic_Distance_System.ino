// Session 4 - Grade 8: Distance monitor
// Arduino UNO
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

LiquidCrystal_I2C lcd(0x27,16,2);
const byte TRIG=8,ECHO=9,SERVO_PIN=3;
Servo gate;

float cm() {
  digitalWrite(TRIG,0);
  delayMicroseconds(2);
  digitalWrite(TRIG,1);
  delayMicroseconds(10);
  digitalWrite(TRIG,0);
  unsigned long u=pulseIn(ECHO,HIGH,30000);
  return u?u*.0343/2:999;
}

void setup() {
  pinMode(TRIG,OUTPUT);
  pinMode(ECHO,INPUT);
  lcd.init();
  lcd.backlight();
  gate.attach(SERVO_PIN);
  gate.write(0);
}

void loop() {
  float d=cm();
  bool near=d<20;
  lcd.setCursor(0,0);
  lcd.print("Distance: ");
  lcd.print((int)d);
  lcd.print(" cm ");
  lcd.setCursor(0,1);
  lcd.print(near?"OBJECT NEAR     ":"AREA CLEAR      ");
  gate.write(near?90:0);
  delay(200);
}
