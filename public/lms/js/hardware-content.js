// Hardware explanations sourced from the hardware explanation Word documents in assets/hardware explanantion level 1/.
(function () {
  if (!window.LMS_CONTENT) return;

  const component = {
    led: {
      title: "LED (Light Emitting Diode)",
      images: [
        "assets/images/hardware-doc/level-1/hardware-doc-01.png",
        "assets/images/hardware-doc/level-1/hardware-doc-02.jpeg",
        "assets/images/hardware-doc/level-1/hardware-doc-03.png"
      ],
      description: "A small light called LED glows when electricity flows through it. It has two pins: Positive (+), the longer pin, and Negative (-), the shorter pin. It needs electricity to glow.",
      working: "LEDs are used in gadgets to show power and for lighting rooms. Always connect it correctly, and don't look at bright LEDs."
    },
    buzzer: {
      title: "Buzzer",
      images: [
        "assets/images/hardware-doc/level-1/hardware-doc-04.png",
        "assets/images/hardware-doc/level-1/hardware-doc-05.png"
      ],
      description: "A buzzer makes a beep or buzz sound when electricity passes through it.",
      working: "The buzzer vibrates to produce sound. It is found in alarms, toys, and microwaves. Don't poke the buzzer or block its sound hole."
    },
    rockerSwitch: {
      title: "Rocker Switch (2-pin)",
      images: ["assets/images/hardware-doc/level-1/hardware-doc-06.png"],
      description: "A 2-pin rocker switch allows or cuts off the flow of current by rocking between two positions: ON and OFF. Once pressed, it stays in its new state until pressed again.",
      working: "When the switch is ON, it completes the circuit and allows current to flow. When it is OFF, it breaks the circuit and stops the current. Pin 1 connects to input power and Pin 2 connects to the device or load. It has no polarity."
    },
    pushSwitch: {
      title: "Push Switch (2-pin)",
      images: ["assets/images/hardware-doc/level-1/hardware-doc-07.png"],
      description: "A 2-pin push switch is a momentary switch. It only connects the circuit while being pressed. Once released, the connection breaks automatically.",
      working: "Press the switch and the circuit is completed, so the device turns ON. Release the switch and the circuit breaks, so the device turns OFF. It is used for temporary input, reset, trigger actions, and momentary control."
    },
    limitSwitch: {
      title: "Limit Switch (3-pin)",
      images: ["assets/images/hardware-doc/level-1/hardware-doc-08.png"],
      description: "A 3-pin limit switch is a mechanical switch used to detect movement or position in machines. It has a lever or button that gets pressed when something touches it, changing the switch state.",
      working: "It has COM, NO, and NC. NO is open when not pressed and closes when pressed. NC is closed when not pressed and opens when pressed. It is used for end-position detection, motor stopping, and safety cutoff in automation."
    },
    toggleSwitch: {
      title: "Toggle Switch (3-pin)",
      images: ["assets/images/hardware-doc/level-1/hardware-doc-09.png"],
      description: "A 3-pin toggle switch allows you to toggle between two outputs or states, typically used to select between two devices or modes.",
      working: "It behaves like an SPDT switch. COM connects to Pin 1 in one direction and Pin 2 in the other direction. It selects one output at a time and is used for mode selection, motor direction, LED selection, and fan-speed selection."
    },
    dcMotor: {
      title: "DC Motor",
      images: [
        "assets/images/hardware-doc/level-1/hardware-doc-10.png",
        "assets/images/hardware-doc/level-1/hardware-doc-11.png"
      ],
      description: "A DC motor uses electricity to spin and make things move. Connect a battery to the motor and it spins. Switch the wires and it spins the other way.",
      working: "Its main parts are the rotor, wires, and body. Simple motors spin one way, while geared motors change speed. Motors are found in cars, fans, and toys. Don't let the motor get too hot."
    },
    potentiometer: {
      title: "Potentiometer",
      images: [
        "assets/images/hardware-doc/level-1/hardware-doc-12.png",
        "assets/images/hardware-doc/level-1/hardware-doc-13.png"
      ],
      description: "A potentiometer changes voltage by sliding a part called a wiper. The wiper adjusts voltage, and the two terminals connect to power and ground.",
      working: "Move the wiper towards power and the voltage becomes higher. Move it towards ground and the voltage becomes lower. It is used in volume controls and light dimming. Avoid high voltage."
    },
    servoMotor: {
      title: "Servo Motor",
      images: [
        "assets/images/hardware-doc/level-1/hardware-doc-14.png",
        "assets/images/hardware-doc/level-1/hardware-doc-15.png"
      ],
      description: "A servo motor is designed for precise control of movement, position, and angle.",
      working: "It uses a control system to adjust its position until it matches the target. It can move to a specific angle or spin continuously for speed control. It is used in toys and robots. Don't push it too hard, and use the right voltage."
    },
    touchSensor: {
      title: "Touch Sensor",
      images: ["assets/images/hardware-doc/level-1/hardware-doc-16.jpeg"],
      description: "A touch sensor is an electronic device that detects when it is physically touched and converts this touch into an electrical signal. It acts like a switch: when touched, it closes a circuit or sends a HIGH signal.",
      working: "A typical touch sensor module has VCC, GND, and OUT pins. When a person touches the metal pad, it changes the capacitance of the sensor. The sensor IC detects this change and changes the output pin from LOW to HIGH."
    },
    display: {
      title: "7 Segment TM1637 Display",
      images: [
        "assets/images/hardware-doc/level-1/hardware-doc-17.png",
        "assets/images/hardware-doc/level-1/hardware-doc-18.png",
        "assets/images/hardware-doc/level-1/hardware-doc-19.jpeg"
      ],
      description: "A 7-segment display is a device that shows numbers using LEDs arranged in 7 sections per digit.",
      working: "Each segment can light up to show part of a number, like forming the number 8 by lighting all segments. The TM1637 chip tells the segments when to light up. It is used in clocks, timers, and calculators."
    },
    ldr: {
      title: "LDR Sensor",
      images: [
        "assets/images/hardware-doc/level-1/hardware-doc-20.png",
        "assets/images/hardware-doc/level-1/hardware-doc-21.jpeg",
        "assets/images/hardware-doc/level-1/hardware-doc-22.png"
      ],
      description: "An LDR, or Light Dependent Resistor, is a special component that detects light. Its resistance changes when the amount of light changes.",
      working: "In bright light, its resistance becomes low. In darkness, its resistance becomes high. This affects how much current flows through it. LDRs are like the eyes of electronic circuits that sense light."
    },
    laser: {
      title: "Laser Diode",
      images: [
        "assets/images/hardware-doc/level-1/hardware-doc-23.jpeg",
        "assets/images/hardware-doc/level-1/hardware-doc-24.png"
      ],
      description: "A laser diode is a small electronic component that produces a focused beam of laser light.",
      working: "It converts electrical energy into a narrow, bright beam of light when current flows through it. It is used in laser pointers, barcode scanners, distance sensors, and robotics projects. Never look directly into the laser beam."
    },
    potPcb: {
      title: "Potentiometer (POT PCB)",
      images: ["assets/images/hardware-doc/level-1/hardware-doc-25.png"],
      description: "A potentiometer, or pot, is a variable resistor that allows you to adjust the amount of electrical resistance in a circuit. In Arduino projects, it is used as an analog input device to provide variable values.",
      working: "A typical potentiometer PCB has VCC, GND, and OUT pins. Rotating the knob moves the wiper along the resistive track and changes the output voltage. Arduino reads this changing voltage using an analog input, usually from 0 to 1023."
    },
    converterPcb: {
      title: "Converter PCB",
      images: ["assets/images/hardware-doc/level-1/hardware-doc-26.png"],
      description: "A Converter PCB is an electronic module that changes one voltage level into another to safely power electronic devices.",
      working: "It can work as a Buck converter, Boost converter, or Buck-Boost converter. It helps protect components from over-voltage. Always check input and output voltage ratings and use the correct polarity."
    },
    tiltSensor: {
      title: "Tilt Sensor",
      images: [
        "assets/images/hardware-doc/level-2/hardware-doc-2-01.png",
        "assets/images/hardware-doc/level-2/hardware-doc-2-02.jpeg",
        "assets/images/hardware-doc/level-2/hardware-doc-2-03.png"
      ],
      description: "A tilt sensor tells if something is tilted or not by detecting its angle compared to the ground. Common types include mercury tilt switches and ball tilt sensors.",
      working: "When the sensor is tilted, the part inside the sensor moves and makes or breaks the circuit. Arduino reads this as a HIGH or LOW signal, so the project can react when a model is moved, tipped, or placed at an angle."
    },
    adSwitch: {
      title: "Analog to Digital Converter (AD Switch)",
      images: ["assets/images/hardware-doc/level-2/hardware-doc-2-04.png"],
      description: "An AD Switch is used with sensors that provide both analog and digital pins. It lets the circuit select which type of sensor output is being used.",
      working: "Analog mode gives a changing value, while digital mode gives a simple ON/OFF style signal. Since both pins should not be used at the same time, the AD Switch helps students choose the correct sensor function for the activity."
    },
    irSensor: {
      title: "IR Sensor",
      images: [
        "assets/images/hardware-doc/level-2/hardware-doc-2-05.png",
        "assets/images/hardware-doc/level-2/hardware-doc-2-06.png",
        "assets/images/hardware-doc/level-2/hardware-doc-2-07.png"
      ],
      description: "An IR sensor detects infrared light to sense nearby objects, measure distance, or detect motion. It is widely used in automation, robotics, and security systems.",
      working: "The IR LED emits infrared light. When an object is close, that light reflects back to the photodiode. The control circuit processes the reflected light and sends an OUT signal to Arduino. Its pins are VCC, GND, and OUT."
    },
    hallSensor: {
      title: "Hall Effect Sensor",
      images: [
        "assets/images/hardware-doc/level-2/hardware-doc-2-08.png",
        "assets/images/hardware-doc/level-2/hardware-doc-2-09.jpeg",
        "assets/images/hardware-doc/level-2/hardware-doc-2-10.png"
      ],
      description: "A Hall Effect sensor detects and measures magnetic fields. It converts a magnetic field into an electrical signal.",
      working: "When current flows through the Hall element and a magnetic field is nearby, a small Hall voltage is generated. The sensor circuit amplifies and processes this signal. Digital Hall sensors output HIGH or LOW, while analog Hall sensors output a changing value based on magnetic field strength."
    },
    soundSensor: {
      title: "Sound Sensor",
      images: [
        "assets/images/hardware-doc/level-2/hardware-doc-2-11.png",
        "assets/images/hardware-doc/level-2/hardware-doc-2-12.jpeg",
        "assets/images/hardware-doc/level-2/hardware-doc-2-13.png"
      ],
      description: "A sound sensor detects and measures sound levels, then converts the sound into an electrical signal.",
      working: "When sound reaches the microphone on the module, the circuit converts vibration into a signal that Arduino can read. It can be used to detect claps, measure environmental noise, or trigger alarms when sound crosses a set level."
    },
    dipLed: {
      title: "DIP LED",
      images: [
        "assets/images/hardware-doc/level-2/hardware-doc-2-14.jpeg",
        "assets/images/hardware-doc/level-2/hardware-doc-2-15.jpeg"
      ],
      description: "A DIP LED is a light-emitting diode with two long metal leads for easy connection to breadboards and PCBs. It is commonly used as an indicator light in Arduino and robotics projects.",
      working: "Current flows from the anode, the longer positive lead, to the cathode, the shorter negative lead. Inside the LED, electrons release energy as light. A current-limiting resistor is needed to protect the LED from too much current."
    },
    stringLed: {
      title: "String LED",
      images: ["assets/images/hardware-doc/level-2/hardware-doc-2-16.png"],
      description: "A String LED is a group of LEDs connected along a wire or flexible cable for decorative or functional lighting.",
      working: "When the correct voltage is supplied, current flows through the LED string and each LED glows. Basic strings use positive and negative wires. Addressable RGB strings also use a data signal so each LED can be controlled individually."
    },
    rgbLed: {
      title: "RGB LED",
      images: [
        "assets/images/hardware-doc/level-2/hardware-doc-2-17.jpeg",
        "assets/images/hardware-doc/level-2/hardware-doc-2-18.png"
      ],
      description: "An RGB LED combines red, green, and blue LEDs inside one package. By controlling each color separately, it can create many different colors.",
      working: "Each color pin can be controlled independently. Arduino changes brightness using PWM. Red plus Green makes Yellow, Red plus Blue makes Magenta, Green plus Blue makes Cyan, and all three together make White. Most beginner Arduino activities use a common cathode RGB LED."
    }
  };

  const sessionMap = {
    "1": ["led", "dipLed", "buzzer", "pushSwitch"],
    "2": ["led", "buzzer", "rockerSwitch", "pushSwitch"],
    "3": ["rgbLed", "pushSwitch", "buzzer", "potentiometer"],
    "4": ["limitSwitch", "toggleSwitch", "led", "buzzer"],
    "5": ["toggleSwitch", "pushSwitch", "led", "dcMotor"],
    "6": ["servoMotor", "pushSwitch", "led", "converterPcb"],
    "7": ["touchSensor", "led", "buzzer", "converterPcb"],
    "8": ["ldr", "led", "laser", "adSwitch"],
    "9": ["laser", "ldr", "buzzer", "display"],
    "10": ["dcMotor", "potentiometer", "servoMotor", "stringLed"]
  };

  const level2SessionMap = {
    "1": ["ldr", "led", "adSwitch", "potPcb"],
    "2": ["soundSensor", "buzzer", "led", "adSwitch"],
    "3": ["tiltSensor", "buzzer", "led", "adSwitch"],
    "4": ["hallSensor", "led", "buzzer", "adSwitch"],
    "5": ["irSensor", "buzzer", "led", "adSwitch"],
    "6": ["servoMotor", "pushSwitch", "potentiometer", "converterPcb"],
    "7": ["display", "pushSwitch", "dipLed", "converterPcb"],
    "8": ["touchSensor", "rgbLed", "potPcb", "buzzer"],
    "9": ["laser", "ldr", "display", "buzzer"],
    "10": ["ldr", "display", "servoMotor", "soundSensor"]
  };

  Object.entries(window.LMS_CONTENT).forEach(([key, lesson]) => {
    const match = String(lesson.session || "").match(/\d+/);
    const session = match ? match[0] : "1";
    const isLevel2 = key.startsWith("2-") || String(lesson.year || "").includes("Level 2");
    const map = isLevel2 ? level2SessionMap : sessionMap;
    const componentKeys = map[session] || sessionMap[session] || sessionMap["1"];
    if (!lesson.explain) return;

    lesson.explain.hardware = {
      title: `${lesson.year || (isLevel2 ? "Level 2 Sensational Sensors" : "Level 1 Creative Automation")} ${lesson.session} Hardware Explanation`,
      intro: "This explanation uses the hardware reference document. Only the components required for this session are included here.",
      items: componentKeys.map((componentKey) => {
        const entry = component[componentKey];
        return [
          entry.images,
          entry.title,
          entry.description,
          entry.working
        ];
      })
    };
  });
}());
