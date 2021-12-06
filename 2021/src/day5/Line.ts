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
    | `invHorizontal`
    | `-rise`
    | `-run`
    | `-riserun`
    | `+riserun`
    | `other`;

  pointCluster: Point[] = [];

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;

    const rise = endPoint.y - startPoint.y;
    const run = endPoint.x - startPoint.x;
    this.slope = rise / run;

    if (this.slope === -1) {
      if (rise < 0) {
        this.lineStyle = `-rise`;
      } else {
        this.lineStyle = `-run`;
      }
    } else if (this.slope === 1) {
      if (rise < 0 && run < 0) {
        this.lineStyle = `-riserun`;
      } else {
        this.lineStyle = `+riserun`;
      }
    } else {
      this.lineStyle = this.setLineStyle();
    }

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
        return `other`;
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
      case `+riserun`: {
        let updatedX = endPoint.x;
        for (let i = endPoint.y - 1; i > startPoint.y; i -= 1) {
          updatedX -= 1;
          this.pointCluster.push(new Point(updatedX, i));
        }
        break;
      }
      case `-riserun`: {
        let updatedX = endPoint.x;
        for (let i = endPoint.y + 1; i < startPoint.y; i += 1) {
          updatedX += 1;
          this.pointCluster.push(new Point(updatedX, i));
        }
        break;
      }
      case `-rise`: {
        let updatedX = startPoint.x;
        for (let i = startPoint.y - 1; i > endPoint.y; i -= 1) {
          updatedX += 1;
          this.pointCluster.push(new Point(updatedX, i));
        }
        break;
      }
      case `-run`: {
        let updatedX = startPoint.x;
        for (let i = startPoint.y + 1; i < endPoint.y; i += 1) {
          updatedX -= 1;
          this.pointCluster.push(new Point(updatedX, i));
        }
        break;
      }
      default:
        break;
    }
  }
}
