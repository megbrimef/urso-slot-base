class ModulesLogicBaseUiElementController {
    _subscribed = false;
    _state = false;

    init() {
        this._subscribeOnce();
    }

    _stateChanged(stateName) {
        this._state = stateName;
    }

    _extendedSubscribeOnce() {}
    
    _stateChangedHandler = (stateName) => this._stateChanged(stateName);

    _subscribeOnce() {
        if(this._subscribed) {
            return;
        }

        this._subscribed = true;
        this.addListener(Urso.events.MODULES_STATES_MANAGER_STATE_CHANGE, this._stateChangedHandler, true);
        this._extendedSubscribeOnce();
    }
}

module.exports = ModulesLogicBaseUiElementController;