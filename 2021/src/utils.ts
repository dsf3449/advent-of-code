import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Returns an array of the puzzle input split on newline characters.
 * @param day
 */
export default function getPuzzleInput(day: string): string[] {
  return readFileSync(resolve(__dirname, `../res/${day}.txt`), `utf-8`).split(
    `\n`
  );
}

export interface AnswerPair {
  partOne?: number;
  partTwo?: number;
}
