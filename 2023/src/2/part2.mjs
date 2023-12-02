import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  let sum = 0;

  input.forEach(game => {
    const minimums = {
      red: 0,
      green: 0,
      blue: 0
    };

    const roundsRaw = game.slice(game.indexOf(`:`) + 2);
    const rounds = roundsRaw.split(`; `);

    rounds.forEach(round => {
      const outcomes = round.split(`, `);

      outcomes.forEach(outcome => {
        if (outcome.includes(`blue`)) {
          const num = parseInt(outcome.split(` blue`)[0]);

          if (num > minimums.blue) {
            minimums.blue = num;
          }
        } else if (outcome.includes(`red`)) {
          const num = parseInt(outcome.split(` red`)[0]);

          if (num > minimums.red) {
            minimums.red = num;
          }
        } else {
          const num = parseInt(outcome.split(` green`)[0]);

          if (num > minimums.green) {
            minimums.green = num;
          }
        }
      });
    });

    const power = minimums.blue * minimums.red * minimums.green;
    sum += power;
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
