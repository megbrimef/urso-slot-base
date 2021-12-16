class ModulesStatesManagerConfigStatesActionsWaitingForInteractionAction extends Urso.Core.Modules.StatesManager.Action {

    guard() {
        return true;
    }

    _interactDone = () => {
        Urso.observer.remove('modules.logic.ui.interact.done', this._interactDoneHandler, true);
        super._onFinish();
    }

    _interactDoneHandler = () => this._interactDone();

    _onFinish() {
        Urso.observer.add('modules.logic.ui.interact.done', this._interactDoneHandler, true);
    }
};

module.exports = ModulesStatesManagerConfigStatesActionsWaitingForInteractionAction;
