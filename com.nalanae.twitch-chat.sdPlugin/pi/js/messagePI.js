function MessagePI(inContext, inStreamDeckVersion, inPluginVersion) {
    // Init MessagePI
    const instance = this;

    // Inherit from PI
    PI.call(this, inContext, inStreamDeckVersion, inPluginVersion);

    // Add event listeners
    document.getElementById("message-input").addEventListener("input", messageChanged);

    setDefaults();

    // Set values
    document.getElementById("message-input").value = settings['message'];

    function messageChanged(inEvent) {
        settings['message'] = inEvent.target.value;
        instance.saveSettings();
    }

    function setDefaults() {
        if (settings['message'] == undefined) {
            settings['message'] = "";
        }
    }
}