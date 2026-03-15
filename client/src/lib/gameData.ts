// ============================================================
// SCIENCE EXPLORER ACADEMY — Game Data & Lesson Content
// All 8 lessons across 2 units with quiz questions and game configs
// ============================================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  emoji: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  bgColor: string;
  gameType: string;
  gameTitle: string;
  focusConcept: string;
  hookFact: string;
  miniQuiz: QuizQuestion[];
  bossQuiz: QuizQuestion[];
  xpReward: number;
  badgeEmoji: string;
  badgeName: string;
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  theme: string;
  emoji: string;
  color: string;
  bgColor: string;
  bannerUrl: string;
  lessons: Lesson[];
}

export const UNITS: Unit[] = [
  {
    id: 'unit1',
    number: 1,
    title: 'Matter and its Interactions',
    theme: 'The Secret Science of Stuff',
    emoji: '🧪',
    color: '#FF6B35',
    bgColor: '#FFF0E8',
    bannerUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663440693124/LRCQh74urLCPMmK8QUgPSZ/unit1-matter-banner-JDors2nGbycvz88yEwhz9o.webp',
    lessons: [
      {
        id: 'u1l1',
        unitId: 'unit1',
        number: 1,
        title: 'The Air Around Us',
        subtitle: 'Air has mass & takes up space!',
        emoji: '💨',
        color: '#4FC3F7',
        bgColor: '#E3F7FF',
        gameType: 'bubble-pop',
        gameTitle: 'Bubble Pop!',
        focusConcept: 'Air has mass and takes up space',
        hookFact: 'Did you know? Air is REAL stuff! It has weight and fills up space — just like water or rocks!',
        miniQuiz: [
          {
            id: 'u1l1q1',
            question: 'Is air made of real stuff?',
            options: ['Yes! Air is matter', 'No, air is nothing', 'Only sometimes'],
            correctIndex: 0,
            emoji: '💨',
            explanation: 'Air IS matter! It takes up space and has mass, just like solid things.'
          },
          {
            id: 'u1l1q2',
            question: 'What happens when you blow up a balloon?',
            options: ['Magic fills it', 'Air (matter) fills it', 'It fills with water'],
            correctIndex: 1,
            emoji: '🎈',
            explanation: 'Air fills the balloon! Air is matter that takes up space.'
          },
          {
            id: 'u1l1q3',
            question: 'Which of these is a gas?',
            options: ['🪨 Rock', '💧 Water', '💨 Air'],
            correctIndex: 2,
            emoji: '🌬️',
            explanation: 'Air is a gas! Gases spread out and fill any container they are in.'
          }
        ],
        bossQuiz: [
          {
            id: 'u1l1b1',
            question: 'What state of matter is air?',
            options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
            correctIndex: 2,
            emoji: '💨',
            explanation: 'Air is a GAS! Gas particles move freely and fill any space.'
          },
          {
            id: 'u1l1b2',
            question: 'Can air push things?',
            options: ['No, it is too light', 'Yes! Air has force', 'Only hot air'],
            correctIndex: 1,
            emoji: '🌬️',
            explanation: 'Yes! Air can push things — that is how wind works and how balloons float!'
          },
          {
            id: 'u1l1b3',
            question: 'What fills a bicycle tire?',
            options: ['Water', 'Air (a gas)', 'Foam', 'Nothing'],
            correctIndex: 1,
            emoji: '🚲',
            explanation: 'Air fills bike tires! Compressed air (gas) pushes outward to keep the tire firm.'
          },
          {
            id: 'u1l1b4',
            question: 'Air takes up ___.',
            options: ['No space', 'Space!', 'Only cold space'],
            correctIndex: 1,
            emoji: '📦',
            explanation: 'Air takes up space! That is why you cannot put more air in a full balloon.'
          },
          {
            id: 'u1l1b5',
            question: 'Which is the best example of air having mass?',
            options: ['A flat tire weighs less than a full tire', 'Rocks are heavy', 'Water is wet'],
            correctIndex: 0,
            emoji: '⚖️',
            explanation: 'A flat tire weighs less! The air inside has mass, so removing it makes the tire lighter.'
          }
        ],
        xpReward: 100,
        badgeEmoji: '💨',
        badgeName: 'Air Explorer'
      },
      {
        id: 'u1l2',
        unitId: 'unit1',
        number: 2,
        title: 'Sorting States',
        subtitle: 'Solid, Liquid, or Gas?',
        emoji: '🧊',
        color: '#FF6B35',
        bgColor: '#FFF0E8',
        gameType: 'particle-sorter',
        gameTitle: 'The Particle Sorter',
        focusConcept: 'Three states of matter: solid, liquid, gas',
        hookFact: 'Everything around you is either a SOLID, LIQUID, or GAS! Can you sort them all before the belt speeds up?',
        miniQuiz: [
          {
            id: 'u1l2q1',
            question: 'Which one is a SOLID?',
            options: ['🧊 Ice cube', '💧 Water', '💨 Steam'],
            correctIndex: 0,
            emoji: '🪨',
            explanation: 'Ice is a solid! Solids have a fixed shape and do not flow.'
          },
          {
            id: 'u1l2q2',
            question: 'Which one is a LIQUID?',
            options: ['🪨 Rock', '🥛 Milk', '☁️ Cloud'],
            correctIndex: 1,
            emoji: '💧',
            explanation: 'Milk is a liquid! Liquids flow and take the shape of their container.'
          },
          {
            id: 'u1l2q3',
            question: 'Which one is a GAS?',
            options: ['🍎 Apple', '🌊 Ocean', '💨 Air'],
            correctIndex: 2,
            emoji: '💨',
            explanation: 'Air is a gas! Gases spread out to fill any space they are in.'
          }
        ],
        bossQuiz: [
          {
            id: 'u1l2b1',
            question: 'What makes a solid different from a liquid?',
            options: ['Solids have a fixed shape', 'Solids are always cold', 'Solids are lighter'],
            correctIndex: 0,
            emoji: '🧊',
            explanation: 'Solids keep their shape! Liquids change shape to fit their container.'
          },
          {
            id: 'u1l2b2',
            question: 'Orange juice is a ___.',
            options: ['Solid', 'Liquid', 'Gas'],
            correctIndex: 1,
            emoji: '🍊',
            explanation: 'Orange juice is a liquid! It flows and takes the shape of its cup.'
          },
          {
            id: 'u1l2b3',
            question: 'Steam coming from hot soup is a ___.',
            options: ['Solid', 'Liquid', 'Gas'],
            correctIndex: 2,
            emoji: '♨️',
            explanation: 'Steam is a gas! When water gets very hot, it turns into water vapor (gas).'
          },
          {
            id: 'u1l2b4',
            question: 'How many states of matter are there?',
            options: ['2', '3', '5'],
            correctIndex: 1,
            emoji: '🔢',
            explanation: 'There are 3 main states: solid, liquid, and gas!'
          },
          {
            id: 'u1l2b5',
            question: 'A wooden block is a ___.',
            options: ['Solid', 'Liquid', 'Gas'],
            correctIndex: 0,
            emoji: '🪵',
            explanation: 'Wood is a solid! It has a fixed shape and does not flow.'
          }
        ],
        xpReward: 100,
        badgeEmoji: '🧊',
        badgeName: 'Matter Master'
      },
      {
        id: 'u1l3',
        unitId: 'unit1',
        number: 3,
        title: 'Heat & Cold',
        subtitle: 'Change the state of matter!',
        emoji: '🌡️',
        color: '#FF4444',
        bgColor: '#FFE8E8',
        gameType: 'thermostat-hero',
        gameTitle: 'Thermostat Hero',
        focusConcept: 'Heat and cold change states of matter',
        hookFact: 'Heat is like a superpower! It can turn solid ice into liquid water, and liquid water into gas steam!',
        miniQuiz: [
          {
            id: 'u1l3q1',
            question: 'What happens to ice when it gets warm?',
            options: ['It gets bigger', 'It melts into water', 'It turns into gas'],
            correctIndex: 1,
            emoji: '🧊',
            explanation: 'Ice melts! Heat makes the solid particles move faster until they become liquid.'
          },
          {
            id: 'u1l3q2',
            question: 'What happens to water when it gets VERY cold?',
            options: ['It freezes into ice', 'It disappears', 'It turns into gas'],
            correctIndex: 0,
            emoji: '❄️',
            explanation: 'Water freezes! Cold slows down the liquid particles until they lock into a solid.'
          },
          {
            id: 'u1l3q3',
            question: 'Boiling water turns into ___.',
            options: ['Ice', 'Rocks', 'Steam (gas)'],
            correctIndex: 2,
            emoji: '♨️',
            explanation: 'Boiling water becomes steam! Extreme heat turns liquid water into water vapor gas.'
          }
        ],
        bossQuiz: [
          {
            id: 'u1l3b1',
            question: 'Melting means going from ___ to ___.',
            options: ['Liquid to gas', 'Solid to liquid', 'Gas to solid'],
            correctIndex: 1,
            emoji: '🧊',
            explanation: 'Melting is solid → liquid! Like ice cream melting on a hot day.'
          },
          {
            id: 'u1l3b2',
            question: 'Freezing means going from ___ to ___.',
            options: ['Liquid to solid', 'Gas to liquid', 'Solid to gas'],
            correctIndex: 0,
            emoji: '❄️',
            explanation: 'Freezing is liquid → solid! Cold removes heat energy, slowing particles down.'
          },
          {
            id: 'u1l3b3',
            question: 'What gives particles energy to change state?',
            options: ['Color', 'Heat', 'Size'],
            correctIndex: 1,
            emoji: '🔥',
            explanation: 'Heat gives particles energy! More heat = faster moving particles = state change.'
          },
          {
            id: 'u1l3b4',
            question: 'Chocolate melts in your hand because ___.',
            options: ['It is magic', 'Your body heat warms it', 'It is liquid already'],
            correctIndex: 1,
            emoji: '🍫',
            explanation: 'Your body heat melts chocolate! Body temperature is warm enough to melt it.'
          },
          {
            id: 'u1l3b5',
            question: 'What is the word for liquid turning into gas?',
            options: ['Freezing', 'Melting', 'Evaporation'],
            correctIndex: 2,
            emoji: '💧',
            explanation: 'Evaporation! When liquid water gets enough heat, it evaporates into water vapor.'
          }
        ],
        xpReward: 120,
        badgeEmoji: '🌡️',
        badgeName: 'Thermostat Hero'
      },
      {
        id: 'u1l4',
        unitId: 'unit1',
        number: 4,
        title: 'Mix it Up!',
        subtitle: 'Unit 1 Review — Potion Lab!',
        emoji: '⚗️',
        color: '#9B59B6',
        bgColor: '#F5E8FF',
        gameType: 'potion-lab',
        gameTitle: 'Potion Lab',
        focusConcept: 'Review: states of matter and changes',
        hookFact: 'You are now a SCIENCE WIZARD! Combine everything you learned about matter to brew the ultimate Super Solution!',
        miniQuiz: [
          {
            id: 'u1l4q1',
            question: 'Which state of matter has NO fixed shape?',
            options: ['Solid', 'Liquid and Gas', 'Only solid'],
            correctIndex: 1,
            emoji: '🌊',
            explanation: 'Liquids AND gases have no fixed shape! They both take the shape of their container (or spread out).'
          },
          {
            id: 'u1l4q2',
            question: 'What causes matter to change state?',
            options: ['Color changes', 'Adding or removing heat', 'Making it bigger'],
            correctIndex: 1,
            emoji: '🔥',
            explanation: 'Heat causes state changes! Add heat to melt or evaporate; remove heat to freeze or condense.'
          },
          {
            id: 'u1l4q3',
            question: 'Air is an example of a ___.',
            options: ['Solid', 'Liquid', 'Gas'],
            correctIndex: 2,
            emoji: '💨',
            explanation: 'Air is a gas! Gas particles spread out to fill any space.'
          }
        ],
        bossQuiz: [
          {
            id: 'u1l4b1',
            question: 'Ice → Water is called ___.',
            options: ['Freezing', 'Melting', 'Evaporation'],
            correctIndex: 1,
            emoji: '🧊',
            explanation: 'Melting! Solid ice absorbs heat and becomes liquid water.'
          },
          {
            id: 'u1l4b2',
            question: 'Water → Ice is called ___.',
            options: ['Melting', 'Boiling', 'Freezing'],
            correctIndex: 2,
            emoji: '❄️',
            explanation: 'Freezing! Liquid water loses heat and becomes solid ice.'
          },
          {
            id: 'u1l4b3',
            question: 'Which has particles packed tightly together?',
            options: ['Gas', 'Liquid', 'Solid'],
            correctIndex: 2,
            emoji: '🪨',
            explanation: 'Solids! Solid particles are tightly packed and barely move.'
          },
          {
            id: 'u1l4b4',
            question: 'Steam is water in which state?',
            options: ['Solid', 'Liquid', 'Gas'],
            correctIndex: 2,
            emoji: '♨️',
            explanation: 'Gas! Steam is water vapor — water that has evaporated into gas form.'
          },
          {
            id: 'u1l4b5',
            question: 'Which best describes a liquid?',
            options: ['Fixed shape, fixed volume', 'No fixed shape, fixed volume', 'No fixed shape, no fixed volume'],
            correctIndex: 1,
            emoji: '💧',
            explanation: 'Liquids have no fixed shape but DO have a fixed volume — they take the shape of their container!'
          }
        ],
        xpReward: 150,
        badgeEmoji: '⚗️',
        badgeName: 'Potion Master'
      }
    ]
  },
  {
    id: 'unit2',
    number: 2,
    title: 'Forces and Motion',
    theme: 'The Superpower of Physics',
    emoji: '🚀',
    color: '#4FC3F7',
    bgColor: '#E3F7FF',
    bannerUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663440693124/LRCQh74urLCPMmK8QUgPSZ/unit2-forces-banner-Yw4uJfU95u24ueo4u28P7q.webp',
    lessons: [
      {
        id: 'u2l1',
        unitId: 'unit2',
        number: 1,
        title: 'Speed & Path',
        subtitle: 'Steer with force arrows!',
        emoji: '🚀',
        color: '#4FC3F7',
        bgColor: '#E3F7FF',
        gameType: 'space-rover',
        gameTitle: 'Space Rover',
        focusConcept: 'Forces change direction and speed',
        hookFact: 'Forces are INVISIBLE superpowers! A push or pull can change how fast something moves AND which way it goes!',
        miniQuiz: [
          {
            id: 'u2l1q1',
            question: 'What is a force?',
            options: ['A push or pull', 'A color', 'A type of animal'],
            correctIndex: 0,
            emoji: '💪',
            explanation: 'A force is a push or pull! Forces can make things move, stop, or change direction.'
          },
          {
            id: 'u2l1q2',
            question: 'What happens when you push a ball?',
            options: ['Nothing', 'It moves away from you', 'It gets heavier'],
            correctIndex: 1,
            emoji: '⚽',
            explanation: 'The ball moves away! Your push (force) transfers energy to the ball, making it move.'
          },
          {
            id: 'u2l1q3',
            question: 'Can a force change direction?',
            options: ['No, never', 'Yes!', 'Only in space'],
            correctIndex: 1,
            emoji: '↩️',
            explanation: 'Yes! Forces can change an object\'s direction — like when you kick a ball to the side.'
          }
        ],
        bossQuiz: [
          {
            id: 'u2l1b1',
            question: 'A bigger force makes an object move ___.',
            options: ['Slower', 'Faster', 'The same speed'],
            correctIndex: 1,
            emoji: '💨',
            explanation: 'Faster! A bigger force gives more energy to an object, making it move faster.'
          },
          {
            id: 'u2l1b2',
            question: 'Kicking a soccer ball is an example of a ___.',
            options: ['Pull', 'Push', 'Gravity'],
            correctIndex: 1,
            emoji: '⚽',
            explanation: 'A push! Your foot pushes the ball forward with force.'
          },
          {
            id: 'u2l1b3',
            question: 'What can forces change?',
            options: ['Only speed', 'Only direction', 'Speed AND direction'],
            correctIndex: 2,
            emoji: '🎯',
            explanation: 'Both! Forces can change how fast something moves AND which way it goes.'
          },
          {
            id: 'u2l1b4',
            question: 'Opening a door is an example of a ___.',
            options: ['Push or pull', 'Gravity', 'Magnetism'],
            correctIndex: 0,
            emoji: '🚪',
            explanation: 'Push or pull! You either push or pull a door to open it — both are forces.'
          },
          {
            id: 'u2l1b5',
            question: 'Two equal forces pushing from opposite sides will ___.',
            options: ['Make it go faster', 'Balance out (no movement)', 'Make it spin'],
            correctIndex: 1,
            emoji: '⚖️',
            explanation: 'Balance out! Equal forces from opposite directions cancel each other — balanced forces.'
          }
        ],
        xpReward: 100,
        badgeEmoji: '🚀',
        badgeName: 'Force Explorer'
      },
      {
        id: 'u2l2',
        unitId: 'unit2',
        number: 2,
        title: 'Comparing Speed',
        subtitle: 'Measure and rank motion!',
        emoji: '🐌',
        color: '#52B788',
        bgColor: '#E8FFF2',
        gameType: 'snail-race',
        gameTitle: 'The Great Snail Race',
        focusConcept: 'Speed is distance over time',
        hookFact: 'Speed is how FAST something moves over time! A cheetah is fast, a snail is slow — but how do we MEASURE it?',
        miniQuiz: [
          {
            id: 'u2l2q1',
            question: 'What is speed?',
            options: ['How heavy something is', 'How fast something moves', 'How big something is'],
            correctIndex: 1,
            emoji: '⚡',
            explanation: 'Speed is how fast something moves! It measures distance traveled over time.'
          },
          {
            id: 'u2l2q2',
            question: 'Which is faster?',
            options: ['🐌 Snail', '🐆 Cheetah', 'They are the same'],
            correctIndex: 1,
            emoji: '🏆',
            explanation: 'The cheetah! A cheetah can run 70 mph, while a snail moves about 0.03 mph.'
          },
          {
            id: 'u2l2q3',
            question: 'How do we measure speed?',
            options: ['With a ruler', 'Distance AND time', 'With a scale'],
            correctIndex: 1,
            emoji: '⏱️',
            explanation: 'Distance AND time! Speed = Distance ÷ Time. You need both to measure speed.'
          }
        ],
        bossQuiz: [
          {
            id: 'u2l2b1',
            question: 'If two animals race the same distance, who wins?',
            options: ['The heavier one', 'The one that finishes first', 'The bigger one'],
            correctIndex: 1,
            emoji: '🏁',
            explanation: 'The one that finishes first! Finishing first means they moved faster (more speed).'
          },
          {
            id: 'u2l2b2',
            question: 'A car travels 60 miles in 1 hour. Its speed is ___.',
            options: ['60 miles per hour', '60 miles', '1 hour'],
            correctIndex: 0,
            emoji: '🚗',
            explanation: '60 miles per hour (mph)! Speed is always measured in distance per time unit.'
          },
          {
            id: 'u2l2b3',
            question: 'Which tool helps measure how fast something moves?',
            options: ['Thermometer', 'Stopwatch + ruler', 'Scale'],
            correctIndex: 1,
            emoji: '⏱️',
            explanation: 'Stopwatch + ruler! Time how long it takes to travel a measured distance.'
          },
          {
            id: 'u2l2b4',
            question: 'A faster object covers ___ distance in the same time.',
            options: ['Less', 'More', 'The same'],
            correctIndex: 1,
            emoji: '📏',
            explanation: 'More distance! A faster object covers more ground in the same amount of time.'
          },
          {
            id: 'u2l2b5',
            question: 'Speed is measured in ___.',
            options: ['Pounds', 'Miles per hour or meters per second', 'Degrees'],
            correctIndex: 1,
            emoji: '📊',
            explanation: 'Miles per hour (mph) or meters per second (m/s)! These units show distance over time.'
          }
        ],
        xpReward: 100,
        badgeEmoji: '🏆',
        badgeName: 'Speed Champion'
      },
      {
        id: 'u2l3',
        unitId: 'unit2',
        number: 3,
        title: "Gravity's Pull",
        subtitle: "Earth's invisible tug!",
        emoji: '🍎',
        color: '#E74C3C',
        bgColor: '#FFE8E8',
        gameType: 'drop-test',
        gameTitle: 'Drop Test',
        focusConcept: "Gravity pulls everything toward Earth",
        hookFact: "Gravity is Earth's invisible superpower! It pulls EVERYTHING toward the ground — even you, right now!",
        miniQuiz: [
          {
            id: 'u2l3q1',
            question: 'What is gravity?',
            options: ['A type of food', 'A pulling force toward Earth', 'A kind of gas'],
            correctIndex: 1,
            emoji: '🌍',
            explanation: 'Gravity is a pulling force! Earth pulls everything toward its center — that is why things fall down.'
          },
          {
            id: 'u2l3q2',
            question: 'Why do things fall when you drop them?',
            options: ['They are tired', 'Gravity pulls them down', 'They want to go down'],
            correctIndex: 1,
            emoji: '🍎',
            explanation: 'Gravity! Earth\'s gravity pulls dropped objects downward toward the ground.'
          },
          {
            id: 'u2l3q3',
            question: 'On the Moon, gravity is weaker. You would ___.',
            options: ['Fall faster', 'Float and jump higher', 'Stay the same'],
            correctIndex: 1,
            emoji: '🌙',
            explanation: 'Float and jump higher! Less gravity means less pull, so you can jump much higher on the Moon.'
          }
        ],
        bossQuiz: [
          {
            id: 'u2l3b1',
            question: 'Gravity pulls objects toward ___.',
            options: ['The sky', 'The center of Earth', 'Other objects only'],
            correctIndex: 1,
            emoji: '🌍',
            explanation: 'The center of Earth! Gravity pulls everything toward Earth\'s center — that is why "down" is always toward the ground.'
          },
          {
            id: 'u2l3b2',
            question: 'In a vacuum (no air), a feather and a bowling ball dropped together will ___.',
            options: ['The ball falls faster', 'The feather falls faster', 'They fall at the same speed'],
            correctIndex: 2,
            emoji: '🪶',
            explanation: 'Same speed! Without air resistance, gravity pulls all objects at the same rate regardless of weight.'
          },
          {
            id: 'u2l3b3',
            question: 'What makes a feather fall slower than a rock in air?',
            options: ['Gravity is different', 'Air resistance slows the feather', 'The feather is scared'],
            correctIndex: 1,
            emoji: '🪶',
            explanation: 'Air resistance! The feather\'s large surface area catches more air, slowing it down.'
          },
          {
            id: 'u2l3b4',
            question: 'Who discovered gravity by watching an apple fall?',
            options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei'],
            correctIndex: 1,
            emoji: '🍎',
            explanation: 'Isaac Newton! The story says an apple falling from a tree inspired Newton to think about gravity.'
          },
          {
            id: 'u2l3b5',
            question: 'Gravity is strongest when objects are ___.',
            options: ['Far apart', 'Close together', 'Moving fast'],
            correctIndex: 1,
            emoji: '🧲',
            explanation: 'Close together! Gravity gets stronger the closer objects are to each other.'
          }
        ],
        xpReward: 120,
        badgeEmoji: '🍎',
        badgeName: 'Gravity Guru'
      },
      {
        id: 'u2l4',
        unitId: 'unit2',
        number: 4,
        title: 'Physics Master',
        subtitle: 'Unit 2 Review — Go-Kart Race!',
        emoji: '🏎️',
        color: '#F39C12',
        bgColor: '#FFF8E8',
        gameType: 'gokart-builder',
        gameTitle: 'Go-Kart Builder',
        focusConcept: 'Review: forces, motion, speed, and gravity',
        hookFact: 'You have learned the SUPERPOWERS of physics! Now use forces, speed, and gravity to build the ultimate go-kart and WIN the race!',
        miniQuiz: [
          {
            id: 'u2l4q1',
            question: 'What is the difference between a push and a pull?',
            options: ['They are the same', 'Push moves away, pull moves toward', 'Only pulls are forces'],
            correctIndex: 1,
            emoji: '↔️',
            explanation: 'Push moves things away from you, pull moves things toward you — but both are forces!'
          },
          {
            id: 'u2l4q2',
            question: 'What slows down a moving object?',
            options: ['More force in the same direction', 'Friction and opposing forces', 'Gravity always speeds things up'],
            correctIndex: 1,
            emoji: '🛑',
            explanation: 'Friction and opposing forces! Friction is a force that resists motion and slows things down.'
          },
          {
            id: 'u2l4q3',
            question: 'A heavier go-kart needs ___ force to move at the same speed.',
            options: ['Less', 'More', 'The same'],
            correctIndex: 1,
            emoji: '🏎️',
            explanation: 'More force! Heavier objects have more mass, so they need more force to accelerate.'
          }
        ],
        bossQuiz: [
          {
            id: 'u2l4b1',
            question: 'Friction is a force that ___.',
            options: ['Speeds things up', 'Slows things down', 'Has no effect'],
            correctIndex: 1,
            emoji: '🔥',
            explanation: 'Slows things down! Friction opposes motion — it is why things eventually stop moving.'
          },
          {
            id: 'u2l4b2',
            question: 'Going downhill, gravity makes you go ___.',
            options: ['Slower', 'Faster', 'The same speed'],
            correctIndex: 1,
            emoji: '⛰️',
            explanation: 'Faster! Going downhill, gravity pulls you in the direction of motion, speeding you up.'
          },
          {
            id: 'u2l4b3',
            question: 'What is inertia?',
            options: ['The tendency to keep doing what you are doing', 'A type of gravity', 'A measurement of speed'],
            correctIndex: 0,
            emoji: '😴',
            explanation: 'Inertia is the tendency to keep doing what you are doing! Still objects stay still; moving objects keep moving.'
          },
          {
            id: 'u2l4b4',
            question: 'Which has more force: a gentle breeze or a hurricane?',
            options: ['Gentle breeze', 'Hurricane', 'They are the same'],
            correctIndex: 1,
            emoji: '🌀',
            explanation: 'Hurricane! A hurricane has much more force — that is why it can knock down trees and buildings.'
          },
          {
            id: 'u2l4b5',
            question: 'A ball rolling on grass stops because of ___.',
            options: ['Gravity pulling sideways', 'Friction from the grass', 'Running out of speed'],
            correctIndex: 1,
            emoji: '⚽',
            explanation: 'Friction! The grass creates friction against the ball, gradually slowing it to a stop.'
          }
        ],
        xpReward: 150,
        badgeEmoji: '🏎️',
        badgeName: 'Physics Champion'
      }
    ]
  }
];

export const ALL_LESSONS = UNITS.flatMap(u => u.lessons);

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find(l => l.id === id);
}

export function getUnitById(id: string): Unit | undefined {
  return UNITS.find(u => u.id === id);
}

export function getNextLesson(currentId: string): Lesson | undefined {
  const idx = ALL_LESSONS.findIndex(l => l.id === currentId);
  return idx >= 0 && idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1] : undefined;
}
