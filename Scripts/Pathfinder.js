import { DijkstraAlgorithm, MapDijkstraNodes } from "./Pathfinding Algorithms/Dijkstra's Algorithm.js";
import { SampleAlgorithm, MapSampleAlgorithmNodes } from "./Pathfinding Algorithms/Sample Algorithm.js";
import { BfsAlgorithm, MapBfsNodes } from "./Pathfinding Algorithms/BFS Algorithm.js";
import { RecursiveDfsAlgorithm, DfsAlgorithm, MapDfsNodes, AnimateDfsVisitedNodes, recursivelyVisitedNodes }
    from "./Pathfinding Algorithms/DFS Algorithm.js";

// ----------- Global Variables Declaration ----------- /
var selectedToolClass; 
export var nodeMap = new Map();
var startNode;
export var endNode;
var algorithmToRun;
var selectedAlgorithm;
export var selectedAlgorithmSpeed = 2;
export var algorithmAnimationSpeed = 40;
var cellSize = 2; // Value in rem.
export var togglerTriggered = false;

var gridLeftBoundaryCells = [];
var gridTopBoundaryCells = [];
export var gridRightBoundaryCells = [];
var gridBottomBoundaryCells = [];
// -----------        END Declaration       ----------- /

/**
 * Generates the grid and defines it's boundaries.
 */
export function GenerateGrid() {
    const grid = document.getElementById("grid");

    cellSize = getComputedStyle(grid).getPropertyValue("--cell-size");
    grid.style.gridTemplateRows = `repeat(var(--grid-rows), ${cellSize}rem)`;
    grid.style.gridTemplateColumns = `repeat(var(--grid-columns), ${cellSize}rem)`;

    const rows = GetCellCountPerRow();
    const columns = GetCellCountPerColumn();

    DefineGridBoundaries(rows, columns);
    GenerateGridCells(grid, rows, columns);

    AddGridBoundaryCellBorders();
}

/**
  * Generates the grid cells based on the numbers of rows and columns given.
  * @param {number} rows
  * @param {number} columns
  */    
function GenerateGridCells(grid, rows, columns) {
    grid.style.setProperty("--grid-rows", rows);
    grid.style.setProperty("--grid-columns", columns);

    for (let i = 0; i < (rows * columns); i++) {
        const cellDiv = document.createElement("div");
        cellDiv.setAttribute("class", "cell");
        const cellId = `cell${i}`;
        cellDiv.setAttribute("id", cellId);
        cellDiv.ondragstart = function() { return false; };
        cellDiv.onmousedown = function () { AddOrRemoveCellObject(window.event, cellId); };
        cellDiv.onmouseenter = function () { AddOrRemoveCellObject(window.event, cellId); };
        grid.appendChild(cellDiv);
    }
}

/**
 * Defines the grid boundaries to accurately get neighbors.
 * @param {number} rows
 * @param {number} columns
 */
function DefineGridBoundaries(rows, columns) {
    gridLeftBoundaryCells = [];
    gridTopBoundaryCells = [];
    gridRightBoundaryCells = [];
    gridBottomBoundaryCells = [];

    DefineGridLeftBoundary(rows, columns);
    DefineGridTopBoundary(columns);
    DefineGridRightBoundary(rows, columns);
    DefineGridBottomBoundary(rows, columns);
}

/**
 * Defines the left boundary of the grid.
 * @param {number} rows
 * @param {number} columns
 */
function DefineGridLeftBoundary(rows, columns) {
    for (let i = 0; i < rows; i++) {
        const leftBoundaryCell = i * columns;
        gridLeftBoundaryCells.push(leftBoundaryCell);
    }
}

/**
 * Defines the top boundary of the grid.
 * @param {number} columns
 */
function DefineGridTopBoundary(columns) {
    for (let i = 0; i <= columns - 1; i++) {
        gridTopBoundaryCells.push(i);
    }
}

/**
 * Defines the right boundary of the grid.
 * @param {number} rows
 * @param {number} columns
 */
function DefineGridRightBoundary(rows, columns) {
    for (let i = 0; i <= gridLeftBoundaryCells.length; i++) {
        const rightEdgeCell = gridLeftBoundaryCells[i] - 1;
        if (rightEdgeCell > 0) {
            gridRightBoundaryCells.push(rightEdgeCell);
        }
    }

    gridRightBoundaryCells.push((rows * columns) - 1);
}

