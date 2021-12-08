import runDay from "../../src/day8/day8";

describe(`Day 8 tests`, () => {
  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(26);
    });

    it.skip(`should take the test input and return the correct value`, () => {
      const run = runDay(2);
      expect(run.partTwo).toBe(168);
    });

    it.skip(`should take the test input and return the correct value for both days`, () => {
      const run = runDay(0);
      expect(run.partOne).toBe(37);
      expect(run.partTwo).toBe(168);
    });
  });
});
