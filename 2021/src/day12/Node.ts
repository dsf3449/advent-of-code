export default class Node {
  value: string;

  adjacentNodes: Node[];

  timesVisited = 0;

  constructor(value: string, adjacentNodes: Node[]) {
    this.value = value;
    this.adjacentNodes = adjacentNodes;
  }
}
