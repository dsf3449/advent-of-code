export default class Display {
  top: string[] = [];

  topLeft: string[] = [];

  topRight: string[] = [];

  middle: string[] = [];

  bottomLeft: string[] = [];

  bottomRight: string[] = [];

  bottom: string[] = [];

  resolveStrings: string[][] = Array(9).fill([]);

  getUsedLetters() {
    return [this.top, this.topLeft, this.middle, this.bottom].flat();
  }

  getAllUsedLetters() {
    return [
      this.top,
      this.topLeft,
      this.topRight,
      this.middle,
      this.bottomRight,
      this.bottom,
    ].flat();
  }
}
