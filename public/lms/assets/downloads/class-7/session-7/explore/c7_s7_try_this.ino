const int touchSensor = 2;
const int dipLed1 = 4;
const int dipLed2 = 5;
const int dipLed3 = 6;
const int dipLed4 = 7;
const int leds[] = {
  dipLed1,
  dipLed2,
  dipLed3,
  dipLed4
};
int touchCount = 0;
bool lastTouchState = LOW;

void setup() {
  pinMode(touchSensor, INPUT);
  pinMode(dipLed1, OUTPUT);
  pinMode(dipLed2, OUTPUT);
  pinMode(dipLed3, OUTPUT);
  pinMode(dipLed4, OUTPUT);
}
