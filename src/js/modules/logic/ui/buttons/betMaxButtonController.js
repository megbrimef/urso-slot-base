// eslint-disable-next-line max-len
class ModulesLogicBaseUiButtonsbetIncreaseButtonController extends Urso.SlotBase.Modules.Logic.Ui.BaseInteractiveUiElementController {
    _type = this.TYPES.BUTTON;
    _class = 'betMaxButton';

    _interactDone() {
        this.emit('modules.logic.ui.bet.setMax');
    }

    _betUpdated() {
        this._updateUiState();
    }

    _betUpdatedHandler = () => this._betUpdated();

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();
        this.addListener('modules.logic.ui.bet.updated', this._betUpdatedHandler, true);
    }
}

module.exports = ModulesLogicBaseUiButtonsbetIncreaseButtonController;
