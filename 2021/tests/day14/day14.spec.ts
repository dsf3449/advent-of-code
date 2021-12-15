import runDay, { createInstructionKey } from "../../src/day14/day14";

describe(`Day 14 tests`, () => {
  describe(`unit`, () => {
    it(`should create an instruction key given an input of instructions`, () => {
      const input = [
        [`CH`, `B`],
        [`HA`, `Z`],
      ];
      expect(createInstructionKey(input)).toEqual({
        CH: [`CB`, `BH`],
        HA: [`HZ`, `ZA`],
      });
    });
  });

  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(1588);
    });

    it(`should take the test input and return the correct value`, () => {
      const run = runDay(2);
      expect(run.partTwo).toBe(2188189693529);
    });

    it(`should take the test input and return the correct value for both days`, () => {
      const run = runDay(0);
      expect(run.partOne).toBe(1588);
      expect(run.partTwo).toBe(2188189693529);
    });
  });
});
