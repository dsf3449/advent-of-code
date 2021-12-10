import runDay from "../../src/day9/day9";

describe(`Day 9 tests`, () => {
  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(15);
    });

    it(`should take the test input and return the correct value`, () => {
      const run = runDay(2);
      expect(run.partTwo).toBe(1134);
    });

    it(`should take the test input and return the correct value for both days`, () => {
      const run = runDay(0);
      expect(run.partOne).toBe(15);
      expect(run.partTwo).toBe(1134);
    });
  });
});
