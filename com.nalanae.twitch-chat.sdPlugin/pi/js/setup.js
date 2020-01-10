var authWindow = null;

function openTwitchAuth() {
    if (websocket) {
        const json = {
            "event": "openUrl",
            "payload": {
                "url": "https://id.twitch.tv/oauth2/authorize?client_id=ej0fycl6b431flwkp3bkqyx4nl6xms&redirect_uri=https://nalanae.com/twitchauth&response_type=token&scope=channel_feed_read%20chat:read%20chat:edit%20whispers:read%20whispers:edit"
            }
        };
        websocket.send(JSON.stringify(json));
    }
}

function validateToken() {
    if (globalSettings['twitch-token']) {
        if (authWindow) {
            authWindow.loadSuccessView();
        }
    }
    else {
        if (authWindow) {
            authWindow.loadFailedView();
        }
        else {
            authWindow = window.open("../setup/index.html");
        }
    }
}

function updateToken(token) {
    globalSettings['twitch-token'] = token;

    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "https://api.twitch.tv/helix/users", true);
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.timeout = 2500;
    xhr.onload = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            if (xhr.response != undefined && xhr.response != null) {
                globalSettings['twitch-login'] = xhr.response['data'][0]['login'];

                saveGlobalSettings(pluginUUID);
                validateToken();
            }
        }
    }
    xhr.onerror = function () {
        authWindow.loadFailedView();
    };
    xhr.ontimeout = function () {
        authWindow.loadFailedView();
    };
    xhr.send();
}