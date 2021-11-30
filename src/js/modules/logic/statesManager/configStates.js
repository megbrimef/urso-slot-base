class ModulesStatesManagerConfigStates extends Urso.Core.Modules.StatesManager.ConfigStates {
    constructor() {
        super();

        this.contents = {
            IDLE: { 
                all: [
                    { action: 'startSpin' },
                    { action: 'startAutospin'}
            ]},

            SPIN_START: {
                all: [
                    { action: 'resetWinField' },
                    { action: 'balanceMakeBet'},
                    { action: 'serverSpinRequest' },
                    { action: 'slotMachineSpinStart' },
                ]
            },

            SPIN_FINISHING: { 
                race: [
                    { action: 'regularSpin' },
                    { action: 'quickSpin' }
                ]
            },

            WINLINES_ANIMATE_ALL: {
                all: [
                    { action: 'counterUpdate' },
                    { action: 'showWinlinesAnimationAll' },
                    { action: 'ghostLaugh' }
                ]
            },

            PICK_GAME: { action: 'showPickGame' },

            WINLINES_ANIMATE_BY_ONE: { 
                race: [
                    { action: 'showGambleGame' },
                    { action: 'showWinlinesAnimationByOne' }
                ]
            },

            UPDATE_WIN: {
                race: [
                    { action: 'balanceReceived' }
                ]
            }
        };
    };

    get() {
        return this.contents;
    };

};

module.exports = ModulesStatesManagerConfigStates;
