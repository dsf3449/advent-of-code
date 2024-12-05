import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  // if rule[0] and rule[1] both exist in an update,
  // then rule[0] must be printed before rule[1]
  const orderingRules = [];
  const updates = [];
  let sum = 0;

  input.forEach((line) => {
    if (line.includes("|")) {
      orderingRules.push(line.split("|"));
    }

    if (line.includes(",")) {
      updates.push(line.split(","));
    }
  });

  updates.forEach((update) => {
    let lineIsValid = true;
    for (let pageIndex = 0; pageIndex < update.length; pageIndex++) {
      for (let i = 0; i < orderingRules.length; i++) {
        const rule = orderingRules[i];
        if (rule[0] !== update[pageIndex]) continue;
        if (!update.includes(rule[1])) continue;

        const secondaryPageIndex = update.indexOf(rule[1]);
        if (secondaryPageIndex < pageIndex) {
          console.log("update is invalid");
          lineIsValid = false;
          break;
        }
      }

      if (!lineIsValid) break;
    }

    if (lineIsValid) {
      sum += parseInt(update[Math.floor(update.length / 2)]);
    }
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
