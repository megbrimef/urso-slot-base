class ComponentsSlotMachineController extends Urso.Core.Components.Base.Controller {

    constructor(options) {
        super(options);

        this._eventPrefix = 'components.slotMachine';
        this._service = this.getInstance('Service');
        this.tween = this.getInstance('Tween');
    }

    create = () => this._service.create();

    update = () => this.tween.update();
    
    _spin = () => this._service.startSpin();

    _setSpinNewSymbols = (symbols) => this._service.setSpinNewSymbols(symbols);

    _setSpinSymbolsHandler = () => {
        const spinSymbols = Urso.localData.get('slotMachine.spinStages.0.spinResult.rows');
        const col = Urso.helper.transpose(spinSymbols);
        this._setSpinNewSymbols(col);
    }

    //position: {reel:2, row:1}
    _symbolAnimateHandler = (position) => this._service.symbolAnimate(position);

    //position: {reel:2, row:1}
    _stopSymbolAnimateHandler = (position) => this._service.symbolStopAnimation(position);

    _speedUpReelsHandler = () => this._service.speedUpReels();

    /**
     * set intrigue to spinning reels
     * @param {Number} reelIndexFrom 
     */
    _intrigueHandler = (reelIndexFrom) => this._service.intrigue(reelIndexFrom);

    _symbolStopAllAnimationHandler = () => this._service.symbolStopAllAnimationHandler();

    _addComponentListener = (key, clbk) => this.addListener(`${this._eventPrefix}.${key}`, clbk);

    _subscribeOnce = () => {
        this._addComponentListener('spinStart', this._spin);
        this._addComponentListener('setSpinSymbols', this._setSpinSymbolsHandler);
        this._addComponentListener('symbolAnimate', this._symbolAnimateHandler);
        this._addComponentListener('symbolAnimateAllStop', this._symbolStopAllAnimationHandler);
        this._addComponentListener('stopSymbolAnimate', this._stopSymbolAnimateHandler);
        this._addComponentListener('speedUpReels', this._speedUpReelsHandler);
        this._addComponentListener('intrigue', this._intrigueHandler);
        this._addComponentListener('spinCommand', this._symbolStopAllAnimationHandler);
    };
}

module.exports = ComponentsSlotMachineController;
