import { getPuzzleInputRel, isImported } from "../utils.mjs";

/**
 * Checks all trees above and below a tree for visibility.
 * @param value the height of the tree being checked
 * @param columnIndex index of the column to iterate
 * @param rowCount number of rows in the map
 * @param mapped the map
 * @param rowIndex index of the row to know when halfway
 * @returns {{below: boolean, above: boolean}}
 */
function isTreeVisibleVertical(value, columnIndex, rowCount, mapped, rowIndex) {
  let aboveOrBelow = `above`;
  const answer = {
    above: true,
    below: true
  };

  for (let row = 0; row < rowCount; row += 1) {
    // if we are at the index of our tree, flip the var
    // and skip processing
    if (row === rowIndex) {
      aboveOrBelow = `below`;
      continue;
    }

    if (mapped[row][columnIndex] >= value) {
      answer[aboveOrBelow] = false;
    }
  }

  return answer;
}

/**
 * Checks all trees left and right of a tree for visibility.
 * @param value the height of the tree being checked
 * @param row the row of trees to check
 * @param columnIndex index of the column to know when halfway
 * @returns {{left: boolean, right: boolean}}
 */
function isTreeVisibleHorizontal(value, row, columnIndex) {
  let leftOrRight = `left`;
  const answer = {
    left: true,
    right: true
  };

  for (let column = 0; column < row.length; column += 1) {
    // if we are at the index of our tree, flip the var
    // and skip processing
    if (column === columnIndex) {
      leftOrRight = `right`;
      continue;
    }

    if (row[column] >= value) {
      answer[leftOrRight] = false;
    }
  }

  return answer;
}

function handle(input) {
  let visibleTrees = 0;
  const columnCount = input[0].length;
  const rowCount = input.length;
  const mapped = input.map(row => row.split(``).map(column => Number(column)));

  for (let row = 1; row < mapped.length - 1; row += 1) {
    for (let column = 1; column < mapped[row].length - 1; column += 1) {
      const { above, below } = isTreeVisibleVertical(
        mapped[row][column],
        column,
        rowCount,
        mapped,
        row
      );
      const { left, right } = isTreeVisibleHorizontal(
        mapped[row][column],
        mapped[row],
        column
      );
      if (above || below || left || right) {
        visibleTrees += 1;
      }
    }
  }

  // add the border
  visibleTrees += columnCount * 2 + (rowCount - 2) * 2;
  console.log(visibleTrees);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
