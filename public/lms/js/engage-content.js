// Exact Engage visuals and trigger prompts for every Level 1 Creative Automation class/session.
(function () {
  if (!window.LMS_CONTENT) return;

  const data = {
    "4-1": ["Single LED Blink", [
      ["LED on D5", "How does one Arduino pin turn a light ON and OFF?", "D5 sends HIGH and LOW signals to control one LED."],
      ["Desk Lamp Output", "What makes a lamp glow when the circuit is complete?", "Current reaches the LED output and the light becomes visible."],
      ["Blink Timing", "Why does changing delay() change the blink speed?", "The delay value controls how long the LED stays ON or OFF."],
      ["LED Polarity", "Why must the LED be connected in the correct direction?", "An LED glows only when current flows from anode to cathode."],
      ["Safe Circuit", "Why do D5 and GND both matter?", "D5 sends the signal and GND completes the return path."]
    ]],
    "5-1": ["Manual LED Output", [
      ["Rocker Switch", "How can one switch decide whether the LED works?", "The rocker switch opens or closes the current path."],
      ["LED Lantern", "Why does the lantern glow only when the path is ON?", "The LED receives power only when the switch path is closed."],
      ["Output Pin", "What does an Arduino output pin do?", "It sends a signal to control a light or sound module."],
      ["Switch Board", "Why use a switch PCB?", "It keeps the switch connection neat and easier to mount."],
      ["Buzzer Alert", "How can the same output idea become sound?", "Replacing the LED with a buzzer changes the output from light to sound."]
    ]],
    "6-1": ["Three LED Sequence", [
      ["Red LED D5", "How can one pin control one color?", "D5 controls the red LED as a separate output."],
      ["Green LED D6", "Why does the next LED need its own pin?", "D6 lets Arduino control green independently."],
      ["Yellow LED D7", "How do three pins create a pattern?", "Each pin changes HIGH or LOW in a planned order."],
      ["Traffic Logic", "Why do traffic lights change one after another?", "Sequencing prevents all signals from showing the same state."],
      ["Timing Pattern", "What makes each color stay visible?", "delay() holds each step long enough to observe."]
    ]],
    "7-1": ["Buzzer System Logic", [
      ["Buzzer Output", "How does Arduino create a sound response?", "It sends an output signal to the buzzer."],
      ["Alarm Response", "Why are alarms useful in systems?", "They alert people quickly when a condition needs attention."],
      ["Trigger Thinking", "What does a trigger do in a system?", "It starts a response such as sound or light."],
      ["Smiley Build", "How can blinking create expression?", "A timed LED can make the smiley appear to wink."],
      ["Pikachu Build", "How does code make the character come alive?", "The LED output lights the finished model."]
    ]],
    "4-2": ["3 Blink Delay Patterns", [
      ["Fast Blink", "What does a 200 ms delay look like?", "It creates a quick flash that changes rapidly."],
      ["Medium Blink", "Why is 500 ms easier to observe?", "The LED stays in each state for half a second."],
      ["Slow Blink", "What happens at 1000 ms?", "The blink becomes slower and more noticeable."],
      ["Same LED D5", "How can one LED show different patterns?", "The circuit stays the same while the timing values change."],
      ["Compare Code", "What should students compare in Try Yourself?", "They compare how changed delay values change the rhythm."]
    ]],
    "5-2": ["4 Blink Delay Patterns", [
      ["100 ms Blink", "Which blink is the fastest?", "The 100 ms pattern changes very quickly."],
      ["200 ms Blink", "How is the second pattern different?", "It slows the flash compared with 100 ms."],
      ["400 ms Blink", "Why does 400 ms feel clearer?", "The light remains visible for a longer moment."],
      ["800 ms Blink", "Which timing gives the longest wait?", "The 800 ms pattern is the slowest in the main code."],
      ["Pattern Growth", "Why does Class 5 use four timings?", "Students compare more timing levels in one sketch."]
    ]],
    "6-2": ["Buzzer Beep System", [
      ["Buzzer on D6", "Which pin sends the sound signal?", "D6 controls the buzzer output."],
      ["200 ms Sound", "What does the first delay hold?", "It keeps the buzzer ON briefly."],
      ["200 ms Silence", "What does the second delay hold?", "It keeps the buzzer OFF briefly."],
      ["Beep Pattern", "What creates a beep instead of constant sound?", "The buzzer repeats ON and OFF with delay."],
      ["Two Buzzers", "What changes in Try Yourself?", "A second buzzer output is added on D7."]
    ]],
    "7-2": ["Advanced LED Patterns", [
      ["All LEDs ON", "What happens first in the pattern?", "All three LED outputs turn HIGH together."],
      ["LED 1 OFF", "How does the off sequence begin?", "The first LED turns LOW after the first wait."],
      ["LED 2 OFF", "What happens next?", "The second LED turns LOW after another delay."],
      ["LED 3 OFF", "How is the sequence completed?", "The third LED turns LOW and the pattern resets."],
      ["Four LED Try", "What does the Try Yourself version add?", "It adds a fourth LED to extend the same pattern."]
    ]],
    "4-3": ["Push Button LED", [
      ["Button Input", "What does the push button give Arduino?", "It gives an input state that can be read."],
      ["LED Output", "What responds to the button?", "The LED turns ON or OFF based on the input."],
      ["INPUT_PULLUP", "Why does pressed mean LOW?", "INPUT_PULLUP keeps the pin HIGH until the button connects it to GND."],
      ["If Else Logic", "Why use if and else?", "The code chooses one action when pressed and another when released."],
      ["Press to Glow", "When should the LED glow?", "It should glow only while the button is pressed."]
    ]],
    "5-3": ["Push Button Buzzer", [
      ["Button on D3", "Which input pin is checked?", "The main code reads the push button on D3."],
      ["Buzzer on D6", "Which output pin makes sound?", "The buzzer is controlled from D6."],
      ["Press to Sound", "When should the buzzer sound?", "It sounds only when the button is pressed."],
      ["Release to Stop", "What happens when the button is released?", "The else block turns the buzzer LOW."],
      ["Doorbell Logic", "What real device works like this?", "A doorbell uses a button trigger to create sound."]
    ]],
    "6-3": ["RGB Push Button", [
      ["Red Channel", "Which RGB color turns on first?", "The red channel is switched ON first."],
      ["Green Channel", "Which color comes next?", "The green channel turns ON after red."],
      ["Blue Channel", "Which color completes the cycle?", "The blue channel turns ON after green."],
      ["Push Trigger", "When does the color cycle run?", "It runs while the push button is pressed."],
      ["RGB Template", "What should students observe in the build?", "The template changes through red, green, and blue."]
    ]],
    "7-3": ["Dimmer and Tones", [
      ["LED Brightness 80", "What does analogWrite(80) do?", "It starts the LED at low brightness."],
      ["Tone 300 Hz", "What does tone(300) create?", "It creates the first low buzzer pitch."],
      ["Brightness 180", "What changes in the second step?", "The LED becomes brighter."],
      ["Tone 900 Hz", "What happens at a higher frequency?", "The buzzer pitch becomes higher."],
      ["Light + Sound", "What is the expert system idea?", "Brightness and tone change together in one repeated behavior."]
    ]]
  };

  Object.entries(data).forEach(([key, [leadTopic, cards]]) => {
    const lesson = window.LMS_CONTENT[key];
    if (!lesson || !lesson.engage) return;
    const [grade, session] = key.split("-");
    lesson.engage.title = "Curiosity Kickoff";
    lesson.engage.lead = `Look at each visual and connect it directly to ${leadTopic} before opening the code.`;
    lesson.engage.triggers = cards.map(([title, question, description], index) => [
      `assets/images/engage/class-${grade}/session-${session}/engage-${String(index + 1).padStart(2, "0")}.png`,
      title,
      question,
      description
    ]);
  });
}());

