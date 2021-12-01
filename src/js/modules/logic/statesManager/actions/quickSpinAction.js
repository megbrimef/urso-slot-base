class ModulesStatesManagerConfigStatesActionsQuickSpinAction extends Urso.Core.Modules.StatesManager.Action {
    _onFinish(){
        if(!this._terminating){
            this.emit('components.slotMachine.speedUpReels');
        }

        super._onFinish();
    }
};

module.exports = ModulesStatesManagerConfigStatesActionsQuickSpinAction;
