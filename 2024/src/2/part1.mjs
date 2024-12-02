import { getPuzzleInputRel, isImported } from "../utils.mjs";

function isReportSafe(levels) {
  let prevDiff;
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      console.log(`unsafe, difference is too large or small: [${i}] ${diff}`);
      return false;
    }

    if ((diff > 0 && prevDiff < 0) || (diff < 0 && prevDiff > 0)) {
      console.log(`unsafe, asc/desc violation: [${i}] ${diff} ${prevDiff}`);
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
