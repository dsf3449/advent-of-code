import { getPuzzleInputRel, isImported } from "../utils.mjs";

/**
 * Recursively calculates the view distance in the upwards direction.
 * @param treeHeight height of the tree being checked
 * @param rowIndex the starting row index
 * @param columnIndex the starting column index
 * @param mapped the map
 * @param sum the sum
 * @returns {number}
 */
function calcViewDistUp(treeHeight, rowIndex, columnIndex, mapped, sum = 0) {
  if (rowIndex === 0) {
    return sum;
  }

  // stop at same height or taller
  if (mapped[rowIndex - 1][columnIndex] >= treeHeight) {
    // add one because we can observe this tree, just can't see past it
    return sum + 1;
  }

  return calcViewDistUp(treeHeight, rowIndex - 1, columnIndex, mapped, sum + 1);
}

/**
 * Recursively calculates the view distance in the downwards direction.
 * @param treeHeight height of the tree being checked
 * @param rowIndex the starting row index
 * @param columnIndex the starting column index
 * @param mapped the map
 * @param sum the sum
 * @returns {number}
 */
function calcViewDistDown(treeHeight, rowIndex, columnIndex, mapped, sum = 0) {
  if (rowIndex === mapped.length - 1) {
    return sum;
  }

  // stop at same height or taller
  if (mapped[rowIndex + 1][columnIndex] >= treeHeight) {
    // add one because we can observe this tree, just can't see past it
    return sum + 1;
  }

  return calcViewDistDown(
    treeHeight,
    rowIndex + 1,
    columnIndex,
    mapped,
    sum + 1
  );
}

/**
 * Recursively calculates the view distance in the leftwards direction.
 * @param treeHeight height of the tree being checked
 * @param row the row to check against
 * @param columnIndex the starting column index
 * @param sum the sum
 * @returns {number}
 */
function calcViewDistLeft(treeHeight, row, columnIndex, sum = 0) {
  if (columnIndex === 0) {
    return sum;
  }

  // stop at same height or taller
  if (row[columnIndex - 1] >= treeHeight) {
    // add one because we can observe this tree, just can't see past it
    return sum + 1;
  }

  return calcViewDistLeft(treeHeight, row, columnIndex - 1, sum + 1);
}

/**
 * Recursively calculates the view distance in the leftwards direction.
 * @param treeHeight height of the tree being checked
 * @param row the row to check against
 * @param columnIndex the starting column index
 * @param sum the sum
 * @returns {number}
 */
function calcViewDistRight(treeHeight, row, columnIndex, sum = 0) {
  if (columnIndex === row.length - 1) {
    return sum;
  }

  // stop at same height or taller
  if (row[columnIndex + 1] >= treeHeight) {
    // add one because we can observe this tree, just can't see past it
    return sum + 1;
  }

  return calcViewDistRight(treeHeight, row, columnIndex + 1, sum + 1);
}

function handle(input) {
  const mapped = input.map(row => row.split(``).map(column => Number(column)));
  const answers = [];

  for (let row = 1; row < mapped.length - 1; row += 1) {
    for (let column = 1; column < mapped[row].length - 1; column += 1) {
      const up = calcViewDistUp(mapped[row][column], row, column, mapped);
      const down = calcViewDistDown(mapped[row][column], row, column, mapped);
      const left = calcViewDistLeft(mapped[row][column], mapped[row], column);
      const right = calcViewDistRight(mapped[row][column], mapped[row], column);
      answers.push(up * down * left * right);
    }
  }

  console.log(Math.max(...answers));
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
