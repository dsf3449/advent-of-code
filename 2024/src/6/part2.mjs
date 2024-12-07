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

function sim(input) {
  const map = [];
  let currPos = [0, 0];
  let direction = directions["up"];
  const bounds = [input[0].length, input.length];
  let directionString = "up";

  input.forEach((line, y) => {
    if (line.includes("^")) currPos = [line.indexOf("^"), y];
    map.push([...line]);
  });

  // max size of the input is 16900
  let iter = 0;
  while (iter < 17000) {
    const [nextX, nextY] = applyMoveToPos(currPos, direction);

    // running out of bounds without finding a # means we've gone off-screen
    if (nextX < 0 || nextX >= bounds[0] || nextY < 0 || nextY >= bounds[1]) {
      map[currPos[1]][currPos[0]] = "X";
      return {
        looping: false,
      };
    }

    if (map[nextY][nextX] === "#" || map[nextY][nextX] === "O") {
      directionString = nextDirection[directionString];
      direction = directions[directionString];
      continue;
    }

    map[currPos[1]][currPos[0]] = "X";
    currPos = [nextX, nextY];
    iter++;
  }

  return {
    looping: true,
  };
}

function handle(input) {
  let sum = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      const copy = [...input];
      let expanded = copy[y].split("");
      if (expanded[x] === ".") expanded.splice(x, 1, "O");
      copy[y] = expanded.join("");

      if (sim(copy).looping) sum += 1;
    }
  }

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
