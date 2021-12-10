import getPuzzleInput, { AnswerPair } from "../utils";

function partOne(numArrays: number[][]) {
  let riskLevel = 0;

  numArrays.forEach((rows, row) => {
    rows.forEach((value, column) => {
      // check each value surrounding this value
      let up;
      let down;

      if (row - 1 >= 0) {
        up = numArrays[row - 1][column];
      }

      if (row + 1 < numArrays.length) {
        down = numArrays[row + 1][column];
      }
      const left = numArrays[row][column - 1];
      const right = numArrays[row][column + 1];

      // filter out undefined and then sort ascending
      const answers = [up, down, left, right]
        .filter((num) => num !== undefined)
        .sort();

      // if the lowest value in the array is equal to the original value, then
      // it's the lowest of the 4
      if (answers[0] === undefined) {
        console.error(`this won't ever happen`);
        return;
      }
      if (answers[0] > value) {
        riskLevel += value + 1;
      }
    });
  });

  return riskLevel;
}

function getLowPoints(input: number[][]) {
  const lowPoints = [];

  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < input[i].length; j += 1) {
      // tries to find each side, otherwise it's inf
      const up = input[i - 1]?.[j] ?? Infinity;
      const down = input[i + 1]?.[j] ?? Infinity;
      const left = input[i]?.[j - 1] ?? Infinity;
      const right = input[i]?.[j + 1] ?? Infinity;
      const value = input[i][j];

      // if the value is less than all of its neighbors then it must be a low point
      if (value < Math.min(up, down, left, right)) {
        lowPoints.push([i, j]);
      }
    }
  }

  return lowPoints;
}

function getBasin(
  x: number,
  y: number,
  visited: boolean[][],
  numArrays: number[][]
) {
  // because no param reassign
  const visitedCopy = visited;

  if (!visited[x]) {
    visitedCopy[x] = [];
  }

  let sum = 1;

  visitedCopy[x][y] = true;

  const up = numArrays[x - 1]?.[y] ?? Infinity;
  const down = numArrays[x + 1]?.[y] ?? Infinity;
  const left = numArrays[x]?.[y - 1] ?? Infinity;
  const right = numArrays[x]?.[y + 1] ?? Infinity;

  // if the side is less than 9 (meaning it's in a basin) and we haven't visited
  // its neighbor yet, recursively search for its neighbors and add them to the
  // total sum
  if (up < 9 && !visited[x - 1]?.[y]) {
    sum += getBasin(x - 1, y, visitedCopy, numArrays);
  }
  if (down < 9 && !visited[x + 1]?.[y]) {
    sum += getBasin(x + 1, y, visitedCopy, numArrays);
  }
  if (left < 9 && !visited[x]?.[y - 1]) {
    sum += getBasin(x, y - 1, visitedCopy, numArrays);
  }
  if (right < 9 && !visited[x]?.[y + 1]) {
    sum += getBasin(x, y + 1, visitedCopy, numArrays);
  }

  return sum;
}

function partTwo(numArrays: number[][]) {
  const lowPoints = getLowPoints(numArrays);
  const visited: boolean[][] = [];

  // search out from each low point
  const basins = lowPoints.map(([x, y]) => getBasin(x, y, visited, numArrays));

  // sort the biggest at the bottom
  basins.sort((a, b) => b - a);

  return basins.slice(0, 3).reduce((prev, next) => prev * next, 1);
}

export default function runDay(part: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day9test` : `day9`
  );

  const numArrays: number[][] = [];
  input.forEach((line) => {
    numArrays.push([...line].map((value) => Number(value)));
  });

  const inputPartTwo = input.map((row) => row.split(``).map(Number));

  if (part === 1) {
    return {
      partOne: partOne(numArrays),
    };
  }

  if (part === 2) {
    return {
      partTwo: partTwo(inputPartTwo),
    };
  }

  return {
    partOne: partOne(numArrays),
    partTwo: partTwo(inputPartTwo),
  };
}
