import { GetCellLeftNeighbor, GetCellTopNeighbor, GetCellRightNeighbor, GetCellBottomNeighbor }
    from "../../Pathfinder.js";

export class BfsNode {
    constructor(value) {
        this.value = value;

        this.isVisited = false;
        this.isWall = false;
        this.isStartNode = false;
        this.isEndNode = false;
        this.previousNode = null;

        this.Neighbors = [];
        this.Neighbors.push(GetCellLeftNeighbor(value));
        this.Neighbors.push(GetCellTopNeighbor(value));
        this.Neighbors.push(GetCellRightNeighbor(value));
        this.Neighbors.push(GetCellBottomNeighbor(value));
    }
}