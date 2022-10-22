const BaseTransportAction = require('./baseTransportAction');
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

module.exports = ModulesStatesManagerActionsServerBalanceRequestAction;
