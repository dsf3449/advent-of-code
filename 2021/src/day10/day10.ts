import getPuzzleInput, { AnswerPair } from "../utils";

const openers = [`(`, `[`, `{`, `<`];
const closers = [`)`, `]`, `}`, `>`];

export function searchForCorruptedPair(
  line: string,
  index: number,
  currentOpeners: string[]
): string {
  if (index < line.length) {
    // if the current index is an opener, then recurse down
    if (openers.includes(line[index])) {
      currentOpeners.push(line[index]);
      return searchForCorruptedPair(line, index + 1, currentOpeners);
    }

    // if it's a closer, then check the last opener
    if (closers.includes(line[index])) {
      // gets the last thing off the array
      const lastOpener = currentOpeners.slice(-1)[0];

      // gets the position in the const array
      const opIndex = openers.indexOf(lastOpener);

      // if the current line matches the correct position for a closer
      if (line[index] === closers[opIndex]) {
        // remove the opener and continue searching
        currentOpeners.pop();
        return searchForCorruptedPair(line, index + 1, currentOpeners);
      }
      return line[index];
    }
  }
  return ``;
}

function partOne(input: string[]) {
  let sum = 0;

  input.forEach((line) => {
    const result = searchForCorruptedPair(line, 0, []);
    switch (result) {
      case `)`:
        sum += 3;
        break;
      case `]`:
        sum += 57;
        break;
      case `}`:
        sum += 1197;
        break;
      case `>`:
        sum += 25137;
        break;
      case ``:
      default:
        break;
    }
  });

  return sum;
}

export function findOpenersWithNoClosers(
  line: string,
  index: number,
  currentOpeners: string[]
): string[] {
  if (index < line.length) {
    // if the current index is an opener, then recurse down
    if (openers.includes(line[index])) {
      currentOpeners.push(line[index]);
      return findOpenersWithNoClosers(line, index + 1, currentOpeners);
    }

    // if it's a closer, then check the last opener
    if (closers.includes(line[index])) {
      // gets the last thing off the array
      const lastOpener = currentOpeners.slice(-1)[0];

      // gets the position in the const array
      const opIndex = openers.indexOf(lastOpener);

      // if the current line matches the correct position for a closer
      if (line[index] === closers[opIndex]) {
        // remove the opener and continue searching
        currentOpeners.pop();
        return findOpenersWithNoClosers(line, index + 1, currentOpeners);
      }
    }
  }
  return currentOpeners;
}

function partTwo(input: string[]) {
  const scores: number[] = [];

  input.forEach((line) => {
    // first make sure that this line isn't corrupted
    if (searchForCorruptedPair(line, 0, []) !== ``) {
      return;
    }

    // now get the openers with no closers
    const remainingOpeners = findOpenersWithNoClosers(line, 0, []);

    let scoreForLine = 0;
    // iterate from the top down to go in the right order
    for (let i = remainingOpeners.length - 1; i >= 0; i -= 1) {
      // score is always first multiplied by 5
      scoreForLine *= 5;

      switch (remainingOpeners[i]) {
        case `(`:
          scoreForLine += 1;
          break;
        case `[`:
          scoreForLine += 2;
          break;
        case `{`:
          scoreForLine += 3;
          break;
        case `<`:
          scoreForLine += 4;
          break;
        default:
          console.error(`unknown opener`);
          break;
      }
    }

    scores.push(scoreForLine);
  });

  // sort the scores ascending
  scores.sort((a, b) => a - b);

  // return middle of array
  return scores[Math.floor(scores.length / 2)];
}

export default function runDay(part: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day10test` : `day10`
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
