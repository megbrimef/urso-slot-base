class ModulesLogicBaseUiButtonsSpinButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteraciveUiElementController {
    _type = this.TYPES.BUTTON;
    _name = 'sidePanel_spinButton';
    _canFireInteract = true;

    _getShowStates() {
        return ["IDLE"];
    }

    _interactDone(params){
        // FIRE SPIN
    }
}

module.exports = ModulesLogicBaseUiButtonsSpinButtonController;