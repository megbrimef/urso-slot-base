// eslint-disable-next-line max-len
class ModulesLogicBaseUiButtonsSpinButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteraciveUiElementController {
    _type = this.TYPES.BUTTON;

    _class = 'spinButton';

    _canFireInteract = true;

    _checkVisible() {
        return true;
    }

    _checkEnabled() {
        return true;
    }
}

module.exports = ModulesLogicBaseUiButtonsSpinButtonController;
