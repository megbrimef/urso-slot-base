import BaseTransportAction from './baseTransportAction.js';
class ModulesStatesManagerActionsServerBalanceRequestAction extends BaseTransportAction {
    name = 'serverBalanceRequestAction';

    constructor(name) {
        super(name);
        this.name = 'serverBalanceRequestAction';
    }

    guard() {
        return true;
    }
    _postProcessEvent({ currency, totalAmount }) {
        Urso.localData.set('balance', { currency, totalAmount });
        return true;
    }

    _preProcessEvent() {
        this.sendRequest('BalanceRequest');
    }
}

export default ModulesStatesManagerActionsServerBalanceRequestAction;