/**
 * Defines the bottom boundary of the grid.
 * @param {number} rows
 * @param {number} columns
 */
function DefineGridBottomBoundary(rows, columns) {
    const lastCell = rows * columns;

    for (let i = lastCell - columns; i <= lastCell - 1; i++) {
        gridBottomBoundaryCells.push(i);
    }
}

/**
 * Returns the cell's left neighbor.
 * @param {string} cellId The ID of the cell to get the neighbor.
 */
export function GetCellLeftNeighbor(cellId) {
    const leftBoundaryCell = gridLeftBoundaryCells.find(id => id === parseInt(cellId));

    if (leftBoundaryCell != undefined) {
        return -1;
    }

    return cellId - 1;
}

/**
 * Returns the cell's top neighbor.
 * @param {string} cellId The ID of the cell to get the neighbor.
 */
export function GetCellTopNeighbor(cellId) {
    const topBoundaryCell = gridTopBoundaryCells.find(id => id === parseInt(cellId));

    if (topBoundaryCell != undefined) {
        return -1;
    }

    return cellId - GetCellCountPerColumn();
}

/**
 * Returns the cell's right neighbor.
 * @param {string} cellId The ID of the cell to get the neighbor.
 */
export function GetCellRightNeighbor(cellId) {
    const rightBoundaryCell = gridRightBoundaryCells.find(id => id === parseInt(cellId));

    if (rightBoundaryCell != undefined) {
        return -1;
    }

    return cellId + 1;
}

/**
 * Returns the cell's bottom neighbor.
 * @param {string} cellId The ID of the cell to get the neighbor.
 */
export function GetCellBottomNeighbor(cellId) {
    const bottomBoundaryCell = gridBottomBoundaryCells.find(id => id === parseInt(cellId));

    if (bottomBoundaryCell != undefined) {
        return -1;
    }

    return cellId + GetCellCountPerColumn();
}

/**
 * Clears all the cells on the grid.
 */
function ClearGridCells() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
}

/**
 * Clears all elements from within the cells.
 */
export function ClearCellElements() {
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.innerHTML = "";
        cell.style.backgroundColor = "#f2f2f2";
        cell.style.animation = "none";
        ResetNodeProperties(cell.id);
    }
}

/**
 * Gets the grid container width and calculates the amount of cells per column.
 */
export function GetCellCountPerColumn() {
    const gridWidth = document.getElementById("grid").offsetWidth;
    const cellWidth = ConvertRem(cellSize);

    return Math.round(gridWidth / cellWidth);
}

/**
 * Gets the grid container height and calculates the amount of cells per row.
 */
export function GetCellCountPerRow() {
    const gridHeight = document.getElementById("grid").offsetHeight;
    const cellHeight = ConvertRem(cellSize);

    return Math.round(gridHeight / cellHeight);
}

/**
 * Detects when the page resizes and adjusts the grid.
 */
export let resizeObserver = new ResizeObserver(function (entries) {
    ClearGridCells();
    startNode = undefined;
    endNode = undefined;

    GenerateGrid();
    RemapAlgorithmNodes();
});

/**
 * Gets the Root Element Font Size to convert to pixels.
 */
function GetRootElementFontSize() {
    return parseFloat(
        getComputedStyle(
            document.documentElement
        ).fontSize
    );
}

/**
 * Converts the given value into pixels then returns the pixel amount.
 * @param {number} value
 */
function ConvertRem(value) {
    return value * GetRootElementFontSize();
}

/**
 * Remaps the nodes of the current algorithm set to run when the grid size changes.
 */
function RemapAlgorithmNodes() {
    const cellsPerRow = GetCellCountPerRow();
    const cellsPerColumn = GetCellCountPerColumn();

    switch (algorithmToRun) {
        case "dijkstra":
            MapDijkstraNodes(cellsPerRow, cellsPerColumn);
            break;
        case "bfs":
            MapBfsNodes(cellsPerRow, cellsPerColumn);
            break;
        case "recursiveDfs":
            MapDfsNodes(cellsPerRow, cellsPerColumn);
            break;
        case "dfs":
            MapDfsNodes(cellsPerRow, cellsPerColumn);
            break;
        case "sample":
            MapSampleAlgorithmNodes(cellsPerRow, cellsPerColumn);
            break;
    }
}

/**
 * Sets the CSS class of the selected tool.
 * @param {any} className
 */
