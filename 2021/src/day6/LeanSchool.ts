import assert from "assert";
import Day from "./Day";

export default class LeanSchool {
  days: Day[] = [];

  constructor(puzzleInput: number[]) {
    for (let i = 0; i < 9; i += 1) {
      this.days.push(new Day(i, 0));
    }
    puzzleInput.forEach((fish) => {
      this.findObjectWithDaysToReproduction(fish).numberOfFish += 1;
    });
  }

  findObjectWithDaysToReproduction(numberOfDaysRemaining: number) {
    const resp = this.days.find(
      (day) => day.daysUntilReproduction === numberOfDaysRemaining
    );
    assert(resp, `Could not find day specified`);
    return resp;
  }

  processTick() {
    // Move all days down by one
    this.days.forEach((day, index) => {
      this.days[index].daysUntilReproduction -= 1;
    });

    // The number of fish which have reproduced is now represented by -1
    const expiredObject = this.findObjectWithDaysToReproduction(-1);
    const numberToAdd = expiredObject.numberOfFish;

    // This object can now represent the "new" fish
    expiredObject.daysUntilReproduction = 8;

    // Add the number of fish to the other fish which have a reproduction day of 6
    this.findObjectWithDaysToReproduction(6).numberOfFish += numberToAdd;
  }

  findAmountOfFish() {
    let amountOfFish = 0;

    this.days.forEach((day) => {
      amountOfFish += day.numberOfFish;
    });

    return amountOfFish;
  }
}
