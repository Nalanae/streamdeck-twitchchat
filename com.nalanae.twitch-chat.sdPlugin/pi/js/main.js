// Global web socket
var websocket = null;

// Global plugin settings
var globalSettings = {};

// Global plugin UUID
var pluginUUID = null;

// Global settings
var settings = {};

// Setup the websocket and handle communication
function connectElgatoStreamDeckSocket(inPort, inUUID, inRegisterEvent, inInfo, inActionInfo) {
    pluginUUID = inUUID;

    // Parse parameter from string to object
    const actionInfo = JSON.parse(inActionInfo);
    const info = JSON.parse(inInfo);

    const StreamDeckVersion = info['application']['version'];
    const pluginVersion = info['plugin']['version'];

    // Save global settings
    settings = actionInfo['payload']['settings'];

    // Retrieve action identifier
    const action = actionInfo['action'];

    // Open the web socket to StreamDeck
    // Use 127.0.0.1 because Windows needs 300ms to resolve localhost
    websocket = new WebSocket("ws://127.0.0.1:" + inPort);

    // Websocket is connected, send message
    websocket.onopen = function () {
        // Register property inspector to StreamDeck
        registerPluginOrPI(inRegisterEvent, inUUID);
        // Request the global settings of the plugin
        requestGlobalSettings(inUUID);
    };

    // Create actions
    if (action == "com.nalanae.twitch-chat.message") {
        const pi = new MessagePI(inUUID, StreamDeckVersion, pluginVersion);
    }
    else if (action == "com.nalanae.twitch-chat.sub-thanks") {
        const pi = new SubThanksPI(inUUID, StreamDeckVersion, pluginVersion);
    }

    websocket.onmessage = function (evt) {
        // Received message from StreamDeck
        const jsonObj = JSON.parse(evt.data);
        const event = jsonObj['event'];
        const jsonPayload = jsonObj['payload'];

        if (event == "didReceiveGlobalSettings") {
            // Set global plugin settings
            globalSettings = jsonPayload['settings'];

            validateToken();
        }
        else if (event == 'didReceiveSettings') {
            // Save global settings after default was set
            settings = jsonPayload['settings'];
        }
    }
}