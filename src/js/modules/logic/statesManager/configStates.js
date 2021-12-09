class ModulesStatesManagerConfigStates extends Urso.Core.Modules.StatesManager.ConfigStates {
    constructor() {
        super();

        this.contents = {
            RESET_UI: {
                all: [
                    { action: 'resetWinTextAction' },
                ]
            },
            IDLE: { 
                race: [
                    
                    { action: 'waitingForInteractionAction' },
                    // { action: 'startAutospin'},
            ]},

            // RESET_UI_STATE: {
            //     all: [
            //         { action: 'resetWinField' },
            //     ]
            // },

            // CHECK_BALANCE: {
            //     sequence: [
            //         { action: 'showNoBalanceMessage'}
            //     ],
            //     nextState: ["IDLE"]
            // },
         
            START_SPIN: {
                sequence: [
                    { action: 'balanceMakeBetAction'},
                    { action: 'regularSpinStartAction' },
                    { action: 'serverSpinRequestAction' },
                    { action: 'updateSlotMachineDataAction' },
                ]
            },

            FINISH_SPIN: { 
                race: [
                    { action: 'finishingSpinAction' },
                    { action: 'fastSpinAction' }
                ]
            },

            SHOW_WIN: {
                all: [
                    { action: 'showWinCounterAction' },
                    { action: 'showWinlinesAnimationAllAction' },
                ]
            },

            DROP: {
                sequence: [
                    { action: 'regularSpinStartAction' },
                    { action: 'serverSpinRequestAction' },
                    { action: 'updateSlotMachineDataAction' },
                ],
                nextState: ["DROP"]
            },

            // // PICK_GAME: { action: 'showPickGame' },

            WINLINES_ANIMATE_BY_ONE: {
                all: [
                    { action: 'showWinTextAction' },
                    {
                        race: [
                            { action: 'showWinlinesAnimationByOneAction' },
                            { action: 'stopWinlinesAnimationAction'}
                        ]
                    },
                    {
                        sequence: [
                            { action: 'serverBalanceRequestAction' }
                        ]
                    }
                ]   
            },
        };
    };

    get() {
        return this.contents;
    };

};

module.exports = ModulesStatesManagerConfigStates;
