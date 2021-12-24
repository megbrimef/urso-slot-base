// eslint-disable-next-line max-len
class ModulesLogicUiInfoTotalBetController extends Urso.SlotBase.Modules.Logic.Ui.BaseUiElementController {
    _class = 'totalBetVal';

    _setText() {
        const bets = Urso.localData.get('bets');
        const lines = Urso.localData.get('lines');
        const value = bets.value * lines.value;

        Urso.localData.set('totalBet.value', value);

        return this._getFormattedText(value);
    }

    _getFormattedText(value) {
        return `${value.toFixed(2)}${this._currency}`;
    }

    _checkVisible() {
        return true;
    }

    _updated() {
        this._updateUiState();
    }

    _updatedHandler = () => this._updated();

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();
        this.addListener('modules.logic.ui.bet.updated', this._updatedHandler, true);
        this.addListener('modules.logic.ui.lines.updated', this._updatedHandler, true);
    }
}

module.exports = ModulesLogicUiInfoTotalBetController;
