const int touchSensor = 2;
const int dcMotor = 5;
const int ldrSensor = 3;
const int led = 6;
// Change HIGH to LOW if LED works opposite
const int LIGHT_STATE = HIGH;
int speedLevel = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dcMotor, OUTPUT);
  pinMode(ldrSensor, INPUT);
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool touchState = digitalRead(touchSensor);
  // Detect one touch at a time
  if (touchState == HIGH && lastTouchState == LOW) {
    speedLevel++;
    if (speedLevel > 3) {
      speedLevel = 0;
    }
    delay(300);
  }
  lastTouchState = touchState;
  // Motor speed control
  if (speedLevel == 0) {
    analogWrite(dcMotor, 0);
    Serial.println("Motor OFF");
  }
  if (speedLevel == 1) {
    analogWrite(dcMotor, 27);
    Serial.println("Slow Speed");
  }
  if (speedLevel == 2) {
    analogWrite(dcMotor, 30);
    Serial.println("Medium Speed");
  }
  if (speedLevel == 3) {
    analogWrite(dcMotor, 33);
    Serial.println("High Speed");
  }
  // LDR light control LED
  bool lightDetected = digitalRead(ldrSensor) == LIGHT_STATE;
  if (lightDetected) {
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(led, LOW);
  }
  delay(100);
}