export function SetSelectedToolClass(className) {
    selectedToolClass = className;
}

/**
  * Selects the object which will be placed on the grid.
  * @param {string} toolObject The CSS class name of the object that will be placed on the grid.
  */ 
export function SelectCellObject(toolObject) {
    selectedToolClass = toolObject;
}

/**
 * Sets the node type when the object is placed on the grid.
 * @param {string} toolClass
 * @param {string} cellId
 */
function SetNodeType(toolNode, toolClass, cellId, cellNode) {
    // Break the spagetti code down - MUST REFACTOR!!!
    const node = nodeMap.get(cellId);

    if (node === undefined) {
        ShowErrorMessage("You must select an algorithm before placing anything on the grid.");
        return;
    }

    const startEndNodeStyleLeft = getComputedStyle(document.body).getPropertyValue("--start-end-node-left");
    const startEndNodeStyleTop = getComputedStyle(document.body).getPropertyValue("--start-end-node-top");

    switch (toolClass) {
        case "wall":
        {
            const wallStyleLeft = getComputedStyle(document.body).getPropertyValue("--grid-wall-left");
            const wallStyleTop = getComputedStyle(document.body).getPropertyValue("--grid-wall-top");
            node.isWall = true;
            toolNode.style.position = "relative";
            toolNode.style.left = wallStyleLeft;
            toolNode.style.top = wallStyleTop;
            toolNode.style.borderRadius = "0";
            toolNode.style.width = `105%`;
            toolNode.style.height = `105%`;
            toolNode.style.animation = "scale-wall 0.2s ease-in";

            cellNode.appendChild(toolNode);
            break;
        }
        case "weight":
        {
            const weightLeft = getComputedStyle(document.body).getPropertyValue("--grid-weight-left");
            toolNode.style.position = "relative";
            node.isWeight = true;
            toolNode.style.width = "71%";
            toolNode.style.height = "85%";
            toolNode.style.left = weightLeft;
            toolNode.style.top = "50%";
            toolNode.style.transform = "translate(-50%, -50%)";
            toolNode.style.animation = "scale 0.2s ease-in forwards";

            cellNode.appendChild(toolNode);
            break;
        }
        case "start-node":
            if (startNode === undefined) {
                toolNode.style.position = "relative";
                node.isStartNode = true;

                if (algorithmToRun === "dijkstra") {
                    node.priority = 0;
                }
                startNode = node;
                toolNode.style.width = "90%";
                toolNode.style.height = "90%";
                toolNode.style.left = startEndNodeStyleLeft;
                toolNode.style.top = startEndNodeStyleTop;
                toolNode.style.transform = "translate(-50%, -50%)";
                toolNode.style.animation = "scale 0.2s ease-in forwards";
                cellNode.appendChild(toolNode);
            }
            break;
        case "end-node":
            if (endNode === undefined) {
                toolNode.style.position = "relative";
                endNode = node;
                node.isEndNode = true;
                toolNode.style.width = "90%";
                toolNode.style.height = "90%";
                toolNode.style.left = startEndNodeStyleLeft;
                toolNode.style.top = startEndNodeStyleTop;
                toolNode.style.transform = "translate(-50%, -50%)";
                toolNode.style.animation = "scale 0.2s ease-in forwards";

                cellNode.appendChild(toolNode);
            }
            break;
        case "visited-node":
            cellNode.style.backgroundColor = "#1689FC";
            cellNode.style.animation = "visit-node 1s linear";
            cellNode.style.animationFillMode = "forwards";

            cellNode.appendChild(toolNode);
            break;
        case "path-node":
            cellNode.style.backgroundColor = "#E67A14";
            cellNode.style.animation = "check-node 1s linear";
            cellNode.style.animationFillMode = "forwards";
            break;
    }
}

/**
 * Called by AddOrRemoveCellObject() function. Places whatever object the user selected within the cell.
 * @param {string} cellId The ID of the cell where the object will be placed.
 */
export function PlaceCellObject(cellId) {
    if (selectedToolClass === undefined || selectedToolClass === "") {
        ShowErrorMessage("You must chose an object to place on the grid.");
        return;
    }

    const cellNode = document.getElementById(`${cellId}`);
    const cellObjectId = `${selectedToolClass}-${cellId}`;
    const cellObjects = cellNode.querySelectorAll("div");
        
    if (cellObjects.length === 0) {
        const toolNode = document.createElement("div");
        toolNode.setAttribute("id", cellObjectId);
        toolNode.setAttribute("class", `${selectedToolClass}-icon`);

        SetNodeType(toolNode, selectedToolClass, cellId, cellNode);
    }
}

