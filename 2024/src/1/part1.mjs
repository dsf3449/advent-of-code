import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  const lefts = [];
  const rights = [];

  input.forEach((row) => {
    const [locLeft, locRight] = row.split("   ");
    lefts.push(parseInt(locLeft));
    rights.push(parseInt(locRight));
  });

  lefts.sort();
  rights.sort();

  let distSum = 0;
  lefts.forEach((leftVal, index) => {
    let dist = leftVal - rights[index];
    if (dist < 0) dist *= -1;

    distSum += dist;
  });

  console.log(`sum of distances: ${distSum}`);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
