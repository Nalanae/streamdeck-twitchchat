// Register the plugin or PI
function registerPluginOrPI(inEvent, inUUID) {
    if (websocket) {
        const json = {
            "event": inEvent,
            "uuid": inUUID
        };
        websocket.send(JSON.stringify(json));
    }
}

// Save settings
function saveSettings(inAction, inUUID, inSettings) {
    if (websocket) {
        const json = {
            "action": inAction,
            "event": "setSettings",
            "context": inUUID,
            "payload": inSettings
        };
        websocket.send(JSON.stringify(json));
    }
}

// Save global settings
function saveGlobalSettings(inUUID) {
    if (websocket) {
        const json = {
            "event": "setGlobalSettings",
            "context": inUUID,
            "payload": globalSettings
        };
        websocket.send(JSON.stringify(json));
    }
}

// Request global settings for the plugin
function requestGlobalSettings(inUUID) {
    if (websocket) {
        const json = {
            "event": "getGlobalSettings",
            "context": inUUID
        };
        websocket.send(JSON.stringify(json));
    }
}

// Request global settings for the plugin
function requestGlobalSettings(inUUID) {
    if (websocket) {
        const json = {
            "event": "getGlobalSettings",
            "context": inUUID
        };
        websocket.send(JSON.stringify(json));
    }
}

// Log to the global log file
function log(inMessage) {
    // Log to the developer console
    const time = new Date();
    const timeString = time.toLocaleDateString() + " " + time.toLocaleTimeString();
    console.log(timeString + ": " + inMessage);

    // Log to the StreamDeck log file
    if (websocket) {
        const json = {
            "event": "logMessage",
            "payload": {
                "message": inMessage
            }
        };
        websocket.send(JSON.stringify(json));
    }
}

// Show alert icon on the key
function showAlert(inContext) {
    if (websocket) {
        const json = {
            "event": "showAlert",
            "context": inContext
        };
        websocket.send(JSON.stringify(json));
    }
}

// Show OK icon on the key
function showOk(inContext) {
    if (websocket) {
        const json = {
            "event": "showOk",
            "context": inContext
        };
        websocket.send(JSON.stringify(json));
    }
}

// Set the state of a key
function setState(inContext, inState) {
    if (websocket) {
        var json = {
            "event": "setState",
            "context": inContext,
            "payload": {
                "state": inState
            }
        };
        websocket.send(JSON.stringify(json));
    }
}

// Send data to PI
function sendToPropertyInspector(inAction, inContext, inData) {
    if (websocket) {
        var json = {
            "action": inAction,
            "event": "sendToPropertyInspector",
            "context": inContext,
            "payload": inData
        };
        websocket.send(JSON.stringify(json));
    }
}

// Send data to plugin
function sendToPlugin(inAction, inContext, inData) {
    if (websocket) {
        var json = {
            "action": inAction,
            "event": "sendToPlugin",
            "context": inContext,
            "payload": inData
        };

        websocket.send(JSON.stringify(json));
    }
}