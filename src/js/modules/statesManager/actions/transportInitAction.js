class ModulesStatesManagerConfigStatesActionsTransportInitAction extends Urso.Core.Modules.StatesManager.Action {

    constructor(name) {
        super(name);
        this.name = 'transportInitAction';
    }

    guard() {
        return true;
    }

    _transportReady = () => {     
        this._unsubscribe();
        super._onFinish();
    }

    _transportReadyHandler = () => this._transportReady();

    _onFinish() {
        this._subscribe();
        Urso.transport.init();
    }

    _subscribe() {
        this.addListener('modules.logic.transport.ready', this._transportReadyHandler, true);
    }

    _unsubscribe() {
        Urso.observer.remove('modules.logic.transport.ready', this._transportReadyHandler, true);
    }
};

module.exports = ModulesStatesManagerConfigStatesActionsTransportInitAction;
