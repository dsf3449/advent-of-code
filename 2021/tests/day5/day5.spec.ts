import Point from "../../src/day5/Point";
import Board from "../../src/day5/Board";
import Line from "../../src/day5/Line";
import runDay from "../../src/day5/day5";

describe(`Day 5 tests`, () => {
  describe(`Point tests`, () => {
    it(`should create a new point with coordinates 3,4`, () => {
      const point = new Point(3, 4);
      expect(point.x).toBe(3);
      expect(point.y).toBe(4);
      expect(point.timesOverlaid).toBe(0);
    });
  });

  describe(`Board tests`, () => {
    it(`should create a new board`, () => {
      const input = [`0,9 -> 5,9`, `7,0 -> 7,4`];
      const board = new Board(input);
      expect(board.lines).toEqual([
        new Line(new Point(0, 9), new Point(5, 9)),
        new Line(new Point(7, 0), new Point(7, 4)),
      ]);
    });

    it(`should fill point cluster with all possible points`, () => {
      const input = [`0,2 -> 0,4`, `3,2 -> 5,2`];
      const board = new Board(input);
      expect(board.points).toEqual([
        new Point(0, 2),
        new Point(0, 4),
        new Point(0, 3),
        new Point(3, 2),
        new Point(5, 2),
        new Point(4, 2),
      ]);
    });

    it(`should count intersecting points between two lines`, () => {
      const input = [`1,1 -> 5,1`, `3,0 -> 3,5`];
      const board = new Board(input);
      const intersectingPoints = board.points.filter(
        (point) => point.timesOverlaid > 0
      );
      expect(intersectingPoints.length).toBe(1);
      expect(intersectingPoints[0].x).toBe(3);
      expect(intersectingPoints[0].y).toBe(1);
      expect(intersectingPoints[0].timesOverlaid).toBe(1);
    });

    it(`should count intersecting points between three lines`, () => {
      const input = [`1,1 -> 5,1`, `3,0 -> 3,5`, `1,1 -> 3,1`];
      const board = new Board(input);
      const intersectingPoints = board.points.filter(
        (point) => point.timesOverlaid > 0
      );
      expect(intersectingPoints.length).toBe(3);

      const possibleX = [1, 3, 2];
      const possibleY = [1, 1, 1];
      intersectingPoints.forEach((point) => {
        expect(possibleX).toContain(point.x);
        expect(possibleY).toContain(point.y);
      });

      const twiceIntersectedPoint = intersectingPoints.filter(
        (point) => point.timesOverlaid > 1
      );
      expect(twiceIntersectedPoint.length).toBe(1);
      expect(twiceIntersectedPoint[0].x).toBe(3);
      expect(twiceIntersectedPoint[0].y).toBe(1);
      expect(twiceIntersectedPoint[0].timesOverlaid).toBe(2);
    });
  });

  describe(`Line tests`, () => {
    it(`should create a new line generically`, () => {
      const start = new Point(3, 4);
      const end = new Point(7, 9);
      const line = new Line(start, end);
      expect(line.startPoint).toEqual(start);
      expect(line.endPoint).toEqual(end);
      expect(line.slope).toBe(1.25);
      expect(line.lineStyle).toBe(`generic`);
    });

    it(`should correctly identify a horizontal line`, () => {
      const start = new Point(3, 4);
      const end = new Point(8, 4);
      const line = new Line(start, end);
      expect(line.slope).toBe(0);
      expect(line.lineStyle).toBe(`horizontal`);
    });

    it(`should correctly identify a vertical line`, () => {
      const start = new Point(5, 2);
      const end = new Point(5, 9);
      const line = new Line(start, end);
      expect(line.slope).toBe(Infinity);
      expect(line.lineStyle).toBe(`vertical`);
    });

    it(`should fill points for a horizontal line`, () => {
      const start = new Point(3, 4);
      const end = new Point(6, 4);
      const line = new Line(start, end);
      expect(line.pointCluster).toEqual([new Point(5, 4), new Point(4, 4)]);
    });

    it(`should fill points for a vertical line`, () => {
      const start = new Point(5, 6);
      const end = new Point(5, 9);
      const line = new Line(start, end);
      expect(line.pointCluster).toEqual([new Point(5, 8), new Point(5, 7)]);
    });

    it(`should not fill points for a generic line`, () => {
      const start = new Point(3, 4);
      const end = new Point(7, 9);
      const line = new Line(start, end);
      expect(line.pointCluster).toEqual([]);
    });
  });

  describe(`e2e`, () => {
    it(`should take the test input and output the correct result`, () => {
      expect(runDay().partOne).toBe(5);
    });
  });
});
