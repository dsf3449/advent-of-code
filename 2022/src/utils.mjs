import { readFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Returns a promise which resolves into an array of the puzzle input split on newline characters.
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
  return input.split(`\n`);
}
