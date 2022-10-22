// eslint-disable-next-line max-len
class ModulesLogicBaseUiButtonsBetIncreaseButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteractiveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'betIncreaseButton';
    _enableStates = ['IDLE', 'FINISH_WIN_ROUND'];

    _checkVisible() {
        return true;
    }

    get _isLast() {
        const { bets, value } = Urso.localData.get('bets');
        return bets.indexOf(value) === (bets.length - 1);
    }

    get _isInEnableState() {
        return this._enableStates.includes(this._state);
    }

    _checkEnabled() {
        return !this._isLast && this._isInEnableState;
    }

    _interactDone() {
        this.emit('modules.logic.ui.bet.increase');
    }

    _betUpdated() {
        this._updateUiState();
    }

    _betUpdatedHandler = () => this._betUpdated();

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();
        this.addListener('modules.logic.ui.bet.updated', this._betUpdatedHandler, true);
    }
}

module.exports = ModulesLogicBaseUiButtonsBetIncreaseButtonController;
