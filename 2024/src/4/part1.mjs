import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  let counts = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] !== "X") {
        continue;
      }

      // right (bounds check: largest addition must be less than or equal to the row length)
      if (
        x + 3 < input[y].length &&
        input[y][x + 1] === "M" &&
        input[y][x + 2] === "A" &&
        input[y][x + 3] === "S"
      ) {
        counts += 1;
      }

      // down
      if (
        y + 3 < input.length &&
        input[y + 1][x] === "M" &&
        input[y + 2][x] === "A" &&
        input[y + 3][x] === "S"
      ) {
        counts += 1;
      }

      // left (bounds check: largest subtraction must be at least 0)
      if (
        x - 3 >= 0 &&
        input[y][x - 1] === "M" &&
        input[y][x - 2] === "A" &&
        input[y][x - 3] === "S"
      ) {
        counts += 1;
      }

      // up
      if (
        y - 3 >= 0 &&
        input[y - 1][x] === "M" &&
        input[y - 2][x] === "A" &&
        input[y - 3][x] === "S"
      ) {
        counts += 1;
      }

      // right-down
      if (
        y + 3 < input.length &&
        x + 3 < input[y].length &&
        input[y + 1][x + 1] === "M" &&
        input[y + 2][x + 2] === "A" &&
        input[y + 3][x + 3] === "S"
      ) {
        counts += 1;
      }

      // left-down
      if (
        y + 3 < input.length &&
        x - 3 >= 0 &&
        input[y + 1][x - 1] === "M" &&
        input[y + 2][x - 2] === "A" &&
        input[y + 3][x - 3] === "S"
      ) {
        counts += 1;
      }

      // left-up
      if (
        x - 3 >= 0 &&
        y - 3 >= 0 &&
        input[y - 1][x - 1] === "M" &&
        input[y - 2][x - 2] === "A" &&
        input[y - 3][x - 3] === "S"
      ) {
        counts += 1;
      }

      // right-up
      if (
        y - 3 >= 0 &&
        x + 3 < input[y].length &&
        input[y - 1][x + 1] === "M" &&
        input[y - 2][x + 2] === "A" &&
        input[y - 3][x + 3] === "S"
      ) {
        counts += 1;
      }
    }
  }

  console.log(counts);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
