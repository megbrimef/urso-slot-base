class ComponentsSlotMachineBasic {
    _config = null;
    _service = null;
    _pool = null;
    _dropMatrix = null;

    _bounceTweens = false;
    _moveMatrix = [];
    _animatedSymbolsMap = {};
    _reelMoving = [];

    constructor() {
        this._symbols = [];

        this._symbolWidth;
        this._symbolHeight;

        this._spinning = false;
        this._remainingBlurSymbolsCount;

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
    }

    _createMask(){
        const { borderSymbolsCount } = this._config;
        const reelsCount = this._symbols.length;
        const rowsCount = this._symbols[0].length - borderSymbolsCount * 2;

        this.mask = Urso.objects.create(
            {
                type: Urso.types.objects.MASK,
                name: 'slotMachineMask',
                rectangle: [0, 0, this._symbolWidth * reelsCount, this._symbolHeight * rowsCount],
            }, this.common.object
        );

        this.common.object._baseObject.mask = this.mask._baseObject;
    }

    setDropMatrix(matrix) {
        this._dropMatrix = matrix;
    }

    _createPool() {
        this._pool = new Urso.Game.Lib.ObjectPool(this._makeSymbol.bind(this), this._resetSymbol.bind(this));
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

    _setSymbolsPosition = () => {
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
        const  { xOffset, yOffset } = this._getSymbolOffset(reelIndex, rowIndex);
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
        if(bounce && bounce[key]){
            this._bounceTweens = [];
        }
    }

    startSpin() {
        this._resetSpinState();
        this._updateMoveData();
        
        if(!this._dropMatrix) {
            this._setBounce('top');
            this._startSpin();
        }
    }
    
    _updateMatrixForDrop() {
        for (let reelIndex = 0; reelIndex < this._dropMatrix.length; reelIndex++) {
            const reel = this._dropMatrix[reelIndex];
            
            let moveAmount = 0;
            const maxMoveAmount = reel.filter(row => row).length;

            for (let rowIndex = reel.length - 1; rowIndex >= 0; rowIndex--) {
                const prevNeedMove = reel[rowIndex];
            
                if(prevNeedMove){
                    moveAmount++;
                    this._setSymbolPositionForDrop(reelIndex, rowIndex, moveAmount + rowIndex);
                }
                
                this._moveMatrix[reelIndex][rowIndex] = prevNeedMove ? maxMoveAmount : moveAmount;
            }
        }
    }

    _sortSymbols() {
        this._symbols.forEach((reel) => {
            reel.sort((a, b) => {
                return  a.data.getPosition().y - b.data.getPosition().y;
        })});
    }

    setSpinNewSymbols(symbolsConfigs) {
        this._spinNewSymbols = symbolsConfigs;
        
        // TODO: move to separate method for action call
        if(this._dropMatrix) {
            this._updateMatrixForDrop();
            this._sortSymbols();
            this._updateSymbolsMatrix();
            this._startSpin();
        }
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

    _animationCompletedHandler(key) {
        return () => {
            delete this._animatedSymbolsMap[key];

            if(Object.keys(this._animatedSymbolsMap).length === 0) {
                Urso.observer.fire('components.slotMachine.cycleFinished');
            }
        }
    }

    //position: {reel:2, row:1}
    symbolAnimate({ reel, row }) {
        const key = `${reel}_${row}`;
        this._animatedSymbolsMap[key] = true;
        this._symbols[reel][row].data.animate(this._animationCompletedHandler(key));
    }

    symbolStopAnimation(position) {
        const key = `${reel}_${row}`;
        delete this._animatedSymbolsMap[key];
        this._symbols[position.reel][position.row].data.stopAnimation();
    }

    symbolStopAllAnimationHandler() {
        this._animatedSymbolsMap = {};
        this._symbols.forEach((reel) => reel.forEach((sym) => sym.data.stopAnimation()));
    }
    
    speedUpReels() {
        const { speedUpReelsFactor, reelsCount } = this._config;
        this._timeScale = speedUpReelsFactor;

        for (let reelIndex = 0; reelIndex < reelsCount; reelIndex++) {
            if(this._bounceTweens[reelIndex]) {
                this._bounceTweens[reelIndex].timeScale = this._timeScale;
                continue;
            }
            
            this._reelTweens[reelIndex].timeScale = this._timeScale;
        }
    }

    intrigue(reelIndexFrom) {
        if (this._intrigue)
            return false;

        this._intrigue = true;
        this._intrigueStartsFrom = reelIndexFrom;

        const { intrigueAdditionalSymbols } = this._config;

        //add new symbols to the _remainingBlurSymbolsCount
        for (let i = reelIndexFrom; i < this._remainingBlurSymbolsCount.length; i++)
            this._remainingBlurSymbolsCount[i] += intrigueAdditionalSymbols;
    }

    _getSlotMachineMatrixSize() {
        const { borderSymbolsCount } = this._config;
        const reels = this._symbols.length;;
        const rows = Math.max(...this._symbols.map((row) => row.length)) - borderSymbolsCount * 2;
        return { reels, rows };
    }

    _setSlotMachineSizes(newWidth, newHeight) {
        const { symbolHeight, symbolWidth } = this._config;
        const { reels, rows } = this._getSlotMachineMatrixSize();
        let { width, height } = this.common.object;

        if(isFinite(newWidth)) {
            width = newWidth;
        }

        if(isFinite(newHeight)) {
            height = newHeight;
        }
        
        this._symbolWidth = symbolWidth ? symbolWidth : width / reels;
        this._symbolHeight = symbolHeight ? symbolHeight : height / rows;
        
        //check int values
        if (this._symbolWidth !== ~~this._symbolWidth || this._symbolHeight !== ~~this._symbolHeight)
            Urso.logger.error('ComponentsSlotMachineView dimension error. Use int width/height values.')
    }

    _getSymbolsConfig({ key, template }) {
        return {
            key,
            template,
            parent: this.common.object
        };
    }
   
    _getSymbol(symbolConfig) { 
        return this.getInstance('Symbol');
    }

    //////////////////spin

    _startSpin() {
        const { reelsCount, spinStartInterval } = this._config;

        for (let reelIndex = 0; reelIndex < reelsCount; reelIndex++) {
            const delay = reelIndex * spinStartInterval;

            if(this._bounceTweens){
                this._startTopBounce(reelIndex, delay);
                continue;
            }
            
            this._tweenReel(reelIndex, delay);
        }
    }

    _startTopBounce(reelIndex, delay) {
        const { bounce } = this._config;
        const clbk = () => {
            this._tweenReel(reelIndex, 0);
            delete this._bounceTweens[reelIndex];
            
            if(Object.keys(this._bounceTweens).length === 0){
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

            tween.onUpdateCallback((({ target }, progress) => {
                const deltaY = Math.sin(Math.PI * progress) * to.y;
                data.setPosition({
                    y: y + deltaY
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

    _updateMoveData() {``
        if(this._dropMatrix) {
            this._moveMatrix = this._makeDropMatrix();
            return;
        }
        
        this._moveMatrix = this._makeRegularMoveMatrix(1);
    }

    _makeDropMatrix() {
        return this._dropMatrix.map(reel => reel.map(param => ~~param));
    }

    _makeRegularMoveMatrix(moveDirectionParam) {
        return new Array(this._symbols.length)
            .fill(new Array(this._symbols[0].length).fill(moveDirectionParam));
    }

    _moveSymbolToTop(reelIndex, rowIndex = null) {
        const reel = this._symbols[reelIndex];
        const index = rowIndex != null ? rowIndex : this._symbols[reelIndex].length -1;
        const [ symbol ] = reel.splice(index, 1);
        reel.unshift(symbol);
    }

    _setSymbolToPosition(reelIndex, rowIndex = 0) {
        const { data } = this._symbols[reelIndex][rowIndex];
        const position = this._calculateSymbolPosition(data, reelIndex, rowIndex)
        data.setPosition(position);
    }

    _setSymbolConfig(reelIndex, rowIndex = 0) {
        const { data } = this._symbols[reelIndex][rowIndex];
        const symbolConfig = this._getCurrentSymbolConfig(reelIndex);
        data.setConfig(symbolConfig);
    }

    _moveDone(reelIndex) {
        return () => {
            if(this._dropMatrix) {
                this._onReelStopCallback(reelIndex);
                return;
            }
            
            this._moveSymbolToTop(reelIndex);
            this._setSymbolToPosition(reelIndex);
            this._setSymbolConfig(reelIndex);
            
            if (this._checkCanTweenReel(reelIndex))
                this._tweenReel(reelIndex);
            else
                this._onReelStopCallback(reelIndex);
        }
    }

    _tweenReel(reelIndex, delay = 0) {
        this._tweenReelSymbols(reelIndex, delay);
    }

    _getReelTween(reelIndex) {
        const tempObject = { y: 0 };

        if (!this._reelTweens[reelIndex])
            this._reelTweens[reelIndex] = this.tween.add(tempObject);
        else
            this._reelTweens[reelIndex].target = tempObject;

        return this._reelTweens[reelIndex];
    }

    _calculateEasing({ easingParam, rowIndex, progress, to }) {
        let easeY = 0;

        if(to.y > 0){
            easeY = easingParam * (rowIndex + 1) * Math.sin(Math.PI * progress);
        }

        return { easeY };
    }

     _getEasingParam() {
        const { dropEasingParam, regularEasingParam } = this._config;
        return this._dropMatrix ? dropEasingParam : regularEasingParam;
    }

    _updateCallback({ reelIndex, rowIndex, easingParam = 0 }) {
        const { data } = this._symbols[reelIndex][rowIndex];
        const { y } = data.getPosition();
        const to = this._getReelFinishPosition(reelIndex, rowIndex);
        return ({ target }, progress) => {
            const { easeY } = this._calculateEasing({ easingParam, rowIndex, progress, to });
            const maxY = y + this._symbolHeight * to.y;
            const curY = y + target.y * to.y + easeY;
            data.setPosition({ 
                y: curY > maxY ? maxY : curY
            });
        };
    }
                
    _setupReelTween(tween, reelIndex) {
        tween.onComplete.addOnce(this._moveDone(reelIndex));
        const easingParam = this._getEasingParam();
        for (let rowIndex = 0; rowIndex < this._symbols[reelIndex].length; rowIndex++) {        
            tween.onUpdateCallback(this._updateCallback({ reelIndex, rowIndex, easingParam }));
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
                && reelIndex === (this._lastStoppedReelIndex + 1)
    }

    _getTweenTimeScale(reelIndex) {
        const { intrigueSpeedReelsFactor } = this._config;
        let timeScale = this._timeScale;

        if (this._isIntrigueInProgress(reelIndex)) {
            timeScale = timeScale * intrigueSpeedReelsFactor;
        }

        return timeScale;
    }

    _startBottomBounce(reelIndex) {
        const { bounce } = this._config;
        const clbk = () => {
            this._finishSpinIfNeeded(reelIndex);
            delete this._bounceTweens[reelIndex];
            
            if(Object.keys(this._bounceTweens).length === 0){
                this._bounceTweens = false;   
            }
        };

        this._startBounce(clbk, reelIndex, 0, bounce.bottom);
    }

    _runLandingAnimations() {}

    _onReelStopCallback(reelIndex) {
        this._lastStoppedReelIndex = reelIndex;
        this._reelMoving[reelIndex] = false;
        
        this._runLandingAnimations(reelIndex);

        this._setBounce('bottom');

        if(this._bounceTweens){
            this._startBottomBounce(reelIndex);
            return;
        }

      this._finishSpinIfNeeded(reelIndex);
    }

    _finishSpinIfNeeded(reelIndex){
        const { reelsCount } = this._config;
        if (reelIndex === reelsCount - 1)
            this._onSpinStopCallback();
    }

    _onSpinStopCallback() {
        this._dropMatrix = null;
        
        const type = this._dropMatrix ? 'drop' : 'basic';
        this._service.spinCompleted(type);
    }

    _checkCanTweenReel(reelIndex) {
        this._checkNeedUpdateRemainingBlurSymbolsCount(reelIndex);
        return this._remainingBlurSymbolsCount[reelIndex] > 0 || this._spinNewSymbols[reelIndex].length > 0;
    }

    _getOneSymbolTweenDuration() {
        return this._symbolHeight / this._config.symbolSpeed;
    }

    // TODO: RENAME
    _getCurrentSymbolConfig(reelIndex) {
        if (this._remainingBlurSymbolsCount[reelIndex] > 0) {
            this._remainingBlurSymbolsCount[reelIndex]--;
            return this._getSymbolsConfig(this._service._getRandomSymbolConfig());
        } else if (this._spinNewSymbols[reelIndex].length > 0) {
            const symbol = this._spinNewSymbols[reelIndex].pop();    
            return this._getSymbolsConfig(symbol);
        } else {
            Urso.logger.error('ComponentsSlotMachineView checkSymbolsPositions logic fatal error. Kernel is in panic.')
        }
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

    finishBounceSpin() {
        this._bounceTweens = [];
        this.finishSpin();
    }

    _checkNeedUpdateRemainingBlurSymbolsCount(reelIndex) {
        if (!this._finishSpin && this._remainingBlurSymbolsCount[reelIndex] === 0)
            //we need add a new count for all reels
            for (let i = 0; i < this._remainingBlurSymbolsCount.length; i++)
                this._remainingBlurSymbolsCount[i]++
    }
}

module.exports = ComponentsSlotMachineBasic;
