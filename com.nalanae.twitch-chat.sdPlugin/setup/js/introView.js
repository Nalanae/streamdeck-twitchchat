// Load the intro view
function loadIntroView() {
    // Set the status bar
    setStatusBar("intro");

    // Fill the title
    document.getElementById("title").innerHTML = "Initial Setup";

    // Fill the content area
    var content = "<p>This wizard will help you link your Twitch account with the plugin.</p> \
                   <img class='image' src='images/twitch.png'> \
                   <div class='button' id='start'>Link Account</div> \
                   <div class='button-transparent' id='close'>Not Now</div>";
    document.getElementById('content').innerHTML = content;

    // Add event listener
    document.getElementById("start").addEventListener("click", startPairing);
    document.addEventListener("enterPressed", startPairing);

    document.getElementById("close").addEventListener("click", close);
    document.addEventListener("escPressed", close);


    // Load the pairing view
    function startPairing() {
        unloadIntroView();
        loadPairingView();
    };


    // Close the window
    function close() {
        window.close();
    };


    // Unload view
    function unloadIntroView() {
        // Remove event listener
        document.removeEventListener("enterPressed", startPairing);
        document.removeEventListener("escPressed", close);
    }
}
