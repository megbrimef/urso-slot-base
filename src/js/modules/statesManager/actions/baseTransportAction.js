const BaseEventDrivenAction = require('./baseEventDrivenAction');

class ModulesStatesManagerActionsBaseTransportAction extends BaseEventDrivenAction {
    event = 'modules.transport.receive';

    guard() {
        return Urso.config.useTransport;
    }

    sendRequest(requestName, data) {
        this.emit('modules.transport.send', { requestName, data });
    }
}

module.exports = ModulesStatesManagerActionsBaseTransportAction;
