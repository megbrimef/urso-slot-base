import BetIncreaseButtonController from './betIncreaseButtonController.js';

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

export default ModulesLogicBaseUiButtonsBetIncreaseCircularButtonController;
