import { getPuzzleInputRel, isImported } from "../utils.mjs";
import countBy from "lodash-es/countBy.js";

function handle(input) {
  input = input[0];

  for (let i = 4; i < input.length; i += 1) {
    const lastFour = input.slice(i - 4, i);

    if (Object.keys(countBy(lastFour)).length === 4) {
      console.log(i);
      break;
    }
  }
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
