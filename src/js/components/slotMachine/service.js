class ComponentsSlotMachineService {
    _spinType = null;

    constructor() {
        this.id = null;
        this._view = this.getInstance('Basic');
        this._config = this.getInstance('Config');
        this._symbolsCfg = this.getInstance('Symbols');
        this._cfg = null;
        
        this._view.setService(this);
    }

    create = (id) => {
        this.updateCfgById(id);
        const initialSymbolMatrix = this._getInitialSymbols();
        const decoratedWithBorder = this._decorateWithBorder(initialSymbolMatrix);
        const symbolsCfg = this._getSymbolsConfigs(decoratedWithBorder);
        this._view.create(Urso.helper.transpose(symbolsCfg));
    }

    updateCfgById = (id) => {
        this._id = id;
        this._cfg = this._config.getConfigById(id);
        this._view.setConfig(this._cfg);
    }

    startSpin = (type = 'regular') => {
        this._spinType = type;

        if(this._spinType === 'regular') {
            this._view.startSpin();
        }

        this.emit('components.slotMachine.spinStarted');
    };

    setSpinNewSymbols = (symbolsKeys) => {
        const decorated = this._decorateWithBorder(symbolsKeys);
        const transposed = Urso.helper.transpose(decorated);
        const symbolsConfigs = this._getSymbolsConfigs(transposed);
        this._view.setSpinNewSymbols(symbolsConfigs);
    }

    setDropMatrix(matrix){
        this._view.setDropMatrix(matrix);
    }

    _decorateWithBorder = (symbols) => {
        const { reelsCount, borderSymbolsCount } = this._cfg;
        const upperBorder = this._getRandomSymbolMatrix(reelsCount, borderSymbolsCount);
        const bottomBorder = this._getRandomSymbolMatrix(reelsCount, borderSymbolsCount);
        return [
            ...upperBorder,
            ...symbols,
            ...bottomBorder
        ]
    }

    showAllSymbolsAmation() {
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

    symbolAnimate = ({ reel, row }) => { 
        row += this._cfg.borderSymbolsCount;
        this._view.symbolAnimate({ reel, row });
    };

    symbolStopAnimation = (position) => this._view.symbolStopAnimation(position);
    
    speedUpReels = () => this._view.speedUpReels();
    
    intrigue = (reelIndexFrom) => this._view.intrigue(reelIndexFrom);
    
    _getSymbolsKeysArray = () => Object.keys(this._getMappedSymbolsData());

    _getMappedSymbolsData = () => {
        const symbols = this._symbolsCfg.get();
        return symbols.reduce((acc, { key, template }) => ({ ...acc, [key]: { key, template }}), {});
    }

    _getEmptyMatrix = (reels, rows) => {
        let { reelsCount, rowsCount } = this._cfg;

        reelsCount = isFinite(reels) ? reels : reelsCount;
        rowsCount = isFinite(rows) ? rows : rowsCount;

        if (!reelsCount || !rowsCount) {
            return [];
        }

        return new Array(rowsCount).fill(new Array(reelsCount).fill(null));
    }   

    _getRandomSymbolMatrix = (reels, rows) => {
        const matrix = this._getEmptyMatrix(reels, rows);
        return matrix.map((row) => row.map(() => this._getRandomSymbol()));
    }

    _getRandomIndexFromArray = (array) => +array[Urso.math.getRandomIntBetween(0, array.length - 1)];

    _getInitialSymbols = () => {
        let initialSymbols = Urso.localData.get('slotMachine.initialSymbols') || [];

        if (initialSymbols.length === 0) {
            initialSymbols = this._getRandomSymbolMatrix();
        }
        
        return this._trimMatrix(initialSymbols);
    };

    _trimMatrix = (symbols) => {
        const matrix = this._getEmptyMatrix();
        return matrix.map((reel, reIndex) => 
            reel.map((sym, roIndex) => matrix[reIndex][roIndex] = symbols[reIndex][roIndex]));
    }

    _getRandomSymbol = () => {
        const symbolsArray = this._getSymbolsKeysArray();
        return this._getRandomIndexFromArray(symbolsArray);
    };

    _getSymbolsConfigs = (initialSymbols) => initialSymbols
        .map((row) => row.map(this._getSymbolConfig(this._getMappedSymbolsData())));

    _getRandomSymbolConfig = () => {
        const randomSymbol = this._getRandomSymbol();
        return this._getSymbolConfig(this._getMappedSymbolsData())(randomSymbol);
    }

    _getSymbolConfig = (mappedSymbolsData) => (symbolKey) => mappedSymbolsData[symbolKey];

    symbolStopAllAnimationHandler() {
        this._view.symbolStopAllAnimationHandler();
    }
}

module.exports = ComponentsSlotMachineService;
