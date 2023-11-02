// eslint-disable-next-line max-len
const BaseInteractiveUiElementController = require('../baseInteractiveUiElementController.js');

class ModulesLogicBaseUiButtonsSpinButtonController extends BaseInteractiveUiElementController {
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
