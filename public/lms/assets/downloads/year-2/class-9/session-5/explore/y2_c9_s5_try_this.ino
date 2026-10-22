#define IR_PIN 2        // IR sensor connected to digital pin 2
#define BUZZER_PIN 5    // Buzzer connected to digital pin 5

int count = 0;
// Variable to store number of detections
int lastIRState = HIGH;
// Store previous IR state to detect new object

void setup() {
  pinMode(IR_PIN, INPUT);
  // Set IR sensor pin as input
  pinMode(BUZZER_PIN, OUTPUT);
  // Set buzzer pin as output
  digitalWrite(BUZZER_PIN, LOW);
  // Keep buzzer OFF initially
}

// Function to beep 'n' times

void beep(int times) {
  for (int i = 0; i < times; i++) {
    // Loop 'times' number of beeps
    digitalWrite(BUZZER_PIN, HIGH);
    // Turn buzzer ON
    delay(200);
    // Wait 200 ms
    digitalWrite(BUZZER_PIN, LOW);
    // Turn buzzer OFF
    delay(200);
    // Gap between beeps
  }
}

void loop() {
  int irState = digitalRead(IR_PIN);
  // Read IR sensor value
  // Check if object is detected (LOW) and previous state was HIGH
  if (irState == LOW && lastIRState == HIGH) {
    count++;
    // Increase detection count
    if (count >= 1 && count <= 4) {
      beep(count);
      // Beep equal to count number
    } else {
      count = 0;
      // Reset after 4 detections
    }
    delay(200);
    // Debounce delay to avoid multiple counts
  }
  lastIRState = irState;
  // Store current state for next loop
}
