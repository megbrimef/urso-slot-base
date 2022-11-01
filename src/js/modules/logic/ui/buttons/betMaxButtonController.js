// eslint-disable-next-line max-len

const BetIncreaseButtonController = require('./betIncreaseButtonController');
class ModulesLogicBaseUiButtonsBetMaxButtonController extends BetIncreaseButtonController {
    _class = 'betMaxButton';

    get _nextValue() {
        let { bets } = Urso.localData.get('bets');
        return bets[bets.length - 1];
    }
}

module.exports = ModulesLogicBaseUiButtonsBetMaxButtonController;
