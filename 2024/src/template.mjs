import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  console.log(input);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, true).then(handle);
}
