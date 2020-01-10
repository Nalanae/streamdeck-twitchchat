// Global function to set the status bar to the correct view
function setStatusBar(view) {
    // Remove active status from all status cells
    var statusCells = document.getElementsByClassName("status-cell");
    Array.from(statusCells).forEach(function (cell) {
        cell.classList.remove("active");
    });

    // Set it only to the current one
    document.getElementById("status-" + view).classList.add("active");
}

// Main function run after the page is fully loaded
window.onload = function () {
    // Bind enter and ESC keys
    document.addEventListener("keypress", function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            var event = new CustomEvent("enterPressed");
            document.dispatchEvent(event);
        }
        else if (key === 27) {
            var event = new CustomEvent("escPressed");
            document.dispatchEvent(event);
        }
    });

    loadIntroView();
};