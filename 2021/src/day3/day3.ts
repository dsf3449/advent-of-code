import getPuzzleInput from "../utils";

/**
 * Makes two arrays: one that holds the amount of zeros, and one that holds the
 * amount of ones. Then, if the amount of zeros is bigger than the amount of
 * ones for a specific index, append a 0 for the gammaRate and a 1 for the
 * epsilonRate. Opposite action if ones > zeros.
 *
 * Avg first run execution time: 3.7028ms
 * @param input
 */
function partOne(input: string[]) {
  console.time(`p1`);
  let gammaRate = ``;
  let epsilonRate = ``;
  const lengthOfInput = input[0].length;

  const zeros = Array(lengthOfInput).fill(0);
  const ones = Array(lengthOfInput).fill(0);

  input.forEach((value) => {
    [...value].forEach((bit, index) => {
      if (bit === `0`) {
        zeros[index] += 1;
      } else {
        ones[index] += 1;
      }
    });
  });

  zeros.forEach((value, index) => {
    if (value > ones[index]) {
      gammaRate += `0`;
      epsilonRate += `1`;
    } else {
      gammaRate += `1`;
      epsilonRate += `0`;
    }
  });

  const gamma = parseInt(gammaRate, 2);
  const epsilon = parseInt(epsilonRate, 2);

  console.log(`Gamma ${gamma}`);
  console.log(`Epsilon ${epsilon}`);
  console.log(`Solution ${gamma * epsilon}`);
  console.timeEnd(`p1`);
}

/**
 * Returns an array which represents the number of 1s in each column of an
 * input array
 * @param input
 */
function calculateSums(input: string[]): number[] {
  const sums = Array(input[0].length).fill(0);

  input.forEach((value) => {
    [...value].forEach((bit, index) => {
      sums[index] += Number(bit);
    });
  });

  return sums;
}

/**
 * Makes an array called sums, then adds each bit of each input line. If the
 * sum of the values is bigger than half the input, this means there are more
 * ones than zeros in the column. So we append a 1 to the gammaRate and a 0 to
 * the epsilonRate.
 *
 * Avg first run execution time: 3.6824ms
 * @param input
 */
function partOneAlternateSolution(input: string[]) {
  console.time(`p1a`);
  const lines = input.length;
  let gammaRate = ``;
  let epsilonRate = ``;
  const sums = calculateSums(input);

  sums.forEach((value) => {
    if (value > lines / 2) {
      gammaRate += `1`;
      epsilonRate += `0`;
    } else {
      gammaRate += `0`;
      epsilonRate += `1`;
    }
  });

  const gamma = parseInt(gammaRate, 2);
  const epsilon = parseInt(epsilonRate, 2);

  console.log(`Gamma ${gamma}`);
  console.log(`Epsilon ${epsilon}`);
  console.log(`Solution ${gamma * epsilon}`);
  console.timeEnd(`p1a`);
}

/**
 * Loops the puzzle input, filtering out the values which have either the most
 * or the least common bits, depending on whether we are calculating o2 or co2.
 * @param puzzleInput
 * @param o2OrCo2
 */
function calculateRating(puzzleInput: string[], o2OrCo2: string) {
  let possibleAnswers = puzzleInput.slice(0);

  for (let i = 0; possibleAnswers.length > 1; i += 1) {
    const sums = calculateSums(possibleAnswers);

    if (sums[i] >= possibleAnswers.length / 2) {
      possibleAnswers = possibleAnswers.filter((line) => {
        if (o2OrCo2 === `o2`) {
          return line[i] === `1`;
        }
        return line[i] === `0`;
      });
    } else {
      possibleAnswers = possibleAnswers.filter((line) => {
        if (o2OrCo2 === `o2`) {
          return line[i] === `0`;
        }
        return line[i] === `1`;
      });
    }
  }

  return possibleAnswers[0];
}

function partTwo(input: string[]) {
  const gen = parseInt(calculateRating(input, `o2`), 2);
  const scrub = parseInt(calculateRating(input, `co2`), 2);
  console.log(`o2 ${gen}`);
  console.log(`co2 ${scrub}`);
  console.log(`Solution ${gen * scrub}`);
}

export default function runDay() {
  const input = getPuzzleInput(`day3`);
  partOne(input);
  console.log(`---`);
  partOneAlternateSolution(input);
  console.log(`---`);
  partTwo(input);
}
