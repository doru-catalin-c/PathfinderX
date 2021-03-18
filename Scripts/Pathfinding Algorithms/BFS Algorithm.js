import { BfsNode } from "../Objects and Data Structures/Objects/BFS Algorithm Node.js";
import { SetSelectedToolClass, nodeMap, PlaceCellObject, algorithmAnimationSpeed, ShowErrorMessage } from "../Pathfinder.js";

/**
 * Implements Breadth-First Search algorithm.
 * @param {any} startNode
 */
export function BfsAlgorithm(startNode) {
    if (startNode === undefined) {
        ShowErrorMessage("Breadth-First Search cannot run without a Start Node on the grid. Also, without an End Node no path will be rendered.");
        return;
    }

    const queue = [];
    const visitedNodes = new Set();
    let endNode;

    startNode.isVisited = true;
    visitedNodes.add(startNode);
    queue.push(startNode);

    while (queue.length !== 0) {
        const currentNode = queue.shift();
        if (currentNode.isEndNode) {
            endNode = currentNode;
            break;
        }

        for (let i = 0; i < currentNode.Neighbors.length; i++) {
            const currentNeighbor = nodeMap.get(`cell${currentNode.Neighbors[i]}`);
            if (currentNeighbor === undefined) continue;
            if (currentNeighbor.isWall) continue;

            if (!currentNeighbor.isVisited) {
                currentNeighbor.isVisited = true;
                visitedNodes.add(currentNeighbor);
                currentNeighbor.previousNode = currentNode;
                queue.push(currentNeighbor);
            }
        }
    }

    AnimateBfsVisitedNodes(visitedNodes, endNode);
}

/**
 * Animates the nodes visited by Breadth-First Search algorithm.
 * @param {any} visitedNodes
 * @param {any} endNode
 */
function AnimateBfsVisitedNodes(visitedNodes, endNode) {
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
            FindBfsShortestPath(endNode);
        }
    }, algorithmAnimationSpeed);
}

/**
 * Backtracks from the End Node to the Start Node to find the shortest path for
 * Breadth-First Search algorithm.
 * @param {any} endNode
 */
function FindBfsShortestPath(endNode) {
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

    AnimateBfsShortestPath(pathNodes);
}

/**
 * Animates the shortest path found by Breadth-First Search Algorithm.
 * @param {any} pathNodes
 */
function AnimateBfsShortestPath(pathNodes) {
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
 * Maps the grid cells to the node object used by Breadth-First Search algorithm.
 * @param {number} rows
 * @param {number} columns
 */
export function MapBfsNodes(rows, columns) {
    nodeMap.clear();
    for (let i = 0; i < (rows * columns); i++) {
        nodeMap.set(`cell${i}`, new BfsNode(i));
    }
}