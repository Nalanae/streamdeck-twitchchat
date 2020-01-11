function MessagePI(inContext, inStreamDeckVersion, inPluginVersion) {
    // Init MessagePI
    const instance = this;

    // Inherit from PI
    PI.call(this, inContext, inStreamDeckVersion, inPluginVersion);

    setDefaults();

    document.getElementById("placeholder").innerHTML = "\
        <div class=\"sdpi-item\">\
            <div class=\"sdpi-item-label\" id=\"message-label\">Message</div>\
            <input class=\"sdpi-item-value sdProperty\" placeholder=\"Message\" value=\"" + settings['message'] + "\" id=\"message-input\" />\
        </div>\
    ";

    // Add event listeners
    document.getElementById("message-input").addEventListener("change", messageChanged);

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