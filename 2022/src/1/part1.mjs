import { getPuzzleInput } from "../utils.mjs";

function handle(input) {
  const calorieSums = [];

  let runningSum = 0;
  input.forEach(line => {
    if (line === ``) {
      calorieSums.push(runningSum);
      runningSum = 0;
      return;
    }

    runningSum += Number(line);
  });

  console.log(Math.max(...calorieSums));
}

getPuzzleInput(1, false).then(handle);
