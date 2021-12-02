import getPuzzleInput from "../utils";

function calculateMovementValues(input: string[]) {
  let horizontal = 0;
  let depth1 = 0;
  let depth2 = 0;
  let aim = 0;

  input.forEach((value) => {
    const step = value.split(` `);
    switch (step[0]) {
      case `forward`:
        horizontal += Number(step[1]);
        depth2 += Number(step[1]) * aim;
        break;
      case `down`:
        depth1 += Number(step[1]);
        aim += Number(step[1]);
        break;
      case `up`:
        depth1 -= Number(step[1]);
        aim -= Number(step[1]);
        break;
      default:
        console.error(`unknown direction`);
    }
  });

  console.log(`Part1: ${depth1 * horizontal}`);
  console.log(`Part2: ${depth2 * horizontal}`);
}

export default function runDay() {
  const input = getPuzzleInput(`day2`);
  calculateMovementValues(input);
}
