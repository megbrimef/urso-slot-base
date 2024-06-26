// eslint-disable-next-line max-len
const BaseUiElementController = require('../baseUiElementController.js');

class ModulesLogicUiInfoTotalBetController extends BaseUiElementController {
    _class = 'totalBetVal';

    _setText() {
        const bets = Urso.localData.get('bets');
        const lines = Urso.localData.get('lines');
        const coins = Urso.localData.get('coins')
        const value = bets.value * lines.value * coins.value;
        
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
        this.addListener('modules.logic.ui.line.updated', this._updatedHandler, true);
    }
}

module.exports = ModulesLogicUiInfoTotalBetController;
