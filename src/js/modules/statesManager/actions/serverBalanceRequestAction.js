const BaseTransportAction = require('./baseTransportAction');

class ModulesStatesManagerActionsServerBalanceRequestAction extends BaseTransportAction {
    name = 'serverBalanceRequestAction';

    _postProcessEvent({ currency, totalAmount }) {
        Urso.localData.set('balance', { currency, totalAmount });
        return true; 
    }

    _preProcessEvent() {
        this.sendRequest('BalanceRequest');
    }
};

module.exports = ModulesStatesManagerActionsServerBalanceRequestAction;
