class ModulesLogicBaseUiButtonsSpinButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteraciveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'sidePanel_spinButton';
    _canFireInteract = true;

    _getShowStates() {
        return ["IDLE"];
    }
}

module.exports = ModulesLogicBaseUiButtonsSpinButtonController;