class ComponentsSlotMachineController extends Urso.Core.Components.StateDriven.Controller {
    _eventPrefix = 'components.slotMachine';

    configStates = {
        DROP: {
            guard: () => this._hasWin(),
        },
    };

    configActions = {
        regularSpinStartAction: {
            run: () => this._runRegularSpinStart(),
        },
        updateSlotMachineDataAction: {
            run: () => this._runUpdateSlotMachineData(),
        },
        finishingSpinAction: {
            run: () => this._runFinishingSpinAction(),
            terminate: () => this._terminateFinishingSpinAction(),
        },
        // fastSpinAction: {
        //     run: () => this._runFastSpin(),
        //     terminate: () => this._finishFastSpin(),
        // },
        dropAction: {
            run: (finishClbk) => this._runDrop(finishClbk),
        },
        stopAllSymbolsAnimationAction: {
            run: () => {},
            terminate: () => this._terminateStopAllSymbols(),
        },
    };

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

    // _runFastSpin() {
    //     this._addComponentListener('stopCommand', this._fastSpinHandler);
    // }

    // _fastSpinHandler = () => {
    //     this._finishFastSpin();
    // };

    // _finishFastSpin() {
    //     this._removeComponentListener('stopCommand', this._fastSpinHandler);
    //     this.callFinish('fastSpinAction');
    // }

    _hasWin() {
        return this._getWinlines().length > 0;
    }

    _getWinlines() {
        return Urso.localData.get('slotMachine.spinStages.0.slotWin.lineWinAmounts') || [];
    }

    // ACTION

    _runDrop(finishClbk) {
        const winLines = this._getWinlines();
        const wonSymbolsList = winLines
            .reduce((acc, { wonSymbols }) => [...acc, ...wonSymbols], []);

        this._service.prepareDrop(wonSymbolsList);

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

    _spinComplete() {
        this._service.setBaseConfig();
        this.callFinish('finishingSpinAction');
    }

    _spinCompleteHandler = (params) => this._spinComplete(params);

    _symbolAnimateHandler = (position) => this._symbolAnimate(position);

    _addComponentListener = (key, clbk) => this.addListener(`${this._eventPrefix}.${key}`, clbk);

    _removeComponentListener = (key, clbk) => this.removeListener(`${this._eventPrefix}.${key}`, clbk);

    _subscribeOnce = () => {
        super._subscribeOnce();
        this._addComponentListener('symbolAnimate', this._symbolAnimateHandler);
        this._addComponentListener('spinComplete', this._spinCompleteHandler);
    };
}

module.exports = ComponentsSlotMachineController;
