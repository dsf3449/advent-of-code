import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  const regex = /\d|(one|two|three|four|five|six|seven|eight|nine)/g;
  const convert = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };
  let sum = 0;

  input.forEach(line => {
    const matches = [...line.matchAll(regex)];
    let firstNum = matches[0][0];
    let secondNum = matches.slice(-1)[0][0];

    if (Object.keys(convert).includes(firstNum)) {
      firstNum = convert[firstNum];
    }

    if (Object.keys(convert).includes(secondNum)) {
      secondNum = convert[secondNum];
    }

    sum += parseInt(`${firstNum}${secondNum}`);
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
