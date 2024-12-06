import { getPuzzleInputRel, isImported } from "../utils.mjs";

const directions = {
  up: [0, -1],
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0],
};

const nextDirection = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

function applyMoveToPos(currPos, direction) {
  return currPos.map((coord, index) => {
    return coord + direction[index];
  });
}

function handle(input) {
  const map = [];
  let currPos = [0, 0];
  let direction = directions["up"];
  const bounds = [input[0].length, input.length];
  let directionString = "up";

  input.forEach((line, y) => {
    if (line.includes("^")) currPos = [line.indexOf("^"), y];
    map.push([...line]);
  });

  while (true) {
    const [nextX, nextY] = applyMoveToPos(currPos, direction);

    // running out of bounds without finding a # means we've gone off-screen
    if (nextX < 0 || nextX >= bounds[0] || nextY < 0 || nextY >= bounds[1]) {
      map[currPos[1]][currPos[0]] = "X";
      break;
    }

    if (map[nextY][nextX] === "#") {
      directionString = nextDirection[directionString];
      direction = directions[directionString];
      continue;
    }

    map[currPos[1]][currPos[0]] = "X";
    currPos = [nextX, nextY];
  }

  let visitedNodes = 0;
  map.forEach((row) => {
    visitedNodes += row.filter((val) => val === "X").length;
  });
  console.log(visitedNodes);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
