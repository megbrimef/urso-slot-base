class ModulesStatesManagerConfigStatesActionsShowWinlinesAnimationAll extends Urso.Core.Modules.StatesManager.Action {
    
    guard(){
        return Urso.localData.get('slotMachine.spinStages.0.slotWin.lineWinAmounts.length');
    }

};

module.exports = ModulesStatesManagerConfigStatesActionsShowWinlinesAnimationAll;
