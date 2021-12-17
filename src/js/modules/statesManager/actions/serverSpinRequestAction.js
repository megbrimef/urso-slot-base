class ModulesStatesManagerConfigStatesActionsServerSpinRequestAction extends Urso.Core.Modules.StatesManager.Action {
    // _onFinish(){
    //     if(!this._terminating){
    //         this.emit('components.slotMachine.speedUpReels');
    //     }

    //     super._onFinish();
    // }
    guard() {
        return true;
    }

    _spinResponse = (data) => {
        Urso.observer.remove('modules.logic.main.spinResponse', this._spinResponseHandler, true);
        super._onFinish();
    }

    _spinResponseHandler = (data) => this._spinResponse(data);

    _onFinish() {
        Urso.observer.add('modules.logic.main.spinResponse', this._spinResponseHandler, true);
        Urso.observer.fire('modules.logic.main.spinRequest');
    }
};

module.exports = ModulesStatesManagerConfigStatesActionsServerSpinRequestAction;
