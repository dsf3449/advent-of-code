import runDay, { findArrayMaxAndMin } from "../../src/day7/day7";

describe(`Day 7 tests`, () => {
  describe(`gen`, () => {
    it(`should correctly find array maximum and minimums`, () => {
      const input = [4, 8, 22, 1053, 1444, 48, 28, 77, 2];
      expect(findArrayMaxAndMin(input)).toEqual({ max: 1444, min: 2 });
    });
  });

  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(37);
    });

    it(`should take the test input and return the correct value`, () => {
      const run = runDay(2);
      expect(run.partTwo).toBe(168);
    });
  });
});
