import BaseTransportAction from './baseTransportAction.js';

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

export default ModulesStatesManagerActionsServerCheckBrokenGameRequestAction;
