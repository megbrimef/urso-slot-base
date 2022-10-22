const BaseTransportAction = require('./baseTransportAction');

class ModulesStatesManagerActionsServerCheckBrokenGameRequestAction extends BaseTransportAction {
    name = 'serverCheckBrokenGameRequestAction';

    _processEvent(responseData = {}) {
        if (!this.serverActionType || this.serverActionType === responseData.type) {
            return super._processEvent(responseData);
        }

        return null;
    }

    _preProcessEvent() {
        this.sendRequest('CheckBrokenGameRequest');
    }
}

module.exports = ModulesStatesManagerActionsServerCheckBrokenGameRequestAction;
