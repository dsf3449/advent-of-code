import { getPuzzleInputRel } from "../utils.mjs";

function handle(input) {
  console.log(input);
}

getPuzzleInputRel(import.meta.url, false).then(handle);
