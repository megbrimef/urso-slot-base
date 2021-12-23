// eslint-disable-next-line max-len
class ModulesStatesManagerActionsInitUILogicAction extends Urso.Core.Modules.StatesManager.Action {
    name = 'initUiLogicAction';

    guard() {
        return true;
    }

    _initUiLogic() {
        Urso.getInstance('Modules.Logic.Ui.Controller').init();
    }

    _onFinish() {
        this._initUiLogic();
        super._onFinish();
    }
}

module.exports = ModulesStatesManagerActionsInitUILogicAction;
