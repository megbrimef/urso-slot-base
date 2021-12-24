// eslint-disable-next-line max-len
class ModulesLogicBaseUiInfoLinesController extends Urso.SlotBase.Modules.Logic.Ui.BaseUiElementController {
    _class = 'linesVal';

    _setText() {
        const { value } = Urso.localData.get('lines');
        return value;
    }

    _checkVisible() {
        return true;
    }

    _update() {
        this._updateUiState();
    }

    _increase() {
        // TODO: IMPLEMENT INCREASE
    }

    _decrease() {
        // TODO: IMPLEMENT DECREASE
    }

    set() {
        // TODO: IMPLEMENT SET
    }

    _updateHandler = () => this._update();
    _increaseHandler = () => this._increase();
    _decreaseHandler = () => this._decrease();
    _setHandler = (value) => this._set(value);

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();

        this.addListener('modules.logic.ui.lines.increase', this._updateHandler, true);
        this.addListener('modules.logic.ui.lines.increase', this._increaseHandler, true);
        this.addListener('modules.logic.ui.lines.decrease', this._decreaseHandler, true);
        this.addListener('modules.logic.ui.lines.set', this._setHandler, true);
    }
}

module.exports = ModulesLogicBaseUiInfoLinesController;
