// Session 9 Grade 6
// Smart Gate
// Vehicle detected = count increases, gate opens, green LED ON
// No vehicle = gate closed, red LED ON
#include <Servo.h>
#include <TM1637Display.h>

const int irSensor = 2;
const int servoPin = 4;
const int redLED = 10;
const int greenLED = 11;
const int CLK = 9;
const int DIO = 8;
const int IR_DETECTED = LOW;
// change to HIGH if opposite
Servo gateServo;
TM1637Display display(CLK, DIO);
int vehicleCount = 0;
bool lastIR = HIGH;

void setup() {
  pinMode(irSensor, INPUT);
  pinMode(redLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
  gateServo.attach(servoPin);
  gateServo.write(0);
  display.setBrightness(7);
  display.showNumberDec(0, true);
  digitalWrite(redLED, HIGH);
  digitalWrite(greenLED, LOW);
}

void loop() {
  bool currentIR = digitalRead(irSensor);
  if (currentIR == IR_DETECTED && lastIR != IR_DETECTED) {
    vehicleCount++;
    if (vehicleCount > 9999) vehicleCount = 0;
    display.showNumberDec(vehicleCount, true);
    digitalWrite(redLED, LOW);
    digitalWrite(greenLED, HIGH);
    gateServo.write(90);
    delay(3000);
    gateServo.write(0);
    digitalWrite(greenLED, LOW);
    digitalWrite(redLED, HIGH);
    delay(300);
  }
  lastIR = currentIR;
}
