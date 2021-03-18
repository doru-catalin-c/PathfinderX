import { DfsNode } from "../Objects and Data Structures/Objects/DFS Algorithm Node.js";
import { SetSelectedToolClass, nodeMap, PlaceCellObject, algorithmAnimationSpeed, ShowErrorMessage } from "../Pathfinder.js";

export const recursivelyVisitedNodes = new Set();
let endNode;
/**
 * Implements the recursive version of Depth-First Search Algorithm.
 * @param {any} node
 */
export function RecursiveDfsAlgorithm(node) {
    if (node === undefined) {
        ShowErrorMessage("Depth First Search cannot run without a Start Node on the grid. Also, without an End Node no path will be rendered.");
        return;
    }

    node.isVisited = true;
    recursivelyVisitedNodes.add(node);

    if (node.isEndNode) {
        endNode = node;
    }

    for (let i = 0; i < node.Neighbors.length; i++) {
        const currentNeighbor = nodeMap.get(`cell${node.Neighbors[i]}`);
        if (currentNeighbor === undefined) continue;
        if (currentNeighbor.isWall) continue;
        if (currentNeighbor.isVisited) continue;

        currentNeighbor.previousNode = node;
        RecursiveDfsAlgorithm(currentNeighbor);
    }
}

/**
 * Implements the iterative version of Depth-First Algorithm.
 * @param {any} startNode
 */
export function DfsAlgorithm(startNode) {
    if (startNode === undefined) {
        ShowErrorMessage("Depth First Search cannot run without a Start Node on the grid. Also, without an End Node no path will be rendered.");
        return undefined;
    }

    const stack = [];
    const visitedNodes = new Set();

    stack.push(startNode);

    while (stack.length !== 0) {
        const currentNode = stack.pop();
        if (currentNode.isEndNode) {
            endNode = currentNode;
            break;
        }
        if (!currentNode.isVisited) {
            currentNode.isVisited = true;
            visitedNodes.add(currentNode);
            for (let i = 0; i < currentNode.Neighbors.length; i++) {
                const currentNeighbor = nodeMap.get(`cell${currentNode.Neighbors[i]}`);
                if (currentNeighbor === undefined) continue;
                if (currentNeighbor.isWall) continue;
                if (currentNeighbor.isVisited) continue;

                currentNeighbor.previousNode = currentNode;
                stack.push(currentNeighbor);
            }
        }
    }

    return visitedNodes;
}

/**
 * Animates the nodes visited by Depth-First Search Algorithm.
 * @param {any} visitedNodes
 */
export function AnimateDfsVisitedNodes(visitedNodes) {
    if (visitedNodes === undefined || visitedNodes.size < 1) {
        return;
    }

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
            visitedNodes.clear();
            FindDfsShortestPath();
        }
    }, algorithmAnimationSpeed);
}

/**
 * Backtracks from the End Node to the Start Node to find the shortest path for
 * Depth-First Search algorithm.
 * @param {any} endNode
 */
function FindDfsShortestPath() {
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

    AnimateDfsPath(pathNodes);
}

/**
 * Animates the path found by Depth-First Search Algorithm.
 * @param {any} pathNodes
 */
function AnimateDfsPath(pathNodes) {
    SetSelectedToolClass("path-node");

    let iterations = 0;
    const shortestPathInterval = setInterval(function () {
        const cellId = `cell${pathNodes[iterations].value}`;

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
 * Maps the grid cells to the node object used by Depth-First Search algorithm.
 * @param {number} rows
 * @param {number} columns
 */
export function MapDfsNodes(rows, columns) {
    nodeMap.clear();
    for (let i = 0; i < (rows * columns); i++) {
        nodeMap.set(`cell${i}`, new DfsNode(i));
    }
}