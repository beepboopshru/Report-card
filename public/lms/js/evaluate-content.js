// Evaluation challenges and MCQs are separated so every class/session assessment stays specific.
(function () {
  const q = (text, options, answer) => [text, options, answer];
  const setEval = (key, challenge, challengeCode, questions) => {
    if (!window.LMS_CONTENT || !window.LMS_CONTENT[key]) return;
    window.LMS_CONTENT[key].evaluate = { title: "Assessment", challenge, challengeCode, questions };
  };

  const blinkCode = (pin, firstDelay, secondDelay = firstDelay) => `const int ledPin = ____;

void setup() {
  pinMode(ledPin, ______);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(${firstDelay});
  digitalWrite(ledPin, LOW);
  delay(${secondDelay});
}`;

  const multiBlinkCode = (pin, delays) => `const int ledPin = ${pin};

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(____);
  digitalWrite(ledPin, LOW);
  delay(${delays[0]});
  digitalWrite(ledPin, HIGH);
  delay(${delays[1]});
  digitalWrite(ledPin, LOW);
  delay(____);
}`;

  setEval("4-1",
    "Complete the beginner LED blink program so the red LED on D5 turns ON and OFF with equal timing.",
    blinkCode("D5", "____", "____"),
    [
      q("Which Arduino pin is used for the beginner red LED?", ["D5", "D2", "D7"], 0),
      q("What should replace the first blank in const int ledPin = ____?", ["5", "2", "7"], 0),
      q("Which mode should be used for the LED pin?", ["OUTPUT", "INPUT", "INPUT_PULLUP"], 0),
      q("What does digitalWrite(ledPin, HIGH) do?", ["Turns the LED on", "Reads the LED", "Uploads the sketch"], 0),
      q("What does digitalWrite(ledPin, LOW) do?", ["Turns the LED off", "Changes the LED pin", "Starts the USB cable"], 0),
      q("Which function runs only once?", ["setup()", "loop()", "delay()"], 0),
      q("Which function repeats the blink forever?", ["loop()", "pinMode()", "const"], 0),
      q("What does delay(500) mean?", ["Wait for half a second", "Use pin 500", "Turn the LED green"], 0),
      q("If the delay is reduced, what happens?", ["The blinking becomes faster", "The LED becomes a buzzer", "The code stops compiling"], 0),
      q("Which wire point completes the LED circuit return?", ["GND", "D13", "USB only"], 0),
      q("What type of device is the LED?", ["Output", "Input", "Memory"], 0),
      q("Why does LED polarity matter?", ["LED works only in the correct direction", "It changes the code font", "It controls the PDF page"], 0),
      q("What is the positive LED side called?", ["Anode", "Cathode", "Ground"], 0),
      q("What is the negative LED side called?", ["Cathode", "Anode", "Digital pin"], 0),
      q("What is the main Evaluate skill here?", ["Complete a simple blink sketch", "Write RGB tone code", "Read four push buttons"], 0)
    ]);

  setEval("5-1",
    "Complete the Class 5 output sketch so the LED pin is prepared correctly and held ON for the switch-controlled build.",
    `const int led = ____;

void setup() {
  pinMode(led, ______);
}

void loop() {
  digitalWrite(led, ____);
}`,
    [
      q("Which Class 5 concept is being tested?", ["Manual output control", "RGB color mixing", "Analog tone"], 0),
      q("Which component supports manual ON/OFF behavior?", ["Rocker switch", "Temperature sensor", "Servo horn"], 0),
      q("In the main Class 5 code, which pin is named led?", ["7", "2", "13"], 0),
      q("What mode should the LED pin use?", ["OUTPUT", "INPUT", "INPUT_PULLUP"], 0),
      q("What value keeps the LED ON?", ["HIGH", "LOW", "READ"], 0),
      q("What does pinMode(led, OUTPUT) prepare?", ["The output pin", "The PDF page", "The class selector"], 0),
      q("Which material connects modules to the shield?", ["RMC wires", "Logo image", "Score popup"], 0),
      q("What kind of device is the LED?", ["Output device", "Input device", "Storage device"], 0),
      q("What happens when a switch path is open?", ["Current cannot flow", "Arduino uploads faster", "The LED changes into a buzzer"], 0),
      q("What happens when a switch path is closed?", ["Current can flow", "The code disappears", "GND becomes D5"], 0),
      q("Why does Class 5 compare main and Try Yourself code?", ["To notice the changed pin", "To remove the switch", "To skip wiring"], 0),
      q("Which project uses light output in Elaborate?", ["LED Lantern", "Pikachu", "RGB parrot"], 0),
      q("Which project uses sound output in Elaborate?", ["Buzzer Alert", "Traffic light", "Shadow model"], 0),
      q("What should the code and wiring agree on?", ["Pin number", "Page number", "Button color only"], 0),
      q("What is the main assessment idea?", ["Control an output with correct pin setup", "Use arrays", "Generate PWM tones"], 0)
    ]);

  setEval("6-1",
    "Complete the three-LED sequence so D5, D6, and D7 can turn on in a planned order.",
    `const int led1 = ____;
const int led2 = ____;
const int led3 = ____;

void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
}

void loop() {
  digitalWrite(led1, HIGH);
  digitalWrite(led2, LOW);
  digitalWrite(led3, LOW);
  delay(300);
}`,
    [
      q("Which class tier uses three LEDs in Session 1?", ["Advanced", "Beginner", "Intermediate"], 0),
      q("Which pins are used for the three LEDs?", ["D5, D6, D7", "D2, D3, D4", "A0, A1, A2"], 0),
      q("Why are led1, led2, and led3 separate?", ["Each output can be controlled independently", "They are page names", "They are USB cables"], 0),
      q("What does a sequence mean?", ["A planned order of output changes", "A random upload", "A fixed template only"], 0),
      q("What does delay(300) control?", ["Timing between visible states", "The file location", "The class number"], 0),
      q("When led1 is HIGH in the first step, what are led2 and led3?", ["LOW", "HIGH", "INPUT"], 0),
      q("What is the red LED doing when its pin is HIGH?", ["Glowing", "Reading input", "Playing sound"], 0),
      q("Why use multiple Arduino pins?", ["To control multiple devices", "To reduce page count", "To change the logo"], 0),
      q("Which function sets all three pins as outputs?", ["pinMode()", "digitalRead()", "tone()"], 0),
      q("Which real system uses light sequencing?", ["Traffic signal", "Paper folder", "Keyboard shortcut"], 0),
      q("What does LOW usually mean for an LED output?", ["Off", "On", "Compile"], 0),
      q("What changes in Try Yourself code?", ["The pattern", "The class list", "The LMS logo"], 0),
      q("Which Elaborate project uses LED blinking as a message?", ["Messenger", "Doorbell", "RGB parrot"], 0),
      q("Which Elaborate project uses a buzzer alert?", ["SOS Alarm", "Desk Lamp", "Peacock"], 0),
      q("What is the main assessment skill?", ["Coordinate multiple outputs", "Use one permanent HIGH only", "Open the index page"], 0)
    ]);

  setEval("7-1",
    "Complete the expert buzzer output sketch so the alarm response works from the correct Arduino pin.",
    `const int buzzer = ____;

void setup() {
  pinMode(buzzer, ______);
}

void loop() {
  digitalWrite(buzzer, ____);
}`,
    [
      q("Which Class 7 Session 1 output makes sound?", ["Buzzer", "RGB LED", "Rocker switch"], 0),
      q("Which pin is used in the main buzzer code?", ["D5", "D2", "D13"], 0),
      q("What mode should a buzzer output pin use?", ["OUTPUT", "INPUT", "INPUT_PULLUP"], 0),
      q("What value turns the buzzer ON?", ["HIGH", "LOW", "READ"], 0),
      q("What does digitalWrite(buzzer, HIGH) send?", ["An ON signal", "A score result", "A PDF image"], 0),
      q("What does system thinking mean here?", ["Parts work together to create a response", "Only one page is shown", "No wiring is needed"], 0),
      q("Which function repeats the buzzer behavior?", ["loop()", "setup()", "const"], 0),
      q("Which function prepares the buzzer pin?", ["pinMode()", "digitalRead()", "analogWrite()"], 0),
      q("Why are alarms useful?", ["They alert people quickly", "They store code", "They change browser pages"], 0),
      q("What should be checked if the buzzer is moved to D7?", ["Code pin and wiring both change", "Only the page title changes", "Nothing changes"], 0),
      q("What type of output is a buzzer?", ["Sound output", "Light output only", "Input storage"], 0),
      q("Which Elaborate model uses blinking expression?", ["Winking Smiley", "Peacock", "Shadow dinosaur"], 0),
      q("Which Elaborate model lights up a character?", ["Pikachu", "Doorbell", "Police car"], 0),
      q("What is the Try Yourself focus?", ["Changed buzzer pin", "Four RGB colors", "Two switches"], 0),
      q("What is the main assessment skill?", ["Build a simple alarm output", "Read analog sensor values", "Control a motor"], 0)
    ]);

  setEval("4-2",
    "Complete the three-pattern blink challenge by filling the LED pin and the missing delay values.",
    multiBlinkCode(5, [200, 500]),
    [
      q("What is the Class 4 Session 2 topic?", ["Blink LED with Delay 3 Patterns", "RGB push button", "Buzzer tones"], 0),
      q("Which Arduino pin controls the LED?", ["D5", "D6", "D7"], 0),
      q("How many blink timing patterns are practiced?", ["Three", "One", "Four"], 0),
      q("Which delay values appear in the main pattern?", ["200, 500, 1000", "300, 600, 900", "50, 60, 70"], 0),
      q("What does the 1000 ms delay create?", ["The longest visible wait", "A button read", "A buzzer frequency"], 0),
      q("Which device is used as the output?", ["Red SMD LED", "Push button", "RGB module"], 0),
      q("What does digitalWrite HIGH do in this lesson?", ["Turns the LED on", "Reads a switch", "Stops sound"], 0),
      q("What does digitalWrite LOW do in this lesson?", ["Turns the LED off", "Starts PWM", "Submits the test"], 0),
      q("Why compare the Try Yourself code?", ["It changes timing while keeping the same circuit", "It removes the LED", "It changes to RGB"], 0),
      q("What material connects the LED breakout board?", ["RMC wires", "Template only", "Mouse cable"], 0),
      q("Which function repeats all three patterns?", ["loop()", "setup()", "pinMode()"], 0),
      q("Which function prepares the LED pin?", ["pinMode()", "tone()", "digitalRead()"], 0),
      q("What happens when timing values change?", ["The blink rhythm changes", "The grade changes", "The PDF closes"], 0),
      q("What is the safe testing habit?", ["Change one value and observe", "Change all wires randomly", "Skip upload"], 0),
      q("What is the assessment goal?", ["Understand multiple delay patterns", "Use if else input", "Mix RGB colors"], 0)
    ]);

  setEval("5-2",
    "Complete the four-pattern blink challenge and show how one LED can blink with increasing wait times.",
    multiBlinkCode(5, [100, 300]),
    [
      q("What is Class 5 Session 2 mainly about?", ["Blink LED with Delay 4 Patterns", "Single permanent ON", "Tone melody"], 0),
      q("How many timing patterns are in the main code?", ["Four", "Two", "One"], 0),
      q("Which LED pin is named ledPin?", ["D5", "D3", "D10"], 0),
      q("Which delay is the fastest main blink?", ["100 ms", "800 ms", "1000 ms"], 0),
      q("Which delay is the slowest main blink?", ["800 ms", "100 ms", "200 ms"], 0),
      q("What does a larger delay value do?", ["Makes the state last longer", "Changes LED polarity", "Reads a button"], 0),
      q("What does the Try Yourself code change?", ["The timing values", "The device type", "The LMS folder"], 0),
      q("Which function creates each pause?", ["delay()", "digitalRead()", "noTone()"], 0),
      q("Which function sends ON/OFF signals?", ["digitalWrite()", "pinMode only", "Object.assign()"], 0),
      q("Why is this Class 5 instead of Class 4?", ["It adds a fourth timing pattern", "It removes code", "It uses no LED"], 0),
      q("What should students observe after upload?", ["Blink rhythm changes", "Score popup opens automatically", "Arduino disappears"], 0),
      q("What type of output is the LED?", ["Light output", "Sound output", "Input trigger"], 0),
      q("What mode should the LED pin be?", ["OUTPUT", "INPUT", "INPUT_PULLUP"], 0),
      q("What does setup() do here?", ["Prepares the LED pin", "Loops forever", "Grades the test"], 0),
      q("What is the assessment goal?", ["Read and complete a four-delay pattern", "Control RGB by switch", "Use a buzzer tone"], 0)
    ]);

  setEval("6-2",
    "Complete the buzzer beep challenge so the buzzer on D6 turns ON and OFF every 200 ms.",
    `void setup() {
  pinMode(____, OUTPUT);
}

void loop() {
  digitalWrite(6, HIGH);
  delay(____);
  digitalWrite(6, LOW);
  delay(____);
}`,
    [
      q("What is the Class 6 Session 2 output device?", ["Buzzer", "RGB LED", "Rocker switch"], 0),
      q("Which pin is used for the main buzzer?", ["D6", "D5", "D10"], 0),
      q("What timing value creates the beep gap?", ["200 ms", "1000 ms", "700 ms"], 0),
      q("What does digitalWrite(6, HIGH) do?", ["Turns the buzzer on", "Reads a push button", "Dims an LED"], 0),
      q("What does digitalWrite(6, LOW) do?", ["Turns the buzzer off", "Changes color", "Uploads the file"], 0),
      q("What mode should D6 use?", ["OUTPUT", "INPUT_PULLUP", "ANALOG"], 0),
      q("What does the Try code add?", ["A second buzzer pin", "An RGB LED", "A servo"], 0),
      q("Which pins are used in the two-buzzer Try code?", ["D6 and D7", "D2 and D3", "D10 and D12"], 0),
      q("What makes a beep different from a constant sound?", ["Repeated ON and OFF timing", "Using no delay", "Only opening Evaluate"], 0),
      q("Which Arduino function creates the pause?", ["delay()", "tone()", "analogWrite()"], 0),
      q("What kind of output is the buzzer?", ["Sound output", "Light output", "Input device"], 0),
      q("What should students listen for?", ["A repeating beep", "Three colors", "A motor turn"], 0),
      q("Why should wiring match pin 6?", ["The code sends the signal to D6", "D6 is the logo", "D6 is the score"], 0),
      q("What concept is stronger than Class 5 here?", ["Sound pattern output", "Only one LED timing", "No circuit"], 0),
      q("What is the assessment goal?", ["Complete a timed buzzer system", "Draw a template", "Select a class"], 0)
    ]);

  setEval("7-2",
    "Complete the advanced LED pattern so three LEDs turn ON together and then turn OFF one by one.",
    `const int led1 = 4;
const int led2 = ____;
const int led3 = 7;

void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
}

void loop() {
  digitalWrite(led1, HIGH);
  digitalWrite(led2, HIGH);
  digitalWrite(led3, HIGH);
  delay(500);
  digitalWrite(led1, LOW);
  delay(____);
}`,
    [
      q("What is the Class 7 Session 2 topic?", ["Advanced LED Patterns with Loops", "Push button basic", "Buzzer tones only"], 0),
      q("How many LEDs are in the main pattern?", ["Three", "One", "Two buzzers"], 0),
      q("What happens first in the main loop?", ["All three LEDs turn on", "Only buzzer rings", "Button is read"], 0),
      q("What happens after the 500 ms wait?", ["LEDs turn off one by one", "RGB changes color", "Score appears"], 0),
      q("Which pin is led2 in the main code?", ["D6", "D5", "D13"], 0),
      q("Which pin is led1 in the main code?", ["D4", "D2", "A0"], 0),
      q("Which pin is led3 in the main code?", ["D7", "D3", "A1"], 0),
      q("What does the Try code add?", ["A fourth LED", "A push button", "A buzzer tone"], 0),
      q("What timing separates the OFF steps?", ["300 ms", "900 ms", "50 ms"], 0),
      q("Why use separate variables?", ["To control each LED pin clearly", "To hide the pins", "To change page layout"], 0),
      q("Which function turns an LED off?", ["digitalWrite(pin, LOW)", "digitalRead(pin)", "tone(pin, 500)"], 0),
      q("What does OUTPUT mean?", ["Arduino sends a signal", "Arduino receives button state", "Arduino opens ZIP"], 0),
      q("Which concept is being evaluated?", ["Coordinated LED pattern", "Single LED polarity only", "Button with buzzer"], 0),
      q("What should students compare?", ["Three-LED and four-LED patterns", "Logo and index", "PDF and CSS"], 0),
      q("What is the expert skill?", ["Managing multiple outputs in order", "Keeping one output always on", "Skipping setup"], 0)
    ]);

  setEval("4-3",
    "Complete the push-button LED challenge so the LED turns ON only while the button is pressed.",
    `const int switchPin = ____;
const int ledPin = ____;

void setup() {
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(switchPin) == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`,
    [
      q("What is the Class 4 Session 3 input device?", ["Push button", "Buzzer", "RGB LED"], 0),
      q("What is the output device?", ["Yellow LED", "USB cable", "Rocker PCB only"], 0),
      q("Which pin is the switchPin in the main code?", ["D2", "D5", "D7"], 0),
      q("Which pin is ledPin in the main code?", ["D5", "D2", "D13"], 0),
      q("What does INPUT_PULLUP mean when not pressed?", ["The input normally reads HIGH", "The LED is always HIGH", "The buzzer plays"], 0),
      q("What does the button read when pressed?", ["LOW", "HIGH", "OUTPUT"], 0),
      q("Which function reads the button?", ["digitalRead()", "digitalWrite()", "analogWrite()"], 0),
      q("Which function controls the LED?", ["digitalWrite()", "digitalRead()", "noTone()"], 0),
      q("What does if check in this code?", ["Whether the button is pressed", "Whether the score is 15", "Whether the logo is visible"], 0),
      q("What happens in the else block?", ["LED turns off", "Buzzer tone starts", "RGB turns blue"], 0),
      q("What does the Try code change?", ["Switch and LED pins", "The output type", "The session title"], 0),
      q("Which wiring pair is used for the button?", ["Signal pin and GND", "Only USB", "Only template"], 0),
      q("What real-life idea matches this?", ["Press button to trigger light", "Automatic color fading", "No input control"], 0),
      q("Which phase has the physical button build?", ["Elaborate", "Engage", "Index"], 0),
      q("What is the assessment goal?", ["Understand input controlling output", "Create four LED arrays", "Use buzzer frequencies"], 0)
    ]);

  setEval("5-3",
    "Complete the push-button buzzer challenge so the buzzer sounds only while the button is pressed.",
    `const int switchPin = ____;
const int buzzerPin = ____;

void setup() {
  pinMode(switchPin, INPUT_PULLUP);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  if (digitalRead(switchPin) == LOW) {
    digitalWrite(buzzerPin, HIGH);
  } else {
    digitalWrite(buzzerPin, LOW);
  }
}`,
    [
      q("What is the Class 5 Session 3 output?", ["Buzzer", "Single red LED", "Four LEDs"], 0),
      q("What is the input?", ["Push button", "RGB LED", "SMD LED"], 0),
      q("Which pin is switchPin in the main code?", ["D3", "D5", "D10"], 0),
      q("Which pin is buzzerPin in the main code?", ["D6", "D2", "D13"], 0),
      q("When should the buzzer turn ON?", ["When the button is pressed", "When the button is released", "Before setup runs"], 0),
      q("What value is read when INPUT_PULLUP button is pressed?", ["LOW", "HIGH", "OUTPUT"], 0),
      q("What turns the buzzer off?", ["digitalWrite(buzzerPin, LOW)", "pinMode(switchPin, INPUT_PULLUP)", "delay only"], 0),
      q("Which function checks the button state?", ["digitalRead()", "tone()", "analogWrite()"], 0),
      q("Which function controls the buzzer as ON/OFF?", ["digitalWrite()", "digitalRead()", "Object.assign()"], 0),
      q("What does the Try code change?", ["Switch and buzzer pins", "Buzzer into RGB", "Class number"], 0),
      q("Which Try code buzzer pin is used?", ["D7", "D6", "D3"], 0),
      q("What real device is similar?", ["Doorbell button", "Desk lamp without switch", "Traffic signal only"], 0),
      q("What must match for the buzzer to work?", ["Code pin and physical wire", "Card color and font", "Logo size"], 0),
      q("What does OUTPUT do for buzzerPin?", ["Allows Arduino to send sound signal", "Allows button reading", "Creates PDF image"], 0),
      q("What is the assessment goal?", ["Use button input to control sound", "Make LED delay patterns", "Dim RGB manually"], 0)
    ]);

  setEval("6-3",
    "Complete the RGB push-button challenge so pressing the switch cycles red, green, and blue.",
    `const int pushSwitch = ____;
const int rgbRed = 10;
const int rgbGreen = ____;
const int rgbBlue = 13;

void setup() {
  pinMode(pushSwitch, INPUT_PULLUP);
  pinMode(rgbRed, OUTPUT);
  pinMode(rgbGreen, OUTPUT);
  pinMode(rgbBlue, OUTPUT);
}`,
    [
      q("What is the Class 6 Session 3 output module?", ["RGB LED", "Single buzzer", "Rocker switch only"], 0),
      q("What input starts the color cycle?", ["Push button", "Buzzer", "USB cable"], 0),
      q("Which pin is pushSwitch in the main code?", ["D5", "D2", "D7"], 0),
      q("Which pin controls red?", ["D10", "D5", "D6"], 0),
      q("Which pin controls green?", ["D12", "D3", "A0"], 0),
      q("Which pin controls blue?", ["D13", "D4", "A1"], 0),
      q("Which variable stores the button reading?", ["switchState", "scoreText", "ledPin"], 0),
      q("What happens when switchState is LOW?", ["RGB cycles colors", "All colors stay off", "Buzzer stops"], 0),
      q("What happens when the button is not pressed?", ["All RGB colors turn off", "Only red stays on", "Score pops up"], 0),
      q("Which colors are shown in order?", ["Red, green, blue", "Yellow, white, black", "Orange, purple, cyan only"], 0),
      q("What delay is used for each color step?", ["500 ms", "200 ms", "1000 ms"], 0),
      q("Why are three RGB pins needed?", ["Each color channel is separate", "They are download files", "They are class buttons"], 0),
      q("What does the Try code change?", ["Push switch pin", "All RGB pins to analog", "The output device"], 0),
      q("What physical model uses this idea?", ["Color-changing template", "Only desk lamp", "Only alarm bell"], 0),
      q("What is the assessment goal?", ["Connect button logic with RGB sequencing", "Blink one red LED only", "Use no input"], 0)
    ]);

  setEval("7-3",
    "Complete the LED dimmer and buzzer tone challenge so brightness and pitch change together.",
    `const int ledPin = ____;
const int buzzerPin = ____;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, 80);
  tone(buzzerPin, 300);
  delay(____);
  noTone(buzzerPin);
}`,
    [
      q("What does Class 7 Session 3 combine?", ["LED dimming and buzzer tones", "Push button LED only", "Four delay blinks"], 0),
      q("Which pin is ledPin?", ["D5", "D2", "D13"], 0),
      q("Which pin is buzzerPin?", ["D7", "D3", "D10"], 0),
      q("Which function controls LED brightness?", ["analogWrite()", "digitalRead()", "noTone()"], 0),
      q("What is the highest PWM brightness value?", ["255", "7", "13"], 0),
      q("Which function creates sound frequency?", ["tone()", "pinMode()", "LOW"], 0),
      q("Which function stops the buzzer sound?", ["noTone()", "digitalRead()", "INPUT_PULLUP"], 0),
      q("What does a higher tone frequency change?", ["Pitch becomes higher", "LED pin changes", "Score resets"], 0),
      q("What brightness value is used first in the main code?", ["80", "255", "5"], 0),
      q("What tone frequency is used first?", ["300 Hz", "900 Hz", "60 Hz"], 0),
      q("What does delay(700) do?", ["Holds each brightness-tone step", "Reads the button", "Turns off all pages"], 0),
      q("What does the Try code change?", ["Brightness values, tones, and timing", "Only class label", "Only PDF cover"], 0),
      q("Which two output types are tested?", ["Light and sound", "Input and folder", "Logo and modal"], 0),
      q("What must be set in setup?", ["Both ledPin and buzzerPin as OUTPUT", "Only switch as input", "Nothing"], 0),
      q("What is the assessment goal?", ["Coordinate analog brightness with sound tone", "Use only digital blink", "Read one rocker switch"], 0)
    ]);
}());
