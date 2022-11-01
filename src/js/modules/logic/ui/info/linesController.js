// eslint-disable-next-line max-len
class ModulesLogicBaseUiInfoLinesController extends Urso.SlotBase.Modules.Logic.Ui.BaseUiElementController {
    _class = 'linesVal';

    _setText() {
        return Urso.localData.get('lines.value');
    }

    _checkVisible() {
        return true;
    }

    _updateLineHandler = () => this._updateUiState();

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();
        this.addListener('modules.logic.ui.line.updated', this._updateLineHandler, true);
    }
}

module.exports = ModulesLogicBaseUiInfoLinesController;
