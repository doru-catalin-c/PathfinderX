import { GetCellLeftNeighbor, GetCellTopNeighbor, GetCellRightNeighbor, GetCellBottomNeighbor }
    from "../../Pathfinder.js";

export class DijkstraNode {
    constructor (value, priority) {
        this.value = value;
        this.priority = priority;

        this.isWall = false;
        this.isWeight = false;
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