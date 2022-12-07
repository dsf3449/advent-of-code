import { getPuzzleInputRel, isImported } from "../utils.mjs";
import { get, set, has, sortBy } from "lodash-es";

const fs = {
  base: {
    size: 0
  }
};
let currentDir = `base`;

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

  addSizeForParents(fileSize, localDir);
}

function flattenFs(localFs, finalAns) {
  for (const key in localFs) {
    const value = localFs[key];
    if (typeof value === `object`) {
      flattenFs(value, finalAns);
    } else {
      finalAns.push(value);
    }
  }

  return finalAns;
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

      if (currentDir !== `base`) {
        addSizeForParents(Number(command[0]), currentDir);
      }
    }
  });

  const sizes = sortBy(flattenFs(fs, []));
  const totalSpace = 70000000;
  const minSpaceRequired = 30000000;
  const availableSpace = totalSpace - fs.base.size;
  const deletionAmount = minSpaceRequired - availableSpace;

  console.log(sizes.find(size => size > deletionAmount));
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
