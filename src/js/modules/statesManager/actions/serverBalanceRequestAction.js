const BaseTransportAction = require('./baseTransportAction');

class ModulesStatesManagerActionsServerBalanceRequestAction extends BaseTransportAction {
    name = 'serverBalanceRequestAction';

    _postProcessEvent({ totalAmount }) {
        Urso.localData.set('balance', { totalAmount });
        return true;
    }

    _preProcessEvent() {
        this.sendRequest('BalanceRequest');
    }
}

module.exports = ModulesStatesManagerActionsServerBalanceRequestAction;
