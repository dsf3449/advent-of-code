import Point from "./Point";
import Line from "./Line";

export default class Board {
  points: Point[] = [];

  lines: Line[] = [];

  constructor(puzzleInput: string[]) {
    const points = Board.transformPuzzleInputToPoints(puzzleInput);
    this.makeLines(points);
    this.extractPointsFromLinesAndAddToClusterWithNoDuplicates();
  }

  extractPointsFromLinesAndAddToClusterWithNoDuplicates() {
    this.lines.forEach((line) => {
      if (line.lineStyle === `other`) {
        return;
      }
      this.safelyAddPointToCluster(line.startPoint);
      this.safelyAddPointToCluster(line.endPoint);
      line.pointCluster.forEach((point) => {
        this.safelyAddPointToCluster(point);
      });
    });
  }

  makeLines(points: Point[][]) {
    points.forEach((pair) => {
      this.lines.push(new Line(pair[0], pair[1]));
    });
  }

  safelyAddPointToCluster(inputPoint: Point) {
    if (this.points.length === 0) {
      this.points.push(inputPoint);
      return;
    }

    for (let i = 0; i < this.points.length; i += 1) {
      if (
        inputPoint.x === this.points[i].x &&
        inputPoint.y === this.points[i].y
      ) {
        this.points[i].timesOverlaid += 1;
        return;
      }
    }

    this.points.push(new Point(inputPoint.x, inputPoint.y));
  }

  static transformPuzzleInputToPoints(puzzleInput: string[]) {
    return puzzleInput
      .map((value) => {
        return value.split(` -> `);
      })
      .map((stringArray) => {
        return stringArray
          .map((pointString) => {
            return pointString.split(`,`).map((value) => Number(value));
          })
          .map((pair) => {
            return new Point(pair[0], pair[1]);
          });
      });
  }
}
