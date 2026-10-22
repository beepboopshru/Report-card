// Session 2 - Grade 9: Vibration alert
// Arduino UNO
const byte SENSOR=2,BUZZER=5,RED_LED=6,GREEN_LED=7;

void setup() {
  pinMode(SENSOR,INPUT);
  pinMode(BUZZER,OUTPUT);
  pinMode(RED_LED,OUTPUT);
  pinMode(GREEN_LED,OUTPUT);
}

void loop() {
  bool hit=digitalRead(SENSOR);
  digitalWrite(RED_LED,hit);
  digitalWrite(GREEN_LED,!hit);
  if(hit)tone(BUZZER,1300);
  else noTone(BUZZER);
}
