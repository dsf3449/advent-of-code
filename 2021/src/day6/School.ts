import Fish from "./Fish";

export default class School {
  fish: Fish[] = [];

  constructor(puzzleInput: number[]) {
    puzzleInput.forEach((fish) => this.fish.push(new Fish(fish)));
  }

  processTick() {
    this.fish.forEach((fish, index) => {
      if (fish.daysTilReproduction === 0) {
        this.fish[index].daysTilReproduction = 6;
        this.fish.push(new Fish(8));
        return;
      }

      this.fish[index].daysTilReproduction -= 1;
    });
  }
}
