class ModulesStatesManagerActionsServerSpinRequestAction extends Urso.Core.Modules.StatesManager.Action {
    constructor(name) {
        super(name);
        this.name = 'serverSpinRequestAction';
    }

    guard() {
        return true;
    }

    _spinResponse = (data) => {
        Urso.observer.remove('modules.logic.main.spinResponse', this._spinResponseHandler, true);
        super._onFinish();
    }

    _spinResponseHandler = (data) => this._spinResponse(data);

    _onFinish() {
        Urso.observer.add('modules.logic.main.spinResponse', this._spinResponseHandler, true);
        Urso.observer.fire('modules.logic.main.spinRequest');
    }
};

module.exports = ModulesStatesManagerActionsServerSpinRequestAction;
