// eslint-disable-next-line max-len
class ModulesLogicBaseUiButtonsSkipButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteractiveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'skipButton';
    _canFireInteract = true;

    _checkVisible() {
        return ['FINISH_SPIN', 'SHOW_WIN', 'START_SPIN', 'DROP'].includes(this._state);
    }

    _checkEnabled() {
        return this._actions.includes('waitingForInteractionAction');
    }
}

module.exports = ModulesLogicBaseUiButtonsSkipButtonController;
