// eslint-disable-next-line max-len
class ModulesStatesManagerActionsUpdateBalanceAction extends Urso.Core.Modules.StatesManager.Action {
    name = 'updateBalanceAction';

    guard() {
        return true;
    }

    _onFinish() {
        this.emit('modules.logic.ui.balance.update');
        super._onFinish();
    }
}

module.exports = ModulesStatesManagerActionsUpdateBalanceAction;
