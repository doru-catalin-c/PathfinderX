import {
        HideModal, ShowModal, ClearCellElements, RunSelectedAlgorithm, ExpandCollapseListElement,
        SetAlgorithmSpeed, SelectSpeed
    }
    from "../Pathfinder.js";
import { DeclareListElementBasicMouseEvents } from "./Right Menu Controller.js";

/**
 * Declares the events for the Run Button in Dashboard.
 */
export function DeclareRunButtonEvents() {
    const run = document.getElementById("run");

    run.onclick = function () {
        RunSelectedAlgorithm();
    }
    run.ondragstart = function () {
        return false;
    }
}

/**
 * Declares the events for the Clear Board Button in Dashboard.
 */
export function DeclareClearBoardButtonEvents() {
    const clearBoard = document.getElementById("clearBoard");

    clearBoard.onclick = function () {
        ClearCellElements();
    }
    clearBoard.ondragstart = function () {
        return false;
    }
}

/**
 * Declares the events for the Speed Control Button in Dashboard.
 */
export function DeclareSpeedButtonEvents() {
    const speed = document.getElementById("speed");

    speed.ondragstart = function () {
        return false;
    }

    speed.onclick = function () {
        ShowModal("setSpeedModal");
    }
}

/**
 * Declares the events for the button that closes the Set Speed Modal.
 */
export function DeclareCloseSpeedModalButtonEvents() {
    const closeSpeedModal = document.getElementById("closeSpeedModal");

    closeSpeedModal.onclick = function() {
        HideModal("setSpeedModal");
    }
}

/**
 * Delares the events for the Set Slow Speed List Element.
 */
export function DeclareSlowSpeedListElementEvents() {
    const slowSpeedListElement = document.getElementById("slowSpeedListElement");

    slowSpeedListElement.style.cursor = "pointer";
    slowSpeedListElement.style.paddingLeft = "1rem";

    DeclareListElementBasicMouseEvents(slowSpeedListElement, "slowSpeedListElement");

    slowSpeedListElement.onclick = function() {
        SetAlgorithmSpeed(1);
    }
}

/**
 * Declares the events for the Set Normal Speed List Element.
 */
export function DeclareNormalSpeedListElementEvents() {
    const normalSpeedListElement = document.getElementById("normalSpeedListElement");

    normalSpeedListElement.style.cursor = "pointer";
    normalSpeedListElement.style.paddingLeft = "1rem";

    DeclareListElementBasicMouseEvents(normalSpeedListElement, "normalSpeedListElement");

    normalSpeedListElement.onclick = function () {
        SetAlgorithmSpeed(2);
    }
}

/**
 * Declares the events for the Set Fast Speed List Element.
 */
export function DeclareFastSpeedListElementEvents() {
    const fastSpeedListElement = document.getElementById("fastSpeedListElement");

    fastSpeedListElement.style.cursor = "pointer";
    fastSpeedListElement.style.paddingLeft = "1rem";

    DeclareListElementBasicMouseEvents(fastSpeedListElement, "fastSpeedListElement");

    fastSpeedListElement.onclick = function () {
        SetAlgorithmSpeed(3);
    }
}

/**
 * Declares the events for the Set Very Fast Speed List Element.
 */
export function DeclareVeryFastSpeedListElementEvents() {
    const veryFastSpeedListElement = document.getElementById("veryFastSpeedListElement");

    veryFastSpeedListElement.style.cursor = "pointer";
    veryFastSpeedListElement.style.paddingLeft = "1rem";

    DeclareListElementBasicMouseEvents(veryFastSpeedListElement, "veryFastSpeedListElement");

    veryFastSpeedListElement.onclick = function () {
        SetAlgorithmSpeed(4);
    }
}

/**
 * Declares the events for the Set Speed Button.
 */
export function DeclareSetSpeedButtonEvents() {
    const setSpeedButton = document.getElementById("SetSpeedButton");

    setSpeedButton.onclick = function() {
        SelectSpeed();
        HideModal("setSpeedModal");
    }
}

/**
 * Declares the events for the Legend Button in Dashboard.
 */
export function DeclareLegendButtonEvents() {
    const legend = document.getElementById("legend");

    legend.onclick = function () {
        ShowModal("legendModal");
    }
    legend.ondragstart = function () {
        return false;
    }
}

/**
 * Declares the events for the Hide Legend Modal Button.
 */
export function DeclareHideLegendModalButtonEvents() {
    const hideLegendModal = document.getElementById("hideLegendModal");

    hideLegendModal.onclick = function () {
        HideModal("legendModal");
    }
}

/**
 * Declares the events for the Wall Information Button.
 */
export function DeclareWallInfoButtonEvents() {
    const wallInformation = document.getElementById("wallInformation");

    wallInformation.onclick = function () {
        ExpandCollapseListElement("wallInformationDropdown");
    }
}

/**
 * Declares the events for the Start Node Information Button.
 */
export function DeclareVisitedNodeInfoButtonEvents() {
    const visitedNodeInformation = document.getElementById("visitedNodeInformation");

    visitedNodeInformation.onclick = function () {
        ExpandCollapseListElement("visitedNodeInformationDropdown");
    }
}

/**
 * Declares the events for the Path Node Information Button.
 */
export function DeclarePathNodeInfoButtonEvents() {
    const pathNodeInformation = document.getElementById("pathNodeInformation");

    pathNodeInformation.onclick = function () {
        ExpandCollapseListElement("pathNodeInformationDropdown");
    }
}

/**
 * Declares the events for the Weight Information Button.
 */
export function DeclareWeightInfoButtonEvents() {
    const weightInformation = document.getElementById("weightInformation");

    weightInformation.onclick = function () {
        ExpandCollapseListElement("weightInformationDropdown");
    }
}

/**
 * Declares the events for the Start Node Information Button.
 */
export function DeclareStartNodeInfoButtonEvents() {
    const startNodeInformation = document.getElementById("startNodeInformation");

    startNodeInformation.onclick = function () {
        ExpandCollapseListElement("startNodeInformationDropdown");
    }
}

/**
 * Declares the events for the End Node Information Button.
 */
export function DeclareEndNodeInfoButtonEvents() {
    const endNodeInformation = document.getElementById("endNodeInformation");

    endNodeInformation.onclick = function () {
        ExpandCollapseListElement("endNodeInformationDropdown");
    }
}
