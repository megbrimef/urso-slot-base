// eslint-disable-next-line max-len
class ModulesStatesManagerActionsMakeBetAction extends Urso.Core.Modules.StatesManager.Action {
    name = 'makeBetAction';

    guard() {
        return true;
    }

    _onFinish() {
        this.emit('modules.logic.ui.balance.makeBet');
        super._onFinish();
    }
}

module.exports = ModulesStatesManagerActionsMakeBetAction;
