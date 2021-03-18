import * as pathfinder from "../Pathfinder.js";

/**
 * Declares the events for the Home Button in the Right Menu.
 */
export function DeclareHomeButtonEvents() {
    const home = document.getElementById("home");

    home.ondragstart = function () {
        return false;
    }
}

/**
 * Declares the events for the Algorithms Button in the Right Menu.
 */
export function DeclareAlgorithmsButtonEvents() {
    const algorithms = document.getElementById("algorithms");

    algorithms.onclick = function () {
        pathfinder.ShowModal("algorithmsModal");
    }
    algorithms.ondragstart = function () {
        return false;
    }
}

/**
 * Declares the events for the Patterns Button in the Right Menu.
 */
export function DeclarePatternsButtonEvents() {
    const patterns = document.getElementById("patterns");

    patterns.ondragstart = function () {
        return false;
    }

    patterns.onclick = function() {
        pathfinder.ShowErrorMessage("The feature is not implemented yet. Coming soon though! :)");
    }
}

/**
 * Declares the events for the Credits Button in the Right Menu.
 */
export function DeclareCreditsButtonEvents() {
    const credits = document.getElementById("credits");

    credits.ondragstart = function () {
        return false;
    }

    credits.onclick = function () {
        pathfinder.ShowErrorMessage("The feature is not implemented yet. Coming soon though! :)");
    }
}

/**
 * Declares the four basic mouse events: Mouse Over, Mouse Out, Mouse Down, Mouse Up for the
 * specified list element.
 * @param {any} listElement
 * @param {string} id
 */
export function DeclareListElementBasicMouseEvents(listElement, id) {
    listElement.onmouseover = function () {
        pathfinder.DrawListElementBorders("#005AEB", id);
    }
    listElement.onmouseout = function () {
        pathfinder.ClearListElementBorders(id);
    }
    listElement.onmousedown = function () {
        pathfinder.DrawListElementBorders("#E67A14", id);
    }
    listElement.onmouseup = function () {
        pathfinder.DrawListElementBorders("#005AEB", id);
    }
}

/**
 * Declares the events for the Hide Algorithms Modal Button.
 */
export function DeclareHideAlgorithmsModalButtonEvents() {
    const hideAlgorithmsModal = document.getElementById("hideAlgorithmsModal");

    hideAlgorithmsModal.onclick = function () {
        pathfinder.HideModal("algorithmsModal");
        pathfinder.ResetSelectButtonStyle();
        pathfinder.ClearSelectedAlgorithm();
    }
}

/**
 * Declares the events for Dijkstra's Algorithm List Element from Algorithms List.
 */
export function DeclareDijkstraListElementEvents() {
    const dijkstraListElement = document.getElementById("dijkstraListElement");

    DeclareListElementBasicMouseEvents(dijkstraListElement, "dijkstraElement");

    dijkstraListElement.onclick = function () {
        pathfinder.ChooseAlgorithm("dijkstra");
    }

}

/**
 * Declares the events for Dijkstra's Algorithm Information Button.
 */
export function DeclareDijkstraInfoButtonEvents() {
    const dijkstraInformation = document.getElementById("dijkstraInformation");

    dijkstraInformation.onclick = function () {
        pathfinder.ExpandCollapseListElement("dijkstraInformationDropdown");
    }
}

/**
 * Declares the events for Breadth-First Search Algorithm List Element.
 */
export function DeclareBfsListElementEvents() {
    const bfsListElement = document.getElementById("bfsListElement");

    DeclareListElementBasicMouseEvents(bfsListElement, "bfsElement");

    bfsListElement.onclick = function () {
        pathfinder.ChooseAlgorithm("bfs");
    }
}

/**
 * Declares the events for Breadth-First Search Algorithm Information Button.
 */
export function DeclareBfsInfoButtonEvents() {
    const bfsInformation = document.getElementById("bfsInformation");

    bfsInformation.onclick = function () {
        pathfinder.ExpandCollapseListElement("bfsInformationDropdown");
    }
}

/**
 * Declares the events for Recursive Depth-First Search Algorithm List Element.
 */
export function DeclareRecursiveDfsListElementEvents() {
    const recursiveDfsListElement = document.getElementById("recursiveDfsListElement");

    DeclareListElementBasicMouseEvents(recursiveDfsListElement, "recursiveDfsElement");

    recursiveDfsListElement.onclick = function () {
        pathfinder.ChooseAlgorithm("recursiveDfs");
    }
}

/**
 * Declares the events for Recursive Depth-First Search Algorithm Information Button.
 */
export function DeclareRecursiveDfsInfoButtonEvents() {
    const dfsInformation = document.getElementById("recursiveDfsInformation");

    dfsInformation.onclick = function () {
        pathfinder.ExpandCollapseListElement("recursiveDfsInformationDropdown");
    }
}

/**
 * Declares the events for Depth-First Search Algorithm List Element.
 */
export function DeclareDfsListElementEvents() {
    const dfsListElement = document.getElementById("dfsListElement");

    DeclareListElementBasicMouseEvents(dfsListElement, "dfsElement");

    dfsListElement.onclick = function () {
        pathfinder.ChooseAlgorithm("dfs");
    }
}

/**
 * Declares the events for Depth-First Search Algorithm Information Button.
 */
export function DeclareDfsInfoButtonEvents() {
    const dfsInformation = document.getElementById("dfsInformation");

    dfsInformation.onclick = function () {
        pathfinder.ExpandCollapseListElement("dfsInformationDropdown");
    }
}

/**
 * Declares the events for Sample Algorithm List Element.
 */
export function DeclareSampleAlgorithmListElementEvents() {
    const sampleListElement = document.getElementById("sampleListElement");

    DeclareListElementBasicMouseEvents(sampleListElement, "sampleElement");

    sampleListElement.onclick = function () {
        pathfinder.ChooseAlgorithm("sample");
    }
}

/**
 * Declares the events for Sample Algorithm Information Button.
 */
export function DeclareSampleAlgorithmInfoButtonEvents() {
    const sampleInformation = document.getElementById("sampleInformation");

    sampleInformation.onclick = function () {
        pathfinder.ExpandCollapseListElement("sampleInformationDropdown");
    }
}
