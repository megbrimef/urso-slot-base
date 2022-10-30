// eslint-disable-next-line max-len
const BetIncreaseButtonController = require('./betIncreaseButtonController');

class ModulesLogicBaseUiButtonsBetIncreaseCircularButtonController extends BetIncreaseButtonController {
    _class = 'betIncreaseCircularButton';

    get _needBlock() {
        return false;
    }

    get _nextValue() {
        const { bets, value } = Urso.localData.get('bets');
        const nextValue = bets[bets.indexOf(value) + 1];
        return typeof nextValue !== 'undefined' ? nextValue : bets[0];
    }
}

module.exports = ModulesLogicBaseUiButtonsBetIncreaseCircularButtonController;
