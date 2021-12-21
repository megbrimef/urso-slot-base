const BaseTransportAction = require('./baseTransportAction');
class ModulesStatesManagerActionsTransportInitAction extends BaseTransportAction {
    name = 'transportInitAction';
    event = 'modules.transport.ready';

    _preProcessEvent() {
        Urso.transport.init();
    }
};

module.exports = ModulesStatesManagerActionsTransportInitAction;
