// Session 7 - Grade 7: Rain response
// Arduino UNO
#include <Servo.h>

const byte RAIN=2,SERVO_PIN=3,BUZZER=5;
Servo cover;

void setup() {
  pinMode(RAIN,INPUT);
  pinMode(BUZZER,OUTPUT);
  cover.attach(SERVO_PIN);
  cover.write(0);
}

void loop() {
  bool wet=digitalRead(RAIN)==LOW;
  cover.write(wet?90:0);
  if(wet)tone(BUZZER,1200,150);
  else noTone(BUZZER);
  delay(200);
}
