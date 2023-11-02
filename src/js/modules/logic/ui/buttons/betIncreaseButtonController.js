// eslint-disable-next-line max-len
const BaseInteractiveUiElementController = require('../baseInteractiveUiElementController.js');

class ModulesLogicBaseUiButtonsBetIncreaseButtonController extends BaseInteractiveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'betIncreaseButton';
    _enableStates = ['IDLE', 'FINISH_WIN_ROUND'];

    _checkVisible() {
        return true;
    }

    get _needBlock() {
        const { bets, value } = Urso.localData.get('bets');
        return bets.indexOf(value) === (bets.length - 1);
    }

    get _isInEnableState() {
        return this._enableStates.includes(this._state);
    }

    _checkEnabled() {
        return !this._needBlock && this._isInEnableState;
    }

    get _nextValue() {
        let { bets, value } = Urso.localData.get('bets');
        return bets[bets.indexOf(value) + 1];
    }

    _interactDone() {
        Urso.localData.set('bets.value', this._nextValue);
        this.emit('modules.logic.ui.bet.update');
    }

    _betUpdatedHandler = () => this._updateUiState();

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();
        this.addListener('modules.logic.ui.bet.updated', this._betUpdatedHandler, true);
    }
}

module.exports = ModulesLogicBaseUiButtonsBetIncreaseButtonController;
