import { getPuzzleInputRel } from "../utils.mjs";

const UPPER_OFFSET = 38;
const LOWER_OFFSET = 96;

function getPriorityForLetter(letter) {
  const isUpperCase = /^[A-Z]*$/.test(letter);
  const charCode = letter.charCodeAt(0);

  return isUpperCase ? charCode - UPPER_OFFSET : charCode - LOWER_OFFSET;
}

function handle(input) {
  let sum = 0;

  for (let i = 0; i < input.length; i += 3) {
    const elfOne = input[i];
    const elfTwo = input[i + 1];
    const elfThree = input[i + 2];

    for (const letter of elfOne.split(``).values()) {
      if (elfTwo.includes(letter) && elfThree.includes(letter)) {
        sum += getPriorityForLetter(letter);
        break;
      }
    }
  }

  console.log(sum);
}

getPuzzleInputRel(import.meta.url, false).then(handle);