/**
 * Called by AddOrRemoveCellObject() function. Removes the object from the cell.
 * @param {string} cellId The ID of the cell from where the object will be removed.
 */
function ClearCellObject(cellId) {
    document.getElementById(`${cellId}`).innerHTML = "";
}

var cleared = false;
/**
 * Adds or removes an object from the cell when a mouse event occurs.
 * @param {any} event The event that calls the function.
 * @param {string} cellId The ID of the cell where the object will be added or removed.
 */
export function AddOrRemoveCellObject(event, cellId) {
    switch (event.which) {
        case 1:
            if (!cleared) {
                PlaceCellObject(cellId);
            }
            cleared = false;
            break;
        case 3:
            ClearCellObject(cellId);
            ResetNodeProperties(cellId);
            cleared = true;
            break;
    }
}

/**
 * Resets the Node properties from nodeMap after the object was cleared from the cell.
 * @param {string} cellId
 */
function ResetNodeProperties(cellId) {
    const node = nodeMap.get(cellId);
    if (node === undefined) {
        return;
    }
    if (node.isEndNode) {
        node.isEndNode = false;
        endNode = undefined;
    }
    if (node.isStartNode) {
        node.isStartNode = false;
        startNode = undefined;
    }
    node.isWall = false;
    node.isWeight = false;
    node.isVisited = false;
}

/**
 * Collapses the specified menu to the left side.
 * @param {any} menuId
 */
function CollapseLeftMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.style.animation = "collapse-left 0.2s linear";
    const leftMenuDistanceLeft = getComputedStyle(document.body).getPropertyValue("--left-menu-distance-left");
    menu.style.left = leftMenuDistanceLeft;
}

/**
 * Expands the specified menu from the left side.
 * @param {any} menuId
 */
function ExpandLeftMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.style.animation = "expand-left 0.2s linear";
    menu.style.left = "0";
}

/**
 * Shows the Toolbox and hides the Dashboard.
 */
export function ShowToolbox() {
    CollapseLeftMenu("dashboard");
    ExpandLeftMenu("toolbox");
    
}

/**
 * Shows the Dashboard and hides the Toolbox.
 */
export function ShowDashboard() {
    const leftMenuDistanceLeft = getComputedStyle(document.body).getPropertyValue("--left-menu-distance-left");
    // For some reason a white space is added before the value stored in leftMenuDistanceLeft. 
    // To compensate for that, the " " + ... was added.
    if (" " + document.getElementById("dashboard").style.left === leftMenuDistanceLeft) {
        ExpandLeftMenu("dashboard");
        CollapseLeftMenu("toolbox");
    }
}

/**
 * Shows the modal on the screen.
 */
export function ShowModal(modal) {
    document.getElementById(modal).style.display = "block";
}

/**
 * Hides the modal;
 */
export function HideModal(modal) {
    document.getElementById(modal).style.display = "none";
}

/**
 * Draws the List Element Side Borders when the user clicks or hovers over the element.
 * @param {string} color
 * @param {number} id
 */
export function DrawListElementBorders(color, id) {
    const listElement = document.getElementById(id);
    listElement.style.borderLeft = `0.7rem solid ${color}`;
    listElement.style.borderRight = `0.7rem solid ${color}`;
}

/**
 * Clears the borders when the mouse leaves the element.
 * @param {number} id
 */
export function ClearListElementBorders(id) {
    const listElement = document.getElementById(id);
    listElement.style.border = "0";
}

/**
 * Expands or collapses the element depending on if it's visible or not.
 * @param {string} id
 */
export function ExpandCollapseListElement(id) {
    const dropdownContentDisplay = document.getElementById(id).style.display;
    if (dropdownContentDisplay === "none" || dropdownContentDisplay === "") {
        ExpandListElement(id);
        ShowDropdownContent(id);
    } else {
        CollapseListElement(id);
        HideDropdownContent(id);
    }
}

/**
 * Expands the height of the element when the user clicks the information button.
 * @param {number} id
 */
function ExpandListElement(id) {
    document.getElementById(id).style.height = "auto";
}

