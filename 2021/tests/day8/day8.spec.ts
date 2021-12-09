import runDay, {
  resolveInputStringsToSegmentObject,
} from "../../src/day8/day8";
import Display from "../../src/day8/Display";

describe(`Day 8 tests`, () => {
  describe(`Display tests`, () => {
    it(`should return a flat list of top, topLeft, middle, and bottom segments`, () => {
      const display = new Display();
      display.top = [`a`];
      display.topLeft = [`b`];
      display.middle = [`c`];
      display.bottom = [`f`];
      expect(display.getUsedLetters()).toEqual([`a`, `b`, `c`, `f`]);
    });

    it(`should return a flat list of top, topLeft, topRight, middle, bottomRight, and bottom segments`, () => {
      const display = new Display();
      display.top = [`a`];
      display.topLeft = [`b`];
      display.topRight = [`h`];
      display.middle = [`c`];
      display.bottomRight = [`z`];
      display.bottom = [`f`];
      expect(display.getAllUsedLetters()).toEqual([
        `a`,
        `b`,
        `h`,
        `c`,
        `z`,
        `f`,
      ]);
    });
  });

  describe(`gen`, () => {
    it(`should resolve the input string into a display object`, () => {
      const input = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;
      const split = input.split(` | `);
      const inputs = split[0].split(` `);
      const display = resolveInputStringsToSegmentObject(inputs);

      expect(display.top).toEqual([`d`]);
      expect(display.topLeft).toEqual([`e`]);
      expect(display.topRight).toEqual([`a`]);
      expect(display.middle).toEqual([`f`]);
      expect(display.bottomLeft).toEqual([`g`]);
      expect(display.bottomRight).toEqual([`b`]);
      expect(display.bottom).toEqual([`c`]);

      const expectedAnswers = [
        `cagedb`,
        `ab`,
        `gcdfa`,
        `fbcad`,
        `eafb`,
        `cdfbe`,
        `cdfgeb`,
        `dab`,
        `acedgfb`,
        `cefabd`,
      ];

      display.resolveStrings.forEach((resolveString, index) => {
        expect(resolveString.join(``)).toBe(expectedAnswers[index]);
      });
    });
  });

  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(26);
    });

    it(`should take the test input and return the correct value`, () => {
      const run = runDay(2);
      expect(run.partTwo).toBe(61229);
    });

    it(`should take the test input and return the correct value for both days`, () => {
      const run = runDay(0);
      expect(run.partOne).toBe(26);
      expect(run.partTwo).toBe(61229);
    });
  });
});
