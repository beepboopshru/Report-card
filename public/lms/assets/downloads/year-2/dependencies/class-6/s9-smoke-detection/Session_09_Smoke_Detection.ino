// Session 9 - Grade 6: Smoke warning
// Arduino UNO
const byte SENSOR=A0,BUZZER=5;

void setup() {
  pinMode(SENSOR,INPUT);
  pinMode(BUZZER,OUTPUT);
}

void loop() {
  bool danger=analogRead(SENSOR)>400;
  if(danger)tone(BUZZER,1400,180);
  else noTone(BUZZER);
  delay(200);
}
