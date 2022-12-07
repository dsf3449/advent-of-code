import { getPuzzleInputRel, isImported } from "../utils.mjs";
import { get, set, has } from "lodash-es";

const fs = {
  base: {
    size: 0
  }
};
let currentDir = `base`;
const answers = [];

/**
 * Changes the current working directory.
 * @param {string} newDir
 */
function cd(newDir) {
  if (newDir === `/`) {
    currentDir = `base`;
    return;
  }

  if (newDir === `..`) {
    const arr = currentDir.split(`.`);
    arr.splice(-1);
    currentDir = arr.join(`.`);
    return;
  }

  currentDir = `${currentDir}.${newDir}`;
}

/**
 * Adds a new directory to the fs, if it doesn't already exist
 * @param {string} dir
 */
function mkdir(dir) {
  const newDir = `${currentDir}.${dir}`;

  if (has(fs, newDir)) {
    return;
  }

  set(fs, newDir, { size: 0 });
  answers.push(newDir);
}

/**
 * Recursively updates the parent directories' size when a new file
 * is discovered.
 * @param {number} fileSize
 * @param {string} dir
 */
function addSizeForParents(fileSize, dir) {
  if (dir === `base`) {
    return;
  }

  let localDir = dir.split(`.`);
  localDir.splice(-1);
  localDir = localDir.join(`.`);

  let currSize = Number(get(fs, `${localDir}.size`));
  currSize += Number(fileSize);
  set(fs, `${localDir}.size`, currSize);

  // if the size gets over 100000, it's no longer a valid answer
  if (answers.includes(localDir) && currSize > 100000) {
    const index = answers.indexOf(localDir);
    answers.splice(index, 1);
  }

  addSizeForParents(fileSize, localDir);
}

function handle(input) {
  input.forEach(line => {
    const command = line.split(` `);

    if (command[0] === `$`) {
      if (command[1] === `cd`) {
        cd(command[2]);
        return;
      } else {
        return;
      }
    }

    // other lines
    if (command[0] === `dir`) {
      mkdir(command[1]);
    } else {
      let currSize = Number(get(fs, `${currentDir}.size`));
      currSize += Number(command[0]);
      set(fs, `${currentDir}.size`, currSize);

      if (answers.includes(currentDir) && currSize > 100000) {
        const index = answers.indexOf(currentDir);
        answers.splice(index, 1);
      }

      if (currentDir !== `base`) {
        addSizeForParents(Number(command[0]), currentDir);
      }
    }
  });

  let sum = 0;
  answers.forEach(dir => {
    sum += Number(get(fs, `${dir}.size`));
  });

  console.log(sum);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
