class ComponentsSlotMachineService {

    create({ id }) {
        this._symbolsConfig = this.getInstance('SymbolsConfig');
        this._config = this.getInstance('Config').get(id);
        const spinType = Urso.helper.capitaliseFirstLetter(this._config.spinType);
        this._view = this.getInstance(spinType);

        this.borderSymbolsCount = this._config.borderSymbolsCount;

        Urso.localData.set('components.slotMachine.isCascade', this._config.isCascade);
        const startSymbols = this._getInitialSymbols();

        this._setConfig();
        this._setService();
        this._view.create({ id, startSymbols });
    }

    _setService() {
        this._view.setService(this);
    }

    _setConfig() {
        this._view.setConfig(this._config);
    }

    startSpin() {
        this._view.spinHandler();
    }

    setSpinNewSymbols(symbolsKeys) {
        symbolsKeys = Urso.helper.rowsToCols(symbolsKeys);
        this._addBorderSymbols(symbolsKeys);
        const symbolsConfigs = this._getSymbolsConfigs(symbolsKeys);
        this._view.setSpinNewSymbols(symbolsConfigs);
    }

    symbolAnimate({ reel, row }) {
        row += this.borderSymbolsCount;
        this._view.symbolTryAnimate({ reel, row });
    }

    symbolStopAnimation(position) {
        this._view.symbolTryStopAnimation(position);
    }

    speedUpReels() {
        this._view.commandSpeedUp();
    }

    intrigue(reelIndexFrom) {
        this._view.intrigue(reelIndexFrom);
    }

    _getInitialSymbols() {
        let initialSymbolsKeys = false //TODO get from local data? setter ?

        if (!initialSymbolsKeys)
            return this._getRandomSymbols();
        else {
            initialSymbolsKeys = Urso.helper.rowsToCols(initialSymbolsKeys);
            this._addBorderSymbols(initialSymbolsKeys);
            return this._getSymbolsConfigs(initialSymbolsKeys)
        }
    }

    _getRandomSymbols() {
        return this._getSymbolsConfigs();
    }

    _addBorderSymbols(symbolsMatrix) {

        for (let reel of symbolsMatrix) {
            for (let i = 0; i < this.borderSymbolsCount; i++) {
                reel.unshift(null);
                reel.push(null);
            }
        }
    }

    _getSymbolsConfigs(symbolsKeys) {
        let symbols = [];

        for (let reelIndex = 0; reelIndex < this._config.reelsCount; reelIndex++) {
            let reelArray = [];

            for (let rowIndex = 0; rowIndex < this._config.rowsCount + this.borderSymbolsCount * 2; rowIndex++) {
                const key = symbolsKeys ? symbolsKeys[reelIndex][rowIndex] : null;
                reelArray.push(this._getSymbol(key));
            }

            symbols.push(reelArray);
        }

        return symbols;
    };

    _getSymbol(symbolKey) {
        const symbols = this._symbolsConfig.getSymbols();

        //check can we use symbolsBlurKeys
        if (symbolKey == null) {

            const symbolsBlurKeys = this._config.symbolsBlurKeys;

            if (symbolsBlurKeys.length > 0) {
                let symbolBlurIndex = Urso.math.getRandomIntBetween(0, symbolsBlurKeys.length - 1);
                symbolKey = symbolsBlurKeys[symbolBlurIndex];
            } else {
                // if no blur symbols return random
                let symbolIndex = Urso.math.getRandomIntBetween(0, symbols.length - 1);
                return symbols[symbolIndex];
            }
        }

        return symbols.find((element) => (element.key === symbolKey + ''));
    };

    symbolStopAllAnimationHandler() {
        this._view.symbolStopAllAnimationHandler();
    }

    _destroyWinSymbols() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const firstStageSlotWin = slotMachineData.spinStages[0].slotWin;
        const lineWinAmounts = firstStageSlotWin.lineWinAmounts;
        let wonSymbolsArray = [];

        lineWinAmounts.forEach(line => {

            line.wonSymbols.forEach(symbol => {
                wonSymbolsArray.push(symbol);
            })

        })

        wonSymbolsArray = wonSymbolsArray.filter((symbol, index, self) =>
            index === self.findIndex((t) => (
                t[0] === symbol[0] && t[1] === symbol[1]
            ))
        )

        this._view.destroyWinSymbols(wonSymbolsArray);
    }

    destroyWinSymbolsHandler() {
        this._view.symbolStopAllAnimationHandler();
        setTimeout(() => this._destroyWinSymbols(), 20);
    }

    tintSymbols(symbols) {
        this._view.tintSymbols(symbols);
    }
}

module.exports = ComponentsSlotMachineService;
