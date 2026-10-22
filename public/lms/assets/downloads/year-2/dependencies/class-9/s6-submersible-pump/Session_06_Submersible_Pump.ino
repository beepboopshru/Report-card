// Session 6 - Grade 9: Pump via 2WD driver
// Arduino UNO
// Load on driver output MA; D10/D11 connect to MA control inputs.
const byte MA1=10,MA2=11,BTN=5;

void setup() {
  pinMode(MA1,OUTPUT);
  pinMode(MA2,OUTPUT);
  pinMode(BTN,INPUT_PULLUP);
  digitalWrite(MA1,0);
  digitalWrite(MA2,0);
}

bool on=0,last=1;
unsigned long db=0;

void loop() {
  bool b=digitalRead(BTN);
  if(last&&!b&&millis()-db>180) {
    on=!on;
    db=millis();
    digitalWrite(MA1,on);
    digitalWrite(MA2,0);
  }
  last=b;
}
