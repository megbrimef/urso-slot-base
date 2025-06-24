import BaseTransportAction from './baseTransportAction.js';

class ModulesStatesManagerActionsTransportInitAction extends BaseTransportAction {
    name = 'transportInitAction';
    event = 'modules.transport.ready';

    _preProcessEvent() {
        Urso.transport.init();
    }
}

export default ModulesStatesManagerActionsTransportInitAction;
