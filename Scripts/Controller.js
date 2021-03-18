import * as pathfinder from "./Pathfinder.js";
import * as rightMenuController from "./UI Controllers/Right Menu Controller.js";
import * as dashboardController from "./UI Controllers/Dashboard Controller.js";
import * as toolboxController from "./UI Controllers/Toolbox Controller.js";

window.onload = function () {
    pathfinder.GenerateGrid();

    pathfinder.resizeObserver.observe(document.querySelector("#grid"));

    DeclareLeftMenuTogglerEvents();

    DeclareRightMenuEvents();

    DeclareLeftMenuTogglerTriggerEvents();

    DeclareDashboardEvents();

    DeclareToolboxEvents();

    DeclareAlgorithmsModalEvents();

    DeclareLegendModalEvents();

    DeclareSetSpeedModalButtonEvents();

    DeclareErrorUnderstoodButtonEvents();
}

/**
 * Calls the functions that declare the events for the Left Menu Toggler.
 */
function DeclareLeftMenuTogglerEvents() {
    DeclareToolboxTriggerEvents();
    DeclareDashboardTriggerEvents();
}

/**
 * Calls the functions that declare the events for the Right Menu.
 */
function DeclareRightMenuEvents() {
    rightMenuController.DeclareHomeButtonEvents();
    rightMenuController.DeclareAlgorithmsButtonEvents();
    rightMenuController.DeclarePatternsButtonEvents();
    rightMenuController.DeclareCreditsButtonEvents();
}

/**
 * Calls the functions that declare the events for the Dashboard.
 */
function DeclareDashboardEvents() {
    dashboardController.DeclareRunButtonEvents();
    dashboardController.DeclareClearBoardButtonEvents();
    dashboardController.DeclareSpeedButtonEvents();
    dashboardController.DeclareLegendButtonEvents();
}

/**
 * Calls the functions that declare the events for Toolbox.
 */
function DeclareToolboxEvents() {
    toolboxController.DeclareWallToolButtonEvents();
    toolboxController.DeclareWeightToolButtonEvents();
    toolboxController.DeclareStartNodeToolButtonEvents();
    toolboxController.DeclareEndNodeToolButtonEvents();
}

/**
 * Calls the functions that declare the events for the Algorithms Modal.
 */
function DeclareAlgorithmsModalEvents() {
    rightMenuController.DeclareHideAlgorithmsModalButtonEvents();

    rightMenuController.DeclareDijkstraListElementEvents();
    rightMenuController.DeclareDijkstraInfoButtonEvents();
    
    rightMenuController.DeclareBfsListElementEvents();
    rightMenuController.DeclareBfsInfoButtonEvents();

    rightMenuController.DeclareDfsListElementEvents();
    rightMenuController.DeclareDfsInfoButtonEvents();

    rightMenuController.DeclareRecursiveDfsListElementEvents();
    rightMenuController.DeclareRecursiveDfsInfoButtonEvents();

    rightMenuController.DeclareSampleAlgorithmListElementEvents();
    rightMenuController.DeclareSampleAlgorithmInfoButtonEvents();
}

/**
 * Calls the functions that declare the events for the Legend Modal.
 */
function DeclareLegendModalEvents() {
    dashboardController.DeclareHideLegendModalButtonEvents();

    dashboardController.DeclareWallInfoButtonEvents();
    dashboardController.DeclareVisitedNodeInfoButtonEvents();
    dashboardController.DeclarePathNodeInfoButtonEvents();
    dashboardController.DeclareWeightInfoButtonEvents();
    dashboardController.DeclareStartNodeInfoButtonEvents();
    dashboardController.DeclareEndNodeInfoButtonEvents();
}

/**
 * Calls the functions that declare the events for the Set Speed Modal.
 */
function DeclareSetSpeedModalButtonEvents() {
    dashboardController.DeclareSpeedButtonEvents();
    dashboardController.DeclareCloseSpeedModalButtonEvents();

    dashboardController.DeclareSlowSpeedListElementEvents();
    dashboardController.DeclareNormalSpeedListElementEvents();
    dashboardController.DeclareFastSpeedListElementEvents();
    dashboardController.DeclareVeryFastSpeedListElementEvents();

    dashboardController.DeclareSetSpeedButtonEvents();
}

/**
 * Declares the events of the trigger which toggles between Toolbox and Dashboard.
 */
function DeclareLeftMenuTogglerTriggerEvents() {
    document.getElementById("leftMenuTogglerTrigger").onclick = function() {
        if (!pathfinder.togglerTriggered) {
            pathfinder.ShowLeftMenuToggler();
        } else {
            pathfinder.HideLeftMenuToggler();
        }
    }
}

/**
 * Declares the events for the Toolbox Trigger Button.
 */
function DeclareToolboxTriggerEvents() {
    document.getElementById("toolboxTrigger").onclick = function () {
        pathfinder.ShowToolbox();
    }
}

/**
 * Declares the events for the Dashboard Trigger Button.
 */
function DeclareDashboardTriggerEvents() {
    document.getElementById("dashboardTrigger").onclick = function() {
        pathfinder.ShowDashboard();
    }
}

/**
 * Declares the events for the Error Understood Button.
 */
function DeclareErrorUnderstoodButtonEvents() {
    const errorUnderstoodButton = document.getElementById("ErrorUnderstoodButton");

    errorUnderstoodButton.onclick = function() {
        document.getElementById("errorContainer").style.display = "none";
    }
}