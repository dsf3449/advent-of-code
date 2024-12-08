import { getPuzzleInputRel, isImported } from "../utils.mjs";

function applyMoveToPos(currPos, direction) {
  return currPos.map((coord, index) => {
    return coord + direction[index];
  });
}

function antiPointValid(point, bound) {
  return point[0] >= 0 && point[0] < bound && point[1] >= 0 && point[1] < bound;
}

function handle(input) {
  const antennaLocations = {};
  const bounds = input.length;
  input.forEach((y, yIdx) => {
    const arr = y.split("");
    arr.forEach((x, xIdx) => {
      if (x === ".") return;

      if (!antennaLocations[x]) {
        antennaLocations[x] = [[xIdx, yIdx]];
      } else {
        antennaLocations[x].push([xIdx, yIdx]);
      }
    });
  });

  const antiPointLocations = [];
  Object.entries(antennaLocations).forEach(([freq, locations]) => {
    for (let start = 0; start < locations.length; start += 1) {
      for (let iter = start + 1; iter < locations.length; iter += 1) {
        const diff = [
          locations[start][0] - locations[iter][0],
          locations[start][1] - locations[iter][1],
        ];

        const antiPointOne = applyMoveToPos(locations[start], diff);
        const antiPointTwo = applyMoveToPos(locations[iter], [
          diff[0] * -1,
          diff[1] * -1,
        ]);

        if (
          antiPointValid(antiPointOne, bounds) &&
          !antiPointLocations.includes(`${antiPointOne}`)
        )
          antiPointLocations.push(`${antiPointOne}`);
        if (
          antiPointValid(antiPointTwo, bounds) &&
          !antiPointLocations.includes(`${antiPointTwo}`)
        )
          antiPointLocations.push(`${antiPointTwo}`);
      }
    }
  });

  console.log(antiPointLocations.length);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
