import BetIncreaseButtonController from './betIncreaseButtonController.js';
import BaseInteractiveUiElementController from '../baseInteractiveUiElementController.js';

class ModulesLogicBaseUiButtonsBetMaxButtonController extends BetIncreaseButtonController {
    _class = 'betMaxButton';

    get _nextValue() {
        let { bets } = Urso.localData.get('bets');
        return bets[bets.length - 1];
    }
}

export default ModulesLogicBaseUiButtonsBetMaxButtonController;
