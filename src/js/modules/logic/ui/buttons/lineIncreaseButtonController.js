// eslint-disable-next-line max-len
class ModulesLogicBaseUiButtonsLineIncreaseButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteractiveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'lineIncreaseButton';
    _enableStates = ['IDLE', 'FINISH_WIN_ROUND'];

    _checkVisible() {
        return true;
    }

    get _needBlock() {
        const { lines, value } = Urso.localData.get('lines');
        return lines.indexOf(value) === (lines.length - 1);
    }

    get _isInEnableState() {
        return this._enableStates.includes(this._state);
    }

    _checkEnabled() {
        return !this._needBlock && this._isInEnableState;
    }

    get _nextValue() {
        let { lines, value } = Urso.localData.get('lines');
        return lines[lines.indexOf(value) + 1];
    }

    _interactDone() {
        Urso.localData.set('lines.value', this._nextValue);
        this.emit('modules.logic.ui.line.updated');
    }

    _lineUpdatedHandler = () => this._updateUiState();

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();
        this.addListener('modules.logic.ui.line.updated', this._lineUpdatedHandler, true);
    }
}

module.exports = ModulesLogicBaseUiButtonsLineIncreaseButtonController;
