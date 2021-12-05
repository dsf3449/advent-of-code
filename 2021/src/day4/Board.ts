import assert from "assert";
import Square from "./Square";

interface WinObj {
  win: boolean;
  index?: number;
  type?: string;
  lastCalledNumber?: number;
  boardIndex?: number;
}

export default class Board {
  rows: Square[][];

  columns: Square[][];

  constructor() {
    this.rows = [];
    this.columns = [];
  }

  addRow(row: string) {
    const array: Square[] = Board.transformStringIntoSquareArray(row);

    // make sure nothing weird is going on
    assert(
      array.length === 5,
      `row must be 5 squares to add (${JSON.stringify(array)})`
    );

    this.rows.push(array);

    if (this.rows.length === 5) {
      // as soon as we push 5 rows, let's assemble the columns
      this.deriveColumns();
    }
  }

  deriveColumns() {
    // make sure that we have all 5 rows before we make the columns
    assert(
      this.rows.length === 5,
      `cannot derive columns because there must be 5 rows`
    );

    // have to do this garbage because otherwise arrays share the same
    // memory reference (rip 2 hours)
    this.columns = Array.from(Array(5), () => []);

    this.rows.forEach((value) => {
      value.forEach((square, squareIndex) => {
        this.columns[squareIndex].push(square);
      });
    });
  }

  findNumber(value: number): Square | false {
    let returnSquare;

    for (let i = 0; i < this.rows.length; i += 1) {
      returnSquare = this.rows[i].find((square) => square.value === value);
      if (returnSquare) {
        return returnSquare;
      }
    }

    return false;
  }

  markSquare(value: number, mark: boolean) {
    const square = this.findNumber(value);

    if (!square) {
      return;
    }

    square.isMarked = mark;
  }

  checkForWinCondition(): WinObj {
    // check rows
    for (let i = 0; i < this.rows.length; i += 1) {
      if (this.rows[i].every((square) => square.isMarked)) {
        return {
          win: true,
          index: i,
          type: `row`,
        };
      }
    }

    // check columns
    for (let i = 0; i < this.columns.length; i += 1) {
      if (this.columns[i].every((square) => square.isMarked)) {
        return {
          win: true,
          index: i,
          type: `column`,
        };
      }
    }

    return { win: false };
  }

  // helpers
  static transformStringIntoSquareArray(row: string): Square[] {
    return row
      .trim()
      .split(/\s+/)
      .map((value) => new Square(Number(value)));
  }

  static getSumOfUnmarked(win: WinObj, gameBoard: Board): number {
    let sum = 0;

    gameBoard.rows.forEach((row) => {
      row.forEach((square) => {
        if (!square.isMarked) {
          sum += square.value;
        }
      });
    });

    return sum;
  }
}
