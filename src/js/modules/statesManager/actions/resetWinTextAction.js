// eslint-disable-next-line max-len
class ModulesStatesManagerActionsResetWinTextAction extends Urso.Core.Modules.StatesManager.Action {
    name = 'resetWinTextAction';

    guard() {
        return true;
    }

    _onFinish() {
        this.emit('modules.logic.ui.win.reset');
        super._onFinish();
    }
}

module.exports = ModulesStatesManagerActionsResetWinTextAction;
