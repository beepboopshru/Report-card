const int pushSwitch = 5;
const int rgbRed = 10;
const int rgbGreen = 12;
const int rgbBlue = 13;

void setup() {
  pinMode(pushSwitch, INPUT_PULLUP);
  pinMode(rgbRed, OUTPUT);
  pinMode(rgbGreen, OUTPUT);
  pinMode(rgbBlue, OUTPUT);
}

void loop() {
  int switchState = digitalRead(pushSwitch);
  if (switchState == LOW) {
    digitalWrite(rgbRed, HIGH);
    digitalWrite(rgbGreen, LOW);
    digitalWrite(rgbBlue, LOW);
    delay(500);
    digitalWrite(rgbRed, LOW);
    digitalWrite(rgbGreen, HIGH);
    digitalWrite(rgbBlue, LOW);
    delay(500);
    digitalWrite(rgbRed, LOW);
    digitalWrite(rgbGreen, LOW);
    digitalWrite(rgbBlue, HIGH);
    delay(500);
  } else {
    digitalWrite(rgbRed, LOW);
    digitalWrite(rgbGreen, LOW);
    digitalWrite(rgbBlue, LOW);
  }
}
