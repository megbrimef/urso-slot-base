// eslint-disable-next-line max-len
const BaseInteractiveUiElementController = require('../baseInteractiveUiElementController.js');

class ModulesLogicBaseUiButtonsSkipButtonController extends BaseInteractiveUiElementController {
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
