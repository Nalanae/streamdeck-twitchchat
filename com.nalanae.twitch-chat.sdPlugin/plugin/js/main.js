// Global web socket
var websocket = null;

// Global Twitch client
var twitchClient = null;

// Global settings
var globalSettings = {};

// Setup the websocket and handle communication
function connectElgatoStreamDeckSocket(inPort, inPluginUUID, inRegisterEvent, inInfo) {
    // Create array of currently used actions
	var actions = {};

	// Open the web socket to Stream Deck
	// Use 127.0.0.1 because Windows needs 300ms to resolve localhost
	websocket = new WebSocket("ws://127.0.0.1:" + inPort);

	// Web socket is connected
	websocket.onopen = function () {
		// Register plugin to Stream Deck
		registerPluginOrPI(inRegisterEvent, inPluginUUID);

		// Request the global settings of the plugin
		requestGlobalSettings(inPluginUUID);
	}

	websocket.onmessage = function (inEvent) {
		// Parse parameter from string to object
		const jsonObj = JSON.parse(inEvent.data);

		// Extract payload information
		const event = jsonObj['event'];
		const action = jsonObj['action'];
		const context = jsonObj['context'];
		const jsonPayload = jsonObj['payload'];

		// Key up event
		if (event == "keyUp") {
			const settings = jsonPayload['settings'];
			const coordinates = jsonPayload['coordinates'];
			const userDesiredState = jsonPayload['userDesiredState'];
			const state = jsonPayload['state'];

			// Send onKeyUp event to actions
			if (context in actions) {
				actions[context].onKeyUp(context, settings, coordinates, userDesiredState, state);
			}
		}
		else if (event == "willAppear") {
			var settings = jsonPayload['settings'];

			// Add current instance if not in actions array
			if (!(context in actions)) {
				if (action == "com.nalanae.twitch-chat.message") {
					actions[context] = new MessageAction(context, settings);
				}
			}
		}
		else if (event == "willDisappear") {
			// Remove current instance from array
			if (context in actions) {
				delete actions[context];
			}
		}
		else if (event == "didReceiveGlobalSettings") {
			// Set global settings
			globalSettings = jsonPayload['settings'];

			if (twitchClient) {
				twitchClient.disconnect();
			}

			twitchClient = new window.tmi.Client({
				options: { clientId: "ej0fycl6b431flwkp3bkqyx4nl6xms" },
				connection: { secure: true, reconnect: true },
				identity: { username: globalSettings['twitch-login'], password: "oauth:" + globalSettings['twitch-token'] }
			})

			twitchClient.connect();
		}
		else if (event == "didReceiveSettings") {
			var settings = jsonPayload['settings'];

			// Set settings
			if (context in actions) {
				actions[context].setSettings(settings);
			}
		}
	}
}