import getPuzzleInput, { AnswerPair } from "../utils";

interface InstructionKey {
  [instruction: string]: string[];
}

interface Counter {
  [pair: string]: number;
}

/**
 * Makes an object like:
 * {
 *   CH: [`CB`, `BH`]
 * }
 * provided the instructions
 * [[`CH`, `B`]]
 * @param instructions
 */
export function createInstructionKey(instructions: string[][]) {
  const instructionKey: InstructionKey = {};

  instructions.forEach((instruction) => {
    const pair1 = `${instruction[0][0]}${instruction[1]}`;
    const pair2 = `${instruction[1]}${instruction[0][1]}`;
    instructionKey[instruction[0]] = [pair1, pair2];
  });

  return instructionKey;
}

function processTick(
  pairCounter: Counter,
  instructionKey: InstructionKey,
  letterCounter: Counter
) {
  console.time(`Tick ended, took: `);
  const returnPairCounter = pairCounter;
  const returnLetterCounter = letterCounter;

  Object.entries(returnPairCounter).forEach((pair) => {
    if (pair[1] === 0) return;

    const pairsToUpdate = instructionKey[pair[0]];

    returnPairCounter[pair[0]] -= pair[1];
    returnLetterCounter[pairsToUpdate[0][1]] += pair[1];
    pairsToUpdate.forEach((updatePair) => {
      returnPairCounter[updatePair] += pair[1];
    });

    // this old solution took over 5 minutes by the time it reached tick 29
    // for (let i = 0; i < pair[1]; i += 1) {
    //   returnPairCounter[pair[0]] -= 1;
    //   returnLetterCounter[pairsToUpdate[0][1]] += 1;
    //   pairsToUpdate.forEach((updatePair) => {
    //     console.log(updatePair);
    //     returnPairCounter[updatePair] += 1;
    //   });
    // }
  });
  console.timeEnd(`Tick ended, took: `);

  return { returnPairCounter, returnLetterCounter };
}

function processTicks(
  pairCounter: Counter,
  instructionKey: InstructionKey,
  letterCounter: Counter,
  ticksToSimulate: number
) {
  let finalPairCounter = pairCounter;
  let finalLetterCounter = letterCounter;

  for (let i = 0; i < ticksToSimulate; i += 1) {
    console.log(`Tick ${i + 1}`);
    const { returnPairCounter, returnLetterCounter } = processTick(
      finalPairCounter,
      instructionKey,
      finalLetterCounter
    );
    finalPairCounter = returnPairCounter;
    finalLetterCounter = returnLetterCounter;
    console.log(`----------`);
  }

  return { finalPairCounter, finalLetterCounter };
}

function partOne(
  template: string,
  instructionKey: InstructionKey,
  ticks: number
) {
  const pairCounter: Counter = {};
  const letterCounter: Counter = {};

  Object.entries(instructionKey).forEach((instruction) => {
    pairCounter[instruction[0]] = 0;
    letterCounter[instruction[0][0]] = 0;
    letterCounter[instruction[0][1]] = 0;
  });

  for (let i = 0; i < template.length - 1; i += 1) {
    const pair = `${template[i]}${template[i + 1]}`;
    pairCounter[pair] += 1;
  }

  [...template].forEach((letter) => {
    letterCounter[letter] += 1;
  });

  const { finalLetterCounter } = processTicks(
    pairCounter,
    instructionKey,
    letterCounter,
    ticks
  );

  return (
    Math.max(...Object.values(finalLetterCounter)) -
    Math.min(...Object.values(finalLetterCounter))
  );
}

function partTwo(template: string, instructionKey: InstructionKey) {
  return partOne(template, instructionKey, 40);
}

export default function runDay(part: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day14test` : `day14`
  );

  const template = input[0];
  const instructionKey = createInstructionKey(
    input.slice(2).map((value) => value.split(` -> `))
  );

  if (part === 1) {
    return {
      partOne: partOne(template, instructionKey, 10),
    };
  }

  if (part === 2) {
    return {
      partTwo: partTwo(template, instructionKey),
    };
  }

  return {
    partOne: partOne(template, instructionKey, 10),
    partTwo: partTwo(template, instructionKey),
  };
}
