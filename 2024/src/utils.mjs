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

/**
 * The same as `getPuzzleInput()`, except that it automatically finds the day
 * based on the relative path of the calling module.
 * @param {string} filePath
 * @param {boolean} useTestInput
 * @returns {Promise<string[]>}
 */
export async function getPuzzleInputRel(filePath, useTestInput = false) {
  const fileURL = fileURLToPath(filePath);
  const dirName = dirname(fileURL);
  const day = dirName.slice(-1);

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

/**
 * Returns true if the provided file path is NOT the entry file (aka, it's
 * an imported module).
 * @param {string} filePath
 * @returns {boolean}
 */
export function isImported(filePath) {
  return process.argv?.[1] !== fileURLToPath(filePath);
}
