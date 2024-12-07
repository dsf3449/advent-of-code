import { getPuzzleInputRel, isImported } from "../utils.mjs";

function findSln(inputs, expectedTotal, newTotal, index) {
  // return up a level if we've exceeded our expected total
  if (newTotal > expectedTotal) return false;

  // check if we have the solution whenever our index matches tree length
  // (no more branches to explore)
  if (index === inputs.length) {
    return expectedTotal === newTotal;
  }

  // attempt to traverse down a level by multiplying
  if (findSln(inputs, expectedTotal, newTotal * inputs[index], index + 1))
    return true;

  // attempt to traverse down a level by adding
  if (findSln(inputs, expectedTotal, newTotal + inputs[index], index + 1))
    return true;

  // no sln down this path
  return false;
}

function handle(input) {
  const parsed = [];
  input.forEach((line) => {
    const [output, inputs] = line.split(": ");
    const inputsSplit = inputs.split(" ").map((inp) => parseInt(inp));
    parsed.push([parseInt(output), inputsSplit]);
  });

  let sum = 0;
  parsed.forEach((line) => {
    if (findSln(line[1], line[0], line[1][0], 1)) sum += line[0];
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
