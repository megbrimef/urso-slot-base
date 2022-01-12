const BaseEventDrivenAction = require('./baseEventDrivenAction');

class ModulesStatesManagerActionsBaseTransportAction extends BaseEventDrivenAction {
    serverActionType = null;
    event = 'modules.transport.receive';

    guard() {
        return Urso.config.useTransport;
    }

    _processEvent(responseData = {}) {
        if (!this.serverActionType || this.serverActionType === responseData.type) {
            return super._processEvent(responseData);
        }

        return null;
    }

    sendRequest(requestName, data) {
        this.emit('modules.transport.send', { requestName, data });
    }
}

module.exports = ModulesStatesManagerActionsBaseTransportAction;
