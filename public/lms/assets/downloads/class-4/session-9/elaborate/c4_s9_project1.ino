/*
Laser Security System
Laser  -> D2
LDR DO -> D3
Buzzer -> D5
Buzzer ON when laser beam is disturbed.
*/ const int laserPin = 2;
const int ldrPin = 3;
const int buzzerPin = 5;
// Most LDR digital modules give HIGH when light is received.
// If your buzzer works opposite, change this to LOW.
const int LASER_RECEIVED_STATE = HIGH;

void setup() {
  pinMode(laserPin, OUTPUT);
  pinMode(ldrPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  digitalWrite(laserPin, HIGH);
  // Laser always ON
  digitalWrite(buzzerPin, LOW);
  // Buzzer OFF at start
  Serial.begin(9600);
}

void loop() {
  int ldrState = digitalRead(ldrPin);
  Serial.print("LDR State: ");
  Serial.println(ldrState);
  // If laser is not falling on LDR, buzzer turns ON
  if (ldrState != LASER_RECEIVED_STATE) {
    digitalWrite(buzzerPin, HIGH);
    // Buzzer ON
  } else {
    digitalWrite(buzzerPin, LOW);
    // Buzzer OFF
  }
  delay(50);
}
