// Session 2 - Grade 7: Vibration alert
// Arduino UNO
const byte SENSOR=2,BUZZER=5;

void setup() {
  pinMode(SENSOR,INPUT);
  pinMode(BUZZER,OUTPUT);
}

void loop() {
  bool hit=digitalRead(SENSOR);
  if(hit)tone(BUZZER,1300);
  else noTone(BUZZER);
}
