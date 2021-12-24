// eslint-disable-next-line max-len
class ModulesStatesManagerActionsUpdateSetWinTextAction extends Urso.Core.Modules.StatesManager.Action {
    name = 'setWinTextAction';

    _getWin() {
        return Urso.localData.get('slotMachine.spinStages.0.slotWin.totalWin');
    }

    guard() {
        return +this._getWin() > 0;
    }

    _updateWinText() {
        this.emit('modules.logic.ui.win.show', +this._getWin());
    }

    _onFinish() {
        this._updateWinText();
        super._onFinish();
    }
}

module.exports = ModulesStatesManagerActionsUpdateSetWinTextAction;
