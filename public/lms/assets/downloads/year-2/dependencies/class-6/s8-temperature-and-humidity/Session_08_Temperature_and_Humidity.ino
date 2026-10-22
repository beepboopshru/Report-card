// Session 8 - Grade 6: Climate controller
// Arduino UNO
#include <DHT.h>
#define DHTTYPE DHT11

const byte DHT_PIN=2,BUZZER=5;
const float LIMIT=30;
DHT dht(DHT_PIN,DHTTYPE);

void setup() {
  pinMode(BUZZER,OUTPUT);
  dht.begin();
}

void loop() {
  float h=dht.readHumidity(),t=dht.readTemperature();
  if(isnan(t)||isnan(h))return;
  bool hot=t>=LIMIT;
  if(hot)tone(BUZZER,1200,180);
  delay(1000);
}
