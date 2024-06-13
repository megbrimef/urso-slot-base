// eslint-disable-next-line max-len
const BaseInteractiveUiElementController = require('../baseInteractiveUiElementController.js');

class ModulesLogicBaseUiButtonsTurboModeButtonController extends BaseInteractiveUiElementController {
    _type = this.TYPES.TOGGLE;
    _class = 'turboMode';

    _checkVisible() {
        return true;
    }

    _checkEnabled() {
        return true;
    }

    _interactDone() {
        this._switchTurboMode();
    }

    _switchTurboMode() {
        const turboMode = Urso.localData.get('settings.turboMode') || false;
        Urso.localData.set('settings.turboMode', !turboMode);
    }
}

module.exports = ModulesLogicBaseUiButtonsTurboModeButtonController;
