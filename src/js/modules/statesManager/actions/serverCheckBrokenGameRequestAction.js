const BaseTransportAction = require('./baseTransportAction');
class ModulesStatesManagerActionsServerCheckBrokenGameRequestAction extends BaseTransportAction {
    name = 'serverCheckBrokenGameRequestAction';

    _preProcessEvent() {
        this.sendRequest('CheckBrokenGameRequest');
    }
};

module.exports = ModulesStatesManagerActionsServerCheckBrokenGameRequestAction;
