// Session 9 - Grade 6: Flame warning
// Arduino UNO
const byte SENSOR=3,BUZZER=5;

void setup() {
  pinMode(SENSOR,INPUT);
  pinMode(BUZZER,OUTPUT);
}

void loop() {
  bool danger=digitalRead(SENSOR)==LOW;
  if(danger)tone(BUZZER,1400,180);
  else noTone(BUZZER);
  delay(200);
}
