function SubThanksPI(inContext, inStreamDeckVersion, inPluginVersion) {
    // Init SubThanksPI
    const instance = this;

    // Inherit from PI
    PI.call(this, inContext, inStreamDeckVersion, inPluginVersion);

    setDefaults();

    document.getElementById("placeholder").innerHTML = "\
        <div class=\"sdpi-item\">\
            <div class=\"sdpi-item-label\" id=\"message-label\">New sub msg</div>\
            <input class=\"sdpi-item-value sdProperty\" placeholder=\"New sub message\" value=\"" + settings['new-sub-message'] + "\" id=\"new-sub-message-input\" />\
        </div>\
        <div class=\"sdpi-item\">\
            <div class=\"sdpi-item-label\" id=\"message-label\">Resub msg</div>\
            <input class=\"sdpi-item-value sdProperty\" placeholder=\"Resub message\" value=\"" + settings['resub-message'] + "\" id=\"resub-message-input\" />\
        </div>\
        <div class=\"sdpi-item\">\
            <div class=\"sdpi-item-label\" id=\"message-label\">Gift sub msg</div>\
            <input class=\"sdpi-item-value sdProperty\" placeholder=\"Gift sub message\" value=\"" + settings['gift-sub-message'] + "\" id=\"gift-sub-message-input\" />\
        </div>\
        <div class=\"sdpi-item\">\
            <div class=\"sdpi-item-label\" id=\"message-label\">Rand. gift msg</div>\
            <input class=\"sdpi-item-value sdProperty\" placeholder=\"Random gift sub message\" value=\"" + settings['random-gift-sub-message'] + "\" id=\"random-gift-sub-message-input\" />\
        </div>\
        <div class=\"sdpi-item\">\
            <div class=\"sdpi-item-label\" id=\"message-label\">Placeholders</div>\
            <div class=\"sdpi-item-value sdProperty small-font\">\
                <strong>$subName</strong> - Name of subscriber<br />\
                <strong>$numOfMonths</strong> - Number of months<br />\
                <strong>$gifterName</strong> - Name of gifter<br />\
                <strong>$numOfSubs</strong> - Number of gift subs\
            </div >\
        </div>\
    ";

    // Add event listeners
    document.getElementById("new-sub-message-input").addEventListener("change", newSubMessageChanged);
    document.getElementById("resub-message-input").addEventListener("change", resubMessageChanged);
    document.getElementById("gift-sub-message-input").addEventListener("change", giftSubMessageChanged);
    document.getElementById("random-gift-sub-message-input").addEventListener("change", randomGiftSubMessageChanged);

    function newSubMessageChanged(inEvent) {
        settings['new-sub-message'] = inEvent.target.value;
        instance.saveSettings();
    }

    function resubMessageChanged(inEvent) {
        settings['resub-message'] = inEvent.target.value;
        instance.saveSettings();
    }

    function giftSubMessageChanged(inEvent) {
        settings['gift-sub-message'] = inEvent.target.value;
        instance.saveSettings();
    }

    function randomGiftSubMessageChanged(inEvent) {
        settings['random-gift-sub-message'] = inEvent.target.value;
        instance.saveSettings();
    }

    function setDefaults() {
        if (settings['new-sub-message'] == undefined) {
            settings['new-sub-message'] = "";
        }
        if (settings['resub-message'] == undefined) {
            settings['resub-message'] = "";
        }
        if (settings['gift-sub-message'] == undefined) {
            settings['gift-sub-message'] = "";
        }
        if (settings['random-gift-sub-message'] == undefined) {
            settings['random-gift-sub-message'] = "";
        }
    }
}