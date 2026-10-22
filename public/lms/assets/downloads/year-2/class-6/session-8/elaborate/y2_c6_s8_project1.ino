// Session 8 Grade 6
// Car Back Safety System
// IR detects object = buzzer ON
// Push button turns alarm OFF until object is removed
const int irSensor = 2;
const int pushButton = 5;
const int buzzer = 7;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
bool alarmMuted = false;

void setup() {
  pinMode(irSensor, INPUT);
  pinMode(pushButton, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  bool objectDetected = digitalRead(irSensor) == IR_DETECTED;
  if (digitalRead(pushButton) == LOW) {
    alarmMuted = true;
    digitalWrite(buzzer, LOW);
    delay(300);
  }
  if (!objectDetected) {
    alarmMuted = false;
  }
  if (objectDetected && !alarmMuted) {
    digitalWrite(buzzer, HIGH);
  } else {
    digitalWrite(buzzer, LOW);
  }
}
