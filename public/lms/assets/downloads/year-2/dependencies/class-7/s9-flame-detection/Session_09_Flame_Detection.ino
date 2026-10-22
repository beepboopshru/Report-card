// Session 9 - Grade 7: Flame warning
// Arduino UNO
const byte SENSOR=3,BUZZER=5,LED=7;

void setup() {
  pinMode(SENSOR,INPUT);
  pinMode(BUZZER,OUTPUT);
  pinMode(LED,OUTPUT);
}

void loop() {
  bool danger=digitalRead(SENSOR)==LOW;
  digitalWrite(LED,danger);
  if(danger)tone(BUZZER,1400,180);
  else noTone(BUZZER);
  delay(200);
}
