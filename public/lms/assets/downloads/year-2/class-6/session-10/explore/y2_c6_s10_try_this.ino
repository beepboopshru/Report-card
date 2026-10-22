#include <TM1637Display.h>
#define CLK 8
#define DIO 9
#define IR_PIN 2     // IR sensor on D2
#define LED_PIN 5    // LED on D5

TM1637Display display(CLK, DIO);
int count = 0;
int lastIRState = HIGH;

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  display.setBrightness(7);
  display.showNumberDec(0);
  digitalWrite(LED_PIN, LOW);
}

void loop() {
  int irState = digitalRead(IR_PIN);
  if (irState == LOW && lastIRState == HIGH) {
    count++;
    if (count == 10) count = 0;
    display.showNumberDec(count);
    digitalWrite(LED_PIN, HIGH);
    // LED ON
    delay(200);
    // visible blink
    digitalWrite(LED_PIN, LOW);
    // LED OFF
  }
  lastIRState = irState;
}
