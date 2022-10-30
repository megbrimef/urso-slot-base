class ModulesStatesManagerConfigStates extends Urso.Core.Modules.StatesManager.ConfigStates {
    constructor() {
        super();

        this.contents = {
            INIT_GAME: {
                sequence: [
                    {
                        all: [
                            {
                                sequence: [
                                    { action: 'updateServerSettingsAction' },
                                    { action: 'transportInitAction' },
                                    { action: 'serverApiVersionRequestAction' },
                                    { action: 'serverCheckBrokenGameRequestAction' },
                                    { action: 'serverAuthRequestAction' },
                                    { action: 'serverBalanceRequestAction' },
                                ],
                            },
                            {
                                sequence: [
                                    { action: 'loadDefaultSceneAction' },
                                    { action: 'finishGameInitAction' }
                                ],
                            },
                        ],
                    },
                    {
                        all: [
                            { action: 'initUiLogicAction' },
                            { action: 'updateBalanceAction' },
                            { action: 'updateBetLinesAction' },
                            { action: 'hideLoaderAction' },
                        ],
                    },
                ],
            },

            IDLE: {
                race: [
                    { action: 'showWinlinesAnimationByOneAction' },
                    { action: 'waitingForInteractionAction' },
                    { action: 'resumeAutospinAction' },
                ],
            },

            RESET_WIN_STATE: {
                all: [
                    { action: 'resetWinTextAction' },
                ],
            },

            START_SPIN: {
                sequence: [
                    { action: 'makeBetAction' },
                    { action: 'regularSpinStartAction' },
                    { action: 'serverSpinRequestAction' },
                    { action: 'updateSlotMachineDataAction' },
                ],
            },

            FINISH_SPIN: {
                race: [
                    { action: 'finishingSpinAction' },
                    { action: 'waitingForInteractionAction' },
                ],
            },

            SHOW_WIN: {
                sequence: [
                    {
                        all: [
                            { action: 'showWinlinesAnimationAllAction' },
                            {
                                race: [
                                    { action: 'showWinCounterAction' },
                                    { action: 'waitingForInteractionAction' },
                                ],
                            },
                        ]
                    },
                    { action: 'updateWinTextAction' },
                    { 
                        all: [
                            { action: 'serverBalanceRequestAction' },
                        ]
                    },
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
        };
    }

    get() {
        return this.contents;
    }
}

module.exports = ModulesStatesManagerConfigStates;
