import { getPuzzleInputRel, isImported } from "../utils.mjs";
import countBy from "lodash-es/countBy.js";

function handle(input) {
  input = input[0];

  for (let i = 14; i < input.length; i += 1) {
    const lastFourteen = input.slice(i - 14, i);

    if (Object.keys(countBy(lastFourteen)).length === 14) {
      console.log(i);
      break;
    }
  }
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
