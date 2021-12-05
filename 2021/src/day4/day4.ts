import assert from "assert";
import getPuzzleInput from "../utils";
import Board from "./Board";

function makeGameBoard(input: string[]) {
  // remove the empty space
  input.splice(0, 1);

  const board = new Board();

  for (let i = 0; i < 5; i += 1) {
    board.addRow(input.splice(0, 1)[0]);
  }

  return board;
}

function iterateCalledNumbers(gameBoards: Board[], calledNumbers: number[]) {
  let lastCalledNumber = 0;
  let result;

  for (let i = 0; i < calledNumbers.length; i += 1) {
    lastCalledNumber = calledNumbers[i];

    for (let j = 0; j < gameBoards.length; j += 1) {
      gameBoards[j].markSquare(calledNumbers[i], true);
      result = gameBoards[j].checkForWinCondition();

      if (result.win) {
        result.lastCalledNumber = lastCalledNumber;
        result.boardIndex = j;
        return result;
      }
    }
  }

  return { win: false };
}

function partOne(input: string[], calledNumbers: number[]) {
  const gameBoards: Board[] = [];
  while (input.length > 0) {
    gameBoards.push(makeGameBoard(input));
  }

  const winningBoard = iterateCalledNumbers(gameBoards, calledNumbers);
  assert(winningBoard.lastCalledNumber);
  assert(winningBoard.boardIndex);
  const sum = Board.getSumOfUnmarked(
    winningBoard,
    gameBoards[winningBoard.boardIndex]
  );
  console.log(`Answer: ${sum * winningBoard.lastCalledNumber}`);
}

export default function runDay() {
  const input = getPuzzleInput(`day4`);
  const calledNumbers = input
    .splice(0, 1)[0]
    .split(`,`)
    .map((x) => Number(x));

  partOne(input, calledNumbers);
  // partTwo(input);
}
