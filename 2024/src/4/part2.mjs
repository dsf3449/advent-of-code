import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  let counts = 0;

  // can exclude last row and columns (length - 1)
  // and first row and columns (y = 1, x = 1) due to
  // the fact that we are looking for A which is in the middle of the X
  // this also means we don't need bounds checks :D
  for (let y = 1; y < input.length - 1; y++) {
    for (let x = 1; x < input[y].length - 1; x++) {
      if (input[y][x] !== "A") {
        continue;
      }

      let validLayouts = 0;
      if (input[y - 1][x - 1] === "M" && input[y + 1][x + 1] === "S") {
        validLayouts += 1;
      }

      if (input[y - 1][x + 1] === "M" && input[y + 1][x - 1] === "S") {
        validLayouts += 1;
      }

      if (input[y + 1][x - 1] === "M" && input[y - 1][x + 1] === "S") {
        validLayouts += 1;
      }

      if (input[y + 1][x + 1] === "M" && input[y - 1][x - 1] === "S") {
        validLayouts += 1;
      }

      if (validLayouts === 2) counts += 1;
    }
  }

  console.log(counts);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
