import { gridRightBoundaryCells, nodeMap, SetSelectedToolClass, PlaceCellObject, algorithmAnimationSpeed, ShowErrorMessage } from "../Pathfinder.js";
import { SampleNode } from "../Objects and Data Structures/Objects/Sample Algorithm Node.js";

/**
 * Implements Sample Algorithm.
 * @param {any} endNode
 */
export function SampleAlgorithm(endNode) {
    if (endNode === undefined) {
        ShowErrorMessage("Sample Algorithm cannot run without an End Node on the grid. Also, without a Start Node no path will be rendered.");
        return;
    }
    let startNode;
    const visitedNodes = [];
    visitedNodes.push(endNode);

    UpdateNeighborsCounters(endNode, visitedNodes);

    mainLoop:
        for (let i = 0; i < visitedNodes.length; i++) {
            const node = visitedNodes[i];
            const neighbors = node.Neighbors;
            for (let j = 0; j < neighbors.length; j++) {
                if (node.Neighbors[j] < 0) continue;
                const neighbor = nodeMap.get(`cell${node.Neighbors[j]}`);

                if (neighbor.isWall) continue;
                if (IsQueuedCounterEqualOrGreater(neighbor, visitedNodes)) continue;

                node.previousNode = neighbor;

                UpdateNeighborsCounters(neighbor, visitedNodes);

                if (neighbor.isStartNode) {
                    startNode = neighbor;
                    break mainLoop;
                } else {
                    visitedNodes.push(neighbor);
                }
            }
        }

    AnimateSampleAlgorithmNodes(visitedNodes, startNode);
}

/**
 * Checks if there is a node in visitedNodes with the same coordinate and an equal or greater counter.
 * @param {any} node
 * @param {any} visitedNodes
 */
function IsQueuedCounterEqualOrGreater(node, visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
        const queueNode = visitedNodes[i];
        if (queueNode.id === node.id) {
            if (queueNode.Counter >= node.Counter) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Updates the counters of all the given node's neighbors.
 * @param {any} node
 * @param {any} visitedNodes
 */
function UpdateNeighborsCounters(node, visitedNodes) {
    if (node === undefined) {
        return;
    }
    for (let i = 0; i < node.Neighbors.length; i++) {
        const neighbor = nodeMap.get(`cell${node.Neighbors[i]}`);

        if (neighbor === undefined) continue;
        const isNeighborQueued = visitedNodes.find(queueNode => queueNode.id === neighbor.id);
        if (isNeighborQueued !== undefined) continue;
        if (neighbor.isWall) continue;

        neighbor.Counter = node.Counter + 1;
    }
}

/**
 * Animates all the the nodes visited by the Sample Algorithm.
 * @param {any} visitedNodes
 * @param {any} startNode
 */
function AnimateSampleAlgorithmNodes(visitedNodes, startNode) {
    SetSelectedToolClass("visited-node");

    let iteration = 0;

    const animationInterval = setInterval(function() {
        if (iteration >= visitedNodes.length) clearInterval(animationInterval);

        const node = visitedNodes[iteration];
        if (node === undefined) return;
        const id = node.id;
        const cellId = `cell${id}`;

        PlaceCellObject(cellId);
        ++iteration;

        if (iteration === visitedNodes.length) {
            GetShortestPath(startNode, visitedNodes);
        }
    }, algorithmAnimationSpeed);

}

/**
 * Gets the shortest path found by the sample algorithm.
 * @param {any} startNode
 * @param {any} visitedNodes
 */
function GetShortestPath(startNode, visitedNodes) {
    if (startNode === undefined) return;

    const pathNodes = [];
    let currentNode = startNode;

    mainLoop:
        while (!currentNode.isEndNode) {
            const currentNodeNeighbors = currentNode.Neighbors;
            for (let i = 0; i < currentNodeNeighbors.length; i++) {
                if (currentNodeNeighbors[i] < 0) continue;
                const neighbor = nodeMap.get(`cell${currentNodeNeighbors[i]}`);
                if (!IsNodeVisited(visitedNodes, neighbor)) continue;

                if (neighbor.Counter < currentNode.Counter) {
                    if (neighbor.isEndNode) {
                        break mainLoop;
                    } else {
                        pathNodes.push(neighbor);
                        currentNode = neighbor;
                        break;
                    }
                }
            }
        }

    DrawSampleAlgorithmShortestPath(pathNodes);
}

/**
 * Checks if the given node has already been visited.
 * @param {any} visitedNodes
 * @param {any} nodeToCheck
 */
function IsNodeVisited(visitedNodes, nodeToCheck) {
    for (let i = 0; i < visitedNodes.length; i++) {
        const queueNode = visitedNodes[i];
        if (queueNode.id === nodeToCheck.id) {
            return true;
        }
    }

    return false;
}

/**
 * Draws the shortest path found by the sample algorithm.
 * @param {any} pathNodes
 */
function DrawSampleAlgorithmShortestPath(pathNodes) {
    SetSelectedToolClass("path-node");

    let iterations = 0;
    const shortestPathInterval = setInterval(function () {
        const cellId = `cell${pathNodes[iterations].id}`;

        document.getElementById(cellId).innerHTML = "";

        PlaceCellObject(cellId);

        if (iterations === pathNodes.length - 1) {
            clearInterval(shortestPathInterval);
            SetSelectedToolClass("");
        }
        else {
            ++iterations;
        }
    }, 50);
}

/**
 * Maps the Sample Node Object to grid cells.
 * @param {any} rows
 * @param {any} columns
 */
export function MapSampleAlgorithmNodes(rows, columns) {
    nodeMap.clear();

    let lastRowCellId = 0;
    let currentRowCellId = 0;

    for (let i = 0; i < (rows * columns); i++) {
        if (i < columns) {
            nodeMap.set(`cell${i}`, new SampleNode(i + 1, 1, 0, i));
            if (i === columns - 1) {
                currentRowCellId = 1;
            }
            continue;
        }
        const lastRowCell = gridRightBoundaryCells[lastRowCellId];
        const currentRowEndCell = gridRightBoundaryCells[currentRowCellId];

        const x = i - lastRowCell;
        const y = currentRowCellId + 1;

        nodeMap.set(`cell${i}`, new SampleNode(x, y, 0, i));
        
        if (i === currentRowEndCell) {
            lastRowCellId = currentRowCellId;
            ++currentRowCellId;
        }
    }
}