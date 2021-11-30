class ModulesStatesManagerConfigActions extends Urso.Core.Modules.StatesManager.ConfigActions {
    constructor() {
        super();

        this.contents = {
            startSpin: {
                name: 'startSpin',
                events: {
                    onStart: '',
                    toComplete: 'components.slotMachine.spinCommand'
                },
                isTerminable: true,
                terminateEvents: {
                    onStart: 'components.autoSpin.started',
                    toComplete: ''
                }
            },

           startAutospin: {
                name: 'startAutospin',
                eventBlank: 'components.autoSpin'
            },

            balanceMakeBet: {
                name: 'balanceMakeBet',
                events: {
                    onStart: 'components.balance.makeBet',
                    toComplete: 'components.balance.updated'
                },
                isTerminable: false,
            },

            resetWinField: {
                name: 'resetWinField',
                events: {
                    onStart: 'components.winField.reset',
                    toComplete: 'components.winField.resetDone'
                },
                isTerminable: false,
            },

            serverSpinRequest: {
                name: 'serverSpinRequest',
                events: {
                    onStart: 'modules.logic.main.spinRequest',
                    toComplete: 'modules.logic.main.spinResponse',
                },
                isTerminable: false
            },
            quickSpin: {
                name: 'quickSpin',
                isTerminable: true,
                events: {
                    toComplete: 'components.slotMachine.spinCommand',
                },
                terminateEvents: {
                    onStart: '',
                    toComplete: 'components.slotMachine.spinComplete'
                }
            },
            slotMachineSpinStart: {
                name: 'slotMachineSpinStart',
                events: {
                    onStart: 'components.slotMachine.spinStart',
                    toComplete: 'components.slotMachine.spinStarted',
                },
                isTerminable: false
            },
            regularSpin: {
                name: 'regularSpin',
                events: {
                    onStart: 'components.slotMachine.setSpinSymbols',
                    toComplete: 'components.slotMachine.spinComplete'
                },
                isTerminable: false
            },

            showWinlinesAnimationAll: {
                name: 'showWinlinesAnimationAll',
                events: {
                    onStart: 'components.winlines.animateAll.start',
                    toComplete: 'components.winlines.animateAll.finished'
                },
                isTerminable: true,
                terminateEvents: {
                    toComplete: 'components.slotMachine.spinCommand'
                }
            },

            showPickGame: {
                name: 'showPickGame',
                eventBlank: 'components.pickGame',
                isTerminable: false
            },

            showGambleGame: {
                name: 'showGambleGame',
                eventBlank: 'components.gamble',
                isTerminable: true
            },
            
            showWinlinesAnimationByOne: {
                name: 'showWinlinesAnimationByOne',
                eventBlank: 'components.winlines',
                events: {
                    onStart: 'components.winlines.animateByOne.start',
                    toComplete: 'components.winlines.animateByOne.finished'
                },
                isTerminable: true,
                terminateEvents: {
                    onStart: 'components.winlines.animateByOne.stop',
                    toComplete: 'components.slotMachine.spinCommand'
                }
            },

            gambleTakeWin: {
                name: 'gambleTakeWin',
                events: {
                    // onStart: '',
                    toComplete: 'components.slotMachine.spinCommand'
                },
                isTerminable: true,
                terminateEvents: {
                    // onStart: '',
                    toComplete: 'components.winlines.animateByOne.finished'
                }
            },

            counterUpdate: {
                name: 'counterUpdate',
                events: {
                    onStart: 'components.winField.showWin.start',
                    toComplete: 'components.winField.showWin.finished'
                },
                isTerminable: true,
                terminateEvents: {
                    onStart: 'components.winField.showWin.quickFinish',
                    toComplete: 'components.winField.showWin.finished'
                }
            },
            
            balanceReceived: {
                name: 'balanceReceived',
                events: {
                    onStart: 'modules.logic.main.balanceRequest',
                    toComplete: 'modules.logic.main.balanceResponce'
                },
                isTerminable: false
            },
            playerPressSPIN: {
                name: 'playerPressSPIN',
                events: {
                    onStart: '',
                    toComplete: 'components.slotMachine.spinCommand'
                },
                isTerminable: true,
                terminateEvents: {
                    onStart: 'components.winField.showWin.quickFinish',
                    toComplete: 'components.winField.showWin.finished'
                }
            }
        };
    }

    get() { // 
        return this.contents;
    };

}

module.exports = ModulesStatesManagerConfigActions;
