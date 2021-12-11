import Board from "../../src/day4/Board";

describe(`Board tests`, () => {
  it(`desc`, () => {
    const test = new Board();
    // test.addRow(input[1]);
    // test.addRow(input[2]);
    // test.addRow(input[3]);
    // test.addRow(input[4]);
    // test.addRow(input[5]);
    console.log(test.checkForWinCondition());
    test.markSquare(26, true);
    console.log(test.checkForWinCondition());
    test.markSquare(68, true);
    console.log(test.checkForWinCondition());
    test.markSquare(3, true);
    console.log(test.checkForWinCondition());
    test.markSquare(95, true);
    console.log(test.checkForWinCondition());
    test.markSquare(59, true);
    console.log(test.checkForWinCondition());
  });

  it(`creates an empty board`, () => {
    const board = new Board();
    expect(board.rows.length).toBe(0);
    expect(board.columns.length).toBe(0);
  });
});
