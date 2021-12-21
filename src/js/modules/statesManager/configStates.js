class ModulesStatesManagerConfigStates extends Urso.Core.Modules.StatesManager.ConfigStates {
    constructor() {
        super();

        this.contents = {
            // INIT_GAME: {
            //     sequence: [
            //         { action: 'updateServerSettingsAction' },
            //         { action: 'transportInitAction' },
            //         { action: 'serverApiVersionRequestAction' },
            //         { action: 'serverCheckBrokenGameRequestAction' },
            //         { action: 'serverAuthRequestAction' },
            //
            //     ]
            // },

            IDLE: {
                all: [
                    { action: 'showWinAmountTextAction' },
                    {
                        race: [            
                            { action: 'waitingForInteractionAction' },
                            { action: 'showWinlinesAnimationByOneAction' },
                            { action: 'stopWinlinesAnimationAction' }
                        ]
                    }
                ]
            },

            RESET_WIN_STATE: {
                all: [
                    { action: 'resetWinTextAction' }
                ]
            },

            START_SPIN: {
                sequence: [
                    { action: 'balanceMakeBetAction' },
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
                    { action: 'showWinTextAction' },
                    { action: 'showWinlinesAnimationAllAction' },
                    {
                        race: [
                            { action: 'finishCounterAction' },
                            { action: 'showWinCounterAction' },
                        ]
                    }
                ]
            },

            // DROP: {
            //     sequence: [
            //         { action: 'dropAction'},
            //         { action: 'regularSpinStartAction' },
            //         { action: 'serverSpinRequestAction' },
            //         { action: 'updateSlotMachineDataAction' },
            //         { action: 'finishingSpinAction' }
            //     ],
            //     nextState: ['SHOW_WIN']
            // },

            FINISH_ROUND: {

                sequence: [
                    { action: 'serverBalanceRequestAction' }
                ]


            },
        };
    };

    get() {
        return this.contents;
    };

};

module.exports = ModulesStatesManagerConfigStates;
