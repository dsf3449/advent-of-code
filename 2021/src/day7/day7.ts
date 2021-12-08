import getPuzzleInput from "../utils";

interface AnswerPair {
  partOne?: number;
  partTwo?: number;
}

export function findArrayMaxAndMin(input: number[]) {
  const max = input.reduce((previousValue, currentValue) => {
    return Math.max(previousValue, currentValue);
  });
  const min = input.reduce((previousValue, currentValue) => {
    return Math.min(previousValue, currentValue);
  });
  return {
    max,
    min,
  };
}

function partOne(input: number[]) {
  const bounds = findArrayMaxAndMin(input);
  const positionSums = [];

  for (let i = bounds.min; i < bounds.max; i += 1) {
    let sum = 0;
    input.forEach((crab) => {
      sum += Math.abs(crab - i);
    });
    positionSums.push(sum);
  }

  return findArrayMaxAndMin(positionSums).min;
}

function partTwo(input: number[]) {
  const bounds = findArrayMaxAndMin(input);
  const positionSums: number[] = [];

  for (let i = bounds.min; i < bounds.max; i += 1) {
    let sum = 0;
    input.forEach((crab) => {
      const amountOfMoves = Math.abs(crab - i);
      sum += amountOfMoves;

      // Add the additional missing fuel values
      for (let j = 0; j < amountOfMoves; j += 1) {
        sum += j;
      }
    });
    positionSums.push(sum);
  }

  return findArrayMaxAndMin(positionSums).min;
}

export default function runDay(part: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day7test` : `day7`
  );
  const array = input[0].split(`,`).map((x) => Number(x));

  if (part === 1) {
    return {
      partOne: partOne(array),
    };
  }

  if (part === 2) {
    return {
      partTwo: partTwo(array),
    };
  }

  return {
    partOne: partOne(array),
    partTwo: partTwo(array),
  };
}
