import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  const occurrences = {};
  const multiplier = {};

  input.forEach((row) => {
    const [locLeft, locRight] = row.split("   ");
    const intLeft = parseInt(locLeft);
    occurrences[intLeft] = occurrences[intLeft] ? occurrences[intLeft] + 1 : 1;

    const intRight = parseInt(locRight);
    multiplier[intRight] = multiplier[intRight] ? multiplier[intRight] + 1 : 1;
  });

  let sum = 0;
  Object.keys(occurrences).forEach((key) => {
    const actualVal = parseInt(key);
    const counts = occurrences[key];
    const multi = multiplier[key] ? multiplier[key] : 0;

    sum += actualVal * counts * multi;
  });

  console.log(`score: ${sum}`);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
