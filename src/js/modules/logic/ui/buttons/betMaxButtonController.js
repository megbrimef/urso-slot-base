// eslint-disable-next-line max-len
class ModulesLogicBaseUiButtonsBetIncreaseButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteractiveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'betMaxButton';
    _enableStates = ['IDLE', 'FINISH_WIN_ROUND'];

    get _isInEnableState() {
        return this._enableStates.includes(this._state);
    }

    _checkVisible() {
        return true;
    }

    _checkEnabled() {
        return this._isInEnableState;
    }

    _interactDone() {
        this.emit('modules.logic.ui.bet.setMax');
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
