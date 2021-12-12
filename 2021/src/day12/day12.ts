import getPuzzleInput, { AnswerPair } from "../utils";
import Node from "./Node";

function createNodeGraph(input: string[]) {
  const nodes: Node[] = [];
  const arr = input.map((line) => line.split(`-`));

  arr.forEach((line) => {
    // check for nodes with this value already
    const matchingNodes = nodes.filter((node) => node.value === line[0]);

    // check for nodes with the child value already
    const childrenNodes = nodes.filter((node) => node.value === line[1]);

    // if there are none then we can add a new node
    if (matchingNodes.length === 0) {
      // if there are no pre-existing child nodes we need to make a new one
      if (childrenNodes.length === 0) {
        const childNode = new Node(line[1], []);
        const parentNode = new Node(line[0], [childNode]);
        childNode.adjacentNodes.push(parentNode);
        nodes.push(parentNode, childNode);
        return;
      }

      // if there is a child node already we can just push the parent node
      if (childrenNodes.length === 1) {
        const parentNode = new Node(line[0], [childrenNodes[0]]);
        childrenNodes[0].adjacentNodes.push(parentNode);
        nodes.push(parentNode);
        return;
      }

      console.error(`more than 1 children node matched search`);
    }

    // we already have a node
    if (matchingNodes.length === 1) {
      // if there are no pre-existing child nodes we need to make a new one
      if (childrenNodes.length === 0) {
        const childNode = new Node(line[1], [matchingNodes[0]]);
        matchingNodes[0].adjacentNodes.push(childNode);
        nodes.push(childNode);
        return;
      }

      // if there is a child node already we can just push to the parent node
      if (childrenNodes.length === 1) {
        matchingNodes[0].adjacentNodes.push(childrenNodes[0]);
        childrenNodes[0].adjacentNodes.push(matchingNodes[0]);
        return;
      }

      console.error(`more than 1 children node matched search`);
    }

    console.error(`more than 1 parent node matched search`);
  });

  return nodes;
}

function isLargeCave(value: string) {
  return /^[A-Z]*$/.test(value);
}

// function searchForValidPath(thisNode: Node, visitedNodes: Node[], path: Node[], paths: Node[][], nodeGraph: Node[], pathIndex: number): Node[][] {
//   // keep on repeating search until the visited nodes include every node in
//   // the node graph
//   if (!nodeGraph.every((node) => visitedNodes.includes(node))) {
//     // mark this node as visited if it's not a large cave
//     // if (!isLargeCave(thisNode.value)) visitedNodes.push(thisNode);
//     visitedNodes.push(thisNode);
//     path.push(thisNode);
//
//     // if we've already visited all this node's adjacent nodes, then there's
//     // nothing left to do at this node. recurse up one level
//     // if (thisNode.adjacentNodes.every((node) => visitedNodes.includes(node))) {
//     //   // take this node off the stack since it's not good
//     //   path.pop();
//     //   return searchForValidPath(
//     //     nodeGraph.filter((node) => node.value === `start`)[0],
//     //     visitedNodes,
//     //     path,
//     //     paths,
//     //     nodeGraph,
//     //     pathIndex
//     //   );
//     // }
//
//     // check for the end in the adjacent nodes
//     const endNode = thisNode.adjacentNodes.filter(
//       (node) => node.value === `end`
//     );
//     if (endNode.length === 1) {
//       // add the end node to the path
//       path.push(endNode[0]);
//       paths.push(path);
//       return searchForValidPath(
//         path.slice(-2, -1)[0],
//         visitedNodes,
//         [],
//         paths,
//         nodeGraph,
//         pathIndex + 1
//       );
//     }
//
//     for (let i = 0; i < thisNode.adjacentNodes.length; i += 1) {
//       if (!visitedNodes.includes(thisNode.adjacentNodes[i])) {
//         return searchForValidPath(
//           thisNode.adjacentNodes[i],
//           visitedNodes,
//           path,
//           paths,
//           nodeGraph,
//           pathIndex
//         );
//       }
//     }
//   }
//
//   console.log(paths);
//   return paths;
// }

function dfs(nodeGraph: Node[], start: Node, visited: Set<Node>) {
  // if we've hit the end node, we have a valid path
  if (start.value === `end`) return 1;

  // if the cave is small and has been visited already, then not a valid path
  if (visited.has(start) && !isLargeCave(start.value)) return 0;

  // say that we have visited this node
  visited.add(start);

  let result = 0;

  for (let i = 0; i < start.adjacentNodes.length; i += 1) {
    result += dfs(nodeGraph, start.adjacentNodes[i], visited);
  }

  // remove this node so that we can visit it again in the future
  // we can do this because we check for large cave conditions above
  visited.delete(start);

  return result;
}

function partOne(input: string[]) {
  const nodeGraph = createNodeGraph(input);

  const start = nodeGraph.filter((node) => node.value === `start`)[0];
  return dfs(nodeGraph, start, new Set());
}

/* eslint-disable no-param-reassign */
function dfsRevised(
  nodeGraph: Node[],
  start: Node,
  visited: Record<string, number> = {},
  hasReturnedToSmallCave = false
) {
  // if we've hit the end node, we have a valid path
  if (start.value === `end`) return 1;

  // if the cave has been visited already, and it's a small cave, then we should
  // check if we've already returned to a small cave during this session
  if (visited[start.value] && !isLargeCave(start.value)) {
    if (hasReturnedToSmallCave) return 0;
    hasReturnedToSmallCave = true;
  }

  // add the value of this node to the visited object (with a value of 1
  // as the amount of times we have visited it)
  visited[start.value] = visited[start.value] + 1 || 1;

  let result = 0;

  for (let i = 0; i < start.adjacentNodes.length; i += 1) {
    if (start.adjacentNodes[i].value !== `start`) {
      result += dfsRevised(
        nodeGraph,
        start.adjacentNodes[i],
        visited,
        hasReturnedToSmallCave
      );
    }
  }

  visited[start.value] -= 1;

  return result;
}
/* eslint-enable no-param-reassign */

function partTwo(input: string[]) {
  const nodeGraph = createNodeGraph(input);

  const start = nodeGraph.filter((node) => node.value === `start`)[0];
  return dfsRevised(nodeGraph, start);
}

export default function runDay(part: number): AnswerPair {
  const input = getPuzzleInput(
    process.env.NODE_ENV === `test` ? `day12test` : `day12`
  );

  if (part === 1) {
    return {
      partOne: partOne(input),
    };
  }

  if (part === 2) {
    return {
      partTwo: partTwo(input),
    };
  }

  return {
    partOne: partOne(input),
    partTwo: partTwo(input),
  };
}
