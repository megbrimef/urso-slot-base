class ModulesLogicBaseUiElementController {
    _subscribed = false;
    _state = false;
    _class = null;
    _actions = [];

    init() {
        this._subscribeOnce();
    }

    get _config() {
        return Urso.getInstance('Modules.Logic.Ui.Config').getConfig();
    }

    get _currency() {
        const { showCurrencyType } = this._config;
        const { currentCurrency, currentSymbol } = Urso.localData.get('balance.currency');

        switch (showCurrencyType) {
        case 'currency':
            return currentCurrency;
        case 'symbol':
            return currentSymbol;
        default:
            return '';
        }
    }

    _stateChanged(stateName) {
        this._state = stateName;
    }

    _actionStart(actionName) {
        this._actions.push(actionName);
        this._updateUiState();
    }

    _actionFinish(actionName) {
        const actionIndex = this._actions.indexOf(actionName);

        if (actionIndex >= 0) {
            this._actions.splice(actionIndex, 1);
        }
    }

    _getUiState() {
        let state = {
            visible: this._checkVisible(),
            enabled: this._checkEnabled(),
            text: this._setText(),
        };

        state = this._beforeStateUpdate(state);

        return state;
    }

    _checkVisible() {
        return false;
    }

    _checkEnabled() {
        return false;
    }

    _setText() {}

    _beforeStateUpdate(state) {
        return state;
    }

    _getSelector() {
        return `.${this._class}`;
    }

    _updateUiState() {
        const state = this._getUiState();
        const selector = this._getSelector();
        this.emit('components.ui.state.update', { [selector]: state });
    }

    _extendedSubscribeOnce() {}

    _stateChangedHandler = (stateName) => this._stateChanged(stateName);
    _actionStartHandler = (actionName) => this._actionStart(actionName);
    _actionFinishHandler = (actionName) => this._actionFinish(actionName);

    _subscribeOnce() {
        if (this._subscribed) {
            return;
        }

        this._subscribed = true;
        // eslint-disable-next-line max-len
        this.addListener(Urso.events.MODULES_STATES_MANAGER_STATE_CHANGE, this._stateChangedHandler, true);
        // eslint-disable-next-line max-len
        this.addListener(Urso.events.MODULES_STATES_MANAGER_ACTION_START, this._actionStartHandler, true);
        // eslint-disable-next-line max-len
        this.addListener(Urso.events.MODULES_STATES_MANAGER_ACTION_FINISH, this._actionFinishHandler, true);
        this._extendedSubscribeOnce();
    }
}

module.exports = ModulesLogicBaseUiElementController;
