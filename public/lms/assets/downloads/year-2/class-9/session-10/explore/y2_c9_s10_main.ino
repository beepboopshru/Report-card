#include <TM1637Display.h> // Include library for 4-digit 7-segment display
#define CLK 8 // Clock pin connected to D8
#define DIO 9 // Data pin connected to D9
#define BUTTON_PIN 2 // Push button connected to D2

TM1637Display display(CLK, DIO);
// Create display object
int count = 0;
// Variable to store button press count
int lastButtonState = LOW;

void setup() {
  pinMode(BUTTON_PIN, INPUT);
  // Set button pin as input
  display.setBrightness(7);
  // Set display brightness (0 to 7)
  display.showNumberDec(0);
  // Initialize display with 0
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  // Detect button press (LOW to HIGH transition)
  if (buttonState == HIGH && lastButtonState == LOW) {
    count++;
    // Increment count
    if (count > 9999) count = 0;
    // Reset after 9999
    display.showNumberDec(count);
    // Display the count
    delay(200);
    // Debounce delay
  }
  lastButtonState = buttonState;
  // Store last button state
}
