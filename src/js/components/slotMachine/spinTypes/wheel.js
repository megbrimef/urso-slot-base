class ComponentsSlotMachineWheel {
    _config = null;
    _service = null;
    _pool = null;
    _dropMatrix = null;
    _bounceTweens = false;
    _moveMatrix = [];
    _animatedSymbolsMap = {};
    _reelMoving = [];
    _turboModeEnabled = false;
    _destroyAnimations = {};
    _dropTweens = {}

    constructor() {
        this._symbols = [];

        this._symbolWidth = null;
        this._symbolHeight = null;

        this._spinning = false;
        this._remainingBlurSymbolsCount = [];

        this._finishSpin = false;
        this._spinNewSymbols = [];

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
        this._createPool();
        this._updateSlotMachineSymbols(startSymbols);
        this._setSlotMachineSizes();
        this._setSymbolsPosition();
        this._createMask();

        this._switchMaskVisibility(false);
        this._switchBorderSymbolsAllVisibility(false);
    }

    _createMask() {
        const { borderSymbolsCount, maskObjectRectangles } = this._config;
        const reelsCount = this._symbols.length;
        const rowsCount = this._symbols[0].length - borderSymbolsCount * 2;

        const params = {
            reelsCount: reelsCount,
            rowsCount: rowsCount,
            symbolWidth: this._symbolWidth,
            symbolHeight: this._symbolHeight
        };

        const maskObjectRectanglesValue = maskObjectRectangles.map(
            (rectString) => eval(
                Urso.helper.interpolate(rectString, params)
            )
        );

        this.mask = Urso.objects.create({
            type: Urso.types.objects.MASK,
            name: 'slotMachineMask',
            rectangles: maskObjectRectanglesValue,
        }, this.common.object);
    }

    _switchBorderSymbolsAllVisibility(isVisible) {
        const { reelsCount } = this._config;

        for (let i = 0; i < reelsCount; i++) {
            this._switchBorderSymbolsVisibility(i, isVisible)
        }
    }

    _switchBorderSymbolsVisibility(reelIndex, isVisible) {
        const { borderSymbolsCount } = this._config;
        const reel = this._symbols[reelIndex];

        for (let symIndex = 0; symIndex < borderSymbolsCount; symIndex++) {
            const { data } = reel[symIndex];

            if (isVisible) {
                data.show();
            } else {
                data.hide();
            }
        }

        const startIndex = reel.length - borderSymbolsCount;

        for (let symIndex = startIndex; symIndex < reel.length; symIndex++) {
            const { data } = reel[symIndex];

            if (isVisible) {
                data.show();
            } else {
                data.hide();
            }
        }
    }

    _switchMaskVisibility(isVisible) {
        this.common.object._baseObject.mask = isVisible ? this.mask._baseObject : null;
        this.mask.visible = isVisible;
    }

    setDropMatrix(matrix) {
        this._dropMatrix = matrix;
    }

    _createPool() {
        const makeSymbol = this._makeSymbol.bind(this);
        const resetSymbol = this._resetSymbol.bind(this);
        this._pool = new Urso.Game.Lib.ObjectPool(makeSymbol, resetSymbol);
    }

    _makeSymbol() {
        return this.getInstance('Symbol');
    }

    _resetSymbol(symbol) {
        return symbol;
    }

    _createSymbols(startSymbols) {
        return startSymbols
            .map((reel) => reel.map((symData) => {
                const symbolObject = this._pool.getElement('slotMachine');
                symbolObject.data.setConfig(this._getSymbolsConfig(symData));
                return symbolObject;
            }));
    }

    _setSymbolsPosition() {
        this._symbols.map((reel, reelIndex) => reel.map(this._setSymbolPosition(reelIndex)));
    }

    _setSymbolPosition(reelIndex) {
        return ({ data }, rowIndex) => {
            const position = this._calculateSymbolPosition(data, reelIndex, rowIndex);
            data.setPosition(position);
        };
    }

    _calculateSymbolPosition(data, reelIndex, rowIndex) {
        const { borderSymbolsCount } = this._config;
        const { _symbolWidth, _symbolHeight } = this;
        const { anchorX, anchorY } = data.getAnchors();
        const { xOffset, yOffset } = this._getSymbolOffset(reelIndex, rowIndex);
        const deltaY = borderSymbolsCount * _symbolHeight;
        const x = _symbolWidth * reelIndex + anchorX * _symbolWidth + xOffset;
        const y = _symbolHeight * rowIndex + anchorY * _symbolHeight - deltaY + yOffset;

        return { x, y };
    }

    _getSymbolOffset(reelIndex) {
        const { _symbolWidth, _symbolHeight } = this;
        const { rowsXoffset = [], rowsYoffset = [] } = this._config;
        const xOffset = (rowsXoffset[reelIndex] || 0) * _symbolWidth;
        const yOffset = (rowsYoffset[reelIndex] || 0) * _symbolHeight;
        return { xOffset, yOffset };
    }

    _updateSlotMachineSymbols(startSymbols) {
        this._clearSymbols();
        this._symbols = this._createSymbols(startSymbols);
    }

    _clearSymbols() {
        this._symbols
            .forEach((reel) => reel
                .forEach((sym) => this._pool.putElement(sym)));
    }

    _setBounce(key) {
        const { bounce } = this._config;
        if (bounce && bounce[key]) {
            this._bounceTweens = [];
        }
    }

    startSpin() {
        this._resetSpinState();
        this._updateMoveData();

        if (!this._dropMatrix) {
            this._setBounce('top');
            this._startSpin();
        }
    }

    _updateMatrixForDrop() {
        this._switchBorderSymbolsAllVisibility(true);

        for (let reelIndex = 0; reelIndex < this._dropMatrix.length; reelIndex++) {
            const reel = this._dropMatrix[reelIndex];
            const maxMoveAmount = reel.filter((row) => row).length;

            let moveAmount = 0;
            for (let rowIndex = reel.length - 1; rowIndex >= 0; rowIndex--) {

                if (reel[rowIndex]) {
                    moveAmount++;
                    this._setSymbolPositionForDrop(reelIndex, rowIndex, moveAmount + rowIndex);
                }

                if (moveAmount === 0) {
                    continue;
                }

                this._moveMatrix[reelIndex][rowIndex] = reel[rowIndex] ? maxMoveAmount : moveAmount;

                if (!reel[rowIndex]) {
                    const temp = this._moveMatrix[reelIndex][rowIndex + 1];
                    this._moveMatrix[reelIndex][rowIndex + 1] = this._moveMatrix[reelIndex][rowIndex];
                    this._moveMatrix[reelIndex][rowIndex] = temp;
                }
            }
        }
    }

    _sortSymbols() {
        this._symbols.forEach((reel) => {
            reel.sort((a, b) => a.data.getPosition().y - b.data.getPosition().y);
        });
    }

    setSpinNewSymbols(symbolsConfigs) {
        this._spinNewSymbols = symbolsConfigs;
    }

    _onPlayDestroySymbolFinish(key, finishClbk) {
        return () => {
            delete this._destroyAnimations[key];

            if (Object.keys(this._destroyAnimations).length === 0) {
                finishClbk();
            }
        }
    }

    runPlayDestroyAnimation(finishClbk) {
        for (let reelIndex = 0; reelIndex < this._dropMatrix.length; reelIndex++) {
            const reel = this._dropMatrix[reelIndex];
            for (let rowIndex = 0; rowIndex < reel.length; rowIndex++) {
                if (reel[rowIndex]) {
                    this._destroyAnimations[`${reelIndex}_${rowIndex}`] = true;
                    this._symbols[reelIndex][rowIndex].data
                        .playDestroyAnimation(this._onPlayDestroySymbolFinish(`${reelIndex}_${rowIndex}`, finishClbk));
                }
            }
        }
    }

    runPrepareSlotMachineForDrop() {
        if (this._dropMatrix) {
            this._updateMatrixForDrop();
            this._sortSymbols();
            this._updateSymbolsMatrix();
            this._switchMaskVisibility(true);
            this._switchBorderSymbolsAllVisibility(true);
        }
    }

    _playDropAnimation(key, symbols, config, callback) {
        const { duration, delay, ease } = config;
        symbols.forEach(([reelIndex, rowIndex], index) => {
            const { data } = this._symbols[reelIndex][rowIndex];
            const moveParam = this._moveMatrix[reelIndex][rowIndex];
            const { y, x } = data.getPosition();
            const from = { y };
            const toY = y + this._symbolHeight * moveParam;

            this._dropTweens[`${key}_${reelIndex}_${rowIndex}`] = gsap.to(from, {
                y: toY,
                delay: delay * index,
                duration,
                ease,
                onUpdate: () => {
                    data.setPosition({ x, y: from.y });
                },
                onComplete: () => {

                    data.playDropLandingAnimation(key, () => {
                        delete this._dropTweens[`${key}_${reelIndex}_${rowIndex}`];

                        if (Object.keys(this._dropTweens).filter(symKey => symKey.includes(key)).length === 0) {
                            callback();
                        }
                    })
                }
            });

            this._dropTweens[`${key}_${reelIndex}_${rowIndex}`].timeScale(this._timeScale);
        });
    }

    runDropRemainingSymbols(finishClbk) {
        if (!this._dropMatrix) {
            finishClbk();
            return;
        }

        const { borderSymbolsCount, rowsCount, dropRemainSymbols } = this._config;

        const remaningDropSymbols = [];

        for (let reelIndex = 0; reelIndex < this._dropMatrix.length; reelIndex++) {
            const reel = this._dropMatrix[reelIndex];
            let symbolsFromBoard = reel
                .slice(borderSymbolsCount, -borderSymbolsCount)


            let symbolsFromBoardAmount = symbolsFromBoard.filter(drop => drop).length;
            let lastIndex = symbolsFromBoard.findIndex(drop => !drop);

            let wasWin = false;
            for (let rowIndex = rowsCount - 1; rowIndex >= 0; rowIndex--) {
                if (wasWin && !reel[rowIndex + borderSymbolsCount]) {
                    remaningDropSymbols.push([reelIndex, rowIndex + borderSymbolsCount + symbolsFromBoardAmount - lastIndex]);
                }

                if (reel[rowIndex + borderSymbolsCount]) {
                    wasWin = true;
                }
            }
        }

        if (remaningDropSymbols.length === 0) {
            finishClbk();
            return;
        }

        this._playDropAnimation('one', remaningDropSymbols, dropRemainSymbols, finishClbk);
    }

    runDropNewSymbols() {
        const { borderSymbolsCount, dropNewSymbols } = this._config;

        const newDropSymbols = [];
        for (let reelIndex = 0; reelIndex < this._dropMatrix.length; reelIndex++) {
            const reel = this._dropMatrix[reelIndex];
            const symbolsFromTopAmount = reel.filter(drop => drop).length;
            for (let rowIndex = symbolsFromTopAmount; rowIndex > 0; rowIndex--) {
                newDropSymbols.push([reelIndex, rowIndex + borderSymbolsCount - 1]);
            }
        }

        this._playDropAnimation('two', newDropSymbols, dropNewSymbols, () => {
            this._setSymbolsPosition();
            this._updateSymbolsMatrix();
            this._onSpinStopCallback();
        });
    }

    speedUpDrop(type) {
        const { speedUpTimescale } = type === 'remaining' ? this._config['dropRemainingSymbols'] : this._config['dropNewSymbols'];

        this._timeScale = speedUpTimescale;

        Object.keys(this._dropTweens).forEach(key => {
            this._dropTweens[key].timeScale(this._timeScale);
        });
    }

    _updateSymbolsMatrix() {
        for (let reelIndex = 0; reelIndex < this._spinNewSymbols.length; reelIndex++) {
            const reel = this._spinNewSymbols[reelIndex];

            for (let rowIndex = 0; rowIndex < reel.length; rowIndex++) {
                const symbolConfig = this._getSymbolsConfig(reel[rowIndex]);
                const { data } = this._symbols[reelIndex][rowIndex];
                data.setConfig(symbolConfig);
            }
        }
    }

    get _isAnimationComplete() {
        return Object.keys(this._animatedSymbolsMap).length === 0;
    }

    _animationCompletedHandler(key) {
        return () => {
            delete this._animatedSymbolsMap[key];

            if (this._isAnimationComplete) {
                Urso.observer.fire('components.slotMachine.cycleFinished');
            }
        };
    }

    // position: {reel:2, row:1}
    symbolAnimate({ reel, row }) {
        const key = `${reel}_${row}`;
        this._symbols[reel][row].data.animate(this._animationCompletedHandler(key));
        this._animatedSymbolsMap[key] = true;
    }

    symbolStopAnimation({ reel, row }) {
        this._symbols[reel][row].data.stopAnimation();
    }

    symbolStopAllAnimation() {
        // eslint-disable-next-line max-len
        this._symbols.forEach((reel, reelIndex) => reel.forEach((_, rowIndex) => this.symbolStopAnimation({ reel: reelIndex, row: rowIndex })));
    }

    speedUpReels() {
        const { speedUpReelsFactor, reelsCount } = this._config;
        this._timeScale = speedUpReelsFactor;

        for (let reelIndex = 0; reelIndex < reelsCount; reelIndex++) {
            if (this._bounceTweens[reelIndex]) {
                this._bounceTweens[reelIndex].timeScale = this._timeScale;
                continue;
            }

            this._reelTweens[reelIndex].timeScale = this._timeScale;
        }
    }

    intrigue(reelIndexFrom) {
        if (this._intrigue) {
            return false;
        }

        this._intrigue = true;
        this._intrigueStartsFrom = reelIndexFrom;

        const { intrigueAdditionalSymbols } = this._config;

        // add new symbols to the _remainingBlurSymbolsCount
        for (let i = reelIndexFrom; i < this._remainingBlurSymbolsCount.length; i++) {
            this._remainingBlurSymbolsCount[i] += intrigueAdditionalSymbols;
        }

        return true;
    }

    _getSlotMachineMatrixSize() {
        const { borderSymbolsCount } = this._config;
        const reels = this._symbols.length;
        const rows = Math.max(...this._symbols.map((row) => row.length)) - borderSymbolsCount * 2;
        return { reels, rows };
    }

    _setSlotMachineSizes(newWidth, newHeight) {
        const { symbolHeight, symbolWidth } = this._config;
        const { reels, rows } = this._getSlotMachineMatrixSize();
        let { width, height } = this.common.object;

        if (Number.isFinite(newWidth)) {
            width = newWidth;
        }

        if (Number.isFinite(newHeight)) {
            height = newHeight;
        }

        this._symbolWidth = symbolWidth || width / reels;
        this._symbolHeight = symbolHeight || height / rows;

        // check int values
        // eslint-disable-next-line max-len
        if (this._symbolWidth !== ~~this._symbolWidth || this._symbolHeight !== ~~this._symbolHeight) {
            Urso.logger.error('ComponentsSlotMachineView dimension error. Use int width/height values.');
        }
    }

    _getSymbolsConfig({ key, template }) {
        return {
            key,
            template,
            parent: this.common.object,
        };
    }

    _getSymbol(symbolConfig) {
        return this.getInstance('Symbol', symbolConfig);
    }

    _startSpin() {
        const { reelsCount, spinStartInterval } = this._config;

        for (let reelIndex = 0; reelIndex < reelsCount; reelIndex++) {
            const delay = reelIndex * spinStartInterval;

            if (this._bounceTweens) {
                this._startTopBounce(reelIndex, delay);
                continue;
            }

            this._tweenReel(reelIndex, delay);
            this._symbols[reelIndex].forEach(e => e.data.reset());
        }

        this._switchMaskVisibility(true);
        this._switchBorderSymbolsAllVisibility(true);
    }

    _startTopBounce(reelIndex, delay) {
        const { bounce } = this._config;
        const clbk = () => {
            this._tweenReel(reelIndex, 0);
            delete this._bounceTweens[reelIndex];

            if (Object.keys(this._bounceTweens).length === 0) {
                this._bounceTweens = false;
            }
        };

        this._startBounce(clbk, reelIndex, delay, bounce.top);
    }

    _startBounce(clbk, reelIndex, delay, { to, duration }) {
        const from = { x: 0, y: 0 };
        const reel = this._symbols[reelIndex];

        const tween = this.tween.add(from)
            .to(to, duration, 'none', true, delay);

        tween.timeScale = this._getTweenTimeScale();

        tween.onComplete.addOnce(clbk);

        for (let rowIndex = 0; rowIndex < reel.length; rowIndex++) {
            const { data } = reel[rowIndex];
            const { y } = data.getPosition();

            tween.onUpdateCallback(((_, progress) => {
                const deltaY = Math.sin(Math.PI * progress) * to.y;
                data.setPosition({
                    y: y + deltaY,
                });
            }));
        }

        this._bounceTweens[reelIndex] = tween;
    }

    _resetSpinState() {
        this._timeScale = 1;
        this._intrigue = false;
        this._intrigueStartsFrom = 0;
        this._lastStoppedReelIndex = -1;
        this._spinning = true;
        this._remainingBlurSymbolsCount = [...this._config.blurSymbolsCount];
        this._finishSpin = false;
        this._spinNewSymbols = [];
        this._reelTweens = [];
    }

    _updateMoveData() {
        if (this._dropMatrix) {
            this._moveMatrix = this._makeDropMatrix();
            return;
        }

        this._moveMatrix = this._makeRegularMoveMatrix(1);
    }

    _makeDropMatrix() {
        return this._dropMatrix.map((reel) => reel.map((param) => ~~param));
    }

    _makeRegularMoveMatrix(moveDirectionParam) {
        return new Array(this._symbols.length)
            .fill(new Array(this._symbols[0].length).fill(moveDirectionParam));
    }

    _moveSymbolToTop(reelIndex, rowIndex = null) {
        const reel = this._symbols[reelIndex];
        const index = rowIndex != null ? rowIndex : this._symbols[reelIndex].length - 1;
        const [symbol] = reel.splice(index, 1);
        reel.unshift(symbol);
    }

    _setSymbolToPosition(reelIndex, rowIndex = 0) {
        const { data } = this._symbols[reelIndex][rowIndex];
        const position = this._calculateSymbolPosition(data, reelIndex, rowIndex);
        data.setPosition(position);
    }

    _setSymbolConfig(reelIndex, rowIndex = 0) {
        const { data } = this._symbols[reelIndex][rowIndex];
        const symbolConfig = this._getCurrentSymbolConfig(reelIndex);
        data.setConfig(symbolConfig);
    }

    _moveDone(reelIndex) {
        return () => {
            if (this._dropMatrix) {
                this._onReelStopCallback(reelIndex);
                return;
            }

            this._moveSymbolToTop(reelIndex);
            this._setSymbolToPosition(reelIndex);
            this._setSymbolConfig(reelIndex);

            if (this._checkCanTweenReel(reelIndex)) {
                this._tweenReel(reelIndex);
            } else {
                this._onReelStopCallback(reelIndex);
            }
        };
    }

    _tweenReel(reelIndex, delay = 0) {
        this._tweenReelSymbols(reelIndex, delay);
    }

    _getReelTween(reelIndex) {
        const tempObject = { y: 0 };

        if (!this._reelTweens[reelIndex]) {
            this._reelTweens[reelIndex] = this.tween.add(tempObject);
        } else {
            this._reelTweens[reelIndex].target = tempObject;
        }

        return this._reelTweens[reelIndex];
    }

    _calculateEasing({
        easingParam,
        rowIndex,
        progress,
        to,
    }) {
        let easeY = 0;

        if (to.y > 0) {
            easeY = easingParam * (rowIndex + 1) * Math.sin(Math.PI * progress);
        }

        return { easeY };
    }

    _updateCallback({ reelIndex, rowIndex }) {
        const { data } = this._symbols[reelIndex][rowIndex];
        const { y } = data.getPosition();
        const to = this._getReelFinishPosition(reelIndex, rowIndex);
        return ({ target }) => {
            data.setPosition({
                y: y + target.y * to.y
            });
        };
    }

    _setupReelTween(tween, reelIndex) {
        tween.onComplete.addOnce(this._moveDone(reelIndex));
        for (let rowIndex = 0; rowIndex < this._symbols[reelIndex].length; rowIndex++) {
            tween.onUpdateCallback(this._updateCallback({ reelIndex, rowIndex }));
        }
    }

    _setTweenTimeScale(tween, reelIndex) {
        const timeScale = this._getTweenTimeScale(reelIndex);

        if (timeScale !== 1) {
            tween.timeScale = timeScale;
        }
    }

    _getReelFinishPosition(reelIndex, rowIndex) {
        const y = this._moveMatrix[reelIndex][rowIndex];
        return { y };
    }

    _getBaseSymbolMoveData() {
        const y = this._symbolHeight;
        const x = 0;
        return { x, y };
    }

    _setupTweenMove(tween, delay) {
        const duration = this._getOneSymbolTweenDuration();
        tween.to(this._getBaseSymbolMoveData(), duration, 'none', true, delay);
    }

    _tweenReelSymbols(reelIndex, delay) {
        const tween = this._getReelTween(reelIndex);
        this._setupReelTween(tween, reelIndex);
        this._setupTweenMove(tween, delay);
        this._setTweenTimeScale(tween, reelIndex);
    }

    _isIntrigueInProgress(reelIndex) {
        return this._intrigue
            && reelIndex >= this._intrigueStartsFrom
            && reelIndex === (this._lastStoppedReelIndex + 1);
    }

    _getTweenTimeScale(reelIndex) {
        const { intrigueSpeedReelsFactor } = this._config;
        let timeScale = this._timeScale;

        if (this._isIntrigueInProgress(reelIndex)) {
            timeScale *= intrigueSpeedReelsFactor;
        }

        return timeScale;
    }

    _startBottomBounce(reelIndex) {
        const { bounce } = this._config;
        const clbk = () => {
            this._finishSpinIfNeeded(reelIndex);
            delete this._bounceTweens[reelIndex];

            if (Object.keys(this._bounceTweens).length === 0) {
                this._bounceTweens = false;
            }
        };

        this._startBounce(clbk, reelIndex, 0, bounce.bottom);
    }

    _runLandingAnimations() { }

    _onReelStopCallback(reelIndex) {
        this._lastStoppedReelIndex = reelIndex;
        this._reelMoving[reelIndex] = false;

        this._runLandingAnimations(reelIndex);

        if (!this._dropMatrix) {
            this._setBounce('bottom');

            if (this._bounceTweens) {
                this._startBottomBounce(reelIndex);
                return;
            }
        }

        this._finishSpinIfNeeded(reelIndex);
    }

    _finishSpinIfNeeded(reelIndex) {
        const { reelsCount } = this._config;
        if (reelIndex === reelsCount - 1) {
            this._onSpinStopCallback();
        }
    }

    _onSpinStopCallback() {
        const type = this._dropMatrix ? 'drop' : 'basic';
        this._dropMatrix = null;
        this._service.spinCompleted(type);
        this._switchMaskVisibility(false);
        this._switchBorderSymbolsAllVisibility(false);
    }

    _checkCanTweenReel(reelIndex) {
        this._checkNeedUpdateRemainingBlurSymbolsCount(reelIndex);
        return this._remainingBlurSymbolsCount[reelIndex] > 0
            || this._spinNewSymbols[reelIndex].length > 0;
    }

    _getOneSymbolTweenDuration() {
        return this._symbolHeight / this._config.symbolSpeed;
    }

    _getCurrentSymbolConfig(reelIndex) {
        let symId = null;

        if (this._remainingBlurSymbolsCount[reelIndex] > 0) {
            this._remainingBlurSymbolsCount[reelIndex]--;
            symId = this._service._getRandomSymbolConfig();
        } else if (this._spinNewSymbols[reelIndex].length > 0) {
            symId = this._spinNewSymbols[reelIndex].pop();
        }

        const symbol = this._getSymbolsConfig(symId);

        if (!symbol) {
            Urso.logger.error('ComponentsSlotMachineView checkSymbolsPositions logic fatal error. Kernel is in panic.');
        }

        return symbol;
    }

    _setSymbolPositionForDrop(reelIndex, rowIndex, toIndex = null) {
        const reel = this._symbols[reelIndex];
        const resultIndex = toIndex === null ? reel.length : toIndex;
        const { data } = reel[rowIndex];
        const deltaY = -resultIndex * this._symbolHeight;
        const { y } = data.getPosition();

        data.setPosition({ y: y + deltaY });
    }

    finishSpin() {
        this._finishSpin = true;
    }

    runFinishDrop() {
        this.finishSpin();
    }

    finishBounceSpin() {
        this._bounceTweens = [];
        this.finishSpin();
    }

    _checkNeedUpdateRemainingBlurSymbolsCount(reelIndex) {
        if (!this._finishSpin && this._remainingBlurSymbolsCount[reelIndex] === 0) {
            // we need add a new count for all reels
            for (let i = 0; i < this._remainingBlurSymbolsCount.length; i++) {
                this._remainingBlurSymbolsCount[i]++;
            }
        }
    }

    updateSymbolsTintConfig(tint) {
        this._symbols.forEach((reel) => reel.forEach(({ data }) => data.setTintConfig(tint)));
    }

    setSymbolsTint(type) {
        this._symbols.forEach((reel) => reel.forEach(({ data }) => data.setTintType(type)));
    }

    setTurboMode(isEnabled) {
        this._turboModeEnabled = isEnabled;

        this._updateTurboMode();
    }

    _updateTurboMode() {
        if (this._turboModeEnabled) {
            this._remainingBlurSymbolsCount = this._getTurboModeBlurCounts();
        }
    }

    _getTurboModeBlurCounts() {
        return this._remainingBlurSymbolsCount.map((_, i) => i);
    }
}

module.exports = ComponentsSlotMachineWheel;
