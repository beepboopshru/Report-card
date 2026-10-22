// Session 9 - Grade 9: Flame warning
// Arduino UNO
const byte SENSOR=3,BUZZER=5,MOTOR_CONTROL=6,LED=7;

void setup() {
  pinMode(SENSOR,INPUT);
  pinMode(BUZZER,OUTPUT);
  pinMode(MOTOR_CONTROL,OUTPUT);
  pinMode(LED,OUTPUT);
}

void loop() {
  bool danger=digitalRead(SENSOR)==LOW;
  digitalWrite(MOTOR_CONTROL,danger);
  digitalWrite(LED,danger);
  if(danger)tone(BUZZER,1400,180);
  else noTone(BUZZER);
  delay(200);
}
