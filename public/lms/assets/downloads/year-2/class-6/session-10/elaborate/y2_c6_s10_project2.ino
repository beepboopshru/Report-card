#define SENSOR_PIN 2
#define DISPLAY_CLK 8
#define DISPLAY_DIO 9

void setup() {
  pinMode(SENSOR_PIN, INPUT);
}

void loop() {
  int sensorState = digitalRead(SENSOR_PIN);
  // Integrated system response goes here.
}

// Try changing the sensor response and observe the integrated model again.
