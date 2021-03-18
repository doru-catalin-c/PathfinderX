import { DijkstraNode } from "../Objects and Data Structures/Objects/Dijkstra's Algorithm Node.js";
import { MinimumPriorityQueue } from "../Objects and Data Structures/Data Structures/Priority Queue.js";
import { SetSelectedToolClass, nodeMap, PlaceCellObject, algorithmAnimationSpeed, ShowErrorMessage}
    from "../Pathfinder.js";

/**
 * Implements Dijkstra's Algorithm.
 * @param {any} startNode
 */
export function DijkstraAlgorithm(startNode) {
    if (startNode === undefined) {
        ShowErrorMessage("Dijkstra's Algorithm cannot run without a Start Node on the grid. Also, without an End Node, no path will be rendered.");
        return;
    }

    const minimumPriorityQueue = new MinimumPriorityQueue();
    const visitedNodes = new Set();
    let endNode;

    UpdateStartNodeNeighborsPriorities(startNode);
    minimumPriorityQueue.Enqueue(startNode);
    visitedNodes.add(startNode);

    mainLoop:
        while (!minimumPriorityQueue.IsEmpty()) {
            const currentNode = minimumPriorityQueue.Dequeue();

            if (currentNode.previousNode === null) {
                currentNode.previousNode = startNode;
            }

            EnqueueNeighborsAndUpdatePriorities(currentNode, minimumPriorityQueue, visitedNodes);

            let previousNeighbor;
            for (let i = 0; i < currentNode.Neighbors.length; i++) {
                if (currentNode.Neighbors[i] < 0) continue;
                const neighbor = nodeMap.get(`cell${currentNode.Neighbors[i]}`);
                if (neighbor.isWall === true) continue;
                if (visitedNodes.has(neighbor)) continue;

                if (previousNeighbor !== undefined) {
                    const pathCost = currentNode.previousNode.priority + currentNode.priority + neighbor.priority;
                    const previousPathCost =
                        currentNode.previousNode.priority + currentNode.priority + previousNeighbor.priority;

                    if (previousPathCost < pathCost) {
                        previousNeighbor.previousNode = currentNode;
                    } else {
                        neighbor.previousNode = currentNode;
                    }
                } else {
                    neighbor.previousNode = currentNode;
                }

                visitedNodes.add(neighbor);
                previousNeighbor = neighbor;

                if (neighbor.isEndNode) {
                    endNode = neighbor;
                    break mainLoop;
                }
            }
        }

    AnimateDijkstraVisitedNodes(visitedNodes, endNode);
}

/**
 * Updates the priorities from Infinity to 1 for every neighbor of the Start Node.
 * @param {any} startNode
 */
function UpdateStartNodeNeighborsPriorities(startNode) {
    for (let i = 0; i <= startNode.Neighbors.length; i++) {
        const startNodeNeighbor = nodeMap.get(`cell${startNode.Neighbors[i]}`);
        if (startNodeNeighbor != undefined) {
            startNodeNeighbor.priority = 1;
        }
    }
}

/**
 * Updates the priorities of all the neighbors of the current node to whatever
 * priority the node has +1 and adds them to the queue if the conditions are met.
 * @param {any} node
 * @param {any} priorityQueue
 * @param {any} visitedNodes
 */
function EnqueueNeighborsAndUpdatePriorities(node, priorityQueue, visitedNodes) {
    for (let i = 0; i < node.Neighbors.length; i++) {
        if (node.Neighbors[i] < 0) continue;
        const neighbor = nodeMap.get(`cell${node.Neighbors[i]}`);
        if (neighbor.isWall === true) continue;
        if (priorityQueue.Has(neighbor)) continue;
        if (visitedNodes.has(neighbor)) continue;

        if (neighbor.isWeight) {
            neighbor.priority = node.priority * 5;
        } else {
            neighbor.priority = node.priority + 1;
        }

        priorityQueue.Enqueue(neighbor);
    }
}

/**
 * Animates the cells visited by Dijkstra's Algorithm.
 * @param {any} visitedNodes
 */
function AnimateDijkstraVisitedNodes(visitedNodes, endNode) {
    SetSelectedToolClass("visited-node");

    let iterations = 0;
    const setIterator = visitedNodes.values();

    const animationInterval = setInterval(function () {
        if (iterations >= visitedNodes.size - 1) clearInterval(animationInterval);

        const node = setIterator.next().value;
        const id = node.value;
        const cellId = `cell${id}`;

        PlaceCellObject(cellId);
        ++iterations;

        if (iterations === visitedNodes.size) {
            FindDijkstraShortestPath(endNode);
        }
    }, algorithmAnimationSpeed);
}

/**
 * Backtracks from the End node to find the shortest path.
 * @param {any} endNode
 */
function FindDijkstraShortestPath(endNode) {
    if (endNode === undefined) return;

    const pathNodes = [];
    let currentNode = endNode;

    while (!currentNode.isStartNode) {
        if (currentNode.isEndNode) {
            currentNode = currentNode.previousNode;
            continue;
        }

        pathNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    DrawDijkstraShortestPath(pathNodes);
}

/**
 * Draws on the grid the shortest path from the Start Node to the End Node.
 * @param {any} pathNodes
 */
function DrawDijkstraShortestPath(pathNodes) {
    SetSelectedToolClass("path-node");

    let iterations = 0;
    const shortestPathInterval = setInterval(function() {
        const cellId = `cell${pathNodes[iterations].value}`;

        document.getElementById(cellId).innerHTML = "";

        PlaceCellObject(cellId);

        if (iterations === pathNodes.length - 1) {
            clearInterval(shortestPathInterval);
            SetSelectedToolClass("");
        }
        else
        {
            ++iterations;
        }
    }, 50);
}

/**
 * Maps all the grid cells to the Node object used by Dijkstra's Algorithm.
 * @param {any} rows
 * @param {any} columns
 */
export function MapDijkstraNodes(rows, columns) {
    nodeMap.clear();
    for (let i = 0; i < (rows * columns); i++) {
        nodeMap.set(`cell${i}`, new DijkstraNode(i, Infinity));
    }
}