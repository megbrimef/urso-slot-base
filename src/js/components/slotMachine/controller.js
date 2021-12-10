class ComponentsSlotMachineController extends Urso.Core.Components.StateDriven.Controller {
    _eventPrefix = 'components.slotMachine';

    configStates = {
        DROP: {
            guard: () => this._hasWin()
        }
    }
   
    configActions = {
        // waitingForInteractionAction: { 
        //     run: () => this._runWaitingForInteraction(),
        //     terminate: () => this._terminateWaitingForInteraction()
        // },
        regularSpinStartAction: {
            run: () => this._runRegularSpinStart()
        },
        updateSlotMachineDataAction: {
            run: () => this._runUpdateSlotMachineData()
        },
        finishingSpinAction: {
            run: () => this._runFinishingSpinAction(),
            terminate: () => this._terminateFinishingSpinAction()
        },
        fastSpinAction: {
            run: () => this._runFastSpin(),
            terminate: () => this._finishFastSpin()
        },
        dropAction: {
            run: (finishClbk) => this._runDrop(finishClbk),
        },
        stopAllSymbolsAnimationAction: {
            run: () => {},
            terminate: () => this._terminateStopAllSymbols()
        }
    }

    _stopWinlines = null;

    constructor(options) {
        super(options);
        this._id = options.id;

        this._service = this.getInstance('Service');
        this.tween = this.getInstance('Tween');
    }

    create() {
        this._service.create(this._id);
    }

    update() {
        this.tween.update();
    } 
    
    // ACTION waitingForInteractionAction
    
    // _runWaitingForInteraction() {
    //     this._addComponentListener('spinCommand', this._spinCommandHandler);
    // }

    // _terminateWaitingForInteraction() {
    //     this._spinCommandHandler();
    // }

    // _spinCommandHandler = () => {
    //     this._spinCommand();
    //     this._removeComponentListener('spinCommand', this._spinCommandHandler);
    // }

    // _spinCommand = () => {
    //     this.callFinish('waitingForInteractionAction');
    // };

    // ACTION regularSpinStartAction

    _runRegularSpinStart() {
        this._service.startSpin();
        this.callFinish('regularSpinStartAction');
    }

     // ACTION updateSlotMachineDataAction
    
    _runUpdateSlotMachineData() {
        this._setSpinNewSymbols();
        this.callFinish('updateSlotMachineDataAction');
    }

    _setSpinNewSymbols() {
        const spinSymbols = Urso.localData.get('slotMachine.spinStages.0.spinResult.rows');
        this._service.setSpinNewSymbols(spinSymbols);
    }

    // ACTION
    _runFinishingSpinAction() {
        this._service.finishSpin();
    }

    _terminateFinishingSpinAction() {
        this._service.speedUpReels();
    }

    _runFastSpin() {
        this._addComponentListener('stopCommand', this._fastSpinHandler);
    }

    _fastSpinHandler = () => {
        this._finishFastSpin();
    }

    _finishFastSpin() {
        this._removeComponentListener('stopCommand', this._fastSpinHandler);
        this.callFinish('fastSpinAction');
    }

    _hasWin() {
        return this._getWinlines().length > 0
    }

    _getWinlines() {
        return Urso.localData.get('slotMachine.spinStages.0.slotWin.lineWinAmounts') || [];
    }

    // ACTION

    _runDrop(finishClbk) {
        const winLines = this._getWinlines();
        const wonSymbols = winLines
            .reduce((acc, { wonSymbols }) => [...acc, ...wonSymbols], []);
        
        this._service.prepareDrop(wonSymbols);

        finishClbk();
    }

    _terminateStopAllSymbols() {
        this._service.symbolStopAllAnimationHandler();
        this.callFinish('stopAllSymbolsAnimationAction');
    }

    // //position: {reel:2, row:1}
    _symbolAnimate(position) {
        this._service.symbolAnimate(position);
    }   
    
    // //position: {reel:2, row:1}
    _stopSymbolAnimateHandler(position) {
        this._service.symbolStopAnimation(position);
    }
    
    // _speedUpReelsHandler = () => this._service.speedUpReels();
    
    // /**
    //  * set intrigue to spinning reels
    //  * @param {Number} reelIndexFrom 
    //  */
    // _intrigueHandler = (reelIndexFrom) => this._service.intrigue(reelIndexFrom);
    
    // _symbolStopAllAnimation() {
    //     this._service.symbolStopAllAnimationHandler();
    // }
    
    _drop(matrix) {
        this._service.setDropMatrix(Urso.helper.transpose(matrix));
    }
    
    _spinComplete = ({ type }) => {
        this._service.setBaseConfig();
        this.callFinish('finishingSpinAction');
    };

    _spinCompleteHandler = (params) => this._spinComplete(params);

    _symbolAnimateHandler = (position) => this._symbolAnimate(position);

    // _symbolStopAllAnimationHandler = () => this._symbolStopAllAnimation();
    // _dropHandler = (matrix) => this._drop(matrix);
    // _cycleFinishedHandler = () => this._cycleFinished();
    
    _addComponentListener = (key, clbk) => this.addListener(`${this._eventPrefix}.${key}`, clbk);
    _removeComponentListener = (key, clbk) => this.removeListener(`${this._eventPrefix}.${key}`, clbk);

    // components.slotMachine.spinComplete
    _subscribeOnce = () => {
        super._subscribeOnce();
    //     // this._addComponentListener('spinCommand', this._spinCommandHandler);
    
    //     // this._addComponentListener('spinStart', this._spinHandler);
    //     // this._addComponentListener('setSpinSymbols', this._setSpinSymbolsHandler);
        this._addComponentListener('symbolAnimate', this._symbolAnimateHandler);
    //     // this._addComponentListener('symbolAnimateAllStop', this._symbolStopAllAnimationHandler);
    //     // this._addComponentListener('stopSymbolAnimate', this._stopSymbolAnimateHandler);
    //     // this._addComponentListener('speedUpReels', this._speedUpReelsHandler);
    //     // this._addComponentListener('intrigue', this._intrigueHandler);
        // this._addComponentListener('drop', this._dropHandler);
        this._addComponentListener('spinComplete', this._spinCompleteHandler);
    //     // this._addComponentListener('cycleFinished', this._cycleFinishedHandler);

    };
}

module.exports = ComponentsSlotMachineController;
