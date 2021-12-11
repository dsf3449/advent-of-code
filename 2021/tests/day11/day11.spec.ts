import runDay, {
  countGreaterThanNines,
  flashedThisTick,
  increaseAllOctopusByOne,
  processFlashes,
  processTick,
  setFlashesToZero,
} from "../../src/day11/day11";
import getPuzzleInput from "../../src/utils";

const input = getPuzzleInput(`day11test`);

describe(`Day 11 tests`, () => {
  describe(`unit`, () => {
    it(`should increase all values in a array of number arrays by one`, () => {
      const locInput = [
        [0, 1, 2, 3, 4],
        [4, 3, 2, 1, 0],
      ];
      expect(increaseAllOctopusByOne(locInput)).toEqual([
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
      ]);
    });

    it(`should return the amount of elements which are numerically greater than 9`, () => {
      const locInput = [
        [0, 9, 10, 10],
        [9, 10, 20, 1],
      ];
      expect(countGreaterThanNines(locInput)).toBe(4);
    });

    it(`should check whether an octopus has flashed on this tick`, () => {
      const flashes = [
        [0, 4],
        [2, 3],
      ];
      expect(flashedThisTick(flashes, [0, 4])).toBe(true);
      expect(flashedThisTick(flashes, [2, 2])).toBe(false);
    });

    it(`should set all flashes to 0, despite it's value`, () => {
      const locInput = [
        [0, 20, 5],
        [10, 2, 1],
      ];
      const flashes = [
        [0, 1],
        [1, 0],
      ];
      expect(setFlashesToZero(locInput, flashes)).toEqual([
        [0, 0, 5],
        [0, 2, 1],
      ]);
    });

    it(`should process flashes correctly`, () => {
      const locInput = [
        [1, 1, 1, 1, 1],
        [1, 9, 9, 9, 1],
        [1, 9, 1, 9, 1],
        [1, 9, 9, 9, 1],
        [1, 1, 1, 1, 1],
      ];
      expect(processFlashes(increaseAllOctopusByOne(locInput))).toEqual({
        returnArray: [
          [3, 4, 5, 4, 3],
          [4, 0, 0, 0, 4],
          [5, 0, 0, 0, 5],
          [4, 0, 0, 0, 4],
          [3, 4, 5, 4, 3],
        ],
        amountOfFlashes: 9,
      });
    });

    describe(`ticks should correctly simulate`, () => {
      it(`should simulate 10 ticks`, () => {
        let mutableArray = input.map((row) => row.split(``).map(Number));
        const expectedOutput = [
          `0481112976`,
          `0031112009`,
          `0041112504`,
          `0081111406`,
          `0099111306`,
          `0093511233`,
          `0442361130`,
          `5532252350`,
          `0532250600`,
          `0032240000`,
        ].map((row) => row.split(``).map(Number));
        let sumOfFlashes = 0;

        for (let i = 0; i < 10; i += 1) {
          const { returnArray, amountOfFlashes } = processTick(mutableArray);
          mutableArray = returnArray;
          sumOfFlashes += amountOfFlashes;
        }

        expect(mutableArray).toEqual(expectedOutput);
        expect(sumOfFlashes).toBe(204);
      });

      it(`should simulate 50 ticks`, () => {
        let mutableArray = input.map((row) => row.split(``).map(Number));
        const expectedOutput = [
          `9655556447`,
          `4865556805`,
          `4486555690`,
          `4458655580`,
          `4574865570`,
          `5700086566`,
          `6000009887`,
          `8000000533`,
          `6800000633`,
          `5680000538`,
        ].map((row) => row.split(``).map(Number));

        for (let i = 0; i < 50; i += 1) {
          const { returnArray } = processTick(mutableArray);
          mutableArray = returnArray;
        }

        expect(mutableArray).toEqual(expectedOutput);
      });

      it(`should simulate 100 ticks`, () => {
        let mutableArray = input.map((row) => row.split(``).map(Number));
        const expectedOutput = [
          `0397666866`,
          `0749766918`,
          `0053976933`,
          `0004297822`,
          `0004229892`,
          `0053222877`,
          `0532222966`,
          `9322228966`,
          `7922286866`,
          `6789998766`,
        ].map((row) => row.split(``).map(Number));
        let sumOfFlashes = 0;

        for (let i = 0; i < 100; i += 1) {
          const { returnArray, amountOfFlashes } = processTick(mutableArray);
          mutableArray = returnArray;
          sumOfFlashes += amountOfFlashes;
        }

        expect(mutableArray).toEqual(expectedOutput);
        expect(sumOfFlashes).toBe(1656);
      });
    });
  });

  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(1656);
    });

    it(`should take the test input and return the correct value`, () => {
      const run = runDay(2);
      expect(run.partTwo).toBe(195);
    });

    it(`should take the test input and return the correct value for both days`, () => {
      const run = runDay(0);
      expect(run.partOne).toBe(1656);
      expect(run.partTwo).toBe(195);
    });
  });
});
