import { getPuzzleInput } from "../utils.mjs";

const UPPER_OFFSET = 38;
const LOWER_OFFSET = 96;

function getPriorityForLetter(letter) {
  const isUpperCase = /^[A-Z]*$/.test(letter);
  const charCode = letter.charCodeAt(0);

  return isUpperCase ? charCode - UPPER_OFFSET : charCode - LOWER_OFFSET;
}

function handle(input) {
  let sum = 0;

  input.forEach(rucksack => {
    if (rucksack.length % 2 !== 0) {
      console.error(`!! not evenly divisible !!`);
      return;
    }

    const half = rucksack.length / 2;
    const firstHalf = rucksack.slice(0, half);
    const secondHalf = rucksack.slice(half);

    for (const letter of firstHalf.split(``).values()) {
      if (secondHalf.includes(letter)) {
        sum += getPriorityForLetter(letter);
        return;
      }
    }
  });

  console.log(sum);
}

getPuzzleInput(3, false).then(handle);
