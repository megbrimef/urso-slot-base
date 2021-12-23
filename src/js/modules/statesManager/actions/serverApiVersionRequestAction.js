const BaseTransportAction = require('./baseTransportAction');

class ModulesStatesManagerActionsServerApiVersionRequestAction extends BaseTransportAction {
    name = 'serverApiVersionRequestAction';

    _postProcessEvent({ transportConfig }) {
        const { reconnectTimeout } = transportConfig;
        Urso.localData.set('transport.reconnectTimeout', reconnectTimeout);
        return true;
    }

    _preProcessEvent() {
        this.sendRequest('ApiVersionRequest');
    }
}

module.exports = ModulesStatesManagerActionsServerApiVersionRequestAction;
