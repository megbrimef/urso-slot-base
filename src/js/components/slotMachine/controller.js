class ComponentsSlotMachineController extends Urso.Core.Components.StateDriven.Controller {
    _eventPrefix = 'components.slotMachine';

    configStates = {
        DROP: {
            guard: () => this._hasWin(),
        },
        FINISH_WIN_ROUND: {
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
        dropAction: {
            run: (finishClbk) => this._runDrop(finishClbk),
        },
        updateSymbolsTintConfigAction: {
            run: (finishClbk) => this._runUpdateSymbolsTintConfig(finishClbk),
        },
        setSymbolsDarkenTintAction: {
            run: (finishClbk) => this._runSetSymbolsDarkenTint(finishClbk),
        },
        setSymbolsDefaultTintAction: {
            run: (finishClbk) => this._runSetSymbolsDefaultTint(finishClbk),
        },
        updateTurboModeAction: {
            run: (finishClbk) => this._runUpdateTurboMode(finishClbk),
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

    _runUpdateSymbolsTintConfig(finishClbk) {
        this._service.updateSymbolsTintConfig();
        finishClbk();
    }

    _runSetSymbolsDarkenTint(finishClbk) {
        this._service.setSymbolsDarkenTint();
        finishClbk();
    }

    _runSetSymbolsDefaultTint(finishClbk) {
        this._service.setSymbolsDefaultTint();
        finishClbk();
    }

    // ACTION
    _guardStartTurboMode() {
        return Urso.localData.get('settings.turboMode');
    }

    _runUpdateTurboMode(finishClbk) {
        this._service.updateTurboMode();
        finishClbk();
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

    _symbolStopAllAnimationHandler = () => this._service.symbolStopAllAnimation();

    _symbolStopAllAnimation() {
        this._service.symbolStopAllAnimation();
    }

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
        this._addComponentListener('symbolAnimateStop', this._symbolStopAllAnimationHandler);
        this._addComponentListener('spinComplete', this._spinCompleteHandler);
    };
}

module.exports = ComponentsSlotMachineController;
