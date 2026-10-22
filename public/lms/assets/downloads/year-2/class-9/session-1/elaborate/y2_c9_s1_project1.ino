// Session 1 Grade 9
// Alarm - LDR + Buzzer + Push Button
const int ldrPin = A0;
const int pushButton = 5;
const int buzzer = 7;
int darkValue = 500;
// adjust after testing
bool alarmStopped = false;

void setup() {
  pinMode(pushButton, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  if (digitalRead(pushButton) == LOW) {
    alarmStopped = true;
    digitalWrite(buzzer, LOW);
    delay(300);
  }
  if (ldrValue > darkValue && alarmStopped == false) {
    digitalWrite(buzzer, HIGH);
  } else {
    digitalWrite(buzzer, LOW);
  }
  // When light comes back, alarm can trigger again next time it becomes dark.
  if (ldrValue < darkValue) {
    alarmStopped = false;
  }
}
