import { getPuzzleInputRel } from "../utils.mjs";
import { orderBy } from "lodash-es";

function handle(input) {
  const calorieSums = [];

  let runningSum = 0;
  input.forEach((line) => {
    if (line === ``) {
      calorieSums.push(runningSum);
      runningSum = 0;
      return;
    }

    runningSum += Number(line);
  });

  const ordered = orderBy(calorieSums, [], [`desc`]);
  console.log(ordered[0] + ordered[1] + ordered[2]);
}

getPuzzleInputRel(import.meta.url, false).then(handle);
