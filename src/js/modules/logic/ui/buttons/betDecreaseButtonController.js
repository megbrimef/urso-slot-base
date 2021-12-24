// eslint-disable-next-line max-len
class ModulesLogicBaseUiButtonsbetDecreaseButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteractiveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'betDecreaseButton';

    _enableStates = ['IDLE'];

    _checkVisible() {
        return true;
    }

    get _isFirst() {
        const { bets, value } = Urso.localData.get('bets');
        return bets.indexOf(value) === 0;
    }

    get _isInEnableState() {
        return this._enableStates.includes(this._state);
    }

    _checkEnabled() {
        return !this._isFirst && this._isInEnableState;
    }

    _interactDone() {
        this.emit('modules.logic.ui.bet.decrease');
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

module.exports = ModulesLogicBaseUiButtonsbetDecreaseButtonController;
