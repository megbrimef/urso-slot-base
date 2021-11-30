class ComponentsWinLinesController extends Urso.Core.Components.Base.Controller {

    constructor() {
        super();

        this._animateByOneIndex = -1;
    }

    _animateAllStartHandler() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const firstStageSlotWin = slotMachineData.spinStages[0].slotWin;

        if(!firstStageSlotWin){
            this.emit('components.winlines.animateAll.finished', null, 1);
            return;
        }

        const lineWinAmounts = firstStageSlotWin.lineWinAmounts;
        const lastIndex = { index: lineWinAmounts.length };

        const callback = () => {
            if (--lastIndex.index === 0)
                this.emit('components.winlines.animateAll.finished', null, 1);
        };

        for (let i = 0; i < lineWinAmounts.length; i++) {
            const line = lineWinAmounts[i];

            this._animateLine(line.selectedLine, callback);
            this._runSymbolAnimation(line);
        }
    };

    _runSymbolAnimation(line) {
        for (let j = 0; j < line.wonSymbols.length; j++) {
            const [reel, row] = line.wonSymbols[j];

            this.emit('components.slotMachine.symbolAnimate', { reel, row });
        }
    };

    _animateLine(lineIndex, callback) {
        const line = this.common.findOne(`^line${lineIndex}`);

        if (line) {
            line.visible = true;
            line.setAnimationConfig({
                onComplete: () => {
                    line.visible = false;

                    callback && callback();
                }
            });

            const animationName = this._getAnimationName(lineIndex);
            line.play(animationName);
        } else {
            setTimeout(callback, 1000);
        }
    };

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
        }
    }

    _animateByOneStartHandler() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const firstStageSlotWin = slotMachineData.spinStages[0].slotWin;

        this._animateByOneIndex = 0;

        const callback = () => {
            if (this._animateByOneIndex !== -1) {
                if (!firstStageSlotWin.lineWinAmounts[this._animateByOneIndex])
                    this._animateByOneIndex = 0;

                const line = firstStageSlotWin.lineWinAmounts[this._animateByOneIndex];

                this._runSymbolAnimation(line);
                this._animateLine(line.selectedLine, callback);
                this._animateByOneIndex++;
                return;
            }
        };

        callback();
    };

    _animateByOneStop() {
        if(this._animateByOneIndex === -1)
            return;

        this._animateByOneIndex = -1;
        this._stopAllAnimation();
    };

    _stopAllAnimation() {
        const winlines = this.common.findAll('.winline');

        winlines.forEach(winline => {
            winline._baseObject.animation.stop();
            winline._baseObject.animation.reset();
            winline.visible = false;
        });

        this.emit('components.winlines.animateByOne.finished', null, 1);
    }

    _subscribeOnce() {
        this.addListener('components.winlines.animateAll.start', this._animateAllStartHandler.bind(this));
        this.addListener('components.winlines.animateByOne.start', this._animateByOneStartHandler.bind(this));
        this.addListener('components.slotMachine.spinCommand', this._animateByOneStop.bind(this));
        this.addListener('components.winlines.stop', this._animateByOneStop.bind(this));
    };
}

module.exports = ComponentsWinLinesController;
