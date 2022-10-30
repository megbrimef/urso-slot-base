// eslint-disable-next-line max-len
class ModulesLogicBaseUiButtonsAutoSpinButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteractiveUiElementController {
    _type = this.TYPES.TOGGLE;
    _class = 'autoButton';

    _checkVisible() {
        return true;
    }

    _checkEnabled() {
        return true;
    }

    _tryStartAutoSpin() {
        this.emit('modules.logic.ui.auto.update');
    }

    _interactDone() {
        this._switchAutoMode();
        this._tryStartAutoSpin();
    }

    _switchAutoMode() {
        const { enabled } = Urso.localData.get('autospin');
        Urso.localData.set('autospin.enabled', !enabled);
    }
}

module.exports = ModulesLogicBaseUiButtonsAutoSpinButtonController;
