// Session 9 - Grade 7: Smoke warning
// Arduino UNO
#include <Adafruit_NeoPixel.h>

const byte SENSOR=A0,BUZZER=5,STRIP_PIN=2;
Adafruit_NeoPixel strip(30,STRIP_PIN,NEO_GRB+NEO_KHZ800);

void setup() {
  pinMode(SENSOR,INPUT);
  pinMode(BUZZER,OUTPUT);
  strip.begin();
  strip.clear();
  strip.show();
}

void loop() {
  bool danger=analogRead(SENSOR)>400;
  strip.fill(danger?strip.Color(255,0,0):strip.Color(0,80,0));
  strip.show();
  if(danger)tone(BUZZER,1400,180);
  else noTone(BUZZER);
  delay(200);
}
