function Action(inContext, inSettings) {
    // Init Action
    const instance = this;

    // Private variable containing the context of the action
    const context = inContext;

    // Private variable containing the settings of the action
    var settings = inSettings;

	// Public function returning the context
	this.getContext = function () {
		return context;
	};

	// Public function returning the settings
	this.getSettings = function () {
		return settings;
	};

	// Public function for settings the settings
	this.setSettings = function (inSettings) {
		settings = inSettings;
	};
}