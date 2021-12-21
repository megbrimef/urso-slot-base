const Wheel = require('./wheel');
class ComponentsSlotMachineCascade extends Wheel {

    _wasDropped = [];
    
    _getOneSymbolTweenDuration() {
        if(this._dropMatrix) {
            return super._getOneSymbolTweenDuration();
        }

        return this._config.cascadeDuration;
    }

    _moveAllSymbolsToTop(reelIndex) {
        const reel = this._symbols[reelIndex];

        for (let rowIndex = 0; rowIndex < reel.length; rowIndex++) {
            this._setSymbolToPosition(reelIndex, rowIndex);
            this._setSymbolConfig(reelIndex, rowIndex);
            this._setSymbolPositionForDrop(reelIndex, rowIndex);
        }
    }

    _moveDone(reelIndex) {
        return () => {
            if(this._dropMatrix) {
                
                if(reelIndex === this._config.reelsCount - 1){
                    this._dropMatrix = null;
                }

                this._onReelStopCallback(reelIndex);
                return;
            }

            if(!this._wasDropped[reelIndex]) {
                this._moveAllSymbolsToTop(reelIndex);
                this._tweenReel(reelIndex);
                this._wasDropped[reelIndex] = true;
                return;
            }

            this._onReelStopCallback(reelIndex);
        }
    }

    _makeRegularMoveMatrix() {
        const { rowsCount } = this._config;
        return super._makeRegularMoveMatrix(rowsCount);
    }

    _startSpin(){
        super._startSpin();
        this._wasDropped = new Array(this._symbols.length).fill(false);
    }

    _getCurrentSymbolConfig(reelIndex) {
        return this._spinNewSymbols[reelIndex].shift();
    }
}

module.exports = ComponentsSlotMachineCascade;
