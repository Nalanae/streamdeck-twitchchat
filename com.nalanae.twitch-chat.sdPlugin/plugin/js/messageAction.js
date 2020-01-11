function MessageAction(inContext, inSettings) {
    // Init MessageAction
    const instance = this;

    // Inherit from Action
    Action.call(this, inContext, inSettings);

    // Public function called on key up event
    this.onKeyUp = function (inContext, inSettings, inCoordinates, inUserDesiredState, inState) {
        twitchClient.say(inSettings['channel'], inSettings['message']);
        showOk(inContext);
    }
}