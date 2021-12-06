import getPuzzleInput from "../utils";
import School from "./School";

interface AnswerPair {
  partOne: number;
  partTwo?: number;
}

function partOne(input: string[], daysToSimulate: number) {
  const array = input[0].split(`,`).map((x) => Number(x));
  const school = new School(array);

  for (let i = 0; i < daysToSimulate; i += 1) {
    school.processTick();
  }

  console.log(`Answer ${school.fish.length}`);
  return school.fish.length;
}

// function partTwo(input: string[]) {
// }

export default function runDay(daysToSimulate: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day6test` : `day6`
  );
  return {
    partOne: partOne(input, daysToSimulate),
    // partTwo: partTwo(input).length,
  };
}
