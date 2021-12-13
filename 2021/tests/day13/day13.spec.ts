import runDay from "../../src/day13/day13";

describe(`Day 13 tests`, () => {
  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(17);
    });

    it(`should take the test input and return the correct value`, () => {
      // day two returns 0 because it prints its solution to the console
      const run = runDay(2);
      expect(run.partTwo).toBe(0);
    });

    it(`should take the test input and return the correct value for both days`, () => {
      // day two returns 0 because it prints its solution to the console
      const run = runDay(0);
      expect(run.partOne).toBe(17);
      expect(run.partTwo).toBe(0);
    });
  });
});
