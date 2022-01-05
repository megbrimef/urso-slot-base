// eslint-disable-next-line max-len
class ModulesLogicBaseUiButtonsSpinButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteractiveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'spinButton';
    _canFireInteract = true;

    _checkVisible() {
        return ['IDLE', 'FINISH_WIN_ROUND'].includes(this._state);
    }

    _checkEnabled() {
        return this._actions.includes('waitingForInteractionAction');
    }
}

module.exports = ModulesLogicBaseUiButtonsSpinButtonController;
