import { getPuzzleInputRel } from "../utils.mjs";

function handle(input) {
  let overlap = 0;

  input.forEach((pair) => {
    const [first, second] = pair
      .split(`,`)
      .map((range) => range.split(`-`).map(Number));

    if (
      (first[0] <= second[0] && first[1] >= second[1]) ||
      (second[0] <= first[0] && second[1] >= first[1])
    ) {
      overlap += 1;
    }
  });

  console.log(overlap);
}

getPuzzleInputRel(import.meta.url, false).then(handle);
