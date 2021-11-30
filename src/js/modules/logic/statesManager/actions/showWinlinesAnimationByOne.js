class ModulesStatesManagerConfigStatesActionsShowWinlinesAnimateByOne extends Urso.Core.Modules.StatesManager.Action {
    
    guard(){
        const autospinEnabled = Urso.localData.get('autospin.enabled');
        const linesLengh = Urso.localData.get('slotMachine.spinStages.0.slotWin.lineWinAmounts.length');
        return !autospinEnabled && linesLengh;
    }

};

module.exports = ModulesStatesManagerConfigStatesActionsShowWinlinesAnimateByOne;
