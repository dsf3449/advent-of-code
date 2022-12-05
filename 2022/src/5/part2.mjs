import { getPuzzleInputRel, isImported } from "../utils.mjs";
import { makeArrays } from "./part1.mjs";

function handle(input) {
  // split the input into initial state vs the moving instructions
  const breakpoint = input.indexOf(``);
  const initialState = input.splice(0, breakpoint - 1);
  // remove the breakpoint and the number system
  input.splice(0, 2);

  const crates = makeArrays(initialState);

  // transform the instructions to numbers and remove the words
  // so [1, 2, 1] means "move 1 crate from column 2 to column 1"
  const instructions = input.map(instruction => {
    const splitArr = instruction.split(/(move | from | to )/);
    return [Number(splitArr[2]), Number(splitArr[4]), Number(splitArr[6])];
  });

  // actually do the instructions
  instructions.forEach(instruction => {
    const [count, from, to] = instruction;
    crates[from]
      .splice(0, count)
      .reverse()
      .forEach(crate => crates[to].unshift(crate));
  });

  // build the answer by taking the first (topmost) crate
  let answer = ``;
  Object.values(crates).forEach(crate => (answer += crate.at(0)));
  console.log(answer);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
