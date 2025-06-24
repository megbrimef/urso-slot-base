import BetIncreaseButtonController from './betDecreaseButtonController.js';

class ModulesLogicBaseUiButtonsBetIncreaseCircularButtonController extends BetIncreaseButtonController {
    _class = 'betDecreaseButtonCircularController';

    get _needBlock() {
        return false;
    }

    get _nextValue() {
        const { bets, value } = Urso.localData.get('bets');
        const nextValue = bets[bets.indexOf(value) - 1];
        return typeof nextValue !== 'undefined' ? nextValue : bets[bets.length - 1];
    }
}

export default ModulesLogicBaseUiButtonsBetIncreaseCircularButtonController;
