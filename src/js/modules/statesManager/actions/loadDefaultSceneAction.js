const BaseEventDrivenAction = require('./baseEventDrivenAction');

class ModulesStatesManagerActionsLoadDefaultSceneAction extends BaseEventDrivenAction {
    name = 'loadDefaultSceneAction';
    event = Urso.events.MODULES_SCENES_DISPLAY_FINISHED;

    _preProcessEvent() {
        Urso.scenes.display(Urso.config.defaultScene);
    }
}

module.exports = ModulesStatesManagerActionsLoadDefaultSceneAction;
