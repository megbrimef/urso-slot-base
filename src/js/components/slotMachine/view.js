class ComponentsSlotMachineView {

    constructor() {
        this._parent;
        this.width;
        this.height;

        this._config;
        this._service;
        this._symbols = [];

        this._symbolWidth;
        this._symbolHeight;

        this._spinning = false;
        this._remainingBlurSymbolsCount;
        this._remainTweenSymbolsCount;
        this._spinNewSymbolsReceived = false;
        this._spinNewSymbols = null;

        this._timeScale = 1;
        this._intrigue = false;
        this._intrigueStartsFrom = 0;
        this._lastStoppedReelIndex = -1;

        this.tween = this.getInstance('Tween');
        this._reelTweens = [];
    }

    setConfig(config) {
        this._config = config;
    }

    setService(service) {
        this._service = service;
    }

    create(startSymbols) {
        this._setup();

        for (let reelIndex = 0; reelIndex < this._config.get().reelsCount; reelIndex++) {
            let reel = [];

            for (let rowIndex = 0; rowIndex < this._config.get().rowsCount; rowIndex++) {
                let symbolConfig = this._getSymbolsConfig(startSymbols[reelIndex][rowIndex]);
                let symbol = this._getSymbol(symbolConfig);

                symbol.setPosition(
                    (reelIndex + 0.5) * this._symbolWidth,
                    (rowIndex + 0.5) * this._symbolHeight
                );

                reel.push(symbol);
            }

            this._symbols.push(reel);
        }
    }

    startSpin() {
        this._startSpin();
    }

    setSpinNewSymbols(symbolsConfigs) {
        this._spinNewSymbolsReceived = true;
        this._spinNewSymbols = symbolsConfigs;
    }

    //position: {reel:2, row:1}
    symbolAnimate(position) {
        this._symbols[position.reel][position.row].animate()
    }

    symbolStopAnimation(position) {
        this._symbols[position.reel][position.row].stopAnimation()
    }

    symbolStopAllAnimationHandler() {
        for (let reelIndex = 0; reelIndex < this._config.get().reelsCount; reelIndex++) {
            for (let i = 0; i < this._symbols[reelIndex].length; i++) {
                const symbol = this._symbols[reelIndex][i];
                symbol.stopAnimation();
            }
        }
    }

    speedUpReels() {
        this._timeScale = this._config.get().speedUpReelsFactor;

        for (let reelIndex = 0; reelIndex < this._config.get().reelsCount; reelIndex++) {
            this._reelTweens[reelIndex].timeScale = this._timeScale;
        }
    }

    intrigue(reelIndexFrom) {
        if (this._intrigue)
            return false;

        this._intrigue = true;
        this._intrigueStartsFrom = reelIndexFrom;

        //add new symbols to the _remainingBlurSymbolsCount
        for (let i = reelIndexFrom; i < this._remainingBlurSymbolsCount.length; i++)
            this._remainingBlurSymbolsCount[i] += this._config.get().intrigueAdditionalSymbols;
    }

    _setup() {
        this._parent = Urso.findOne('^slotMachine'); //todo refactoring to this._object ?!
        this.width = this._parent.width;
        this.height = this._parent.height;
        this._symbolWidth = this.width / this._config.get().reelsCount;
        this._symbolHeight = this.height / this._config.get().rowsCount;

        //check int values
        if (this._symbolWidth !== ~~this._symbolWidth || this._symbolHeight !== ~~this._symbolHeight)
            Urso.logger.error('ComponentsSlotMachineView dimension error. Use int width/height values.')
    }

    _getSymbolsConfig(symbolData) {
        return {
            key: symbolData.key,
            template: symbolData.object,
            parent: this._parent
        }
    }

    _getSymbol(symbolConfig) {
        return this.getInstance('Symbol', symbolConfig);
    }

    //////////////////spin

    _startSpin() {
        if (this.spinning)
            return false;

        this.spinning = true;
        Urso.localData.set('spinning', true);

        this._resetSpinState();

        for (let reelIndex = 0; reelIndex < this._config.get().reelsCount; reelIndex++) {
            let delay = reelIndex * this._config.get().spinStartInterval;
            setTimeout(() => this._tweenReel(reelIndex), delay);
        }

        //TODO: CHECK FOR EVENT // move emit to controller
        this.emit('components.slotMachine.spinStarted');
    }

    _resetSpinState() {
        this._timeScale = 1;
        this._intrigue = false;
        this._intrigueStartsFrom = 0;
        this._lastStoppedReelIndex = -1;
        this._spinning = true;
        this._remainingBlurSymbolsCount = this._config.get().blurSymbolsCount;
        this._remainTweenSymbolsCount = new Array(this._remainingBlurSymbolsCount.length).fill([]);
        this._spinNewSymbolsReceived = false;
        this._spinNewSymbols = null;
        this._reelTweens = [];
    }

    _tweenReel(reelIndex) {
        this._checkSymbolsPositions(reelIndex);

        const doneCallback = () => {
            this._checkSymbolsPositions(reelIndex);

            if (this._checkCanTweenReel(reelIndex))
                this._tweenReel(reelIndex);
            else
                this._onReelStopCallback(reelIndex);
        };

        this._tweenReelSymbols(reelIndex, doneCallback);
    }

    _tweenReelSymbols(reelIndex, doneCallback) {
        let duration = this._getOneSymbolTweenDuration();
        let tempObject = { y: 0 };

        if (!this._reelTweens[reelIndex])
            this._reelTweens[reelIndex] = this.tween.add(tempObject);
        else
            this._reelTweens[reelIndex].target = tempObject;

        const tween = this._reelTweens[reelIndex];
        const timeScale = this._getTweenTimeScale(reelIndex);

        if (timeScale !== 1)
            this._reelTweens[reelIndex].timeScale = timeScale;

        tween.onComplete.addOnce(() => {
            doneCallback();
        }, this);

        //symbols logic
        const updateCallbacks = [];
        for (let i = 0; i < this._symbols[reelIndex].length; i++) {
            let symbol = this._symbols[reelIndex][i]
            let position = symbol.getPosition();

            updateCallbacks.push(() => { symbol.object.y = position.y + tempObject.y });
        }

        tween.onUpdateCallback(() => {
            for (let clbk of updateCallbacks)
                clbk();
        });

        tween.to({
            y: this._symbolHeight
        }, duration, "none", true);
    }

    _getTweenTimeScale(reelIndex) {
        let timeScale = this._timeScale;

        if (
            this._intrigue &&
            reelIndex >= this._intrigueStartsFrom &&
            reelIndex === (this._lastStoppedReelIndex + 1)
        ) {
            timeScale = timeScale * this._config.get().intrigueSpeedReelsFactor;
        }

        return timeScale;
    }

    _onReelStopCallback(reelIndex) {
        this._lastStoppedReelIndex = reelIndex;

        if (reelIndex === 4)
            this._onSpinStopCallback();
    }

    _onSpinStopCallback() {
        //reset symbols tweens
        for (let reelIndex = 0; reelIndex < this._config.get().reelsCount; reelIndex++) {
            for (let i = 0; i < this._symbols[reelIndex].length; i++) {
                let symbol = this._symbols[reelIndex][i];
                symbol.tween = null;
            }
        }


        this.spinning = false;
        Urso.localData.set('spinning', false);

        // TODO: ADDED FOR DEMO  //TODO move emit to controller
        this.emit('components.slotMachine.spinComplete', null, this._config.get().spinCompleteDelay);
    }

    _checkCanTweenReel(reelIndex) {
        this._checkNeedUpdateRemainingBlurSymbolsCount(reelIndex);
        this._remainTweenSymbolsCount[reelIndex]--;
        let result = (this._remainTweenSymbolsCount[reelIndex] > 0)

        return result;
    }

    _getOneSymbolTweenDuration() {
        return this._symbolHeight / this._config.get().symbolSpeed;
    }

    _checkSymbolsPositions(reelIndex) {
        let requiredMinY = (0.5) * this._symbolHeight
        let allowedMaxY = (this._config.get().rowsCount + 0.5) * this._symbolHeight;

        let newSymbols = [];

        //check destroy
        const minY = this._getMinYAndDestroyInvisibleBlurSymbols(reelIndex, allowedMaxY, newSymbols);

        if (this._remainingBlurSymbolsCount[reelIndex] > 0 || this._spinNewSymbols[reelIndex].length > 0) {
            this._checkNeedAddSymbolOnTop(reelIndex, requiredMinY, minY, newSymbols);
        }

        //rewrite symbols
        this._symbols[reelIndex] = newSymbols;
    }

    _getMinYAndDestroyInvisibleBlurSymbols(reelIndex, allowedMaxY, newSymbols) {
        let minY;

        for (let i = 0; i < this._symbols[reelIndex].length; i++) {
            let symbol = this._symbols[reelIndex][i]
            let position = symbol.getPosition();

            if (!minY || position.y < minY)
                minY = position.y;

            if (position.y >= allowedMaxY) {
                symbol.tween = null;
                symbol.destroy();
            } else
                newSymbols.push(symbol);
        }

        return minY;
    }

    _checkNeedAddSymbolOnTop(reelIndex, requiredMinY, minY, newSymbols) {
        if (requiredMinY <= minY) {
            let symbolConfig;

            if (this._remainingBlurSymbolsCount[reelIndex] > 0) {
                symbolConfig = this._getSymbolsConfig(this._service._getRandomSymbolConfig());
                this._remainingBlurSymbolsCount[reelIndex]--;
                this._remainTweenSymbolsCount[reelIndex]++;
            } else if (this._spinNewSymbols[reelIndex].length > 0) {
                symbolConfig = this._getSymbolsConfig(this._spinNewSymbols[reelIndex].pop());
                this._remainTweenSymbolsCount[reelIndex]++;
            } else {
                Urso.logger.error('ComponentsSlotMachineView checkSymbolsPositions logic fatal error. Kernel is in panic.')
            }

            let symbol = this._getSymbol(symbolConfig);

            symbol.setPosition(
                (reelIndex + 0.5) * this._symbolWidth,
                minY - this._symbolHeight
            );

            newSymbols.unshift(symbol);
        }
    }

    _checkNeedUpdateRemainingBlurSymbolsCount(reelIndex) {
        if (!this._spinNewSymbolsReceived && this._remainingBlurSymbolsCount[reelIndex] === 0)
            //we need add a new cout for all reels
            for (let i = 0; i < this._remainingBlurSymbolsCount.length; i++)
                this._remainingBlurSymbolsCount[i]++
    }
}

module.exports = ComponentsSlotMachineView;
