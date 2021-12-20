import runDay, {
  findNode,
  findNodeAndPush,
  findNodeAsserting,
  findNodeNeighbors,
  makeNewMapRow,
} from "../../src/day15/day15";
import Node from "../../src/day15/Node";
import getPuzzleInput from "../../src/utils";

const input = getPuzzleInput(`day15test`);

const numberArray = input.map((value) => value.split(``).map(Number));
const nodeGraph: Node[] = [];

// create the Node[]
numberArray.forEach((row, y) => {
  row.forEach((column, x) => {
    nodeGraph.push(new Node(x, y, column));
  });
});

describe(`Day 15 tests`, () => {
  describe(`node tests`, () => {
    it(`should create a node instance correctly`, () => {
      expect(new Node(3, 4, 2)).toEqual({
        x: 3,
        y: 4,
        lowestCost: Infinity,
        value: 2,
      });
    });
  });

  describe(`unit`, () => {
    it(`should find a node`, () => {
      expect(findNodeAsserting(nodeGraph, 3, 4)).toEqual({
        x: 3,
        y: 4,
        lowestCost: Infinity,
        value: 3,
      });
    });

    it(`should throw if the node isn't found`, () => {
      expect(() => {
        findNodeAsserting(nodeGraph, -2, 1);
      }).toThrow();
    });

    it(`should find a node`, () => {
      expect(findNode(nodeGraph, 3, 4)).toEqual({
        x: 3,
        y: 4,
        lowestCost: Infinity,
        value: 3,
      });
    });

    it(`should return undefined for a non-existent node`, () => {
      expect(findNode(nodeGraph, -2, 1)).toBeUndefined();
    });

    it(`should find a node and push it to an array if it exists`, () => {
      const testArray: Node[] = [];
      findNodeAndPush(nodeGraph, testArray, 3, 4);
      findNodeAndPush(nodeGraph, testArray, -2, 1);
      expect(testArray).toEqual([
        {
          x: 3,
          y: 4,
          lowestCost: Infinity,
          value: 3,
        },
      ]);
    });

    it(`should find a node's neighbors`, () => {
      expect(findNodeNeighbors(nodeGraph, 0, 0)).toEqual([
        {
          x: 0,
          y: 1,
          lowestCost: Infinity,
          value: 1,
        },
        {
          x: 1,
          y: 0,
          lowestCost: Infinity,
          value: 1,
        },
      ]);
    });

    it(`should create a new map row`, () => {
      const correctFirstRow = `11637517422274862853338597396444961841755517295286
13813736722492484783351359589446246169155735727126
21365113283247622439435873354154698446526571955763
36949315694715142671582625378269373648937148475914
74634171118574528222968563933317967414442817852555
13191281372421239248353234135946434524615754563572
13599124212461123532357223464346833457545794456865
31254216394236532741534764385264587549637569865174
12931385212314249632342535174345364628545647573965
23119445813422155692453326671356443778246755488935`;

      expect(
        makeNewMapRow(numberArray)
          .returnRow.map((row) => row.join(``))
          .join(`\n`)
      ).toEqual(correctFirstRow);
    });
  });

  describe(`e2e`, () => {
    it(`should take the test input and return the correct value`, () => {
      const run = runDay(1);
      expect(run.partOne).toBe(40);
    });

    it(`should take the test input and return the correct value`, () => {
      const run = runDay(2);
      expect(run.partTwo).toBe(315);
    });

    it(`should take the test input and return the correct value for both days`, () => {
      const run = runDay(0);
      expect(run.partOne).toBe(40);
      expect(run.partTwo).toBe(315);
    });
  });
});
