import getPuzzleInput from "../utils";

function partOne(input: string[] | number[]) {
  let increasedNumber = 0;
  let previousNumber = 9999;
  input.forEach((measurement) => {
    /**
     * This one is pretty easy, we just want to document
     * the number of times the current value is larger
     * than the previous value
     */
    if (Number(measurement) > previousNumber) {
      increasedNumber += 1;
    }
    previousNumber = Number(measurement);
  });
  console.log(`Increases: ${increasedNumber}`);
}

/**
 * A recursive function which takes an array of strings and splits it on every
 * third string, creating an array of string arrays.
 * @param array
 * @param newArray
 */
function formArrayOfArrays(array: string[], newArray: string[][]): string[][] {
  if (array.length > 3) {
    const slices = array.slice(0, 3);
    array.splice(0, 1);
    newArray.push(slices);
    return formArrayOfArrays(array, newArray);
  }
  return newArray;
}

/**
 * A function which reduces the complex array generated by formArrayOfArrays
 * by summing the values and creating a final array which is an array of
 * numbers.
 * @param array
 */
function reduceArray(array: string[][]): number[] {
  const reducedArray: number[] = [];
  array.forEach((value) => {
    reducedArray.push(
      value.reduce((prev, curr) => Number(prev) + Number(curr), 0)
    );
  });
  return reducedArray;
}

function partTwo(input: string[]) {
  // We can just give this to part one function and it works poggers
  partOne(reduceArray(formArrayOfArrays(input, [])));
}

export default function runDay() {
  const input = getPuzzleInput(`day1`);
  partOne(input);
  partTwo(input);
}
