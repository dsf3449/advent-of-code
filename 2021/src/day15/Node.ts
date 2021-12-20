export default class Node {
  x: number;

  y: number;

  lowestCost = Infinity;

  value: number;

  constructor(x: number, y: number, value: number) {
    this.x = x;
    this.y = y;
    this.value = value;
  }
}
