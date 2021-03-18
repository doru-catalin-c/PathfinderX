import { GetCellLeftNeighbor, GetCellTopNeighbor, GetCellRightNeighbor, GetCellBottomNeighbor }
    from "../../Pathfinder.js";

export class SampleNode {
    constructor(x, y, counter, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.Counter = counter;
        this.isStartNode = false;
        this.isEndNode = false;
        this.isWall = false;

        this.previousNode = undefined;

        this.Neighbors = [];
        this.Neighbors.push(GetCellLeftNeighbor(id));
        this.Neighbors.push(GetCellTopNeighbor(id));
        this.Neighbors.push(GetCellRightNeighbor(id));
        this.Neighbors.push(GetCellBottomNeighbor(id));
    }
}