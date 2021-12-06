import Point from "./Point";

export default class Line {
  readonly startPoint: Point;

  // heh
  readonly endPoint: Point;

  readonly slope: number;

  readonly lineStyle:
    | `vertical`
    | `horizontal`
    | `generic`
    | `invVertical`
    | `invHorizontal`;

  pointCluster: Point[] = [];

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.slope = (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x);
    this.lineStyle = this.setLineStyle();
    this.fillPoints(startPoint, endPoint);
  }

  setLineStyle() {
    if (Object.is(this.slope, -0)) {
      return `invHorizontal`;
    }
    switch (this.slope) {
      case Infinity:
        return `vertical`;
      case -Infinity:
        return `invVertical`;
      case 0:
        return `horizontal`;
      default:
        return `generic`;
    }
  }

  fillPoints(startPoint: Point, endPoint: Point) {
    switch (this.lineStyle) {
      case `vertical`: {
        for (let i = endPoint.y - 1; i > startPoint.y; i -= 1) {
          this.pointCluster.push(new Point(startPoint.x, i));
        }
        break;
      }
      case `invVertical`: {
        for (let i = startPoint.y - 1; i > endPoint.y; i -= 1) {
          this.pointCluster.push(new Point(endPoint.x, i));
        }
        break;
      }
      case `horizontal`: {
        for (let i = endPoint.x - 1; i > startPoint.x; i -= 1) {
          this.pointCluster.push(new Point(i, startPoint.y));
        }
        break;
      }
      case `invHorizontal`: {
        for (let i = startPoint.x - 1; i > endPoint.x; i -= 1) {
          this.pointCluster.push(new Point(i, endPoint.y));
        }
        break;
      }
      default:
        break;
    }
  }
}
