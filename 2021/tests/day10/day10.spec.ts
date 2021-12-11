import runDay, {
  findOpenersWithNoClosers,
  searchForCorruptedPair,
} from "../../src/day10/day10";

describe(`Day 10 tests`, () => {
  describe(`gen`, () => {
    it(`should find and return a corrupted closing argument`, () => {
      const input = `[{[]{}<<><{}}`;
      expect(searchForCorruptedPair(input, 0, [])).toBe(`}`);
    });

    it(`should return an empty string for a string with no issues`, () => {
      const input = `[][]{}<><<<<<{{{{{}}}}}>>>>>`;
      expect(searchForCorruptedPair(input, 0, [])).toBe(``);
    });

    it(`should return an array of values left open`, () => {
      const input = `{<{}>{}}<[`;
      expect(findOpenersWithNoClosers(input, 0, [])).toEqual([`<`, `[`]);
    });
  });

  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(26397);
    });

    it(`should take the test input and return the correct value`, () => {
      const run = runDay(2);
      expect(run.partTwo).toBe(288957);
    });

    it(`should take the test input and return the correct value for both days`, () => {
      const run = runDay(0);
      expect(run.partOne).toBe(26397);
      expect(run.partTwo).toBe(288957);
    });
  });
});
