import { getPuzzleInputRel, isImported } from "../utils.mjs";

function copyAndTransformLevels(levels, removeAt) {
  const fixedLevels = [...levels];
  fixedLevels.splice(removeAt, 1);
  return fixedLevels;
}

function attemptFixWithProblemDampener(levels) {
  for (let i = 0; i < levels.length; i++) {
    const result = isReportSafe(copyAndTransformLevels(levels, i), 1);

    if (result) {
      return true;
    }
  }

  return false;
}

function isReportSafe(levels, recursionLevel = 0) {
  let prevDiff;
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      console.log(`unsafe, difference is too large or small: [${i}] ${diff}`);

      if (recursionLevel === 0) {
        return attemptFixWithProblemDampener(levels);
      }

      return false;
    }

    if ((diff > 0 && prevDiff < 0) || (diff < 0 && prevDiff > 0)) {
      console.log(`unsafe, asc/desc violation: [${i}] ${diff} ${prevDiff}`);

      if (recursionLevel === 0) {
        return attemptFixWithProblemDampener(levels);
      }

      return false;
    }

    prevDiff = diff;
  }

  return true;
}

function handle(input) {
  let numSafe = 0;

  input.forEach((report) => {
    const levels = report.split(" ");
    const resp = isReportSafe(levels);

    if (resp) {
      numSafe += 1;
    }
  });

  console.log(numSafe);
}

if (!isImported(import.meta.url)) {
  getPuzzleInputRel(import.meta.url, false).then(handle);
}
