// eslint-disable-next-line max-len
const BaseUiElementController = require('../baseUiElementController.js');

class ModulesLogicUiInfoBalanceController extends BaseUiElementController {
    _class = 'balanceVal';

    _setText() {
        return this._getFormattedBalance();
    }

    _getFormattedBalance() {
        const value = Urso.localData.get('balance.totalAmount');
        return `${value.toFixed(2)}${this._currency}`;
    }

    _checkVisible() {
        return true;
    }

    _update() {
        this._updateUiState();
    }

    _makeBet() {
        const balance = Urso.localData.get('balance');
        const totalBet = Urso.localData.get('totalBet');
        const value = +(balance.totalAmount - totalBet.value).toFixed(2);
        Urso.localData.set('balance.totalAmount', value);

        this._update();
    }

    _updateHandler = () => this._update();
    _makeBetHandler = () => this._makeBet();

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();

        this.addListener('modules.logic.ui.balance.update', this._updateHandler, true);
        this.addListener('modules.logic.ui.balance.makeBet', this._makeBetHandler, true);
    }
}

module.exports = ModulesLogicUiInfoBalanceController;
