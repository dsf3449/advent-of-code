export default class Point {
  readonly x: number;

  readonly y: number;

  timesOverlaid: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.timesOverlaid = 0;
  }
}
