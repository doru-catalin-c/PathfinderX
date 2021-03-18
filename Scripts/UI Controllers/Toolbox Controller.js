import { SelectCellObject } from "../Pathfinder.js";

/**
 * Declares the events for the Wall Tool Button in Toolbox.
 */
export function DeclareWallToolButtonEvents() {
    const wall = document.getElementById("wall");

    wall.onclick = function () {
        SelectCellObject("wall");
    }
    wall.ondragstart = function () {
        return false;
    }
}

/**
 * Declares the events for the Weight Tool Button in Toolbox.
 */
export function DeclareWeightToolButtonEvents() {
    const weight = document.getElementById("weight");

    weight.onclick = function () {
        SelectCellObject("weight");
    }
    weight.ondragstart = function () {
        return false;
    }
}

/**
 * Declares the events for the Start Node Tool Button in Toolbox.
 */
export function DeclareStartNodeToolButtonEvents() {
    const startNodeTool = document.getElementById("startNode");

    startNodeTool.onclick = function () {
        SelectCellObject("start-node");
    }
    startNodeTool.ondragstart = function () {
        return false;
    }
}

/**
 * Declares the events for the End Node Tool Button in Toolbox.
 */
export function DeclareEndNodeToolButtonEvents() {
    const endNodeTool = document.getElementById("endNode");

    endNodeTool.onclick = function () {
        SelectCellObject("end-node");
    }
    endNodeTool.ondragstart = function () {
        return false;
    }
}
