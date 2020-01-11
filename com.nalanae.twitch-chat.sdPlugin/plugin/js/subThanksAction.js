function SubThanksAction(inContext, inSettings) {
    // Init SubThanksAction
    const instance = this;

    var latestSubType = "";
    var latestSubName = "";
    var latestNumOfMonths = "";
    var latestGifterName = "";
    var latestNumOfSubs = "";

    // Inherit from Action
    Action.call(this, inContext, inSettings);

    // Public function called on key up event
    this.onKeyUp = function (inContext, inSettings, inCoordinates, inUserDesiredState, inState) {
        switch (latestSubType) {
            case "new-sub":
                var msg = inSettings['new-sub-message'];
                break;
            case "resub":
                var msg = inSettings['resub-message'];
                break;
            case "gift-sub":
                var msg = inSettings['gift-sub-message'];
                break;
            case "random-gift-sub":
                var msg = inSettings['random-gift-sub-message'];
                break;
            default:
                var msg = "";
                break;
        }

        msg = msg
            .replace(/\$subName/g, latestSubName)
            .replace(/\$numOfMonths/g, latestNumOfMonths)
            .replace(/\$gifterName/g, latestGifterName)
            .replace(/\$numOfSubs/g, latestNumOfSubs);

        if (msg) {
            twitchClient.say(inSettings['channel'], msg);
        }

        showOk(inContext);
    }

    this.newSub = function (username, methods, message, userstate) {
        latestSubType = "new-sub";
        latestSubName = username;
        latestNumOfMonths = 1;
        latestGifterName = "";
        latestNumOfSubs = "";
        showAlert(inContext);
    }

    this.resub = function (username, months, message, userstate, methods) {
        latestSubType = "resub";
        latestSubName = username;
        latestNumOfMonths = months;
        latestGifterName = "";
        latestNumOfSubs = "";
        showAlert(inContext);
    }

    this.giftSub = function (username, months, receipient, methods, userstate) {
        latestSubType = "gift-sub";
        latestSubName = receipient;
        latestNumOfMonths = months;
        latestGifterName = username;
        latestNumOfSubs = "";
        showAlert(inContext);
    }

    this.randomGiftSub = function (username, numOfSubs, methods, userstate) {
        latestSubType = "random-gift-sub";
        latestSubName = "";
        latestNumOfMonths = "";
        latestGifterName = username;
        latestNumOfSubs = numOfSubs;
        showAlert(inContext);
    }
}