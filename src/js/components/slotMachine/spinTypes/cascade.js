const ComponentsSlotMachineSpinTypesBasic = require('./basic');

class ComponentsSlotMachineSpinTypesCascade extends ComponentsSlotMachineSpinTypesBasic {
    constructor() {
        super()

        this.symbolsDropped = true;
    }

    spinHandler() {
        this.reelsMovedCounter = new Array(this.reelsCount).fill(this.rowsCount);

        const { start, stop } = this._config.dropTimings;
        this.symbolsDropped = false;

        if (!this.spinning) {

            this.spinTween.to({progress: 0}, start.defaultDelay / 1000, {progress: 100, onComplete: () => {
                this._startSpin(start.reelsDelay, start.rowsDelay)
            }})

            return
        }

        this.symbolsDropped = true;
        this.spinning = false;

        this.spinTween.to({progress: 0}, stop.defaultDelay / 1000, {progress: 100, onComplete: () => {
            this._startSpin(stop.reelsDelay, stop.rowsDelay)
        }})

    }

    _tweenReelHandler(reelIndex, rowsDelay) {
        this._tweenReel(reelIndex, rowsDelay);
    }

    _tweenReel(reelIndex, rowDelay) {
        const delay = rowDelay || 0;

        for(let i = 0; i < this.rowsCount; i++)
            this._tweenReelSymbols(reelIndex, delay);
    }

    _checkIfReelMoveDone(reelIndex) {
        this.reelsMovedCounter[reelIndex]--;

        if (this.reelsMovedCounter[reelIndex] === 0 && !this._newSymbolsDroping)
            return this._onReelStopCallback(reelIndex);
          
        this._onDropNewSymbolsOver()
    }

    _onReelStopCallback(reelIndex) {
        this._lastStoppedReelIndex = reelIndex;
        this._reelsMovingCount--;
        this._symbols[reelIndex].forEach(symbol => symbol.data.reset())

        if (!this.symbolsDropped)
            this._moveReelSymbolsOnTop(reelIndex);

        if (this._reelsMovingCount === 0){

            if (!this.symbolsDropped){
                this._reelsMovingCount = this._config.reelsCount;
                this.spinHandler();  
            } else
                this._onSpinStopCallback();
        }
    }

    _moveReelSymbolsOnTop(reelIndex){
        for(let i = 0; i < this._symbols[reelIndex].length; i++)
            this._moveSymbolOnTop(reelIndex);
    }

}

module.exports = ComponentsSlotMachineSpinTypesCascade;