class ModulesStatesManagerActionsUpdateServerSettingsAction extends Urso.Core.Modules.StatesManager.Action {
    constructor(name) {
        super(name);
        this.name = 'updateServerSettingsAction';
    }

    guard() {
        return true;
    }

    _updateServerSettings() {
        // implement parsing and saving of server settings
    }

    _onFinish() {
        this._updateServerSettings();
        super._onFinish();
    }
};

module.exports = ModulesStatesManagerActionsUpdateServerSettingsAction;
