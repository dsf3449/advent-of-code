import { getPuzzleInputRel } from "../utils.mjs";

// left column: opponent
// right column: outcome

// A = rock
// B = paper
// C = scissors
// X = lose
// Y = tie
// Z = win

// rock === 1
// paper === 2
// scissors === 3

// points
const OUTCOME_TIE = 3;
const OUTCOME_WIN = 6;
const OUTCOME_LOSS = 0;
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const resolve = {
  // loss
  X: {
    A: OUTCOME_LOSS + SCISSORS,
    B: OUTCOME_LOSS + ROCK,
    C: OUTCOME_LOSS + PAPER
  },
  // tie
  Y: {
    A: OUTCOME_TIE + ROCK,
    B: OUTCOME_TIE + PAPER,
    C: OUTCOME_TIE + SCISSORS
  },
  // win
  Z: {
    A: OUTCOME_WIN + PAPER,
    B: OUTCOME_WIN + SCISSORS,
    C: OUTCOME_WIN + ROCK
  }
};

function handle(input) {
  let score = 0;

  input.forEach((round) => {
    const [opp, me] = round.split(` `);
    score += resolve[me][opp];
  });

  console.log(score);
}

getPuzzleInputRel(import.meta.url, false).then(handle);
