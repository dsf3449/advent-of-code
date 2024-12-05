import { getPuzzleInputRel, isImported } from "../utils.mjs";

function checkUpdateLine(orderingRules, update) {
  for (let pageIndex = 0; pageIndex < update.length; pageIndex++) {
    for (let i = 0; i < orderingRules.length; i++) {
      const rule = orderingRules[i];
      if (rule[0] !== update[pageIndex]) continue;
      if (!update.includes(rule[1])) continue;

      const secondaryPageIndex = update.indexOf(rule[1]);
      if (secondaryPageIndex < pageIndex) {
        const removed = update.toSpliced(pageIndex, 1);
        const final = removed.toSpliced(secondaryPageIndex, 0, rule[0]);

        const result = checkUpdateLine(orderingRules, final);
        if (result.done) {
          return {
            done: true,
            data: result.data || final,
          };
        }
      }
    }
  }

  return {
    done: true,
    data: null,
  };
}

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
    const resp = checkUpdateLine(orderingRules, update);

    if (!resp.data) return;
    sum += parseInt(resp.data[Math.floor(resp.data.length / 2)]);
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
