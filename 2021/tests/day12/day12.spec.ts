import runDay from "../../src/day12/day12";

describe(`Day 12 tests`, () => {
  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(10);
    });

    it(`should take the test input and return the correct value`, () => {
      const run = runDay(2);
      expect(run.partTwo).toBe(36);
    });

    it(`should take the test input and return the correct value for both days`, () => {
      const run = runDay(0);
      expect(run.partOne).toBe(10);
      expect(run.partTwo).toBe(36);
    });
  });
});
