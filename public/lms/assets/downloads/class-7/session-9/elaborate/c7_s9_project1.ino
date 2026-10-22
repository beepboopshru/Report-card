/*
Laser Race Timer Project
Laser  -> D2
LDR DO -> D3
Button -> D4
Buzzer -> D5
TM1637 CLK -> D8
TM1637 DIO -> D9
Display format:
12:45 means 12 seconds and 45 centiseconds
*/ const int laserPin = 2;
const int ldrPin = 3;
const int buttonPin = 6;
const int buzzerPin = 5;
const int CLK = 8;
const int DIO = 9;
TM1637Display display(CLK, DIO);
// Most LDR digital modules give HIGH when laser/light falls on it.
// If your project works opposite, change HIGH to LOW.
const int LASER_RECEIVED_STATE = HIGH;
enum RaceState {
  IDLE, RUNNING, FINISHED
};
RaceState raceState = IDLE;
unsigned long raceStartTime = 0;
unsigned long finalTime = 0;
bool lastButtonState = HIGH;
unsigned long lastButtonPressTime = 0;
const unsigned long debounceDelay = 250;
// Ignore LDR for first 500 ms after race starts
// This avoids false trigger at starting time
const unsigned long startIgnoreTime = 500;

void showTime(unsigned long elapsedTime) {
  unsigned int centiseconds = (elapsedTime / 10) % 100;
  unsigned int seconds = (elapsedTime / 1000) % 100;
  int displayValue = (seconds * 100) + centiseconds;
  // Shows SS:CC
  display.showNumberDecEx(displayValue, 0b01000000, true);
}

void winningSound() {
  tone(buzzerPin, 1000, 150);
  delay(200);
  tone(buzzerPin, 1500, 150);
  delay(200);
  tone(buzzerPin, 2000, 250);
  delay(300);
  tone(buzzerPin, 2500, 400);
  delay(450);
  noTone(buzzerPin);
}

bool buttonPressedOnce() {
  bool currentButtonState = digitalRead(buttonPin);
  if (lastButtonState == HIGH && currentButtonState == LOW) {
    if (millis() - lastButtonPressTime > debounceDelay) {
      lastButtonPressTime = millis();
      lastButtonState = currentButtonState;
      return true;
    }
  }
  lastButtonState = currentButtonState;
  return false;
}

bool laserBeamDisturbed() {
  int ldrState = digitalRead(ldrPin);
  // If LDR is not receiving laser, beam is disturbed
  return ldrState != LASER_RECEIVED_STATE;
}

void startRace() {
  raceState = RUNNING;
  raceStartTime = millis();
  finalTime = 0;
  digitalWrite(laserPin, HIGH);
  noTone(buzzerPin);
  display.showNumberDecEx(0, 0b01000000, true);
  Serial.println("Race Started");
}

void finishRace() {
  raceState = FINISHED;
  finalTime = millis() - raceStartTime;
  digitalWrite(laserPin, LOW);
  showTime(finalTime);
  Serial.print("Winner Time: ");
  Serial.print(finalTime / 1000.0);
  Serial.println(" seconds");
  winningSound();
}

void setup() {
  pinMode(laserPin, OUTPUT);
  pinMode(ldrPin, INPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(buzzerPin, OUTPUT);
  digitalWrite(laserPin, LOW);
  digitalWrite(buzzerPin, LOW);
  display.setBrightness(7);
  display.showNumberDecEx(0, 0b01000000, true);
  Serial.begin(9600);
  Serial.println("Laser Race Timer Ready");
}

void loop() {
  if (buttonPressedOnce()) {
    startRace();
  }
  if (raceState == RUNNING) {
    unsigned long elapsedTime = millis() - raceStartTime;
    showTime(elapsedTime);
    // Check LDR only after small starting delay
    if (elapsedTime > startIgnoreTime) {
      if (laserBeamDisturbed()) {
        finishRace();
      }
    }
  }
  if (raceState == FINISHED) {
    // Timer stays frozen here.
    // Next button press will start next race.
  }
}
