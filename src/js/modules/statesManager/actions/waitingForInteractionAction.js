// eslint-disable-next-line max-len
class ModulesStatesManagerActionsWaitingForInteractionAction extends Urso.Core.Modules.StatesManager.Action {
    name = 'waitingForInteractionAction';

    guard() {
        return true;
    }

    terminate() {
        super.terminate();
        this._interactDone();
    }

    _interactDone() {
        Urso.observer.remove('modules.logic.ui.interact.done', this._interactDoneHandler, true);
        document.removeEventListener('keypress', this._keyPressHandler);
        super._onFinish();
    }

    _keyPress(event) {
        if (event.code === 'Space') {
            this._interactDone();
        }
    }

    _interactDoneHandler = () => this._interactDone();
    _keyPressHandler = (data) => this._keyPress(data);

    _onFinish() {
        if (!this._terminating) {
            Urso.observer.add('modules.logic.ui.interact.done', this._interactDoneHandler, true);

            // TODO: MOVE TO CORE
            document.addEventListener('keypress', this._keyPressHandler);
        }
    }
}

module.exports = ModulesStatesManagerActionsWaitingForInteractionAction;