/**
 * Collapses the element to it's original size when the user clicks again the information button. 
 * @param {number} id
 */
function CollapseListElement(id) {
    document.getElementById(id).style.height = "auto";
}

/**
 * Displays the dropdown content when the list element is expanded.
 * @param {number} id
 */
function ShowDropdownContent(id) {
    document.getElementById(id).style.display = "block";
}

/**
 * Hides the dropdown content when the list element is collapsed.
 * @param {number} id
 */
function HideDropdownContent(id) {
    document.getElementById(id).style.display = "none";
}

/**
 * Chooses the algorithm to be run from the list.
 * @param {string} algorithm
 */
export function ChooseAlgorithm(algorithm) {
    const cellsPerRow = GetCellCountPerRow();
    const cellsPerColumn = GetCellCountPerColumn();

    selectedAlgorithm = algorithm;

    const selectAlgorithmButton = document.getElementById("selectAlgorithm");

    selectAlgorithmButton.onclick = function () {
        SelectAlgorithm();
    }

    switch (algorithm) {
        case "dijkstra":
        {
            SetSelectButtonValueAndStyle(selectAlgorithmButton, "Select Dijkstra's Algorithm");
            document.getElementById("weight").style.display = "block";
            MapDijkstraNodes(cellsPerRow, cellsPerColumn);
            break;
        }
        case "bfs":
        {
            SetSelectButtonValueAndStyle(selectAlgorithmButton, "Select BFS Algorithm");
            document.getElementById("weight").style.display = "none";
            MapBfsNodes(cellsPerRow, cellsPerColumn);
            break;
        }
        case "recursiveDfs":
        {
            SetSelectButtonValueAndStyle(selectAlgorithmButton, "Select Recursive DFS Algorithm");
            document.getElementById("weight").style.display = "none";
            MapDfsNodes(cellsPerRow, cellsPerColumn);
            break;
        }
        case "dfs":
        {
            SetSelectButtonValueAndStyle(selectAlgorithmButton, "Select Iterative DFS Algorithm");
            document.getElementById("weight").style.display = "none";
            MapDfsNodes(cellsPerRow, cellsPerColumn);
            break;
        }
        case "sample":
        {
            SetSelectButtonValueAndStyle(selectAlgorithmButton, "Select Sample Algorithm");
            document.getElementById("weight").style.display = "none";
            MapSampleAlgorithmNodes(cellsPerRow, cellsPerColumn);
            break;
        }
    }
}

/**
 * Sets the value and the style for the Select Button in modals.
 * @param {any} selectButton
 * @param {string} value
 */
function SetSelectButtonValueAndStyle(selectButton, value) {
    selectButton.value = value;
    UpdateSelectButtonStyle(selectButton);
}

/**
 * Selects the algorithm to be run after it has been chosen.
 */
function SelectAlgorithm() {
    algorithmToRun = selectedAlgorithm;
    HideModal("algorithmsModal");
    ResetSelectButtonStyle();
    selectedAlgorithm = "";
    ClearCellElements();
}

/**
 * Runs the algorithm selected by the user.
 */
export function RunSelectedAlgorithm() {
    if (algorithmToRun === undefined) {
        ShowErrorMessage("You must select an algorithm first.");
        return;
    }
    switch (algorithmToRun) {
        case "dijkstra":
            DijkstraAlgorithm(startNode);
            break;
        case "bfs":
            BfsAlgorithm(startNode);
            break;
        case "recursiveDfs":
            RecursiveDfsAlgorithm(startNode);
            AnimateDfsVisitedNodes(recursivelyVisitedNodes);
            break;
        case "dfs":
            AnimateDfsVisitedNodes(DfsAlgorithm(startNode));
            break;
        case "sample":
            SampleAlgorithm(endNode);
            break;
    }
}

/**
 * Clears the selectedAlgorithm property.
 */
export function ClearSelectedAlgorithm() {
    selectedAlgorithm = "";
}

/**
 * Updates the Select Button Style if an algorithm has been chosen.
 * @param {any} selectAlgorithmButton
 */
