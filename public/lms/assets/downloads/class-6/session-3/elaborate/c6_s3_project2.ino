const int pushSwitch = 5;
const int buzzer = 6;
const int rgbRed = 10;
const int rgbGreen = 12;
const int rgbBlue = 13;

void setup() {
  pinMode(pushSwitch, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(rgbRed, OUTPUT);
  pinMode(rgbGreen, OUTPUT);
  pinMode(rgbBlue, OUTPUT);
  digitalWrite(11, HIGH); // D11 HIGH forever
}

void loop() {
  int switchState = digitalRead(pushSwitch);
  if (switchState == LOW) {
    // Switch pressed
    // Red + buzzer ON
    digitalWrite(rgbRed, HIGH);
    digitalWrite(rgbGreen, LOW);
    digitalWrite(rgbBlue, LOW);
    digitalWrite(buzzer, HIGH);
    delay(500);

    // Green + buzzer OFF
    digitalWrite(rgbRed, LOW);
    digitalWrite(rgbGreen, HIGH);
    digitalWrite(rgbBlue, LOW);
    digitalWrite(buzzer, LOW);
    delay(500);

    // Blue + buzzer ON
    digitalWrite(rgbRed, LOW);
    digitalWrite(rgbGreen, LOW);
    digitalWrite(rgbBlue, HIGH);
    digitalWrite(buzzer, HIGH);
    delay(500);
  } else {
    // Switch not pressed
    digitalWrite(rgbRed, LOW);
    digitalWrite(rgbGreen, LOW);
    digitalWrite(rgbBlue, LOW);
    digitalWrite(buzzer, LOW);
  }
}
