// Session 2 - Grade 6: Vibration alert
// Arduino UNO
const byte SENSOR=2,BUZZER=5;

void setup() {
  pinMode(SENSOR,INPUT);
  pinMode(BUZZER,OUTPUT);
}

void loop() {
  bool hit=digitalRead(SENSOR);
  if(hit)tone(BUZZER,900);
  else noTone(BUZZER);
}
