import BetIncreaseButtonController from './betIncreaseButtonController.js';
import BaseInteractiveUiElementController from '../baseInteractiveUiElementController.js';

class ModulesLogicBaseUiButtonsBetDecreaseButtonController extends BetIncreaseButtonController {
    _class = 'betDecreaseButton';

    _enableStates = ['IDLE', 'FINISH_WIN_ROUND'];

    get _needBlock() {
        const { bets, value } = Urso.localData.get('bets');
        return bets.indexOf(value) === 0;
    }

    get _nextValue() {
        let { bets, value } = Urso.localData.get('bets');
        return bets[bets.indexOf(value) - 1];
    }
}

export default ModulesLogicBaseUiButtonsBetDecreaseButtonController;
