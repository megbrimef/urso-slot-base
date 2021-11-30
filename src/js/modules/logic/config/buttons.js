class ModulesLogicConfigButtons extends Urso.Core.Modules.Logic.Config.Buttons{
    
    setButtonStates(){
        return {
            spin: {
                default: { //base
                    'title': '',
                    'callback': () => {
                        this.emit('components.slotMachine.spinCommand');
                    },
                    'enabled': true,
                    'visible': true,
                    'frames': {
                        overFrame: 2,
                        outFrame: 1,
                        downFrame: 0,
                        upFrame: 1,

                        disableFrame: 3
                    }
                },
            },

            double: {
                default: { //base
                    'title': '',
                    'callback': () => {
                        this.emit('components.gamble.start');
                    },
                    'enabled': true,
                    'visible': true,
                    'frames': {
                        overFrame: 2,
                        outFrame: 1,
                        downFrame: 0,
                        upFrame: 1,
                        disableFrame: 3
                    }
                },
            },
            lines: {
                default: { //base
                    'title': '',
                    'callback': () => {
                        this.emit('components.lines.switch');
                    },
                    'enabled': true,
                    'visible': true,
                    'frames': {
                        overFrame: 2,
                        outFrame: 1,
                        downFrame: 0,
                        upFrame: 1,
                        disableFrame: 3
                    }
                },
               
                
        //         //default extend 
        //         inactive: {
        //             'enabled': false
        //         },
        //         stop: {
        //             'callback': function () {
        //                 this.emit('slotMachine.stopCommand');
        //             },
        //             'frames': {
        //                 overFrame: 6,
        //                 outFrame: 5,
        //                 downFrame: 4,
        //                 upFrame: 5,
        //                 disableFrame: 7
        //             }
        //         },
        //         stopInactive: {
        //             'base': 'stop',
        //             'enabled': false
        //         }
            },
            oneBet: {
                default: {
                    'title': '',
                    'callback': () => {
                        this.emit('components.bet.switch', { type: 'one' });
                    },
                    'enabled': true,
                    'visible': true,
                    'frames': {
                        overFrame: 2,
                        outFrame: 1,
                        downFrame: 0,
                        upFrame: 1,
                        disableFrame: 3
                    }
                },
            },
            maxBet: {
                default: {
                    'title': '',
                    'callback': () => {
                        this.emit('components.bet.switch', { type: 'max' });
                    },
                    'enabled': true,
                    'visible': true,
                    'frames': {
                        overFrame: 2,
                        outFrame: 1,
                        downFrame: 0,
                        upFrame: 1,
                        disableFrame: 3
                    }
                },
            },
            info: {
                default: {
                    'title': '',
                    'callback': () => {
                        this.emit('components.paytable.switch', { action: 'open_window'});
                    },
                    'enabled': true,
                    'visible': true,
                    'frames': {
                        overFrame: 2,
                        outFrame: 1,
                        downFrame: 0,
                        upFrame: 1,
                        disableFrame: 3
                    }
                },
            },
            payTableCloseButton: {
                default: {
                    'title': '',
                    'callback': () => {
                        this.emit('components.paytable.switch', { action: 'close_window'});
                    },
                    'enabled': true,
                    'visible': true,
                    'frames': {
                        overFrame: 2,
                        outFrame: 1,
                        downFrame: 0,
                        upFrame: 1,
                        disableFrame: 3
                    }
                },
            },
            payTableArrowRight: {
                default: {
                    'title': '',
                    'callback': () => {
                        this.emit('components.paytable.switch', { action: 'next_page'});
                    },
                    'enabled': true,
                    'visible': true,
                    'frames': {
                        overFrame: 2,
                        outFrame: 1,
                        downFrame: 0,
                        upFrame: 1,
                        disableFrame: 3
                    }
                },
            },
            payTableArrowLeft: {
                default: {
                    'title': '',
                    'callback': () => {
                        this.emit('components.paytable.switch', { action: 'prev_page'});
                    },
                    'enabled': true,
                    'visible': true,
                    'frames': {
                        overFrame: 2,
                        outFrame: 1,
                        downFrame: 0,
                        upFrame: 1,
                        disableFrame: 3
                    }
                },
            }
        };
    };

    setEventsCfgBlanks(){
        return {
            globalUiGroup: [
                // {id: 1, event: 'Transport.close', state: false, priority: 100, removeEvents: [10, 11, 12, 13]},
                // {id: 2, event: 'freespinsStart', state: 'inactive', priority: 10},
                // {id: 3, event: 'freespinsStop', state: false, priority: 10, removeEvents: [1]}
            ]
        };
    };

    setEventsCfg(){
        return {
            spin: [
                // {id: 1, event: 'Transport.close', state: false, priority: 100, removeEvents: [10, 11, 12, 13]},
                // {id: 10, event: 'freespinsStart', state: 'inactive', priority: 40},
                // {id: 11, event: 'freespinsStop', state: false, priority: 40, removeEvents: [10]},
                // {id: 12, event: 'SpinStart', state: 'inactive', priority: 20},
                // {id: 13, event: 'SpinResponce', state: 'stop', priority: 20},
                // {id: 14, event: 'StopPress', state: 'stopInactive', priority: 20},
                // {id: 15, event: 'SpinStop', state: false, priority: 20, removeEvents: [12]}
            ],
            double: [],
            info: [],
            lines: [],
            maxBet: [],
            oneBet: [],
            payTableArrowLeft: [],
            payTableArrowRight: [],
            payTableCloseButton: []
        };
    };

};

module.exports = ModulesLogicConfigButtons;
