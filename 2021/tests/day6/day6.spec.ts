import Fish from "../../src/day6/Fish";
import School from "../../src/day6/School";
import runDay from "../../src/day6/day6";

describe(`Day 6 tests`, () => {
  describe(`Fish tests`, () => {
    it(`should create a fish with reproduction value 4`, () => {
      const fish = new Fish(4);
      expect(fish.daysTilReproduction).toBe(4);
    });
  });

  describe(`School tests`, () => {
    it(`should create a fish array given a number array`, () => {
      const input = [4, 3, 4, 5];
      const expected = [new Fish(4), new Fish(3), new Fish(4), new Fish(5)];
      const school = new School(input);
      school.fish.forEach((fish, index) => {
        expect(fish).toEqual(expected[index]);
        expect(fish.daysTilReproduction).toBe(input[index]);
      });
    });

    it(`should process a tick correctly`, () => {
      const input = [4, 3, 4, 5];
      const school = new School(input);
      school.processTick();
      school.fish.forEach((fish, index) => {
        expect(fish.daysTilReproduction).toBe(input[index] - 1);
      });
    });

    it(`should process reproduction correctly`, () => {
      const input = [1, 0, 3];
      const school = new School(input);
      school.processTick();
      expect(school.fish[0].daysTilReproduction).toBe(0);
      expect(school.fish[1].daysTilReproduction).toBe(6);
      expect(school.fish[2].daysTilReproduction).toBe(2);
      expect(school.fish[3]).toEqual(new Fish(8));
      school.processTick();
      expect(school.fish[0].daysTilReproduction).toBe(6);
      expect(school.fish[1].daysTilReproduction).toBe(5);
      expect(school.fish[2].daysTilReproduction).toBe(1);
      expect(school.fish[3].daysTilReproduction).toBe(7);
      expect(school.fish[4]).toEqual(new Fish(8));
    });
  });

  describe(`e2e`, () => {
    it(`should take the test input and simulate 18 days`, () => {
      const run = runDay(18);
      expect(run.partOne).toBe(26);
    });

    it(`should take the test input and simulate 80 days`, () => {
      const run = runDay(80);
      expect(run.partOne).toBe(5934);
    });

    // it(`should take the test input and simulate 256 days`, () => {
    //   const run = runDay(256);
    //   expect(run.partOne).toBe(26984457539);
    // });
  });
});