function UpdateSelectButtonStyle(selectAlgorithmButton) {
    selectAlgorithmButton.style.cursor = "pointer";

    selectAlgorithmButton.onmouseover = function () {
        selectAlgorithmButton.style.backgroundColor = "#E67A14";
    }
    selectAlgorithmButton.onmouseleave = function () {
        selectAlgorithmButton.style.backgroundColor = "#005AEB";
    }
    selectAlgorithmButton.onmousedown = function () {
        selectAlgorithmButton.style.backgroundColor = "#010638";
    }
    selectAlgorithmButton.onmouseup = function () {
        selectAlgorithmButton.style.backgroundColor = "#E67A14";
    }
}

/**
 * Resets the Select Button Style after the algorithm has been selected.
 */
export function ResetSelectButtonStyle() {
    const selectAlgorithmButton = document.getElementById("selectAlgorithm");
    selectAlgorithmButton.value = "Select an Algorithm";
    selectAlgorithmButton.style.cursor = "not-allowed";
    selectAlgorithmButton.onmouseover = function () { return false; }
    selectAlgorithmButton.onmouseleave = function () { return false; }
    selectAlgorithmButton.onmousedown = function () { return false; }
    selectAlgorithmButton.onmouseup = function () { return false; }
    selectAlgorithmButton.onclick = function () { return false; }

    selectAlgorithmButton.style.backgroundColor = "#005AEB";
}

/**
 * Executed when user choses a speed from the list.
 * @param {number} speed
 */
export function SetAlgorithmSpeed(speed) {
    selectedAlgorithmSpeed = speed;

    const setSpeedButton = document.getElementById("SetSpeedButton");
    switch (speed) {
        case 1:
            SetSelectButtonValueAndStyle(setSpeedButton, "Set Speed to Slow");
            break;
        case 2:
            SetSelectButtonValueAndStyle(setSpeedButton, "Set Speed to Normal");
            break;
        case 3: 
            SetSelectButtonValueAndStyle(setSpeedButton, "Set Speed to Fast");
            break;
        case 4:
            SetSelectButtonValueAndStyle(setSpeedButton, "Set Speed to Very Fast");
            break;
    }
}

/**
 * Selects the speed chosen by the user.
 */
export function SelectSpeed() {
    switch (selectedAlgorithmSpeed) {
        case 1:
            algorithmAnimationSpeed = 60;
            break;
        case 2:
            algorithmAnimationSpeed = 40;
            break;
        case 3:
            algorithmAnimationSpeed = 20;
            break;
        case 4:
            algorithmAnimationSpeed = 5;
            break;
    }
}

/**
 * Shows the specified error message to the user.
 * @param {any} message
 */
export function ShowErrorMessage(message) {
    const errorMessageContainer = document.getElementById("errorContainer");
    const errorMessageParagraph = document.getElementById("errorMessageParagraph");

    errorMessageContainer.style.display = "block";

    errorMessageParagraph.innerText = message;

    setTimeout(function() { errorMessageContainer.style.display = "none"; }, 2500);
}

/**
 * Triggers the toggler which changes between Toolbox and Dashboard in the Left Menu.
 */
export function ShowLeftMenuToggler() {
    document.getElementById("leftMenuToggler").style.display = "block";
    togglerTriggered = true;
}

/**
 * Hides the toggler which changes between Toolbox and Dashboard in the Left Menu.
 */
export function HideLeftMenuToggler() {
    document.getElementById("leftMenuToggler").style.display = "none";
    togglerTriggered = false;
}

/**
 * Because two of the cell borders ovelap the Right and Bottom boundary cells end up appearing
 * larger. To account for that, this function reduces the boundary cell size after the grid is generated.
 */
export function AddGridBoundaryCellBorders() {
    AddRightBoundaryCellBorder();
    AddBottomBoundaryCellBorder();
}

/*
 * Adds the right side border to the right boundary cells to complete the grid.
 */
function AddRightBoundaryCellBorder() {
    for (let i = 0; i < gridRightBoundaryCells.length; i++) {
        const cellId = gridRightBoundaryCells[i];
        const cellElement = document.getElementById(`cell${cellId}`);
        cellElement.style.borderRight = "var(--cell-border-width) solid #010638";
    }
}

/*
 * Adds the bottom side border to the bottom boundary cells to complete the grid.
 */
function AddBottomBoundaryCellBorder() {
    for (let i = 0; i < gridBottomBoundaryCells.length; i++) {
        const cellId = gridBottomBoundaryCells[i];
        const cellElement = document.getElementById(`cell${cellId}`);

        cellElement.style.borderBottom = "var(--cell-border-width) solid #010638";
    }
}