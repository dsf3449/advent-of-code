import { getPuzzleInputRel } from "../utils.mjs";

// left column: opponent
// right column: me

// A, X = rock
// B, Y = paper
// C, Z = scissors

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
  // rock
  // ties with rock
  // loses to paper
  // wins against scissors
  X: {
    A: OUTCOME_TIE + ROCK,
    B: OUTCOME_LOSS + ROCK,
    C: OUTCOME_WIN + ROCK
  },
  // paper
  // wins against rock
  // ties with paper,
  // loses to scissors
  Y: {
    A: OUTCOME_WIN + PAPER,
    B: OUTCOME_TIE + PAPER,
    C: OUTCOME_LOSS + PAPER
  },
  // scissors
  // loses to rock
  // wins against paper
  // ties with scissors
  Z: {
    A: OUTCOME_LOSS + SCISSORS,
    B: OUTCOME_WIN + SCISSORS,
    C: OUTCOME_TIE + SCISSORS
  }
};

function handle(input) {
  let score = 0;

  input.forEach(round => {
    const [opp, me] = round.split(` `);
    score += resolve[me][opp];
  });

  console.log(score);
}

getPuzzleInputRel(import.meta.url, false).then(handle);
