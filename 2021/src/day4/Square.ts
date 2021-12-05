export default class Square {
  readonly value: number;

  isMarked: boolean;

  constructor(value: number) {
    this.value = value;
    this.isMarked = false;
  }
}
