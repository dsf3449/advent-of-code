import { getPuzzleInputRel, isImported } from "../utils.mjs";

function handle(input) {
  const disk = [];
  let latestId = 0;

  input[0].split("").forEach((num, index) => {
    if (index % 2 === 0) {
      // length
      for (let i = 0; i < num; i++) {
        disk.push(latestId);
      }

      latestId++;
    } else {
      // space
      for (let i = 0; i < num; i++) {
        disk.push(".");
      }
    }
  });

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] === ".") continue;

    const firstFreeSpace = disk.indexOf(".");
    // should be sorted if this is the case
    if (firstFreeSpace > i) break;

    const [removedVal] = disk.splice(i, 1, ".");
    disk.splice(firstFreeSpace, 1, removedVal);
  }

  let sum = 0;
  disk.forEach((num, index) => {
    if (num === ".") return;

    sum += num * index;
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
