import getPuzzleInput, { AnswerPair } from "../utils";

export function increaseAllOctopusByOne(input: number[][]) {
  const increasedArray = input;

  increasedArray.forEach((row, rowIndex) => {
    row.forEach((octopus, octIndex) => {
      increasedArray[rowIndex][octIndex] += 1;
    });
  });

  return increasedArray;
}

export function countGreaterThanNines(input: number[][]) {
  let sum = 0;

  input.forEach((row) => {
    row.forEach((octopus) => {
      if (octopus > 9) {
        sum += 1;
      }
    });
  });

  return sum;
}

export function flashedThisTick(flashes: number[][], coordinate: number[]) {
  for (let i = 0; i < flashes.length; i += 1) {
    if (flashes[i][0] === coordinate[0] && flashes[i][1] === coordinate[1]) {
      return true;
    }
  }

  return false;
}

export function setFlashesToZero(input: number[][], flashes: number[][]) {
  const returnArray = input;

  flashes.forEach((flash) => {
    returnArray[flash[0]][flash[1]] = 0;
  });

  return returnArray;
}

export function processFlashes(input: number[][]) {
  let returnArray = input;
  const flashes: number[][] = [];

  while (countGreaterThanNines(returnArray) > 0) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    returnArray.forEach((row, rowIndex) => {
      row.forEach((octopus, octIndex) => {
        // if the energy is less than 9 or the octopus already flashed this tick,
        // we don't care about it anymore
        if (octopus <= 9 || flashedThisTick(flashes, [rowIndex, octIndex]))
          return;

        // add the flash to the array
        flashes.push([rowIndex, octIndex]);

        // inform neighbors
        // up
        const up = returnArray[rowIndex - 1]?.[octIndex] ?? undefined;
        if (up) returnArray[rowIndex - 1][octIndex] += 1;
        // down
        const down = returnArray[rowIndex + 1]?.[octIndex] ?? undefined;
        if (down) returnArray[rowIndex + 1][octIndex] += 1;
        // left
        const left = returnArray[rowIndex][octIndex - 1];
        if (left) returnArray[rowIndex][octIndex - 1] += 1;
        // right
        const right = returnArray[rowIndex][octIndex + 1];
        if (right) returnArray[rowIndex][octIndex + 1] += 1;
        // upper right
        const upperRight =
          returnArray[rowIndex - 1]?.[octIndex + 1] ?? undefined;
        if (upperRight) returnArray[rowIndex - 1][octIndex + 1] += 1;
        // upper left
        const upperLeft =
          returnArray[rowIndex - 1]?.[octIndex - 1] ?? undefined;
        if (upperLeft) returnArray[rowIndex - 1][octIndex - 1] += 1;
        // lower left
        const lowerLeft =
          returnArray[rowIndex + 1]?.[octIndex - 1] ?? undefined;
        if (lowerLeft) returnArray[rowIndex + 1][octIndex - 1] += 1;
        // lower right
        const lowerRight =
          returnArray[rowIndex + 1]?.[octIndex + 1] ?? undefined;
        if (lowerRight) returnArray[rowIndex + 1][octIndex + 1] += 1;
      });
    });

    returnArray = setFlashesToZero(returnArray, flashes);
  }

  return {
    returnArray,
    amountOfFlashes: flashes.length,
  };
}

export function processTick(input: number[][]) {
  const increasedArray = increaseAllOctopusByOne(input);
  return processFlashes(increasedArray);
}

function partOne(input: number[][], ticksToSimulate: number) {
  let sumOfFlashes = 0;
  let mutableArray = input;

  for (let i = 0; i < ticksToSimulate; i += 1) {
    const { returnArray, amountOfFlashes } = processTick(mutableArray);
    mutableArray = returnArray;
    sumOfFlashes += amountOfFlashes;
  }

  return sumOfFlashes;
}

function partTwo(input: number[][]) {
  const height = input.length;
  const width = input[0].length;
  const area = height * width;
  let amountOfFlashesLastTick = 0;
  let mutableArray = input;
  let counter = 0;

  while (amountOfFlashesLastTick !== area) {
    const { returnArray, amountOfFlashes } = processTick(mutableArray);
    mutableArray = returnArray;
    amountOfFlashesLastTick = amountOfFlashes;
    counter += 1;
  }

  return counter;
}

export default function runDay(part: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day11test` : `day11`
  );

  const nums = input.map((row) => row.split(``).map(Number));
  const nums2 = input.map((row) => row.split(``).map(Number));

  if (part === 1) {
    return {
      partOne: partOne(nums, 100),
    };
  }

  if (part === 2) {
    return {
      partTwo: partTwo(nums2),
    };
  }

  return {
    partOne: partOne(nums, 100),
    partTwo: partTwo(nums2),
  };
}
