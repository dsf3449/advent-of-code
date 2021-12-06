import getPuzzleInput from "../utils";
import School from "./School";
import LeanSchool from "./LeanSchool";

interface AnswerPair {
  partOne?: number;
  partTwo?: number;
}

function partOne(input: number[], daysToSimulate: number) {
  const school = new School(input);

  for (let i = 0; i < daysToSimulate; i += 1) {
    school.processTick();
  }

  console.log(`Answer ${school.fish.length}`);
  return school.fish.length;
}

function partTwo(input: number[], daysToSimulate: number) {
  const leanSchool = new LeanSchool(input);

  for (let i = 0; i < daysToSimulate; i += 1) {
    leanSchool.processTick();
  }

  const answer = leanSchool.findAmountOfFish();
  console.log(`Answer ${answer}`);
  return answer;
}

export default function runDay(
  part: number,
  daysToSimulate: number
): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day6test` : `day6`
  );
  const array = input[0].split(`,`).map((x) => Number(x));

  if (part === 1) {
    return {
      partOne: partOne(array, daysToSimulate),
    };
  }

  if (part === 2) {
    return {
      partTwo: partTwo(array, daysToSimulate),
    };
  }

  return {
    partOne: partOne(array, daysToSimulate),
    partTwo: partTwo(array, daysToSimulate),
  };
}
