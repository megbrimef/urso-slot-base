// eslint-disable-next-line max-len
const BaseUiElementController = require('../baseUiElementController.js');

class ModulesLogicUiInfoBetController extends BaseUiElementController {
    _class = 'betVal';

    _setText() {
        return this._getFormattedBet();
    }

    _getFormattedBet() {
        const value = Urso.localData.get('bets.value');
        return `${value.toFixed(2)}${this._currency}`;
    }

    _checkVisible() {
        return true;
    }

    _update() {
        this._updateUiState();
        this.emit('modules.logic.ui.bet.updated');
    }

    _increase() {
        const { bets, value } = Urso.localData.get('bets');
        const curIndex = bets.indexOf(value);
        const nextIndex = bets[curIndex + 1] ? curIndex + 1 : 0;
        Urso.localData.set('bets.value', bets[nextIndex]);
        this._update();
    }

    _decrease() {
        const { bets, value } = Urso.localData.get('bets');
        const curIndex = bets.indexOf(value);
        const nextIndex = bets[curIndex - 1] ? curIndex - 1 : bets.length - 1;
        Urso.localData.set('bets.value', bets[nextIndex]);
        this._update();
    }

    _setMax() {
        const { bets } = Urso.localData.get('bets');
        Urso.localData.set('bets.value', bets[bets.length - 1]);
        this._update();
    }

    _set(value) {
        const { bets } = Urso.localData.get('bets');

        if (!bets.includes(value)) {
            Urso.logger.error(`There is no '${value}' in bets config!`);
            return false;
        }

        Urso.localData.set('bets.value', value);

        this._update();

        return true;
    }

    _updateHandler = () => this._update();
    _increaseHandler = () => this._increase();
    _decreaseHandler = () => this._decrease();
    _setMaxHandler = () => this._setMax();
    _setHandler = (value) => this._set(value);

    _extendedSubscribeOnce() {
        super._extendedSubscribeOnce();

        this.addListener('modules.logic.ui.bet.update', this._updateHandler, true);
        this.addListener('modules.logic.ui.bet.increase', this._increaseHandler, true);
        this.addListener('modules.logic.ui.bet.decrease', this._decreaseHandler, true);
        this.addListener('modules.logic.ui.bet.setMax', this._setMaxHandler, true);
        this.addListener('modules.logic.ui.bet.set', this._setHandler, true);
    }
}

module.exports = ModulesLogicUiInfoBetController;
