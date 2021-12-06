import getPuzzleInput from "../utils";
import Board from "./Board";

interface AnswerPair {
  partOne: number;
  partTwo?: number;
}

function partOne(input: string[]) {
  const board = new Board(input);
  const points = board.points.filter((point) => point.timesOverlaid >= 1);
  console.log(`Answer: ${points.length}`);
  return points;
}

function partTwo(input: string[]) {
  const board = new Board(input);
  const points = board.points.filter((point) => point.timesOverlaid >= 1);
  console.log(`Answer: ${points.length}`);
  return points;
}

export default function runDay(): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day5test` : `day5`
  );
  return {
    partOne: partOne(input).length,
    partTwo: partTwo(input).length,
  };
}
