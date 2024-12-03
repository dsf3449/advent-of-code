import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  let sum = 0;
  const operations = [];
  input.forEach((line) => {
    operations.push(...line.match(/mul\(\d+,\d+\)|don't\(\)|do\(\)/gm));
  });

  let active = true;
  operations.forEach((op) => {
    if (op === "don't()") {
      active = false;
      return;
    }
    if (op === "do()") {
      active = true;
      return;
    }

    if (!active) return;
    const [first, second] = op.split(",");
    sum +=
      parseInt(first.replace(/\D/g, "")) * parseInt(second.replace(/\D/g, ""));
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
