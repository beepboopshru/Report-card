window.LEVEL2_DEPENDENCIES = Object.freeze({
  "session": "Level 2 Dependencies",
  "topic": "Sensors, Outputs, Circuits, and Control Systems",
  "cover": "assets/images/pdf/year-2/session-1-cover.jpg",
  "engage": [
    {
      "title": "Programmable Lighting",
      "image": "assets/images/hardware-doc/level-2-dependencies/rgb-strip.png",
      "description": "Addressable lighting in stages, signs, and smart rooms uses data to select colors and patterns pixel by pixel.",
      "question": "How can one Arduino data wire control many different LED colors?"
    },
    {
      "title": "Parking and Distance Assistance",
      "image": "assets/images/hardware-doc/level-2-dependencies/ultrasonic.jpg",
      "description": "Vehicles and robots use echo timing to estimate distance and warn when an obstacle is close.",
      "question": "Why does the echo time increase when an object moves farther away?"
    },
    {
      "title": "Automatic Irrigation",
      "image": "assets/images/hardware-doc/level-2-dependencies/moisture.png",
      "description": "Smart gardens measure soil moisture and run a pump only when plants need water.",
      "question": "What should happen when the soil changes from dry to wet?"
    },
    {
      "title": "Fire and Air-Safety Systems",
      "image": "assets/images/hardware-doc/level-2-dependencies/mq2.jpg",
      "description": "Smoke and flame sensors help alarm systems identify warning conditions and activate lights, sounders, or ventilation.",
      "question": "Why should a safety system use more than one type of output?"
    },
    {
      "title": "Wireless Home Automation",
      "image": "assets/images/hardware-doc/level-2-dependencies/bluetooth.jpg",
      "description": "Remote and Bluetooth commands let users control lights, motors, displays, and isolated relay loads without touching the device.",
      "question": "How does a wireless command become a physical action?"
    }
  ],
  "hardware": {
    "led": {
      "name": "LED",
      "overview": "An LED is a semiconductor output that emits light when current passes through its P-N junction in the correct direction.",
      "working": "Electrons from the N-type material recombine with holes in the P-type material. The released energy appears as photons, while the reflective cup and epoxy lens direct the light outward.",
      "pins": [
        "Anode: positive terminal",
        "Cathode: negative terminal",
        "Use a current-limiting resistor or the supplied breakout PCB"
      ],
      "safety": "Check polarity and never drive an unprotected LED directly from a supply that can exceed its rated current.",
      "image": "assets/images/hardware-doc/level-2-dependencies/led.jpg"
    },
    "rgb-strip": {
      "name": "WS2812 RGB LED Strip",
      "overview": "A WS2812 strip combines red, green, and blue LED chips with a control IC inside every addressable pixel.",
      "working": "Arduino sends a precisely timed serial data stream. Each pixel reads its first 24 bits, sets red, green, and blue brightness, and passes the remaining data to the next pixel.",
      "pins": [
        "5V: strip power",
        "GND: common ground",
        "DIN: data from Arduino",
        "DOUT: data to the next pixel"
      ],
      "safety": "Use a suitable 5V supply for long strips, connect grounds together, and avoid powering many pixels from an Arduino I/O pin.",
      "image": "assets/images/hardware-doc/level-2-dependencies/rgb-strip.png"
    },
    "lcd": {
      "name": "16x2 I2C LCD",
      "overview": "A 16x2 LCD displays two rows of sixteen characters. Its I2C backpack reduces the interface to four wires.",
      "working": "Arduino sends commands over SDA and SCL. The I2C controller converts them into the parallel signals used by the LCD to position and display characters.",
      "pins": [
        "VCC: 5V",
        "GND: ground",
        "SDA: A4 on Arduino UNO",
        "SCL: A5 on Arduino UNO"
      ],
      "safety": "Use the correct supply voltage, adjust contrast gently, and avoid scratching or pressing the display panel.",
      "image": "assets/images/hardware-doc/level-2-dependencies/lcd.jpg"
    },
    "speaker": {
      "name": "Speaker / Buzzer",
      "overview": "A speaker or buzzer converts an electrical signal into vibration and then into audible sound.",
      "working": "A piezo disc or electromagnetic diaphragm moves when driven. Active buzzers create a fixed tone internally; passive sounders follow the frequency generated with tone().",
      "pins": [
        "Signal or positive terminal",
        "GND or negative terminal",
        "Observe polarity when the module marks + and -"
      ],
      "safety": "Do not exceed the module voltage or Arduino pin current; use a driver stage for higher-power speakers.",
      "image": "assets/images/hardware-doc/level-2-dependencies/speaker.png"
    },
    "ultrasonic": {
      "name": "Ultrasonic Sensor",
      "overview": "An ultrasonic sensor measures distance by transmitting a sound pulse above human hearing and timing its echo.",
      "working": "The trigger starts a sound burst. The echo pin stays active for the round-trip travel time, allowing distance to be calculated from the speed of sound.",
      "pins": [
        "VCC: power",
        "GND: ground",
        "TRIG: pulse input",
        "ECHO: timed return output"
      ],
      "safety": "Wire power correctly, protect the two transducers from impact, and keep the sensor face unobstructed.",
      "image": "assets/images/hardware-doc/level-2-dependencies/ultrasonic.jpg"
    },
    "mq2": {
      "name": "MQ2 Smoke Sensor",
      "overview": "The MQ2 detects smoke and several combustible gases through a heated tin-dioxide sensing element.",
      "working": "Gas changes the resistance of the heated sensing layer. The module converts that change into an analog level and, when available, a threshold-based digital output.",
      "pins": [
        "VCC: power",
        "GND: ground",
        "AO: analog gas level",
        "DO: comparator threshold output"
      ],
      "safety": "Keep the module dry, allow warm-up time, and test only in a ventilated area without creating dangerous gas concentrations.",
      "image": "assets/images/hardware-doc/level-2-dependencies/mq2.jpg"
    },
    "ir-remote": {
      "name": "IR Remote and Receiver",
      "overview": "An infrared remote sends coded light pulses that a receiver converts into digital commands for Arduino.",
      "working": "The receiver filters the modulated infrared signal and provides a digital pulse pattern. The IRremote library decodes that pattern into a command value.",
      "pins": [
        "VCC: receiver power",
        "GND: ground",
        "OUT: decoded signal to a digital pin"
      ],
      "safety": "Match VCC and GND carefully, avoid bending the receiver pins, and maintain a clear line of sight during testing.",
      "image": "assets/images/hardware-doc/level-2-dependencies/ir-remote.jpg"
    },
    "bluetooth": {
      "name": "Serial Bluetooth Module",
      "overview": "A serial Bluetooth module provides short-range wireless commands between a phone or computer and Arduino.",
      "working": "Commands received by radio are delivered over serial TX/RX lines. Arduino reads each character and changes outputs according to the program.",
      "pins": [
        "VCC: module power",
        "GND: common ground",
        "TX: module transmit",
        "RX: module receive"
      ],
      "safety": "Check the module logic voltage and use a divider when its RX input is not 5V tolerant.",
      "image": "assets/images/hardware-doc/level-2-dependencies/bluetooth.jpg"
    },
    "dc-motor": {
      "name": "DC / CD Motor",
      "overview": "A DC motor converts electrical energy into continuous rotary movement.",
      "working": "Current in the armature creates a magnetic field that interacts with permanent magnets. Reversing polarity reverses rotation; PWM changes average speed.",
      "pins": [
        "Motor terminal 1",
        "Motor terminal 2",
        "Connect through a suitable driver or relay stage"
      ],
      "safety": "Never power a motor directly from an Arduino I/O pin and stop the motor if it overheats or stalls.",
      "image": "assets/images/hardware-doc/level-2-dependencies/dc-motor.png"
    },
    "servo": {
      "name": "Servo Motor",
      "overview": "A servo is a geared motor with feedback electronics for controlled angular movement.",
      "working": "Arduino sends repeated control pulses. Internal feedback compares the requested angle with the shaft position and drives the motor until they match.",
      "pins": [
        "Brown/black: GND",
        "Red: VCC",
        "Orange/yellow: PWM control signal"
      ],
      "safety": "Use a stable supply, connect common ground, and avoid forcing the horn beyond its mechanical range.",
      "image": "assets/images/hardware-doc/level-2-dependencies/servo.jpg"
    },
    "push-button": {
      "name": "Push Button",
      "overview": "A push button is a momentary switch that changes its electrical connection only while it is pressed.",
      "working": "Pressing the actuator brings conductive contacts together. Releasing it lets the spring separate the contacts again.",
      "pins": [
        "One terminal to the input",
        "One terminal to GND when using INPUT_PULLUP"
      ],
      "safety": "Do not force the actuator and use pull-up or pull-down logic so the input never floats.",
      "image": "assets/images/hardware-doc/level-2-dependencies/push-button.png"
    },
    "flame": {
      "name": "Flame Sensor",
      "overview": "A flame sensor responds strongly to infrared light commonly produced by fire, typically in the 760-1100 nm range.",
      "working": "Its light-sensitive element changes output when flame radiation is detected. A comparator can provide a digital threshold while analog output represents intensity.",
      "pins": [
        "VCC: power",
        "GND: ground",
        "DO: digital threshold",
        "AO: analog intensity when available"
      ],
      "safety": "Use a safe simulated source whenever possible and never let students create or approach an uncontrolled flame.",
      "image": "assets/images/hardware-doc/level-2-dependencies/flame.png"
    },
    "vibration": {
      "name": "Vibration Sensor",
      "overview": "A vibration sensor detects movement, shock, or repeated mechanical vibration.",
      "working": "Movement makes an internal spring touch a central contact. The comparator cleans these brief contacts into a readable HIGH/LOW signal.",
      "pins": [
        "VCC: power",
        "GND: ground",
        "DO: digital vibration output"
      ],
      "safety": "Keep the module dry, avoid excessive impact, and do not draw output-device current from the sensor pin.",
      "image": "assets/images/hardware-doc/level-2-dependencies/vibration.png"
    },
    "bo-motor": {
      "name": "BO Gear Motor",
      "overview": "A BO motor combines a small brushed DC motor with a plastic gearbox for lower speed and higher torque.",
      "working": "The internal motor spins quickly while spur gears reduce RPM and multiply torque at the output shaft.",
      "pins": [
        "Terminal 1",
        "Terminal 2",
        "Reverse terminal polarity to reverse direction"
      ],
      "safety": "Always use a motor driver, avoid prolonged stalls, and stay within the motor voltage rating.",
      "image": "assets/images/hardware-doc/level-2-dependencies/bo-motor.png"
    },
    "motor-driver": {
      "name": "Motor Driver",
      "overview": "A motor driver is the power interface between low-current Arduino signals and higher-current motors or pumps.",
      "working": "H-bridge switches change current direction for forward/reverse motion. Enable inputs can accept PWM for speed control.",
      "pins": [
        "Motor supply and GND",
        "OUT1/OUT2 and OUT3/OUT4 to motors",
        "IN1-IN4 for direction",
        "ENA/ENB for enable or PWM"
      ],
      "safety": "Connect a common ground, observe current limits, keep the heatsink clear, and disconnect power before rewiring.",
      "image": "assets/images/hardware-doc/level-2-dependencies/motor-driver.png"
    },
    "submersible-pump": {
      "name": "Submersible Pump",
      "overview": "A sealed DC pump moves water while fully submerged.",
      "working": "The internal motor spins an impeller, creating low pressure at the inlet and forcing water through the outlet nozzle.",
      "pins": [
        "Red: positive supply/driver output",
        "Black: negative supply/driver output"
      ],
      "safety": "Never run the pump dry, keep the intake submerged, and isolate all exposed electronics from water.",
      "image": "assets/images/hardware-doc/level-2-dependencies/submersible-pump.png"
    },
    "rain": {
      "name": "Rain Sensor",
      "overview": "A rain sensor detects water droplets using interleaved conductive tracks on a sensing plate.",
      "working": "Water bridges the tracks and lowers resistance. The LM393 module provides an analog level and a sensitivity-adjusted digital trigger.",
      "pins": [
        "VCC: 3.3V-5V",
        "GND: ground",
        "DO: digital threshold",
        "AO: analog moisture level"
      ],
      "safety": "Keep the comparator board dry and power the sensing plate only while reading to reduce corrosion.",
      "image": "assets/images/hardware-doc/level-2-dependencies/rain.png"
    },
    "moisture": {
      "name": "Soil-Moisture Sensor",
      "overview": "A resistive soil-moisture sensor estimates water content from conductivity between two probes.",
      "working": "Wet soil conducts more easily than dry soil. The interface converts probe resistance into an analog value and a comparator-based digital threshold.",
      "pins": [
        "VCC: 3.3V-5V",
        "GND: ground",
        "DO: dryness threshold",
        "AO: variable moisture level"
      ],
      "safety": "Insert only the probe into soil, keep the interface dry, and limit powered time to slow electrolysis and corrosion.",
      "image": "assets/images/hardware-doc/level-2-dependencies/moisture.png"
    },
    "dht11": {
      "name": "DHT11 Temperature and Humidity Sensor",
      "overview": "The DHT11 combines a resistive humidity element, an NTC thermistor, and a digital controller.",
      "working": "The internal controller measures both sensing elements and sends calibrated temperature and humidity values over a single data line.",
      "pins": [
        "VCC: 3.5V-5.5V",
        "DATA: digital single-bus output",
        "GND: ground"
      ],
      "safety": "Read no faster than once per second and protect the sensor from condensation, solvents, and heavy dust.",
      "image": "assets/images/hardware-doc/level-2-dependencies/dht11.png"
    },
    "relay": {
      "name": "Relay Box",
      "overview": "A relay uses a low-voltage control signal to switch a separate higher-power circuit.",
      "working": "Current energizes an isolated coil or optocoupler input. The electromagnet moves an armature between normally closed and normally open contacts.",
      "pins": [
        "VCC/GND and IN on the control side",
        "COM: common contact",
        "NO: normally open",
        "NC: normally closed"
      ],
      "safety": "Mains voltage can cause severe injury. Students must use only teacher-approved low-voltage loads unless a qualified adult handles the enclosed mains wiring.",
      "image": "assets/images/hardware-doc/level-2-dependencies/relay.png"
    }
  },
  "grades": {
    "6": [
      {
        "id": "s1-rgb-led-strip",
        "session": 1,
        "title": "RGB LED Strip",
        "components": "RGB LED strip (30 LEDs), push switch",
        "pins": "LED strip D2; push switch D5",
        "code": "// Session 1 - Grade 6: RGB strip\n// Arduino UNO\n\n#include <Adafruit_NeoPixel.h>\nconst byte STRIP_PIN=2,BUTTON_PIN=5,LED_COUNT=30;Adafruit_NeoPixel strip(LED_COUNT,STRIP_PIN,NEO_GRB+NEO_KHZ800);\nbyte mode=0;bool last=HIGH;unsigned long db=0;\nvoid show(){const uint32_t c[]={strip.Color(0,0,0),strip.Color(255,0,0),strip.Color(0,255,0),strip.Color(0,0,255),strip.Color(255,120,0),strip.Color(150,0,255),strip.Color(0,180,180),strip.Color(255,255,255)};strip.fill(c[mode]);strip.show();}\nvoid setup(){pinMode(BUTTON_PIN,INPUT_PULLUP);strip.begin();strip.clear();show();}\nvoid loop(){bool b=digitalRead(BUTTON_PIN);if(last&& !b&&millis()-db>180){mode=(mode+1)%2;db=millis();show();}last=b;}",
        "hardware": [
          "rgb-strip",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-01-s1-rgb-led-strip.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s1-rgb-led-strip/class-6-s1-rgb-led-strip-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s1-rgb-led-strip/Session_01_RGB_LED_Strip.ino"
      },
      {
        "id": "s2-vibration-alert",
        "session": 2,
        "title": "Vibration Alert",
        "components": "Vibration sensor, speaker",
        "pins": "vibration D2; speaker D5",
        "code": "// Session 2 - Grade 6: Vibration alert\n// Arduino UNO\n\nconst byte SENSOR=2,BUZZER=5;\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);}\nvoid loop(){bool hit=digitalRead(SENSOR);if(hit)tone(BUZZER,900);else noTone(BUZZER);}",
        "hardware": [
          "vibration",
          "speaker",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-02-s2-vibration-alert.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s2-vibration-alert/class-6-s2-vibration-alert-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s2-vibration-alert/Session_02_Vibration_Alert.ino"
      },
      {
        "id": "s3-lcd-mode-selector",
        "session": 3,
        "title": "LCD Mode Selector",
        "components": "LCD, push switch",
        "pins": "button D5; LCD A4/A5",
        "code": "// Session 3 - Grade 6: LCD selector\n// Arduino UNO\n\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27,16,2);const byte BTN=5;byte mode=0;bool last=HIGH;unsigned long db=0;\nvoid show(){const char* names[]={\"OFF\",\"SELECT 1\",\"WARNING\",\"ALERT\"};lcd.clear();lcd.print(\"Mode:\");lcd.setCursor(0,1);lcd.print(names[mode]);}\nvoid setup(){pinMode(BTN,INPUT_PULLUP);lcd.init();lcd.backlight();show();}\nvoid loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){mode=(mode+1)%2;db=millis();show();}last=b;}",
        "hardware": [
          "lcd",
          "push-button",
          "speaker",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-03-s3-lcd-mode-selector.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s3-lcd-mode-selector/class-6-s3-lcd-mode-selector-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s3-lcd-mode-selector/Session_03_LCD_Mode_Selector.ino"
      },
      {
        "id": "s4-ultrasonic-distance-system",
        "session": 4,
        "title": "Ultrasonic Distance System",
        "components": "Ultrasonic sensor, LCD",
        "pins": "ultrasonic D8/D9; LCD A4/A5",
        "code": "// Session 4 - Grade 6: Distance monitor\n// Arduino UNO\n\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\n\nLiquidCrystal_I2C lcd(0x27,16,2);const byte TRIG=8,ECHO=9;\nfloat cm(){digitalWrite(TRIG,0);delayMicroseconds(2);digitalWrite(TRIG,1);delayMicroseconds(10);digitalWrite(TRIG,0);unsigned long u=pulseIn(ECHO,HIGH,30000);return u?u*.0343/2:999;}\nvoid setup(){pinMode(TRIG,OUTPUT);pinMode(ECHO,INPUT);lcd.init();lcd.backlight();}\nvoid loop(){float d=cm();bool near=d<20;lcd.setCursor(0,0);lcd.print(\"Distance: \");lcd.print((int)d);lcd.print(\" cm \");lcd.setCursor(0,1);lcd.print(near?\"OBJECT NEAR     \":\"AREA CLEAR      \");delay(200);}",
        "hardware": [
          "ultrasonic",
          "lcd",
          "servo"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-04-s4-ultrasonic-distance-system.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s4-ultrasonic-distance-system/class-6-s4-ultrasonic-distance-system-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s4-ultrasonic-distance-system/Session_04_Ultrasonic_Distance_System.ino"
      },
      {
        "id": "s6-bo-motor",
        "session": 6,
        "title": "BO Motor",
        "components": "BO motor, 2-wheel-drive motor driver, push switch",
        "pins": "driver MA inputs D10/D11; push switch D5",
        "code": "// Session 6 - Grade 6: BO motor via 2WD driver\n// Arduino UNO\n\n// Load on driver output MA; D10/D11 connect to MA control inputs.\nconst byte MA1=10,MA2=11,BTN=5;\nvoid setup(){pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(BTN,INPUT_PULLUP);digitalWrite(MA1,0);digitalWrite(MA2,0);}\nbool on=0,last=1;unsigned long db=0;void loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){on=!on;db=millis();digitalWrite(MA1,on);digitalWrite(MA2,0);}last=b;}",
        "hardware": [
          "bo-motor",
          "motor-driver",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-05-s6-bo-motor.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s6-bo-motor/class-6-s6-bo-motor-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s6-bo-motor/Session_06_BO_Motor.ino"
      },
      {
        "id": "s6-submersible-pump",
        "session": 6,
        "title": "Submersible Pump",
        "components": "Submersible pump, 2-wheel-drive motor driver, push switch",
        "pins": "driver MA inputs D10/D11; push switch D5",
        "code": "// Session 6 - Grade 6: Pump via 2WD driver\n// Arduino UNO\n\n// Load on driver output MA; D10/D11 connect to MA control inputs.\nconst byte MA1=10,MA2=11,BTN=5;\nvoid setup(){pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(BTN,INPUT_PULLUP);digitalWrite(MA1,0);digitalWrite(MA2,0);}\nbool on=0,last=1;unsigned long db=0;void loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){on=!on;db=millis();digitalWrite(MA1,on);digitalWrite(MA2,0);}last=b;}",
        "hardware": [
          "submersible-pump",
          "motor-driver",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-06-s6-submersible-pump.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s6-submersible-pump/class-6-s6-submersible-pump-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s6-submersible-pump/Session_06_Submersible_Pump.ino"
      },
      {
        "id": "s7-rain-response",
        "session": 7,
        "title": "Rain Response",
        "components": "Rain sensor, servo motor",
        "pins": "rain D2; servo D3",
        "code": "// Session 7 - Grade 6: Rain response\n// Arduino UNO\n\n#include <Servo.h>\nconst byte RAIN=2,SERVO_PIN=3,BUZZER=5;Servo cover;\nvoid setup(){pinMode(RAIN,INPUT);pinMode(BUZZER,OUTPUT);cover.attach(SERVO_PIN);cover.write(0);}\nvoid loop(){bool wet=digitalRead(RAIN)==LOW;cover.write(wet?90:0);delay(200);}",
        "hardware": [
          "rain",
          "servo",
          "speaker"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-07-s7-rain-response.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s7-rain-response/class-6-s7-rain-response-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s7-rain-response/Session_07_Rain_Response.ino"
      },
      {
        "id": "s7-soil-moisture-irrigation",
        "session": 7,
        "title": "Soil-Moisture Irrigation",
        "components": "Moisture sensor, pump, 2-wheel-drive motor driver",
        "pins": "moisture digital D2; pump driver MA D10/D11",
        "code": "// Session 7 - Grade 6: Irrigation via 2WD driver\n// Arduino UNO\n\n// Pump on motor-driver output MA; D10/D11 are MA control inputs.\nconst byte SOIL=2,MA1=10,MA2=11;\nvoid setup(){pinMode(SOIL,INPUT);pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);Serial.begin(9600);}\nvoid loop(){bool dry=digitalRead(SOIL)==HIGH;digitalWrite(MA1,dry);digitalWrite(MA2,LOW);Serial.println(dry?\"DRY\":\"MOIST\");delay(500);}",
        "hardware": [
          "moisture",
          "submersible-pump",
          "motor-driver",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-08-s7-soil-moisture-irrigation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s7-soil-moisture-irrigation/class-6-s7-soil-moisture-irrigation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s7-soil-moisture-irrigation/Session_07_Soil_Moisture_Irrigation.ino"
      },
      {
        "id": "s8-temperature-and-humidity",
        "session": 8,
        "title": "Temperature and Humidity",
        "components": "DHT11, speaker",
        "pins": "DHT11 D2; speaker D5",
        "code": "// Session 8 - Grade 6: Climate controller\n// Arduino UNO\n\n#include <DHT.h>\n\n#define DHTTYPE DHT11\nconst byte DHT_PIN=2,BUZZER=5;const float LIMIT=30;DHT dht(DHT_PIN,DHTTYPE);\nvoid setup(){pinMode(BUZZER,OUTPUT);dht.begin();}\nvoid loop(){float h=dht.readHumidity(),t=dht.readTemperature();if(isnan(t)||isnan(h))return;bool hot=t>=LIMIT;if(hot)tone(BUZZER,1200,180);delay(1000);}",
        "hardware": [
          "dht11",
          "speaker",
          "lcd",
          "dc-motor",
          "relay"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-09-s8-temperature-and-humidity.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s8-temperature-and-humidity/class-6-s8-temperature-and-humidity-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s8-temperature-and-humidity/Session_08_Temperature_and_Humidity.ino"
      },
      {
        "id": "s9-flame-detection",
        "session": 9,
        "title": "Flame Detection",
        "components": "Flame sensor, speaker",
        "pins": "flame D3; speaker D5",
        "code": "// Session 9 - Grade 6: Flame warning\n// Arduino UNO\n\n\nconst byte SENSOR=3,BUZZER=5;\n\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);}\nvoid loop(){bool danger=digitalRead(SENSOR)==LOW;if(danger)tone(BUZZER,1400,180);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "flame",
          "speaker",
          "dc-motor",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-10-s9-flame-detection.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s9-flame-detection/class-6-s9-flame-detection-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s9-flame-detection/Session_09_Flame_Detection.ino"
      },
      {
        "id": "s9-smoke-detection",
        "session": 9,
        "title": "Smoke Detection",
        "components": "MQ2 smoke sensor, speaker",
        "pins": "MQ2 A0; speaker D5",
        "code": "// Session 9 - Grade 6: Smoke warning\n// Arduino UNO\n\n\nconst byte SENSOR=A0,BUZZER=5;\n\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);}\nvoid loop(){bool danger=analogRead(SENSOR)>400;if(danger)tone(BUZZER,1400,180);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "mq2",
          "speaker",
          "rgb-strip",
          "dc-motor",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-11-s9-smoke-detection.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s9-smoke-detection/class-6-s9-smoke-detection-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s9-smoke-detection/Session_09_Smoke_Detection.ino"
      },
      {
        "id": "s11-ir-remote-automation",
        "session": 11,
        "title": "IR Remote Automation",
        "components": "IR remote and receiver, 1 Watt LED",
        "pins": "IR receiver D2; LED D7",
        "code": "// Session 11 - Grade 6: IR control\n// Arduino UNO\n\n#include <IRremote.hpp>\n\nconst byte IR_PIN=2,LED_PIN=7;\n\nvoid setup(){IrReceiver.begin(IR_PIN);pinMode(LED_PIN,OUTPUT);}\nvoid loop(){if(!IrReceiver.decode())return;byte c=IrReceiver.decodedIRData.command;IrReceiver.resume();if(c==0x45)digitalWrite(LED_PIN,!digitalRead(LED_PIN));}",
        "hardware": [
          "ir-remote",
          "rgb-strip",
          "bo-motor",
          "motor-driver",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-12-s11-ir-remote-automation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s11-ir-remote-automation/class-6-s11-ir-remote-automation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s11-ir-remote-automation/Session_11_IR_Remote_Automation.ino"
      },
      {
        "id": "s12-bluetooth-automation",
        "session": 12,
        "title": "Bluetooth Automation",
        "components": "HM-10 Bluetooth module, 1 Watt LED",
        "pins": "HM-10 D8/D9; LED D7",
        "code": "// Session 12 - Grade 6: HM-10 automation\n// Arduino UNO\n\n#include <SoftwareSerial.h>\n\nSoftwareSerial hm10(8,9);const byte LED=7;\nvoid setLoad(bool on){digitalWrite(LED,on);}\nvoid setup(){pinMode(LED,OUTPUT);hm10.begin(9600);setLoad(false);}\nvoid loop(){if(hm10.available()){char c=hm10.read();if(c=='1'||c=='A')setLoad(true);if(c=='0'||c=='B')setLoad(false);}}",
        "hardware": [
          "bluetooth",
          "led",
          "relay",
          "lcd"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-6/dependency-13-s12-bluetooth-automation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-6/s12-bluetooth-automation/class-6-s12-bluetooth-automation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-6/s12-bluetooth-automation/Session_12_Bluetooth_Automation.ino"
      }
    ],
    "7": [
      {
        "id": "s1-rgb-led-strip",
        "session": 1,
        "title": "RGB LED Strip",
        "components": "RGB LED strip (30 LEDs), push switch",
        "pins": "LED strip D2; push switch D5",
        "code": "// Session 1 - Grade 7: RGB strip\n// Arduino UNO\n\n#include <Adafruit_NeoPixel.h>\nconst byte STRIP_PIN=2,BUTTON_PIN=5,LED_COUNT=30;Adafruit_NeoPixel strip(LED_COUNT,STRIP_PIN,NEO_GRB+NEO_KHZ800);\nbyte mode=0;bool last=HIGH;unsigned long db=0;\nvoid show(){const uint32_t c[]={strip.Color(0,0,0),strip.Color(255,0,0),strip.Color(0,255,0),strip.Color(0,0,255),strip.Color(255,120,0),strip.Color(150,0,255),strip.Color(0,180,180),strip.Color(255,255,255)};strip.fill(c[mode]);strip.show();}\nvoid setup(){pinMode(BUTTON_PIN,INPUT_PULLUP);strip.begin();strip.clear();show();}\nvoid loop(){bool b=digitalRead(BUTTON_PIN);if(last&& !b&&millis()-db>180){mode=(mode+1)%5;db=millis();show();}last=b;}",
        "hardware": [
          "rgb-strip",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-01-s1-rgb-led-strip.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s1-rgb-led-strip/class-7-s1-rgb-led-strip-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s1-rgb-led-strip/Session_01_RGB_LED_Strip.ino"
      },
      {
        "id": "s2-vibration-alert",
        "session": 2,
        "title": "Vibration Alert",
        "components": "Vibration sensor, speaker",
        "pins": "vibration D2; speaker D5",
        "code": "// Session 2 - Grade 7: Vibration alert\n// Arduino UNO\n\nconst byte SENSOR=2,BUZZER=5;\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);}\nvoid loop(){bool hit=digitalRead(SENSOR);if(hit)tone(BUZZER,1300);else noTone(BUZZER);}",
        "hardware": [
          "vibration",
          "speaker",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-02-s2-vibration-alert.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s2-vibration-alert/class-7-s2-vibration-alert-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s2-vibration-alert/Session_02_Vibration_Alert.ino"
      },
      {
        "id": "s3-lcd-mode-selector",
        "session": 3,
        "title": "LCD Mode Selector",
        "components": "LCD, push switch",
        "pins": "button D5; LCD A4/A5",
        "code": "// Session 3 - Grade 7: LCD selector\n// Arduino UNO\n\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27,16,2);const byte BTN=5;byte mode=0;bool last=HIGH;unsigned long db=0;\nvoid show(){const char* names[]={\"OFF\",\"SELECT 1\",\"WARNING\",\"ALERT\"};lcd.clear();lcd.print(\"Mode:\");lcd.setCursor(0,1);lcd.print(names[mode]);}\nvoid setup(){pinMode(BTN,INPUT_PULLUP);lcd.init();lcd.backlight();show();}\nvoid loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){mode=(mode+1)%3;db=millis();show();}last=b;}",
        "hardware": [
          "lcd",
          "push-button",
          "speaker",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-03-s3-lcd-mode-selector.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s3-lcd-mode-selector/class-7-s3-lcd-mode-selector-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s3-lcd-mode-selector/Session_03_LCD_Mode_Selector.ino"
      },
      {
        "id": "s4-ultrasonic-distance-system",
        "session": 4,
        "title": "Ultrasonic Distance System",
        "components": "Ultrasonic sensor, LCD",
        "pins": "ultrasonic D8/D9; LCD A4/A5",
        "code": "// Session 4 - Grade 7: Distance monitor\n// Arduino UNO\n\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\n\nLiquidCrystal_I2C lcd(0x27,16,2);const byte TRIG=8,ECHO=9;\nfloat cm(){digitalWrite(TRIG,0);delayMicroseconds(2);digitalWrite(TRIG,1);delayMicroseconds(10);digitalWrite(TRIG,0);unsigned long u=pulseIn(ECHO,HIGH,30000);return u?u*.0343/2:999;}\nvoid setup(){pinMode(TRIG,OUTPUT);pinMode(ECHO,INPUT);lcd.init();lcd.backlight();}\nvoid loop(){float d=cm();bool near=d<20;lcd.setCursor(0,0);lcd.print(\"Distance: \");lcd.print((int)d);lcd.print(\" cm \");lcd.setCursor(0,1);lcd.print(near?\"OBJECT NEAR     \":\"AREA CLEAR      \");delay(200);}",
        "hardware": [
          "ultrasonic",
          "lcd",
          "servo"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-04-s4-ultrasonic-distance-system.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s4-ultrasonic-distance-system/class-7-s4-ultrasonic-distance-system-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s4-ultrasonic-distance-system/Session_04_Ultrasonic_Distance_System.ino"
      },
      {
        "id": "s6-bo-motor",
        "session": 6,
        "title": "BO Motor",
        "components": "BO motor, 2-wheel-drive motor driver, push switch",
        "pins": "driver MA inputs D10/D11; push switch D5",
        "code": "// Session 6 - Grade 7: BO motor via 2WD driver\n// Arduino UNO\n\n// Load on driver output MA; D10/D11 connect to MA control inputs.\nconst byte MA1=10,MA2=11,BTN=5;\nvoid setup(){pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(BTN,INPUT_PULLUP);digitalWrite(MA1,0);digitalWrite(MA2,0);}\nbool on=0,last=1;unsigned long db=0;void loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){on=!on;db=millis();digitalWrite(MA1,on);digitalWrite(MA2,0);}last=b;}",
        "hardware": [
          "bo-motor",
          "motor-driver",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-05-s6-bo-motor.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s6-bo-motor/class-7-s6-bo-motor-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s6-bo-motor/Session_06_BO_Motor.ino"
      },
      {
        "id": "s6-submersible-pump",
        "session": 6,
        "title": "Submersible Pump",
        "components": "Submersible pump, 2-wheel-drive motor driver, push switch",
        "pins": "driver MA inputs D10/D11; push switch D5",
        "code": "// Session 6 - Grade 7: Pump via 2WD driver\n// Arduino UNO\n\n// Load on driver output MA; D10/D11 connect to MA control inputs.\nconst byte MA1=10,MA2=11,BTN=5;\nvoid setup(){pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(BTN,INPUT_PULLUP);digitalWrite(MA1,0);digitalWrite(MA2,0);}\nbool on=0,last=1;unsigned long db=0;void loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){on=!on;db=millis();digitalWrite(MA1,on);digitalWrite(MA2,0);}last=b;}",
        "hardware": [
          "submersible-pump",
          "motor-driver",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-06-s6-submersible-pump.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s6-submersible-pump/class-7-s6-submersible-pump-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s6-submersible-pump/Session_06_Submersible_Pump.ino"
      },
      {
        "id": "s7-rain-response",
        "session": 7,
        "title": "Rain Response",
        "components": "Rain sensor, servo motor, speaker",
        "pins": "rain D2; servo D3; speaker D5",
        "code": "// Session 7 - Grade 7: Rain response\n// Arduino UNO\n\n#include <Servo.h>\nconst byte RAIN=2,SERVO_PIN=3,BUZZER=5;Servo cover;\nvoid setup(){pinMode(RAIN,INPUT);pinMode(BUZZER,OUTPUT);cover.attach(SERVO_PIN);cover.write(0);}\nvoid loop(){bool wet=digitalRead(RAIN)==LOW;cover.write(wet?90:0);if(wet)tone(BUZZER,1200,150);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "rain",
          "servo",
          "speaker"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-07-s7-rain-response.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s7-rain-response/class-7-s7-rain-response-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s7-rain-response/Session_07_Rain_Response.ino"
      },
      {
        "id": "s7-soil-moisture-irrigation",
        "session": 7,
        "title": "Soil-Moisture Irrigation",
        "components": "Moisture sensor, pump, 2-wheel-drive motor driver",
        "pins": "moisture digital D2; pump driver MA D10/D11",
        "code": "// Session 7 - Grade 7: Irrigation via 2WD driver\n// Arduino UNO\n\n// Pump on motor-driver output MA; D10/D11 are MA control inputs.\nconst byte SOIL=2,MA1=10,MA2=11;\nvoid setup(){pinMode(SOIL,INPUT);pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);Serial.begin(9600);}\nvoid loop(){bool dry=digitalRead(SOIL)==HIGH;digitalWrite(MA1,dry);digitalWrite(MA2,LOW);Serial.println(dry?\"DRY\":\"MOIST\");delay(500);}",
        "hardware": [
          "moisture",
          "submersible-pump",
          "motor-driver",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-08-s7-soil-moisture-irrigation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s7-soil-moisture-irrigation/class-7-s7-soil-moisture-irrigation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s7-soil-moisture-irrigation/Session_07_Soil_Moisture_Irrigation.ino"
      },
      {
        "id": "s8-temperature-and-humidity",
        "session": 8,
        "title": "Temperature and Humidity",
        "components": "DHT11, speaker, LCD",
        "pins": "DHT11 D2; speaker D5; LCD A4/A5",
        "code": "// Session 8 - Grade 7: Climate controller\n// Arduino UNO\n\n#include <DHT.h>\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27,16,2);\n#define DHTTYPE DHT11\nconst byte DHT_PIN=2,BUZZER=5;const float LIMIT=30;DHT dht(DHT_PIN,DHTTYPE);\nvoid setup(){pinMode(BUZZER,OUTPUT);dht.begin();lcd.init();lcd.backlight();}\nvoid loop(){float h=dht.readHumidity(),t=dht.readTemperature();if(isnan(t)||isnan(h))return;bool hot=t>=LIMIT;lcd.setCursor(0,0);lcd.print(\"Temp: \");lcd.print(t,1);lcd.print(\" C  \");lcd.setCursor(0,1);lcd.print(\"Humidity: \");lcd.print(h,0);lcd.print(\"% \");if(hot)tone(BUZZER,1200,180);delay(1000);}",
        "hardware": [
          "dht11",
          "speaker",
          "lcd",
          "dc-motor",
          "relay"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-09-s8-temperature-and-humidity.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s8-temperature-and-humidity/class-7-s8-temperature-and-humidity-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s8-temperature-and-humidity/Session_08_Temperature_and_Humidity.ino"
      },
      {
        "id": "s9-flame-detection",
        "session": 9,
        "title": "Flame Detection",
        "components": "Flame sensor, speaker, 1 Watt LED",
        "pins": "flame D3; speaker D5; LED D7",
        "code": "// Session 9 - Grade 7: Flame warning\n// Arduino UNO\n\n\nconst byte SENSOR=3,BUZZER=5,LED=7;\n\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);pinMode(LED,OUTPUT);}\nvoid loop(){bool danger=digitalRead(SENSOR)==LOW;digitalWrite(LED,danger);if(danger)tone(BUZZER,1400,180);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "flame",
          "speaker",
          "dc-motor",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-10-s9-flame-detection.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s9-flame-detection/class-7-s9-flame-detection-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s9-flame-detection/Session_09_Flame_Detection.ino"
      },
      {
        "id": "s9-smoke-detection",
        "session": 9,
        "title": "Smoke Detection",
        "components": "MQ2 smoke sensor, speaker, LED strip (30 LEDs)",
        "pins": "MQ2 A0; speaker D5; strip D2",
        "code": "// Session 9 - Grade 7: Smoke warning\n// Arduino UNO\n\n#include <Adafruit_NeoPixel.h>\nconst byte SENSOR=A0,BUZZER=5,STRIP_PIN=2;\nAdafruit_NeoPixel strip(30,STRIP_PIN,NEO_GRB+NEO_KHZ800);\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);strip.begin();strip.clear();strip.show();}\nvoid loop(){bool danger=analogRead(SENSOR)>400;strip.fill(danger?strip.Color(255,0,0):strip.Color(0,80,0));strip.show();if(danger)tone(BUZZER,1400,180);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "mq2",
          "speaker",
          "rgb-strip",
          "dc-motor",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-11-s9-smoke-detection.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s9-smoke-detection/class-7-s9-smoke-detection-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s9-smoke-detection/Session_09_Smoke_Detection.ino"
      },
      {
        "id": "s11-ir-remote-automation",
        "session": 11,
        "title": "IR Remote Automation",
        "components": "IR remote and receiver, LED strip (30 LEDs)",
        "pins": "IR receiver D2; strip D3",
        "code": "// Session 11 - Grade 7: IR control\n// Arduino UNO\n\n#include <IRremote.hpp>\n#include <Adafruit_NeoPixel.h>\nconst byte IR_PIN=2,STRIP_PIN=3;\nAdafruit_NeoPixel strip(30,STRIP_PIN,NEO_GRB+NEO_KHZ800);\nvoid setup(){IrReceiver.begin(IR_PIN);strip.begin();strip.clear();strip.show();}\nvoid loop(){if(!IrReceiver.decode())return;byte c=IrReceiver.decodedIRData.command;IrReceiver.resume();if(c==0x45){strip.fill(strip.Color(255,255,255));strip.show();}if(c==0x46){strip.fill(strip.Color(0,0,255));strip.show();}if(c==0x47){strip.clear();strip.show();}}",
        "hardware": [
          "ir-remote",
          "rgb-strip",
          "bo-motor",
          "motor-driver",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-12-s11-ir-remote-automation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s11-ir-remote-automation/class-7-s11-ir-remote-automation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s11-ir-remote-automation/Session_11_IR_Remote_Automation.ino"
      },
      {
        "id": "s12-bluetooth-automation",
        "session": 12,
        "title": "Bluetooth Automation",
        "components": "HM-10 Bluetooth module, 1 Watt LED",
        "pins": "HM-10 D8/D9; LED D7",
        "code": "// Session 12 - Grade 7: HM-10 automation\n// Arduino UNO\n\n#include <SoftwareSerial.h>\n\nSoftwareSerial hm10(8,9);const byte LED=7;\nvoid setLoad(bool on){digitalWrite(LED,on);}\nvoid setup(){pinMode(LED,OUTPUT);hm10.begin(9600);setLoad(false);}\nvoid loop(){if(hm10.available()){char c=hm10.read();if(c=='1'||c=='A')setLoad(true);if(c=='0'||c=='B')setLoad(false);}}",
        "hardware": [
          "bluetooth",
          "led",
          "relay",
          "lcd"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-7/dependency-13-s12-bluetooth-automation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-7/s12-bluetooth-automation/class-7-s12-bluetooth-automation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-7/s12-bluetooth-automation/Session_12_Bluetooth_Automation.ino"
      }
    ],
    "8": [
      {
        "id": "s1-rgb-led-strip",
        "session": 1,
        "title": "RGB LED Strip",
        "components": "RGB LED strip (30 LEDs), push switch",
        "pins": "LED strip D2; push switch D5",
        "code": "// Session 1 - Grade 8: RGB strip\n// Arduino UNO\n\n#include <Adafruit_NeoPixel.h>\nconst byte STRIP_PIN=2,BUTTON_PIN=5,LED_COUNT=30;Adafruit_NeoPixel strip(LED_COUNT,STRIP_PIN,NEO_GRB+NEO_KHZ800);\nbyte mode=0;bool last=HIGH;unsigned long db=0;\nvoid show(){const uint32_t c[]={strip.Color(0,0,0),strip.Color(255,0,0),strip.Color(0,255,0),strip.Color(0,0,255),strip.Color(255,120,0),strip.Color(150,0,255),strip.Color(0,180,180),strip.Color(255,255,255)};strip.fill(c[mode]);strip.show();}\nvoid setup(){pinMode(BUTTON_PIN,INPUT_PULLUP);strip.begin();strip.clear();show();}\nvoid loop(){bool b=digitalRead(BUTTON_PIN);if(last&& !b&&millis()-db>180){mode=(mode+1)%7;db=millis();show();}last=b;}",
        "hardware": [
          "rgb-strip",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-01-s1-rgb-led-strip.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s1-rgb-led-strip/class-8-s1-rgb-led-strip-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s1-rgb-led-strip/Session_01_RGB_LED_Strip.ino"
      },
      {
        "id": "s2-vibration-alert",
        "session": 2,
        "title": "Vibration Alert",
        "components": "Vibration sensor, speaker, 1 Watt LEDs",
        "pins": "vibration D2; speaker D5; LEDs D6/D7",
        "code": "// Session 2 - Grade 8: Vibration alert\n// Arduino UNO\n\nconst byte SENSOR=2,BUZZER=5,RED_LED=6,GREEN_LED=7;\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);pinMode(RED_LED,OUTPUT);pinMode(GREEN_LED,OUTPUT);}\nvoid loop(){bool hit=digitalRead(SENSOR);digitalWrite(RED_LED,hit);digitalWrite(GREEN_LED,LOW);if(hit)tone(BUZZER,1300);else noTone(BUZZER);}",
        "hardware": [
          "vibration",
          "speaker",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-02-s2-vibration-alert.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s2-vibration-alert/class-8-s2-vibration-alert-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s2-vibration-alert/Session_02_Vibration_Alert.ino"
      },
      {
        "id": "s3-lcd-mode-selector",
        "session": 3,
        "title": "LCD Mode Selector",
        "components": "LCD, push switch, speaker",
        "pins": "button D5; LCD A4/A5; speaker D6",
        "code": "// Session 3 - Grade 8: LCD selector\n// Arduino UNO\n\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27,16,2);const byte BTN=5,BUZZER=6;byte mode=0;bool last=HIGH;unsigned long db=0;\nvoid show(){const char* names[]={\"OFF\",\"SELECT 1\",\"WARNING\",\"ALERT\"};lcd.clear();lcd.print(\"Mode:\");lcd.setCursor(0,1);lcd.print(names[mode]);if(mode>1)tone(BUZZER,1000,100);}\nvoid setup(){pinMode(BTN,INPUT_PULLUP);pinMode(BUZZER,OUTPUT);lcd.init();lcd.backlight();show();}\nvoid loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){mode=(mode+1)%4;db=millis();show();}last=b;}",
        "hardware": [
          "lcd",
          "push-button",
          "speaker",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-03-s3-lcd-mode-selector.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s3-lcd-mode-selector/class-8-s3-lcd-mode-selector-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s3-lcd-mode-selector/Session_03_LCD_Mode_Selector.ino"
      },
      {
        "id": "s4-ultrasonic-distance-system",
        "session": 4,
        "title": "Ultrasonic Distance System",
        "components": "Ultrasonic sensor, LCD, servo motor",
        "pins": "ultrasonic D8/D9; LCD A4/A5; servo D3",
        "code": "// Session 4 - Grade 8: Distance monitor\n// Arduino UNO\n\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\n#include <Servo.h>\nLiquidCrystal_I2C lcd(0x27,16,2);const byte TRIG=8,ECHO=9,SERVO_PIN=3;Servo gate;\nfloat cm(){digitalWrite(TRIG,0);delayMicroseconds(2);digitalWrite(TRIG,1);delayMicroseconds(10);digitalWrite(TRIG,0);unsigned long u=pulseIn(ECHO,HIGH,30000);return u?u*.0343/2:999;}\nvoid setup(){pinMode(TRIG,OUTPUT);pinMode(ECHO,INPUT);lcd.init();lcd.backlight();gate.attach(SERVO_PIN);gate.write(0);}\nvoid loop(){float d=cm();bool near=d<20;lcd.setCursor(0,0);lcd.print(\"Distance: \");lcd.print((int)d);lcd.print(\" cm \");lcd.setCursor(0,1);lcd.print(near?\"OBJECT NEAR     \":\"AREA CLEAR      \");gate.write(near?90:0);delay(200);}",
        "hardware": [
          "ultrasonic",
          "lcd",
          "servo"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-04-s4-ultrasonic-distance-system.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s4-ultrasonic-distance-system/class-8-s4-ultrasonic-distance-system-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s4-ultrasonic-distance-system/Session_04_Ultrasonic_Distance_System.ino"
      },
      {
        "id": "s6-bo-motor",
        "session": 6,
        "title": "BO Motor",
        "components": "BO motor, 2-wheel-drive motor driver, push switch",
        "pins": "driver MA inputs D10/D11; push switch D5",
        "code": "// Session 6 - Grade 8: BO motor via 2WD driver\n// Arduino UNO\n\n// Load on driver output MA; D10/D11 connect to MA control inputs.\nconst byte MA1=10,MA2=11,BTN=5;\nvoid setup(){pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(BTN,INPUT_PULLUP);digitalWrite(MA1,0);digitalWrite(MA2,0);}\nbyte state=0;bool last=1;unsigned long db=0;void loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){state=(state+1)%3;db=millis();digitalWrite(MA1,state==1);digitalWrite(MA2,state==2);}last=b;}",
        "hardware": [
          "bo-motor",
          "motor-driver",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-05-s6-bo-motor.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s6-bo-motor/class-8-s6-bo-motor-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s6-bo-motor/Session_06_BO_Motor.ino"
      },
      {
        "id": "s6-submersible-pump",
        "session": 6,
        "title": "Submersible Pump",
        "components": "Submersible pump, 2-wheel-drive motor driver, push switch",
        "pins": "driver MA inputs D10/D11; push switch D5",
        "code": "// Session 6 - Grade 8: Pump via 2WD driver\n// Arduino UNO\n\n// Load on driver output MA; D10/D11 connect to MA control inputs.\nconst byte MA1=10,MA2=11,BTN=5;\nvoid setup(){pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(BTN,INPUT_PULLUP);digitalWrite(MA1,0);digitalWrite(MA2,0);}\nbool on=0,last=1;unsigned long db=0;void loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){on=!on;db=millis();digitalWrite(MA1,on);digitalWrite(MA2,0);}last=b;}",
        "hardware": [
          "submersible-pump",
          "motor-driver",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-06-s6-submersible-pump.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s6-submersible-pump/class-8-s6-submersible-pump-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s6-submersible-pump/Session_06_Submersible_Pump.ino"
      },
      {
        "id": "s7-rain-response",
        "session": 7,
        "title": "Rain Response",
        "components": "Rain sensor, servo motor, speaker",
        "pins": "rain D2; servo D3; speaker D5",
        "code": "// Session 7 - Grade 8: Rain response\n// Arduino UNO\n\n#include <Servo.h>\nconst byte RAIN=2,SERVO_PIN=3,BUZZER=5;Servo cover;\nvoid setup(){pinMode(RAIN,INPUT);pinMode(BUZZER,OUTPUT);cover.attach(SERVO_PIN);cover.write(0);}\nvoid loop(){bool wet=digitalRead(RAIN)==LOW;cover.write(wet?90:0);if(wet)tone(BUZZER,1200,150);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "rain",
          "servo",
          "speaker"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-07-s7-rain-response.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s7-rain-response/class-8-s7-rain-response-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s7-rain-response/Session_07_Rain_Response.ino"
      },
      {
        "id": "s7-soil-moisture-irrigation",
        "session": 7,
        "title": "Soil-Moisture Irrigation",
        "components": "Moisture sensor, pump, 2-wheel-drive motor driver, 1 Watt LED",
        "pins": "moisture digital D2; pump driver MA D10/D11; LED D5",
        "code": "// Session 7 - Grade 8: Irrigation via 2WD driver\n// Arduino UNO\n\n// Pump on motor-driver output MA; D10/D11 are MA control inputs.\nconst byte SOIL=2,MA1=10,MA2=11,LED=5;\nvoid setup(){pinMode(SOIL,INPUT);pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(LED,OUTPUT);Serial.begin(9600);}\nvoid loop(){bool dry=digitalRead(SOIL)==HIGH;digitalWrite(MA1,dry);digitalWrite(MA2,LOW);digitalWrite(LED,dry);Serial.println(dry?\"DRY\":\"MOIST\");delay(500);}",
        "hardware": [
          "moisture",
          "submersible-pump",
          "motor-driver",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-08-s7-soil-moisture-irrigation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s7-soil-moisture-irrigation/class-8-s7-soil-moisture-irrigation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s7-soil-moisture-irrigation/Session_07_Soil_Moisture_Irrigation.ino"
      },
      {
        "id": "s8-temperature-and-humidity",
        "session": 8,
        "title": "Temperature and Humidity",
        "components": "DHT11, speaker, LCD, CD motor",
        "pins": "DHT11 D2; speaker D5; LCD A4/A5; motor/relay control D6",
        "code": "// Session 8 - Grade 8: Climate controller\n// Arduino UNO\n\n#include <DHT.h>\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27,16,2);\n#define DHTTYPE DHT11\nconst byte DHT_PIN=2,BUZZER=5,MOTOR_CONTROL=6;const float LIMIT=30;DHT dht(DHT_PIN,DHTTYPE);\nvoid setup(){pinMode(BUZZER,OUTPUT);pinMode(MOTOR_CONTROL,OUTPUT);dht.begin();lcd.init();lcd.backlight();}\nvoid loop(){float h=dht.readHumidity(),t=dht.readTemperature();if(isnan(t)||isnan(h))return;bool hot=t>=LIMIT;lcd.setCursor(0,0);lcd.print(\"Temp: \");lcd.print(t,1);lcd.print(\" C  \");lcd.setCursor(0,1);lcd.print(\"Humidity: \");lcd.print(h,0);lcd.print(\"% \");digitalWrite(MOTOR_CONTROL,hot);if(hot)tone(BUZZER,1200,180);delay(1000);}",
        "hardware": [
          "dht11",
          "speaker",
          "lcd",
          "dc-motor",
          "relay"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-09-s8-temperature-and-humidity.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s8-temperature-and-humidity/class-8-s8-temperature-and-humidity-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s8-temperature-and-humidity/Session_08_Temperature_and_Humidity.ino"
      },
      {
        "id": "s9-flame-detection",
        "session": 9,
        "title": "Flame Detection",
        "components": "Flame sensor, speaker, CD motor, 1 Watt LED",
        "pins": "flame D3; speaker D5; CD motor D6; LED D7",
        "code": "// Session 9 - Grade 8: Flame warning\n// Arduino UNO\n\n\nconst byte SENSOR=3,BUZZER=5,MOTOR_CONTROL=6,LED=7;\n\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);pinMode(MOTOR_CONTROL,OUTPUT);pinMode(LED,OUTPUT);}\nvoid loop(){bool danger=digitalRead(SENSOR)==LOW;digitalWrite(MOTOR_CONTROL,danger);digitalWrite(LED,danger);if(danger)tone(BUZZER,1400,180);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "flame",
          "speaker",
          "dc-motor",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-10-s9-flame-detection.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s9-flame-detection/class-8-s9-flame-detection-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s9-flame-detection/Session_09_Flame_Detection.ino"
      },
      {
        "id": "s9-smoke-detection",
        "session": 9,
        "title": "Smoke Detection",
        "components": "MQ2 smoke sensor, speaker, LED strip (30 LEDs), CD motor, 1 Watt LED",
        "pins": "MQ2 A0; speaker D5; strip D2; CD motor D6; LED D7",
        "code": "// Session 9 - Grade 8: Smoke warning\n// Arduino UNO\n\n#include <Adafruit_NeoPixel.h>\nconst byte SENSOR=A0,BUZZER=5,STRIP_PIN=2,MOTOR_CONTROL=6,LED=7;\nAdafruit_NeoPixel strip(30,STRIP_PIN,NEO_GRB+NEO_KHZ800);\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);pinMode(MOTOR_CONTROL,OUTPUT);pinMode(LED,OUTPUT);strip.begin();strip.clear();strip.show();}\nvoid loop(){bool danger=analogRead(SENSOR)>400;digitalWrite(MOTOR_CONTROL,danger);digitalWrite(LED,danger);strip.fill(danger?strip.Color(255,0,0):strip.Color(0,80,0));strip.show();if(danger)tone(BUZZER,1400,180);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "mq2",
          "speaker",
          "rgb-strip",
          "dc-motor",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-11-s9-smoke-detection.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s9-smoke-detection/class-8-s9-smoke-detection-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s9-smoke-detection/Session_09_Smoke_Detection.ino"
      },
      {
        "id": "s11-ir-remote-automation",
        "session": 11,
        "title": "IR Remote Automation",
        "components": "IR remote and receiver, BO motor and 2-wheel-drive motor driver",
        "pins": "IR receiver D2; driver MA D10/D11",
        "code": "// Session 11 - Grade 8: IR control\n// Arduino UNO\n\n#include <IRremote.hpp>\n\nconst byte IR_PIN=2,MA1=10,MA2=11;\n\nvoid setup(){IrReceiver.begin(IR_PIN);pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);}\nvoid loop(){if(!IrReceiver.decode())return;byte c=IrReceiver.decodedIRData.command;IrReceiver.resume();if(c==0x47){digitalWrite(MA1,HIGH);digitalWrite(MA2,LOW);}if(c==0x44){digitalWrite(MA1,LOW);digitalWrite(MA2,HIGH);}if(c==0x40){digitalWrite(MA1,LOW);digitalWrite(MA2,LOW);}}",
        "hardware": [
          "ir-remote",
          "rgb-strip",
          "bo-motor",
          "motor-driver",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-12-s11-ir-remote-automation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s11-ir-remote-automation/class-8-s11-ir-remote-automation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s11-ir-remote-automation/Session_11_IR_Remote_Automation.ino"
      },
      {
        "id": "s12-bluetooth-automation",
        "session": 12,
        "title": "Bluetooth Automation",
        "components": "HM-10 Bluetooth module, 1 Watt LED, relay box",
        "pins": "HM-10 D8/D9; LED D7; relay D4",
        "code": "// Session 12 - Grade 8: HM-10 automation\n// Arduino UNO\n\n#include <SoftwareSerial.h>\n\nSoftwareSerial hm10(8,9);const byte LED=7,RELAY=4;\nvoid setLoad(bool on){digitalWrite(LED,on);digitalWrite(RELAY,on?LOW:HIGH);}\nvoid setup(){pinMode(LED,OUTPUT);pinMode(RELAY,OUTPUT);hm10.begin(9600);setLoad(false);}\nvoid loop(){if(hm10.available()){char c=hm10.read();if(c=='1'||c=='A')setLoad(true);if(c=='0'||c=='B')setLoad(false);}}",
        "hardware": [
          "bluetooth",
          "led",
          "relay",
          "lcd"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-8/dependency-13-s12-bluetooth-automation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-8/s12-bluetooth-automation/class-8-s12-bluetooth-automation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-8/s12-bluetooth-automation/Session_12_Bluetooth_Automation.ino"
      }
    ],
    "9": [
      {
        "id": "s1-rgb-led-strip",
        "session": 1,
        "title": "RGB LED Strip",
        "components": "RGB LED strip (30 LEDs), push switch",
        "pins": "LED strip D2; push switch D5",
        "code": "// Session 1 - Grade 9: RGB strip\n// Arduino UNO\n\n#include <Adafruit_NeoPixel.h>\nconst byte STRIP_PIN=2,BUTTON_PIN=5,LED_COUNT=30;Adafruit_NeoPixel strip(LED_COUNT,STRIP_PIN,NEO_GRB+NEO_KHZ800);\nbyte mode=0;bool last=HIGH;unsigned long db=0;\nvoid show(){const uint32_t c[]={strip.Color(0,0,0),strip.Color(255,0,0),strip.Color(0,255,0),strip.Color(0,0,255),strip.Color(255,120,0),strip.Color(150,0,255),strip.Color(0,180,180),strip.Color(255,255,255)};strip.fill(c[mode]);strip.show();}\nvoid setup(){pinMode(BUTTON_PIN,INPUT_PULLUP);strip.begin();strip.clear();show();}\nvoid loop(){bool b=digitalRead(BUTTON_PIN);if(last&& !b&&millis()-db>180){mode=(mode+1)%8;db=millis();show();}last=b;}",
        "hardware": [
          "rgb-strip",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-01-s1-rgb-led-strip.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s1-rgb-led-strip/class-9-s1-rgb-led-strip-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s1-rgb-led-strip/Session_01_RGB_LED_Strip.ino"
      },
      {
        "id": "s2-vibration-alert",
        "session": 2,
        "title": "Vibration Alert",
        "components": "Vibration sensor, speaker, 1 Watt LEDs",
        "pins": "vibration D2; speaker D5; LEDs D6/D7",
        "code": "// Session 2 - Grade 9: Vibration alert\n// Arduino UNO\n\nconst byte SENSOR=2,BUZZER=5,RED_LED=6,GREEN_LED=7;\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);pinMode(RED_LED,OUTPUT);pinMode(GREEN_LED,OUTPUT);}\nvoid loop(){bool hit=digitalRead(SENSOR);digitalWrite(RED_LED,hit);digitalWrite(GREEN_LED,!hit);if(hit)tone(BUZZER,1300);else noTone(BUZZER);}",
        "hardware": [
          "vibration",
          "speaker",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-02-s2-vibration-alert.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s2-vibration-alert/class-9-s2-vibration-alert-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s2-vibration-alert/Session_02_Vibration_Alert.ino"
      },
      {
        "id": "s3-lcd-mode-selector",
        "session": 3,
        "title": "LCD Mode Selector",
        "components": "LCD, push switch, speaker",
        "pins": "button D5; LCD A4/A5; speaker D6",
        "code": "// Session 3 - Grade 9: LCD selector\n// Arduino UNO\n\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27,16,2);const byte BTN=5,BUZZER=6;byte mode=0;bool last=HIGH;unsigned long db=0;\nvoid show(){const char* names[]={\"OFF\",\"SELECT 1\",\"WARNING\",\"ALERT\"};lcd.clear();lcd.print(\"Mode:\");lcd.setCursor(0,1);lcd.print(names[mode]);if(mode>1)tone(BUZZER,1000,100);}\nvoid setup(){pinMode(BTN,INPUT_PULLUP);pinMode(BUZZER,OUTPUT);lcd.init();lcd.backlight();show();}\nvoid loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){mode=(mode+1)%4;db=millis();show();}last=b;}",
        "hardware": [
          "lcd",
          "push-button",
          "speaker",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-03-s3-lcd-mode-selector.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s3-lcd-mode-selector/class-9-s3-lcd-mode-selector-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s3-lcd-mode-selector/Session_03_LCD_Mode_Selector.ino"
      },
      {
        "id": "s4-ultrasonic-distance-system",
        "session": 4,
        "title": "Ultrasonic Distance System",
        "components": "Ultrasonic sensor, LCD, servo motor",
        "pins": "ultrasonic D8/D9; LCD A4/A5; servo D3",
        "code": "// Session 4 - Grade 9: Distance monitor\n// Arduino UNO\n\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\n#include <Servo.h>\nLiquidCrystal_I2C lcd(0x27,16,2);const byte TRIG=8,ECHO=9,SERVO_PIN=3;Servo gate;\nfloat cm(){digitalWrite(TRIG,0);delayMicroseconds(2);digitalWrite(TRIG,1);delayMicroseconds(10);digitalWrite(TRIG,0);unsigned long u=pulseIn(ECHO,HIGH,30000);return u?u*.0343/2:999;}\nvoid setup(){pinMode(TRIG,OUTPUT);pinMode(ECHO,INPUT);lcd.init();lcd.backlight();gate.attach(SERVO_PIN);gate.write(0);}\nvoid loop(){float d=cm();bool near=d<30;lcd.setCursor(0,0);lcd.print(\"Distance: \");lcd.print((int)d);lcd.print(\" cm \");lcd.setCursor(0,1);lcd.print(near?\"OBJECT NEAR     \":\"AREA CLEAR      \");gate.write(near?90:0);delay(200);}",
        "hardware": [
          "ultrasonic",
          "lcd",
          "servo"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-04-s4-ultrasonic-distance-system.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s4-ultrasonic-distance-system/class-9-s4-ultrasonic-distance-system-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s4-ultrasonic-distance-system/Session_04_Ultrasonic_Distance_System.ino"
      },
      {
        "id": "s6-bo-motor",
        "session": 6,
        "title": "BO Motor",
        "components": "BO motor, 2-wheel-drive motor driver, push switch",
        "pins": "driver MA inputs D10/D11; push switch D5",
        "code": "// Session 6 - Grade 9: BO motor via 2WD driver\n// Arduino UNO\n\n// Load on driver output MA; D10/D11 connect to MA control inputs.\nconst byte MA1=10,MA2=11,BTN=5;\nvoid setup(){pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(BTN,INPUT_PULLUP);digitalWrite(MA1,0);digitalWrite(MA2,0);}\nbyte state=0;bool last=1;unsigned long db=0;void loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){state=(state+1)%3;db=millis();digitalWrite(MA1,state==1);digitalWrite(MA2,state==2);}last=b;}",
        "hardware": [
          "bo-motor",
          "motor-driver",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-05-s6-bo-motor.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s6-bo-motor/class-9-s6-bo-motor-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s6-bo-motor/Session_06_BO_Motor.ino"
      },
      {
        "id": "s6-submersible-pump",
        "session": 6,
        "title": "Submersible Pump",
        "components": "Submersible pump, 2-wheel-drive motor driver, push switch",
        "pins": "driver MA inputs D10/D11; push switch D5",
        "code": "// Session 6 - Grade 9: Pump via 2WD driver\n// Arduino UNO\n\n// Load on driver output MA; D10/D11 connect to MA control inputs.\nconst byte MA1=10,MA2=11,BTN=5;\nvoid setup(){pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(BTN,INPUT_PULLUP);digitalWrite(MA1,0);digitalWrite(MA2,0);}\nbool on=0,last=1;unsigned long db=0;void loop(){bool b=digitalRead(BTN);if(last&&!b&&millis()-db>180){on=!on;db=millis();digitalWrite(MA1,on);digitalWrite(MA2,0);}last=b;}",
        "hardware": [
          "submersible-pump",
          "motor-driver",
          "push-button"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-06-s6-submersible-pump.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s6-submersible-pump/class-9-s6-submersible-pump-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s6-submersible-pump/Session_06_Submersible_Pump.ino"
      },
      {
        "id": "s7-rain-response",
        "session": 7,
        "title": "Rain Response",
        "components": "Rain sensor, servo motor, speaker",
        "pins": "rain D2; servo D3; speaker D5",
        "code": "// Session 7 - Grade 9: Rain response\n// Arduino UNO\n\n#include <Servo.h>\nconst byte RAIN=2,SERVO_PIN=3,BUZZER=5;Servo cover;\nvoid setup(){pinMode(RAIN,INPUT);pinMode(BUZZER,OUTPUT);cover.attach(SERVO_PIN);cover.write(0);}\nvoid loop(){bool wet=digitalRead(RAIN)==LOW;cover.write(wet?90:0);if(wet)tone(BUZZER,1200,150);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "rain",
          "servo",
          "speaker"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-07-s7-rain-response.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s7-rain-response/class-9-s7-rain-response-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s7-rain-response/Session_07_Rain_Response.ino"
      },
      {
        "id": "s7-soil-moisture-irrigation",
        "session": 7,
        "title": "Soil-Moisture Irrigation",
        "components": "Moisture sensor, pump, 2-wheel-drive motor driver, 1 Watt LED",
        "pins": "moisture digital D2; pump driver MA D10/D11; LED D5",
        "code": "// Session 7 - Grade 9: Irrigation via 2WD driver\n// Arduino UNO\n\n// Pump on motor-driver output MA; D10/D11 are MA control inputs.\nconst byte SOIL=2,MA1=10,MA2=11,LED=5;\nvoid setup(){pinMode(SOIL,INPUT);pinMode(MA1,OUTPUT);pinMode(MA2,OUTPUT);pinMode(LED,OUTPUT);Serial.begin(9600);}\nvoid loop(){bool dry=digitalRead(SOIL)==HIGH;digitalWrite(MA1,dry);digitalWrite(MA2,LOW);digitalWrite(LED,dry);Serial.println(dry?\"DRY\":\"MOIST\");delay(500);}",
        "hardware": [
          "moisture",
          "submersible-pump",
          "motor-driver",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-08-s7-soil-moisture-irrigation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s7-soil-moisture-irrigation/class-9-s7-soil-moisture-irrigation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s7-soil-moisture-irrigation/Session_07_Soil_Moisture_Irrigation.ino"
      },
      {
        "id": "s8-temperature-and-humidity",
        "session": 8,
        "title": "Temperature and Humidity",
        "components": "DHT11, speaker, LCD, CD motor, relay box",
        "pins": "DHT11 D2; speaker D5; LCD A4/A5; motor/relay control D6",
        "code": "// Session 8 - Grade 9: Climate controller\n// Arduino UNO\n\n#include <DHT.h>\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27,16,2);\n#define DHTTYPE DHT11\nconst byte DHT_PIN=2,BUZZER=5,MOTOR_CONTROL=6;const float LIMIT=30;DHT dht(DHT_PIN,DHTTYPE);\nvoid setup(){pinMode(BUZZER,OUTPUT);pinMode(MOTOR_CONTROL,OUTPUT);dht.begin();lcd.init();lcd.backlight();}\nvoid loop(){float h=dht.readHumidity(),t=dht.readTemperature();if(isnan(t)||isnan(h))return;bool hot=t>=LIMIT;lcd.setCursor(0,0);lcd.print(\"Temp: \");lcd.print(t,1);lcd.print(\" C  \");lcd.setCursor(0,1);lcd.print(\"Humidity: \");lcd.print(h,0);lcd.print(\"% \");digitalWrite(MOTOR_CONTROL,hot);if(hot)tone(BUZZER,1200,180);delay(1000);}",
        "hardware": [
          "dht11",
          "speaker",
          "lcd",
          "dc-motor",
          "relay"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-09-s8-temperature-and-humidity.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s8-temperature-and-humidity/class-9-s8-temperature-and-humidity-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s8-temperature-and-humidity/Session_08_Temperature_and_Humidity.ino"
      },
      {
        "id": "s9-flame-detection",
        "session": 9,
        "title": "Flame Detection",
        "components": "Flame sensor, speaker, CD motor, 1 Watt LED",
        "pins": "flame D3; speaker D5; CD motor D6; LED D7",
        "code": "// Session 9 - Grade 9: Flame warning\n// Arduino UNO\n\n\nconst byte SENSOR=3,BUZZER=5,MOTOR_CONTROL=6,LED=7;\n\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);pinMode(MOTOR_CONTROL,OUTPUT);pinMode(LED,OUTPUT);}\nvoid loop(){bool danger=digitalRead(SENSOR)==LOW;digitalWrite(MOTOR_CONTROL,danger);digitalWrite(LED,danger);if(danger)tone(BUZZER,1400,180);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "flame",
          "speaker",
          "dc-motor",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-10-s9-flame-detection.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s9-flame-detection/class-9-s9-flame-detection-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s9-flame-detection/Session_09_Flame_Detection.ino"
      },
      {
        "id": "s9-smoke-detection",
        "session": 9,
        "title": "Smoke Detection",
        "components": "MQ2 smoke sensor, speaker, LED strip (30 LEDs), CD motor, 1 Watt LED",
        "pins": "MQ2 A0; speaker D5; strip D2; CD motor D6; LED D7",
        "code": "// Session 9 - Grade 9: Smoke warning\n// Arduino UNO\n\n#include <Adafruit_NeoPixel.h>\nconst byte SENSOR=A0,BUZZER=5,STRIP_PIN=2,MOTOR_CONTROL=6,LED=7;\nAdafruit_NeoPixel strip(30,STRIP_PIN,NEO_GRB+NEO_KHZ800);\nvoid setup(){pinMode(SENSOR,INPUT);pinMode(BUZZER,OUTPUT);pinMode(MOTOR_CONTROL,OUTPUT);pinMode(LED,OUTPUT);strip.begin();strip.clear();strip.show();}\nvoid loop(){bool danger=analogRead(SENSOR)>400;digitalWrite(MOTOR_CONTROL,danger);digitalWrite(LED,danger);strip.fill(danger?strip.Color(255,0,0):strip.Color(0,80,0));strip.show();if(danger)tone(BUZZER,1400,180);else noTone(BUZZER);delay(200);}",
        "hardware": [
          "mq2",
          "speaker",
          "rgb-strip",
          "dc-motor",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-11-s9-smoke-detection.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s9-smoke-detection/class-9-s9-smoke-detection-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s9-smoke-detection/Session_09_Smoke_Detection.ino"
      },
      {
        "id": "s11-ir-remote-automation",
        "session": 11,
        "title": "IR Remote Automation",
        "components": "IR remote and receiver, LED strip (30 LEDs), 1 Watt LED",
        "pins": "IR receiver D2; strip D3; LED D7",
        "code": "// Session 11 - Grade 9: IR control\n// Arduino UNO\n\n#include <IRremote.hpp>\n#include <Adafruit_NeoPixel.h>\nconst byte IR_PIN=2,STRIP_PIN=3,LED_PIN=7;\nAdafruit_NeoPixel strip(30,STRIP_PIN,NEO_GRB+NEO_KHZ800);\nvoid setup(){IrReceiver.begin(IR_PIN);strip.begin();strip.clear();strip.show();pinMode(LED_PIN,OUTPUT);}\nvoid loop(){if(!IrReceiver.decode())return;byte c=IrReceiver.decodedIRData.command;IrReceiver.resume();if(c==0x45)digitalWrite(LED_PIN,!digitalRead(LED_PIN));if(c==0x45){strip.fill(strip.Color(255,255,255));strip.show();}if(c==0x46){strip.fill(strip.Color(0,0,255));strip.show();}if(c==0x47){strip.clear();strip.show();}}",
        "hardware": [
          "ir-remote",
          "rgb-strip",
          "bo-motor",
          "motor-driver",
          "led"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-12-s11-ir-remote-automation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s11-ir-remote-automation/class-9-s11-ir-remote-automation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s11-ir-remote-automation/Session_11_IR_Remote_Automation.ino"
      },
      {
        "id": "s12-bluetooth-automation",
        "session": 12,
        "title": "Bluetooth Automation",
        "components": "HM-10 Bluetooth module, 1 Watt LED, relay box, LCD",
        "pins": "HM-10 D8/D9; LED D7; relay D4; LCD A4/A5",
        "code": "// Session 12 - Grade 9: HM-10 automation\n// Arduino UNO\n\n#include <SoftwareSerial.h>\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27,16,2);\nSoftwareSerial hm10(8,9);const byte LED=7,RELAY=4;\nvoid setLoad(bool on){digitalWrite(LED,on);digitalWrite(RELAY,on?LOW:HIGH);lcd.clear();lcd.print(on?\"Appliance ON\":\"Appliance OFF\");}\nvoid setup(){pinMode(LED,OUTPUT);pinMode(RELAY,OUTPUT);hm10.begin(9600);lcd.init();lcd.backlight();setLoad(false);}\nvoid loop(){if(hm10.available()){char c=hm10.read();if(c=='1'||c=='A')setLoad(true);if(c=='0'||c=='B')setLoad(false);}}",
        "hardware": [
          "bluetooth",
          "led",
          "relay",
          "lcd"
        ],
        "circuit": "assets/images/pdf/year-2/dependencies/class-9/dependency-13-s12-bluetooth-automation.jpg",
        "download": "assets/downloads/year-2/dependencies/class-9/s12-bluetooth-automation/class-9-s12-bluetooth-automation-code.zip",
        "ino": "assets/downloads/year-2/dependencies/class-9/s12-bluetooth-automation/Session_12_Bluetooth_Automation.ino"
      }
    ]
  }
});
