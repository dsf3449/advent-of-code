import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  const maxes = {
    red: 12,
    green: 13,
    blue: 14
  };
  let sum = 0;

  input.forEach(game => {
    const colonPos = game.indexOf(`:`);
    const gameId = parseInt(game.substring(0, colonPos).split(`Game `)[1]);

    const roundsRaw = game.slice(colonPos + 2);
    const rounds = roundsRaw.split(`; `);
    let gameIsPossible = true;

    rounds.forEach(round => {
      const outcomes = round.split(`, `);

      outcomes.forEach(outcome => {
        if (outcome.includes(`blue`)) {
          const num = parseInt(outcome.split(` blue`)[0]);

          if (num > maxes.blue) {
            gameIsPossible = false;
          }
        } else if (outcome.includes(`red`)) {
          const num = parseInt(outcome.split(` red`)[0]);

          if (num > maxes.red) {
            gameIsPossible = false;
          }
        } else {
          const num = parseInt(outcome.split(` green`)[0]);

          if (num > maxes.green) {
            gameIsPossible = false;
          }
        }
      });
    });

    if (gameIsPossible) {
      sum += gameId;
    }
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
