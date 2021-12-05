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
  const sum = Board.getSumOfUnmarked(gameBoards[winningBoard.boardIndex]);
  console.log(`Answer: ${sum * winningBoard.lastCalledNumber}`);
}

function iterateForLastWin(gameBoards: Board[], calledNumbers: number[]) {
  let result;
  let boardsYetToWin;

  for (let i = 0; i < calledNumbers.length; i += 1) {
    for (let j = 0; j < gameBoards.length; j += 1) {
      gameBoards[j].markSquare(calledNumbers[i], true);
      result = gameBoards[j].checkForWinCondition();
      if (result.win) {
        boardsYetToWin = gameBoards.filter((board) => !board.hasWon);
        if (boardsYetToWin.length === 1) {
          return boardsYetToWin;
        }
      }
    }
  }

  return [];
}

function partTwo(input: string[], calledNumbers: number[]) {
  const gameBoards: Board[] = [];
  while (input.length > 0) {
    gameBoards.push(makeGameBoard(input));
  }

  // Find the board which will win last
  const lastToWin = iterateForLastWin(gameBoards, calledNumbers);

  // Pass it to the original function to calculate its actual value when it wins
  const final = iterateCalledNumbers(lastToWin, calledNumbers);

  // Get the sum of the unmarked spaces
  const sum = Board.getSumOfUnmarked(lastToWin[0]);

  assert(final.lastCalledNumber);
  console.log(`Answer ${sum * final.lastCalledNumber}`);
}

export default function runDay() {
  const input = getPuzzleInput(`day4`);
  const calledNumbers = input
    .splice(0, 1)[0]
    .split(`,`)
    .map((x) => Number(x));

  const input2 = input.map((x) => x);
  const calledNumbers2 = calledNumbers.map((x) => x);

  partOne(input, calledNumbers);
  partTwo(input2, calledNumbers2);
}
