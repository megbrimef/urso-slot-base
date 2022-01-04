class ComponentsWinLinesController extends Urso.Core.Components.StateDriven.Controller {
    _animateByOneIndex = -1;

    configStates = {
        SHOW_WIN: {
            guard: () => this._hasWin,
        },
    };

    configActions = {
        showWinlinesAnimationAllAction: {
            guard: () => this._hasWin,
            run: () => this._runShowWinlinesAnimationAll(),
            terminate: () => this._terminateShowWinlinesAnimationAll(),
        },
        showWinlinesAnimationByOneAction: {
            guard: () => this._hasWin,
            run: () => this._runShowWinlinesAnimationByOne(),
            terminate: () => this._terminateShowWinLinesAnimationByOne(),
        },
    };

    get _hasWin() {
        return Urso.localData.get('slotMachine.spinStages.0.slotWin.lineWinAmounts');
    }

    _animateAllCycleFinishedHandler = () => {
        this._unsubscribeCycleFinished(this._animateAllCycleFinishedHandler);
        this.callFinish('showWinlinesAnimationAllAction');
    };

    _runShowWinlinesAnimationAll() {
        this._subscribeCycleFinished(this._animateAllCycleFinishedHandler);
        this._showWinlinesAnimationAll();
    }

    _terminateShowWinlinesAnimationAll() {
        this.emit('components.slotMachine.symbolAnimateStop');
    }

    // ACTION showWinlinesAnimationByOneAction
    _runShowWinlinesAnimationByOne() {
        this._subscribeCycleFinished(this._byOneCycleFinishedHandler);
        this._startAnimateByOne();
    }

    _terminateShowWinLinesAnimationByOne() {
        this._unsubscribeCycleFinished(this._byOneCycleFinishedHandler);
        this.callFinish('showWinlinesAnimationByOneAction');
    }

    _byOneCycleFinishedHandler = () => {
        this._startAnimateByOne();
    };

    _subscribeCycleFinished(clbk) {
        this.addListener('components.slotMachine.cycleFinished', clbk);
    }

    _unsubscribeCycleFinished(clbk) {
        this.removeListener('components.slotMachine.cycleFinished', clbk);
    }

    _showWinlinesAnimationAll() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const firstStageSlotWin = slotMachineData.spinStages[0].slotWin;
        const { lineWinAmounts } = firstStageSlotWin;

        for (let i = 0; i < lineWinAmounts.length; i++) {
            const line = lineWinAmounts[i];

            this._animateLine(line.selectedLine);
            this._runSymbolAnimation(line);
        }
    }

    _runSymbolAnimation(line) {
        for (let j = 0; j < line.wonSymbols.length; j++) {
            const [reel, row] = line.wonSymbols[j];
            this.emit('components.slotMachine.symbolAnimate', { reel: +reel, row: +row });
        }
    }

    _animateLine(lineIndex) {
        const line = this.common.findOne(`^line${lineIndex}`);

        if (line) {
            line.visible = true;
            line.setAnimationConfig({
                onComplete: () => {
                    line.visible = false;
                },
            });

            const animationName = this._getAnimationName(lineIndex);
            line.play(animationName);
        }
    }

    _getAnimationName(lineIndex) {
        switch (+lineIndex) {
        case 0:
        case 1:
        case 2:
            return 'l0';

        case 6:
        case 5:
            return 'l5';

        case 3:
        case 4:
        case 7:
        case 8:
            return 'l7';
        default:
            return null;
        }
    }

    _startAnimateByOne() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const firstStageSlotWin = slotMachineData.spinStages[0].slotWin;

        if (!firstStageSlotWin.lineWinAmounts[this._animateByOneIndex]) {
            this._animateByOneIndex = 0;
        }

        const line = firstStageSlotWin.lineWinAmounts[this._animateByOneIndex++];
        this._runSymbolAnimation(line);
        this._animateLine(line.selectedLine);
    }

    _stopAllAnimation() {
        const winlines = this.common.findAll('.winline');

        winlines.forEach((winline) => {
            winline._baseObject.animation.stop();
            winline._baseObject.animation.reset();
            winline.visible = false;
        });

        this.emit('components.winlines.animateByOne.finished', null, 1);
    }
}

module.exports = ComponentsWinLinesController;
