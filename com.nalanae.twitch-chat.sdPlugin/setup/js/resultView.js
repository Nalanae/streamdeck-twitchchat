// Load the result view
function loadValidatingView() {
    setStatusBar("result");

    // Fill the title
    document.getElementById("title").innerHTML = "Validating Code";

    // Fill the content area
    var content = "<p>This may take up to one minute...</p> \
                   <div id='loader'></div> \
                   <div class='button' id='close'>Cancel</div>";
    document.getElementById('content').innerHTML = content;

    document.getElementById("close").addEventListener("click", close);

    // Close this window
    function close() {
        window.close();
    }
}

function loadFailedView() {
    setStatusBar("result");

    // Fill the title
    document.getElementById("title").innerHTML = "Validation Failed";

    // Fill the content area
    var content = "<p>We failed to validate the code. Please try again with a new code. Make sure to copy-paste the code entirely.</p> \
                   <img class='image' src='images/fail.png'> \
                   <div class='button' id='failRetry'>Try Again</div> \
                   <div class='button-transparent' id='close'>Close</div>";
    document.getElementById('content').innerHTML = content;

    document.getElementById("close").addEventListener("click", close);
    document.getElementById("failRetry").addEventListener("click", failRetry);

    // Close this window
    function close() {
        window.close();
    }

    function failRetry() {
        // Remove event listener
        document.removeEventListener("close", close);
        document.removeEventListener("failRetry", failRetry);

        loadIntroView();
    }



}

// Load the results view
function loadSuccessView() {
    // Set the status bar
    setStatusBar("result");

    // Fill the title
    document.getElementById("title").innerHTML = "Code Accepted";

    // Fill the content area
    var content = "<p>You may now close this window and start using Twitch Chat.</p> \
                   <img class='image' src='images/paired.png'> \
                   <div class='button' id='close'>Close</div>";
    document.getElementById('content').innerHTML = content;

    // Add event listener
    document.getElementById("close").addEventListener("click", close);
    document.addEventListener("enterPressed", close);

    // Close this window
    function close() {
        window.close();
    }
}
