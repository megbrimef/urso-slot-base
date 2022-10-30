// eslint-disable-next-line max-len
class ModulesLogicBaseUiInfoWinController extends Urso.SlotBase.Modules.Logic.Ui.BaseUiElementController {
    _class = 'winVal';
    _lastWin = 0;

    _setText() {
        return this._lastWin === 0 ? '' : `${this._lastWin.toFixed(2)}${this._currency}`;
    }

    _checkVisible() {
        return true;
    }

    _reset() {
        this._lastWin = 0;
        this._updateUiState();
    }

    _show(value) {
        this._lastWin = value;
        this._updateUiState();
    }

    _resetHandler = () => this._reset();
    _showHandler = (value) => this._show(value);

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();
        this.addListener('modules.logic.ui.win.show', this._showHandler, true);
        this.addListener('modules.logic.ui.win.reset', this._resetHandler, true);
    }
}

module.exports = ModulesLogicBaseUiInfoWinController;
