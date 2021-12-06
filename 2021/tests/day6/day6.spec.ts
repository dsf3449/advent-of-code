import Fish from "../../src/day6/Fish";
import School from "../../src/day6/School";
import runDay from "../../src/day6/day6";
import Day from "../../src/day6/Day";
import LeanSchool from "../../src/day6/LeanSchool";

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

  describe(`Day tests`, () => {
    it(`should create a day object with 2 days left and 12 fish`, () => {
      const day = new Day(2, 12);
      expect(day.daysUntilReproduction).toBe(2);
      expect(day.numberOfFish).toBe(12);
    });
  });

  describe(`LeanSchool tests`, () => {
    it(`should create a new empty lean school correctly`, () => {
      const school = new LeanSchool([]);
      expect(school.days.length).toBe(9);
      school.days.forEach((day, index) => {
        expect(day.daysUntilReproduction).toBe(index);
        expect(day.numberOfFish).toBe(0);
      });
    });

    it(`should create a new lean school with a puzzle input`, () => {
      const school = new LeanSchool([2, 3, 3, 4, 5, 5]);
      expect(school.days.length).toBe(9);
      expect(school.days[2].numberOfFish).toBe(1);
      expect(school.days[3].numberOfFish).toBe(2);
      expect(school.days[4].numberOfFish).toBe(1);
      expect(school.days[5].numberOfFish).toBe(2);
    });

    it(`should process a tick correctly`, () => {
      const school = new LeanSchool([0, 0, 0, 6, 7, 5]);
      school.processTick();
      expect(school.findObjectWithDaysToReproduction(0)).toEqual(new Day(0, 0));
      expect(school.findObjectWithDaysToReproduction(5)).toEqual(new Day(5, 1));
      expect(school.findObjectWithDaysToReproduction(6)).toEqual(new Day(6, 4));
      expect(school.findObjectWithDaysToReproduction(4)).toEqual(new Day(4, 1));
      expect(school.findObjectWithDaysToReproduction(8)).toEqual(new Day(8, 3));
    });

    it(`should total the amount of fish`, () => {
      const school = new LeanSchool([2, 3, 3, 4, 5, 5]);
      expect(school.findAmountOfFish()).toBe(6);
    });
  });

  describe(`e2e`, () => {
    it(`should take the test input and simulate 18 days`, () => {
      const run = runDay(1, 18);
      expect(run.partOne).toBe(26);
    });

    it(`should take the test input and simulate 80 days`, () => {
      const run = runDay(1, 80);
      expect(run.partOne).toBe(5934);
    });

    it(`should take the test input and simulate 256 days`, () => {
      const run = runDay(2, 256);
      expect(run.partTwo).toBe(26984457539);
    });

    it(`should take the test input and simulate 18 days for both parts`, () => {
      const run = runDay(0, 18);
      expect(run).toEqual({ partOne: 26, partTwo: 26 });
    });
  });
});
