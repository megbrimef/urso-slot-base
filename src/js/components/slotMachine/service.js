class ComponentsSlotMachineService {
    _spinning = false;

    constructor() {
        this.id = null;
        this._view = this.getInstance('Wheel');
        this._config = this.getInstance('Config');
        this._symbolsCfg = this.getInstance('Symbols');
        this._cfg = null;

        this._view.setService(this);
    }

    create(id) {
        this.id = id;
        this.updateCfgById(id);
        const initialSymbolMatrix = this._getInitialSymbols();
        const decoratedWithBorder = this._decorateWithBorder(initialSymbolMatrix);
        const symbolsCfg = this._getSymbolsConfigs(decoratedWithBorder);
        this._view.create(Urso.helper.transpose(symbolsCfg));
    }

    updateCfgById(id) {
        this._id = id;
        this._cfg = this._config.getConfigById(id);
        this._view.setConfig(this._cfg);
    }

    startSpin() {
        if (this._spinning) {
            return false;
        }

        this._spinning = true;
        Urso.localData.set('spinning', true);

        this._view.startSpin();
        this.emit('components.slotMachine.spinStarted');
        return true;
    }

    spinCompleted(type) {
        const { spinCompleteDelay } = this._cfg;
        this._spinning = false;
        Urso.localData.set('spinning', false);
        this.emit('components.slotMachine.spinComplete', { type }, spinCompleteDelay);
    }

    setSpinNewSymbols(symbolsKeys) {
        const decorated = this._decorateWithBorder(symbolsKeys);
        const transposed = Urso.helper.transpose(decorated);
        const symbolsConfigs = this._getSymbolsConfigs(transposed);
        this._view.setSpinNewSymbols(symbolsConfigs);
    }

    _decorateWithBorder(symbols) {
        const { reelsCount, borderSymbolsCount } = this._cfg;
        const upperBorder = this._getRandomSymbolMatrix(reelsCount, borderSymbolsCount);
        const bottomBorder = this._getRandomSymbolMatrix(reelsCount, borderSymbolsCount);
        return [
            ...upperBorder,
            ...symbols,
            ...bottomBorder,
        ];
    }

    showAllSymbolsAnimation() {
        const { reelsCount, rowsCount, borderSymbolsCount } = this._cfg;

        for (let reel = 0; reel < reelsCount; reel++) {
            for (let row = borderSymbolsCount; row < rowsCount - borderSymbolsCount; row++) {
                this.symbolAnimate({ reel, row });
            }
        }
    }

    finishSpin() {
        this._view.finishSpin();
    }

    symbolAnimate({ reel, row }) {
        row += this._cfg.borderSymbolsCount;
        this._view.symbolAnimate({ reel, row });
    }

    symbolStopAnimation(position) {
        this._view.symbolStopAnimation(position);
    }
    speedUpReels() {
        this._view.speedUpReels();
    }

    intrigue(reelIndexFrom) {
        this._view.intrigue(reelIndexFrom);
    }

    _getSymbolsKeysArray() {
        return Object.keys(this._getMappedSymbolsData());
    }

    _mappedSymbolReducer() {
        return [
            (acc, { key, template }) => ({ ...acc, [key]: { key, template } }),
            {},
        ];
    }

    _getMappedSymbolsData() {
        const symbols = this._symbolsCfg.get();
        return symbols.reduce(...this._mappedSymbolReducer());
    }

    _getNewMatrix(reels, rows, fillValue = null) {
        let { reelsCount, rowsCount } = this._cfg;

        reelsCount = Number.isFinite(reels) ? reels : reelsCount;
        rowsCount = Number.isFinite(rows) ? rows : rowsCount;

        if (!reelsCount || !rowsCount) {
            return [];
        }

        return (new Array(rowsCount)).fill([])
            .map(() => new Array(reelsCount).fill(fillValue));
    }

    _getRandomSymbolMatrix(reels, rows) {
        const matrix = this._getNewMatrix(reels, rows);
        return matrix.map((row) => row.map(() => this._getRandomSymbol()));
    }

    _getRandomIndexFromArray(array) {
        return +array[Urso.math.getRandomIntBetween(0, array.length - 1)];
    }

    setBaseConfig() {
        this.updateCfgById(this.id);
    }

    _getInitialSymbols() {
        let initialSymbols = Urso.localData.get('slotMachine.initialSymbols') || [];

        if (initialSymbols.length === 0) {
            initialSymbols = this._getRandomSymbolMatrix();
        }

        return this._trimMatrix(initialSymbols);
    }

    _trimMatrix(symbols) {
        const matrix = this._getNewMatrix();

        for (let reelIndex = 0; reelIndex < matrix.length; reelIndex++) {
            const reel = matrix[reelIndex];

            for (let rowIndex = 0; rowIndex < reel.length; rowIndex++) {
                matrix[reelIndex][rowIndex] = symbols[reelIndex][rowIndex];
            }
        }

        return matrix;
    }

    _getRandomSymbol() {
        const symbolsArray = this._getSymbolsKeysArray();
        return this._getRandomIndexFromArray(symbolsArray);
    }

    _getSymbolsConfigs(initialSymbols) {
        return initialSymbols
            .map((row) => row.map(this._getSymbolConfig(this._getMappedSymbolsData())));
    }

    _getRandomSymbolConfig() {
        const randomSymbol = this._getRandomSymbol();
        return this._getSymbolConfig(this._getMappedSymbolsData())(randomSymbol);
    }

    _getSymbolConfig(mappedSymbolsData) {
        return (symbolKey) => mappedSymbolsData[symbolKey];
    }

    symbolStopAllAnimation() {
        this._view.symbolStopAllAnimation();
    }

    prepareDrop(wonSymbols) {
        const { borderSymbolsCount, reelsCount, rowsCount } = this._cfg;
        const totalRows = rowsCount + borderSymbolsCount * 2;
        const dropMatrix = this._getNewMatrix(totalRows, reelsCount, false);
        wonSymbols.forEach(([reel, row]) => {
            dropMatrix[reel][+row + borderSymbolsCount] = true;
        });

        const drop = this._config.getConfigById('drop');

        this._view.setConfig(drop);
        this._view.setDropMatrix(dropMatrix);
    }

    updateSymbolsTintConfig() {
        const { tint } = this._cfg;
        this._view.updateSymbolsTintConfig(tint);
    }

    setSymbolsDarkenTint() {
        this._view.setSymbolsTint('darken');
    }

    setSymbolsDefaultTint() {
        this._view.setSymbolsTint('default');
    }

    updateTurboMode() {
        const turboMode = Urso.localData.get('settings.turboMode');
        this._view.setTurboMode(turboMode);
    }
}

module.exports = ComponentsSlotMachineService;
