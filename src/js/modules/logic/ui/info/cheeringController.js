// eslint-disable-next-line max-len
class ModulesLogicUiCheeringController extends Urso.SlotBase.Modules.Logic.Ui.BaseUiElementController {
    _class = 'cheeringText';
    _wasFirstSpin = false;

    _setText() {
        return this._cheeringText;
    }

    _checkVisible() {
        return true;
    }

    get _lastWin() {
        return Urso.localData.get('slotMachine.spinStages.0.slotWin.totalWin') || 0;
    }
    
    _stateChanged(stateName) {
        super._stateChanged(stateName);

        if(this._state === 'START_SPIN') {
            this._wasFirstSpin = true;
        }
    }

    get _cheeringText() {
        let text = 'Good luck';

        if(['SHOW_WIN', 'IDLE'].includes(this._state) && this._wasFirstSpin) {
            text = this._lastWin > 0 ? 'WIN' : 'Try again';
        }

        return text;
    }
}

module.exports = ModulesLogicUiCheeringController;
