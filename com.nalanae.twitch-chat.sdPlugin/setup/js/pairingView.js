// Load the pairing view
function loadPairingView() {
    // Set the status bar
    setStatusBar("pairing");

    // Fill the title
    document.getElementById("title").innerHTML = "Link Account";

    // Fill the content area
    var content = "<div class='leftAlign'><p class='leftAlign'>To use this plugin you need to authorize this app to communicate with your Twitch account.</p> \
                   <p class='leftAlign'>Start by <span class='linkspan' onclick='window.opener.openTwitchAuth()'>clicking here</span> \
                   and approving this app on Twitch's website. <br/>Then paste the Approval Code to the textbox below:</p><hr/><br/></div> \
                   <div class='inputTitle'>Approval Code:</div><input type='input' class='approvalCode' placeholder='Paste the entire code' value='' id='approvalCode'>\
                   <p class='small leftAlign'>Note: After submitting, this window will close but will open again if the code is invalid.</p><br/>\
                   <div class='button' id = 'submit'> Submit Code</div><div class='button-transparent' id='close'>Cancel</div>";
    document.getElementById('content').innerHTML = content;

    // Add event listener
    document.getElementById("submit").addEventListener("click", submit);
    document.addEventListener("enterPressed", submit);

    document.getElementById("close").addEventListener("click", close);
    document.addEventListener("escPressed", close);

    // Retry pairing by reloading the view
    function submit() {
        var approvalCode = document.getElementById('approvalCode');
        unloadPairingView();
        loadValidatingView();
        window.opener.updateToken(approvalCode.value);
    }

    // Close the window
    function close() {
        window.close();
    }

    // Unload view
    function unloadPairingView() {
        // Remove event listener
        document.removeEventListener("escPressed", submit);
        document.removeEventListener("enterPressed", close);
    }
}
