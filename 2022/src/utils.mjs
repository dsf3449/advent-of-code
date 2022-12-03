import { readFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Returns a promise which resolves into an array of the puzzle input split on newline characters.
 * Always removes the last element of the array to account for the empty line at the end of the file.
 * @param {number} day
 * @param {boolean} useTestInput
 * @returns {Promise<string[]>}
 */
export async function getPuzzleInput(day, useTestInput = false) {
  const input = await readFile(
    resolve(
      __dirname,
      useTestInput
        ? `../inputs/${day}/input-test.txt`
        : `../inputs/${day}/input.txt`
    ),
    { encoding: `utf8` }
  );

  const res = input.split(`\n`);

  // remove newline at the end of the input
  res.splice(-1);
  return res;
}
