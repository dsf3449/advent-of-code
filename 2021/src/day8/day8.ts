import getPuzzleInput from "../utils";

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

function partTwo(input: string[]) {
  return 0;
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
