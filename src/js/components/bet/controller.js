class ComponentsBetController extends Urso.Core.Components.Base.Controller {

    constructor(){
        super();
        this.ONE = 'one';
        this.MAX = 'max';
    }

    _setHandler(){
        const { value } = Urso.localData.get('bets');
        const texts = Urso.findAll('.betVal');

        texts.forEach(t => t.text = value);

        this.emit('components.bet.updated');
    };

    _getNextValue(value, bets){
        let currentIndex = bets.indexOf(value);

        if(bets[++currentIndex])
            return bets[currentIndex];

        return bets[0];

    };

    _switchHandler({ type = this.ONE } = {}){
        const { value, bets } = Urso.localData.get('bets');
        const nextVal = type === this.ONE ? this._getNextValue(value, bets) : bets[bets.length - 1];
        
        Urso.localData.set('bets.value', nextVal);
        this._setHandler();
    };

    _subscribeOnce(){
        this.addListener('components.bet.set', this._setHandler.bind(this));
        this.addListener('components.bet.switch', this._switchHandler.bind(this));
    };
}

module.exports = ComponentsBetController;
