class ComponentsSlotMachineService {

    constructor() {
        this._view = this.getInstance('View');
        this._config = this.getInstance('Config');
        this._view.setConfig(this._config);
        this._view.setService(this);
    }

    create = () => {
        const startSymbols = this._getInitialSymbols();
        this._view.create(Urso.helper.transpose(startSymbols));
    }

    startSpin = () => this._view.startSpin();
    

    setSpinNewSymbols = (symbolsKeys) => {
        const symbolsConfigs = this._getSymbolsConfigs(symbolsKeys);
        this._view.setSpinNewSymbols(symbolsConfigs);
    }

    symbolAnimate = (position) => this._view.symbolAnimate(position);

    symbolStopAnimation = (position) => this._view.symbolStopAnimation(position);
    
    speedUpReels = () => this._view.speedUpReels();
    
    intrigue = (reelIndexFrom) => this._view.intrigue(reelIndexFrom);
    
    _getSymbolsKeysArray = () => Object.keys(this._getMappedSymbolsData());

    _getMappedSymbolsData = () => {
        const symbols = this._config.getSymbols();
        return symbols.reduce((acc, { key, object }) => ({ ...acc, [key]: { key, object }}), {});
    }

    _getEmptyMatrix = () => {
        const { reelsCount, rowsCount } = this._config.get();
        return new Array(rowsCount).fill(new Array(reelsCount).fill(null));
    }   

    _getRandomSymbolsCfgMatrix = () => {
        const matrix = this._getEmptyMatrix();
        return matrix.map((row) => row.map(() => this._getRandomSymbolConfig()));
    }

    _getRandomIndexFromArray = (array) => array[Urso.math.getRandomIntBetween(0, array.length - 1)];

    _getInitialSymbols = () => {
        let [ ...initialSymbols ] = Urso.localData.get('s1lotMachine.initialSymbols') || [];
        
        if (initialSymbols.length > 0) {
            return this._getSymbolsConfigs(initialSymbols);
        }

        return this._getRandomSymbolsCfgMatrix();
    };

    _getRandomSymbolConfig = () => {
        const symbolsArray = this._getSymbolsKeysArray();
        const symbolKey = this._getRandomIndexFromArray(symbolsArray);
        return this._getSymbolConfig(this._getMappedSymbolsData())(symbolKey);;
    };

    _getSymbolsConfigs = (initialSymbols) => initialSymbols
        .map((row) => row.map(this._getSymbolConfig(this._getMappedSymbolsData())));

    _getSymbolConfig = (mappedSymbolsData) => (symbolKey) => mappedSymbolsData[symbolKey];

    symbolStopAllAnimationHandler = () => this._view.symbolStopAllAnimationHandler();
}

module.exports = ComponentsSlotMachineService;
