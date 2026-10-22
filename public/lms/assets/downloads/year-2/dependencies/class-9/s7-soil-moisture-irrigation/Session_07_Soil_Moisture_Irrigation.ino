// Session 7 - Grade 9: Irrigation via 2WD driver
// Arduino UNO
// Pump on motor-driver output MA; D10/D11 are MA control inputs.
const byte SOIL=2,MA1=10,MA2=11,LED=5;

void setup() {
  pinMode(SOIL,INPUT);
  pinMode(MA1,OUTPUT);
  pinMode(MA2,OUTPUT);
  pinMode(LED,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool dry=digitalRead(SOIL)==HIGH;
  digitalWrite(MA1,dry);
  digitalWrite(MA2,LOW);
  digitalWrite(LED,dry);
  Serial.println(dry?"DRY":"MOIST");
  delay(500);
}
