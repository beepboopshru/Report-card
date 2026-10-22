// Session 1 - Grade 9: RGB strip
// Arduino UNO
#include <Adafruit_NeoPixel.h>

const byte STRIP_PIN=2,BUTTON_PIN=5,LED_COUNT=30;
Adafruit_NeoPixel strip(LED_COUNT,STRIP_PIN,NEO_GRB+NEO_KHZ800);
byte mode=0;
bool last=HIGH;
unsigned long db=0;

void show() {
  const uint32_t c[]= {
    strip.Color(0,0,0),
    strip.Color(255,0,0),
    strip.Color(0,255,0),
    strip.Color(0,0,255),
    strip.Color(255,120,0),
    strip.Color(150,0,255),
    strip.Color(0,180,180),
    strip.Color(255,255,255)
  };
  strip.fill(c[mode]);
  strip.show();
}

void setup() {
  pinMode(BUTTON_PIN,INPUT_PULLUP);
  strip.begin();
  strip.clear();
  show();
}

void loop() {
  bool b=digitalRead(BUTTON_PIN);
  if(last&& !b&&millis()-db>180) {
    mode=(mode+1)%8;
    db=millis();
    show();
  }
  last=b;
}
