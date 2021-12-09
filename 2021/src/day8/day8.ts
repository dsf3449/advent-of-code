import assert from "assert";
import getPuzzleInput from "../utils";
import Display from "./Display";

interface AnswerPair {
  partOne?: number;
  partTwo?: number;
}

function partOne(input: string[]) {
  let totalOfUniques = 0;

  input.forEach((line) => {
    line
      .split(` | `)[1]
      .split(` `)
      .forEach((value) => {
        if ([2, 3, 4, 7].includes(value.length)) {
          totalOfUniques += 1;
        }
      });
  });

  return totalOfUniques;
}

export function resolveInputStringsToSegmentObject(inputs: string[]) {
  const display = new Display();

  // Define the uniques that are given
  const one = inputs.find((input) => input.length === 2);
  const seven = inputs.find((input) => input.length === 3);
  const four = inputs.find((input) => input.length === 4);
  const eight = inputs.find((input) => input.length === 7);

  assert(one);
  assert(seven);
  assert(four);
  assert(eight);

  display.resolveStrings[1] = [...one];
  display.resolveStrings[7] = [...seven];
  display.resolveStrings[4] = [...four];
  display.resolveStrings[8] = [...eight];

  // Assign the uniques that we can determine
  // One, we do not yet know the order of
  display.topRight = [...one];
  display.bottomRight = [...one];

  // Seven gives us the top
  display.top = [...seven].filter((letter) => !one.includes(letter));

  // Four gives us the possible middle and top left
  display.topLeft = [...four].filter((letter) => !one.includes(letter));
  display.middle = [...four].filter((letter) => !one.includes(letter));

  // Step one of the algo
  // Three is the only length 5 string which includes both values for one
  let lengthFiveStrings = inputs.filter((value) => value.length === 5);
  const three = lengthFiveStrings.filter(
    (value) => value.includes(one[0]) && value.includes(one[1])
  );
  lengthFiveStrings = lengthFiveStrings.filter((value) => value !== three[0]);
  display.resolveStrings[3] = [...three[0]];

  // Filter out the letters from one and the top
  const possibleMidOrBot = display.resolveStrings[3]
    .filter((value) => !one.includes(value))
    .filter((value) => !display.top.includes(value));

  // Now we can fix the middle and top left
  display.middle = display.middle.filter((letter) =>
    possibleMidOrBot.includes(letter)
  );
  display.topLeft = display.topLeft.filter(
    (letter) => !display.middle.includes(letter)
  );

  // And finally assign the bottom
  display.bottom = possibleMidOrBot.filter(
    (letter) => !display.middle.includes(letter)
  );

  // Now, we can determine bottomRight using 5 because all other segments are known
  const bottomRight = lengthFiveStrings.filter((value) =>
    value.includes(display.topLeft[0])
  )[0];
  display.resolveStrings[5] = [...bottomRight];
  const filteredBottomRight = [...bottomRight].filter(
    (value) => !display.getUsedLetters().includes(value)
  );
  display.bottomRight = filteredBottomRight;
  display.topRight = display.topRight.filter(
    (value) => !filteredBottomRight.includes(value)
  );
  lengthFiveStrings = lengthFiveStrings.filter(
    (value) => !value.includes(display.topLeft[0])
  );

  // And the last 5 length string can be used to find the remaining segment, bottomLeft
  display.bottomLeft = [...lengthFiveStrings[0]].filter(
    (value) => !display.getAllUsedLetters().includes(value)
  );
  display.resolveStrings[2] = [...lengthFiveStrings[0]];

  // Now determine the remaining six length strings, 0, 6, and 9
  let lengthSixStrings = inputs.filter((value) => value.length === 6);

  // Zero doesn't have the middle segment
  const zero = lengthSixStrings.filter(
    (value) => !value.includes(display.middle[0])
  )[0];
  display.resolveStrings[0] = [...zero];

  lengthSixStrings = lengthSixStrings.filter((value) =>
    value.includes(display.middle[0])
  );

  // Six does not have top right
  const six = lengthSixStrings.filter(
    (value) => !value.includes(display.topRight[0])
  )[0];
  display.resolveStrings[6] = [...six];

  // Nine is the only remaining six length string
  const nine = lengthSixStrings.filter((value) =>
    value.includes(display.topRight[0])
  )[0];
  display.resolveStrings[9] = [...nine];

  return display;
}

function partTwo(input: string[]) {
  let sum = 0;

  input.forEach((line) => {
    const split = line.split(` | `);
    const inputs = split[0].split(` `);
    const answers = split[1].split(` `);
    const display = resolveInputStringsToSegmentObject(inputs);

    let outputString = ``;

    answers.forEach((answer) => {
      for (let i = 0; i < display.resolveStrings.length; i += 1) {
        const ansArray = [...answer].sort();
        const resArray = display.resolveStrings[i].sort();
        if (
          ansArray.every((value, index) => resArray[index] === value) &&
          resArray.every((value, index) => ansArray[index] === value)
        ) {
          outputString += String(i);
          break;
        }
      }
    });

    sum += Number(outputString);
  });

  return sum;
}

export default function runDay(part: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day8test` : `day8`
  );

  if (part === 1) {
    return {
      partOne: partOne(input),
    };
  }

  if (part === 2) {
    return {
      partTwo: partTwo(input),
    };
  }

  return {
    partOne: partOne(input),
    partTwo: partTwo(input),
  };
}
