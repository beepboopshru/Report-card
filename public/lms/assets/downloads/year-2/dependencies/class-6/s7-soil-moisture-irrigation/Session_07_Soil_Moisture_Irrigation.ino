// Session 7 - Grade 6: Irrigation via 2WD driver
// Arduino UNO
// Pump on motor-driver output MA; D10/D11 are MA control inputs.
const byte SOIL=2,MA1=10,MA2=11;

void setup() {
  pinMode(SOIL,INPUT);
  pinMode(MA1,OUTPUT);
  pinMode(MA2,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool dry=digitalRead(SOIL)==HIGH;
  digitalWrite(MA1,dry);
  digitalWrite(MA2,LOW);
  Serial.println(dry?"DRY":"MOIST");
  delay(500);
}
