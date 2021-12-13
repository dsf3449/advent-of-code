import getPuzzleInput, { AnswerPair } from "../utils";

function foldAlongY(points: number[][], yValue: number) {
  const returnPoints = points;

  // we only want to process the points which will be affected by the horizontal
  // fold, which are points that have a y value more than the fold point
  const pointsToProcess = points.filter((point) => point[1] > yValue);

  pointsToProcess.forEach((point) => {
    // the distance from the point's y value to where we are folding
    const dist = point[1] - yValue;
    // the new y value of the point is the folding value minus the distance
    const newY = yValue - dist;

    // only add the point if it doesn't already exist in the array
    if (
      returnPoints.filter(
        (point2) => point2[0] === point[0] && point2[1] === newY
      ).length === 0
    ) {
      returnPoints.push([point[0], newY]);
    }
  });

  // now we only want the points that are less than the fold line
  return returnPoints.filter((point) => point[1] < yValue);
}

function foldAlongX(points: number[][], xValue: number) {
  const returnPoints = points;

  // we only want to process the points which will be affected by the vertical
  // fold, which are points that have an x value more than the fold point
  const pointsToProcess = points.filter((point) => point[0] > xValue);

  pointsToProcess.forEach((point) => {
    // the distance from the point's x value to where we are folding
    const dist = point[0] - xValue;
    // the new x value of the point is the folding value minus the distance
    const newX = xValue - dist;

    // only add the point if it doesn't already exist in the array
    if (
      returnPoints.filter(
        (point2) => point2[0] === newX && point2[1] === point[1]
      ).length === 0
    ) {
      returnPoints.push([newX, point[1]]);
    }
  });

  // now we only want the points that are less than the fold line
  return returnPoints.filter((point) => point[0] < xValue);
}

function partOne(points: number[][], foldInstructionsIn: string[][]) {
  let foldInstructions = foldInstructionsIn;
  // for part one we only want to look at the first fold
  foldInstructions = foldInstructions.slice(0, 1);

  switch (foldInstructions[0][0]) {
    case `x`:
      return foldAlongX(points, Number(foldInstructions[0][1])).length;
    case `y`:
      return foldAlongY(points, Number(foldInstructions[0][1])).length;
    default:
      console.error(`this wont happen`);
      break;
  }

  return 0;
}

function partTwo(points: number[][], foldInstructionsIn: string[][]) {
  let returnPoints = points;

  foldInstructionsIn.forEach((foldInstruction) => {
    switch (foldInstruction[0]) {
      case `x`:
        returnPoints = foldAlongX(returnPoints, Number(foldInstruction[1]));
        break;
      case `y`:
        returnPoints = foldAlongY(returnPoints, Number(foldInstruction[1]));
        break;
      default:
        console.error(`this won't happen`);
        break;
    }
  });

  // get the highest value from the folded array x values and add one to it
  // so that there's extra spacing around the output
  const width =
    returnPoints.reduce((previousValue, currentValue) => {
      if (previousValue[0] > currentValue[0]) {
        return previousValue;
      }

      return currentValue;
    })[0] + 1;

  // save as above but with the height
  const height =
    returnPoints.reduce((previousValue, currentValue) => {
      if (previousValue[1] > currentValue[1]) {
        return previousValue;
      }

      return currentValue;
    })[1] + 1;

  for (let i = 0; i < height; i += 1) {
    let stringToOutput = ``;
    for (let j = 0; j < width; j += 1) {
      // if the point exists in the return array, then we should output a
      // "dot" for it
      if (
        returnPoints.filter((point) => point[0] === j && point[1] === i)
          .length === 1
      ) {
        // suggested by https://www.reddit.com/r/adventofcode/comments/rfdky1/comment/hodk0cl/?utm_source=share&utm_medium=web2x&context=3
        stringToOutput += `█`;
      } else {
        // else output a space
        stringToOutput += ` `;
      }
    }
    // write the line to the console
    console.log(stringToOutput);
  }

  return 0;
}

export default function runDay(part: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day13test` : `day13`
  );

  const firstFold = input.findIndex((value) => value === ``) + 1;

  // turns '6,10', '0,14' into [ 6, 10 ],  [ 0, 14 ]
  const points = input
    .slice(0, firstFold - 1)
    .map((value) => value.split(`,`).map(Number));

  // turns 'fold along y=7', 'fold along x=5' into [ 'y', '7' ], [ 'x', '5' ]
  const foldInstructions = input
    .slice(firstFold)
    .map((value) => value.split(`fold along `)[1].split(`=`));

  if (part === 1) {
    return {
      partOne: partOne(points, foldInstructions),
    };
  }

  if (part === 2) {
    return {
      partTwo: partTwo(points, foldInstructions),
    };
  }

  return {
    partOne: partOne(points, foldInstructions),
    partTwo: partTwo(points, foldInstructions),
  };
}
