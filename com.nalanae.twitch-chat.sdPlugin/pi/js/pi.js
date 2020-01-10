function PI(inContext, inStreamDeckVersion, inPluginVersion) {
    // Init PI
    const instance = this;

    // Add event listeners
    document.getElementById("reauthorize-button").addEventListener("click", reauthorize);
    document.getElementById("channel-input").addEventListener("input", channelChanged);

    setDefaults();

    // Set values
    document.getElementById("channel-input").value = settings['channel'];

    function reauthorize() {
        globalSettings['twitch-token'] = undefined;
        validateToken();
    }

    function channelChanged(inEvent) {
        settings['channel'] = inEvent.target.value;
        instance.saveSettings();
    }

    // Private function to return the action identifier
    function getAction() {
        // Find out what type of action
        if (instance instanceof MessagePI) {
            return "com.nalanae.twitch-chat.message";
        }
    }

    function setDefaults() {
        if (settings['channel'] == undefined) {
            settings['channel'] = "";
        }
    }

    // Public function to save the settings
    this.saveSettings = function () {
        saveSettings(getAction(), inContext, settings);
    }

    // Public function to send data to the plugin
    this.sendToPlugin = function (inData) {
        sendToPlugin(getAction(), inContext, inData);
    }
}