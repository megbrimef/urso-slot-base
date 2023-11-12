// eslint-disable-next-line max-len
const BaseInteractiveUiElementController = require('../baseInteractiveUiElementController.js');

class ModulesLogicBaseUiButtonsCollectButtonController extends BaseInteractiveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'collectButton';
    _canFireInteract = true;

    _checkVisible() {
        return ['WAITING_FOR_GAMBLE'].includes(this._state);
    }

    _checkEnabled() {
        return this._actions.includes('waitingForInteractionAction') && this._actions.includes('showWinlinesAnimationByOneAction');
    }
}

module.exports = ModulesLogicBaseUiButtonsCollectButtonController;
