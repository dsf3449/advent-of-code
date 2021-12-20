import assert from "assert";
import getPuzzleInput, { AnswerPair } from "../utils";
import Node from "./Node";

export function findNodeAsserting(nodeGraph: Node[], x: number, y: number) {
  const returnNode = nodeGraph.find((node) => node.x === x && node.y === y);
  assert(returnNode);
  return returnNode;
}

export function findNode(nodeGraph: Node[], x: number, y: number) {
  return nodeGraph.find((node) => node.x === x && node.y === y);
}

export function findNodeAndPush(
  nodeGraph: Node[],
  returnArray: Node[],
  x: number,
  y: number
) {
  const node = findNode(nodeGraph, x, y);
  if (node) {
    returnArray.push(node);
  }
  return returnArray;
}

export function findNodeNeighbors(nodeGraph: Node[], x: number, y: number) {
  const returnArray: Node[] = [];

  // get the node we want the neighbors of
  findNodeAsserting(nodeGraph, x, y);

  // up
  findNodeAndPush(nodeGraph, returnArray, x, y - 1);
  // down
  findNodeAndPush(nodeGraph, returnArray, x, y + 1);
  // left
  findNodeAndPush(nodeGraph, returnArray, x - 1, y);
  // right
  findNodeAndPush(nodeGraph, returnArray, x + 1, y);

  return returnArray;
}

function calculateAllPaths(nodeGraph: Node[]) {
  const graphCopy = [...nodeGraph];

  while (graphCopy.length > 0) {
    if ([200000, 100000, 50000, 10000, 5000, 1000].includes(graphCopy.length)) {
      console.log(graphCopy.length);
    }
    // find the node with the lowest cost in the graph that has not yet been visited
    const node = graphCopy.reduce((previousNode, currentNode) => {
      if (previousNode.lowestCost < currentNode.lowestCost) {
        return previousNode;
      }
      return currentNode;
    });

    // remove this node signifying that we have visited it
    graphCopy.splice(graphCopy.indexOf(node), 1);

    // check the neighbors of this node
    findNodeNeighbors(nodeGraph, node.x, node.y).forEach((neighborNode) => {
      const newNode = neighborNode;

      // but only the neighbors which have not yet already been visited
      if (!findNode(graphCopy, neighborNode.x, neighborNode.y)) {
        return;
      }

      const dist = node.lowestCost + newNode.value;
      if (dist < newNode.lowestCost) {
        newNode.lowestCost = dist;
      }
    });
  }

  return nodeGraph;
}

function partOne(nodeGraph: Node[], height: number, width: number) {
  calculateAllPaths(nodeGraph);
  return findNodeAsserting(nodeGraph, width, height).lowestCost;
}

export function makeNewMapRow(starting: number[][]) {
  const mapRow = [[...starting]];

  for (let i = 1; i < 5; i += 1) {
    const increasedArray = mapRow[i - 1].map((row) =>
      row.map((column) => {
        if (column + 1 > 9) {
          return 1;
        }
        return column + 1;
      })
    );
    mapRow.push(increasedArray);
  }

  const returnRow = [];
  // for each map section, we need to reduce it down to a single number[][]
  for (let i = 0; i < starting.length; i += 1) {
    returnRow[i] = mapRow[0][i].concat(
      mapRow[1][i],
      mapRow[2][i],
      mapRow[3][i],
      mapRow[4][i]
    );
  }

  return { returnRow, firstOfNextRow: mapRow[1] };
}

function partTwo(numberArray: number[][]) {
  const newMap: number[][] = [];
  let nextRowStarter = numberArray;
  const nodeGraph: Node[] = [];

  for (let i = 0; i < 5; i += 1) {
    const { returnRow, firstOfNextRow } = makeNewMapRow(nextRowStarter);
    returnRow.forEach((row) => newMap.push(row));
    nextRowStarter = firstOfNextRow;
  }

  // create the Node[]
  newMap.forEach((row, y) => {
    row.forEach((column, x) => {
      nodeGraph.push(new Node(x, y, column));
    });
  });

  // set the starting node's cost to 0
  findNodeAsserting(nodeGraph, 0, 0).lowestCost = 0;

  const height = newMap.length - 1;
  const width = newMap[0].length - 1;

  return partOne(nodeGraph, height, width);
}

export default function runDay(part: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day15test` : `day15`
  );

  // makes the string[][] into a number[][]
  const numberArray = input.map((value) => value.split(``).map(Number));
  const nodeGraph: Node[] = [];

  // create the Node[]
  numberArray.forEach((row, y) => {
    row.forEach((column, x) => {
      nodeGraph.push(new Node(x, y, column));
    });
  });

  // set the starting node's cost to 0
  findNodeAsserting(nodeGraph, 0, 0).lowestCost = 0;

  const height = numberArray.length - 1;
  const width = numberArray[0].length - 1;

  if (part === 1) {
    return {
      partOne: partOne(nodeGraph, height, width),
    };
  }

  if (part === 2) {
    return {
      partTwo: partTwo(numberArray),
    };
  }

  return {
    partOne: partOne(nodeGraph, height, width),
    partTwo: partTwo(numberArray),
  };
}
