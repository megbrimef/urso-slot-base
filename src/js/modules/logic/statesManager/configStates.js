class ModulesStatesManagerConfigStates extends Urso.Core.Modules.StatesManager.ConfigStates {
    constructor() {
        super();

        this.contents = {
            IDLE: {
                all: [
                    { action: 'enableUiButtonsAction' },
                    { action: 'hideStopButtonAction' },
                    { action: 'showSpinButtonAction' },
                    {
                        race: [
                            { action: 'autoSpinAction' },
                            { action: 'waitingForInteractionAction' }
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
                    { action: 'disableUiButtonsAction' },
                    { action: 'hideSpinButtonAction' },
                    { action: 'showStopButtonAction' },
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
                    { action: 'showWinCounterAction' },
                    { action: 'showWinlinesAnimationAllAction' },
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

            WINLINES_ANIMATE_BY_ONE: {
                all: [
                    { action: 'showWinAmountTextAction' },
                    { action: 'enableUiButtonsAction' },
                    {
                        race: [
                            { action: 'autospinCheckAction'},
                            { action: 'autoSpinAction'},
                            { action: 'showWinlinesAnimationByOneAction' },
                            { action: 'stopWinlinesAnimationAction' }
                        ]
                    },
                    {
                        sequence: [
                            { action: 'serverBalanceRequestAction' }
                        ]
                    }
                ],
                nextState: ['RESET_WIN_STATE']
            },
        };
    };

    get() {
        return this.contents;
    };

};

module.exports = ModulesStatesManagerConfigStates;