(function () {
  if (!window.LMS_CONTENT) return;

  const realExamples = {
    "4-1": ["Single LED Blink", [
      ["Desk Lamp", "How does a desk lamp turn light ON when the circuit is complete?", "A desk lamp is a real light-output example. The circuit allows current to reach the lamp, just like Arduino sends an output to an LED."],
      ["Night Lamp", "Why can a small night lamp glow in a dark room?", "A tiny LED can give useful light when it receives power in the correct direction."],
      ["Toy Blinking Light", "How does a toy make a light blink again and again?", "The toy circuit repeats ON, WAIT, OFF, WAIT, which is the same idea as loop() and delay()."],
      ["Bicycle Safety Light", "Why do bicycle lights blink instead of staying ON?", "Blinking catches attention quickly and makes the rider easier to notice."],
      ["Power Indicator", "Why do devices use small indicator LEDs?", "A small LED shows whether a device is ON, charging, or active."]
    ]],
    "5-1": ["Manual LED Output", [
      ["Room Switch", "How does a wall switch control a room light?", "The switch opens or closes the electrical path, just like the rocker switch controls the class output."],
      ["Power Strip Switch", "How can one switch control power to many devices?", "The switch controls the supply path before electricity reaches the connected outputs."],
      ["Torch Button", "Why does a torch glow only after switching it ON?", "The switch completes the circuit so the light output receives power."],
      ["Doorbell Press", "Why does a doorbell respond only after pressing?", "A press creates a simple input-output action that students can connect to Arduino behavior."],
      ["Appliance Control", "Why do appliances need manual switches?", "Manual switches let people decide when a machine output should work."]
    ]],
    "6-1": ["Three LED Sequence", [
      ["Traffic Signal", "How do red, yellow, and green lights change in order?", "Traffic signals use planned sequencing so each color has its correct turn."],
      ["Railway Signal", "Why do trains need different signal lights?", "Different lights show different states such as stop, wait, or go."],
      ["Car Indicator Lights", "How do car indicators blink in a controlled pattern?", "A controller repeats a light pattern so other drivers can understand the signal."],
      ["Machine Status Panel", "Why do machines use several colored LEDs?", "Each color can show a different machine state or warning."],
      ["Stage Light Sequence", "How do stage lights turn on one after another?", "Multiple outputs are controlled in a planned order to create an effect."]
    ]],
    "7-1": ["Buzzer System Logic", [
      ["Home Alarm", "Why does a home alarm make a loud sound?", "The system uses a buzzer output to alert people when a trigger happens."],
      ["School Bell", "How does a bell create a clear sound output?", "A buzzer or bell receives an electrical signal and converts it into sound."],
      ["Emergency Siren", "Why do emergency systems use sound?", "Sound can warn people quickly even when they are not looking at the device."],
      ["Lift Overload Alarm", "How does a lift warn people about overload?", "The system detects a condition and responds with a buzzer alert."],
      ["Toy Character Light", "How can a character model feel interactive?", "A light output makes the model respond visually after code runs."]
    ]],
    "4-2": ["3 Blink Delay Patterns", [
      ["Fast Indicator Blink", "Where do we see fast blinking lights?", "Fast blink patterns are used when a device needs quick attention."],
      ["Slow Standby Blink", "Why do some devices blink slowly while waiting?", "A slow blink can show that the device is powered but not actively working."],
      ["Wi-Fi Router LED", "Why do router LEDs blink at different speeds?", "Different blink rhythms show different network or power states."],
      ["Toy Pattern Light", "How do toys show different light rhythms?", "Changing delay values changes how fast or slow the toy light blinks."],
      ["Festival String Light", "How do decorative lights make patterns?", "They repeat timing patterns to create a visible rhythm."]
    ]],
    "5-2": ["4 Blink Delay Patterns", [
      ["Car Hazard Blink", "Why do hazard lights blink repeatedly?", "A repeated timing pattern warns other people on the road."],
      ["Camera Timer Light", "Why does a camera light blink before a photo?", "The blink pattern shows countdown timing before the action happens."],
      ["Elevator Floor Indicator", "How do indicator lights show system progress?", "Lights change in a controlled way so users can follow the state."],
      ["Charging Status LED", "Why do charging lights blink differently?", "Different blink timings can show charging, full battery, or error states."],
      ["Traffic Countdown Light", "How does timing help people wait?", "Timed lights show progress and make the wait easier to understand."]
    ]],
    "6-2": ["Buzzer Beep System", [
      ["Microwave Beep", "Why does a microwave beep after cooking?", "The buzzer turns ON and OFF to alert the user."],
      ["Washing Machine Alert", "Why do machines beep when a task is complete?", "A sound output tells people that attention is needed."],
      ["Reverse Parking Beep", "Why does a parking sensor beep repeatedly?", "Repeated beep timing warns the driver clearly."],
      ["Digital Watch Alarm", "How can a small watch make sound?", "A tiny buzzer produces repeated sound pulses."],
      ["School Quiz Buzzer", "Why does a quiz button need a buzzer?", "The buzzer gives an instant sound response."]
    ]],
    "7-2": ["Advanced LED Patterns", [
      ["Runway Guide Lights", "Why do runway lights work in patterns?", "Multiple lights guide direction and timing clearly."],
      ["Stage Chase Lights", "How do stage lights create motion effects?", "Lights turn ON or OFF one by one to create a visible sequence."],
      ["Decorative LED Strip", "How can many LEDs make patterns?", "Each LED can be controlled separately to build a pattern."],
      ["Vehicle Tail Light Pattern", "Why do vehicles use multiple LEDs?", "Several LEDs can create brighter and clearer signal patterns."],
      ["Control Panel Startup", "Why do status lights turn on during startup?", "A system can show progress by controlling several outputs in order."]
    ]],
    "4-3": ["Push Button LED", [
      ["Doorbell Button Light", "How can pressing a button turn a light ON?", "A button input can trigger a visible LED output."],
      ["Lift Call Button", "Why does a lift button light up after pressing?", "The system reads the button press and turns on an indicator."],
      ["Computer Power Button", "How does one press start a device response?", "A button sends an input that the system uses to start an output."],
      ["Pedestrian Crossing Button", "Why do crossings use push buttons?", "A button request can trigger a signal system."],
      ["Toy Press Light", "Why does a toy light up only while pressing?", "The button completes the input condition for the light output."]
    ]],
    "5-3": ["Push Button Buzzer", [
      ["Doorbell Buzzer", "Why does a doorbell sound only after pressing?", "The button input triggers the buzzer output."],
      ["Quiz Buzzer", "How does a quiz button make a sound?", "Pressing the button sends the signal that turns the buzzer ON."],
      ["Shop Counter Bell", "Why is a counter bell useful?", "A quick press creates a clear sound alert."],
      ["Security Call Button", "How can a button call for help?", "The button triggers a buzzer or alarm response."],
      ["Game Show Button", "Why do game buttons need sound?", "Sound confirms the input immediately."]
    ]],
    "6-3": ["RGB Push Button", [
      ["RGB Gaming Keyboard", "How do keyboard lights change colors?", "Red, green, and blue channels are controlled separately."],
      ["Smart Bulb Color Mode", "How can one button change bulb colors?", "A button can trigger a color sequence."],
      ["TV Remote Color Button", "How can a remote change a screen setting?", "A button input sends a command that changes the output."],
      ["Decorative RGB Lamp", "Why can one lamp show many colors?", "RGB LEDs mix red, green, and blue light."],
      ["Toy Color Changer", "How can a toy change colors after pressing?", "The button starts a programmed RGB output sequence."]
    ]],
    "7-3": ["Dimmer and Tones", [
      ["Ambulance Light and Siren", "Why do alerts combine light and sound?", "Light and sound together make warnings easier to notice."],
      ["Toy Police Car", "How does a toy combine flashing light and sound?", "The circuit changes LED brightness and buzzer tone together."],
      ["Warning Tower Lamp", "How can alert levels be shown?", "Brightness and tone can increase to show stronger warning levels."],
      ["Stage Audio Visual Cue", "How do shows sync light and sound?", "A controller can change both outputs in a planned pattern."],
      ["Smart Alarm Device", "How can one device give two kinds of alerts?", "It can combine dimming light with buzzer tones."]
    ]]
  };

  Object.entries(realExamples).forEach(([key, [leadTopic, cards]]) => {
    const lesson = window.LMS_CONTENT[key];
    if (!lesson || !lesson.engage) return;
    const [grade, session] = key.split("-");
    lesson.engage.title = "Real-Life Curiosity Kickoff";
    lesson.engage.lead = `Start with these real-life examples of ${leadTopic}. Each example connects directly to the code and circuit students will build.`;
    lesson.engage.triggers = cards.map(([title, question, description], index) => [
      "",
      title,
      question,
      description
    ]);
  });
}());
