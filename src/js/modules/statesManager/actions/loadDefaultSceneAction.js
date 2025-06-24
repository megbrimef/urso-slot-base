import BaseEventDrivenAction from './baseEventDrivenAction.js';

class ModulesStatesManagerActionsLoadDefaultSceneAction extends BaseEventDrivenAction {
    name = 'loadDefaultSceneAction';
    event = Urso.events.MODULES_SCENES_DISPLAY_FINISHED;

    _preProcessEvent() {
        Urso.scenes.display(Urso.config.defaultScene);
    }
}

export default ModulesStatesManagerActionsLoadDefaultSceneAction;
