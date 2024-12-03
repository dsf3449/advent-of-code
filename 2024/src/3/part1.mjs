import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  let sum = 0;
  const operations = [];
  input.forEach((line) => {
    operations.push(...line.match(/mul\(\d+,\d+\)/gm));
  });

  operations.forEach((op) => {
    const [first, second] = op.split(",");
    sum +=
      parseInt(first.replace(/\D/g, "")) * parseInt(second.replace(/\D/g, ""));
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
