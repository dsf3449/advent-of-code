import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  const regex = /\d/g;
  let sum = 0;

  input.forEach(line => {
    const matches = [...line.matchAll(regex)];
    sum += parseInt(`${line[matches[0].index]}${line[matches.slice(-1)[0].index]}`);
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
