/*
ScienceUtsav Arduino Code
Haunted Castle Smooth Light Effect
LDR Sensor = D2
String LED = D5
RGB Common Pin = D12
RGB Red = D13
RGB Green = D11
RGB Blue = D10
*/ const int ldrSensor = 2;
const int stringLed = 5;
const int rgbCommon = 12;
const int redLED = 13;
const int greenLED = 11;
const int blueLED = 10;

void setup() {
  pinMode(ldrSensor, INPUT);
  pinMode(stringLed, OUTPUT);
  pinMode(rgbCommon, OUTPUT);
  pinMode(redLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
  pinMode(blueLED, OUTPUT);
  digitalWrite(rgbCommon, HIGH);
  // RGB 4th pin always HIGH
}

void loop() {
  if (digitalRead(ldrSensor) == HIGH) {
    // String LED fade in
    for (int brightness = 0; brightness <= 255; brightness = brightness + 5) {
      analogWrite(stringLed, brightness);
      // RGB red color ON
      digitalWrite(redLED, LOW);
      digitalWrite(greenLED, HIGH);
      digitalWrite(blueLED, HIGH);
      delay(30);
    }
    // String LED fade out
    for (int brightness = 255; brightness >= 0; brightness = brightness - 5) {
      analogWrite(stringLed, brightness);
      // RGB blue color ON
      digitalWrite(redLED, HIGH);
      digitalWrite(greenLED, HIGH);
      digitalWrite(blueLED, LOW);
      delay(30);
    }
    // String LED fade in again
    for (int brightness = 0; brightness <= 255; brightness = brightness + 5) {
      analogWrite(stringLed, brightness);
      // RGB purple color ON
      digitalWrite(redLED, LOW);
      digitalWrite(greenLED, HIGH);
      digitalWrite(blueLED, LOW);
      delay(30);
    }
    // String LED fade out again
    for (int brightness = 255; brightness >= 0; brightness = brightness - 5) {
      analogWrite(stringLed, brightness);
      // RGB green color ON
      digitalWrite(redLED, HIGH);
      digitalWrite(greenLED, LOW);
      digitalWrite(blueLED, HIGH);
      delay(30);
    }
  } else {
    // All lights OFF in bright light
    analogWrite(stringLed, 0);
    digitalWrite(redLED, HIGH);
    digitalWrite(greenLED, HIGH);
    digitalWrite(blueLED, HIGH);
  }
}
