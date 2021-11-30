class ComponentsTotalBetController extends Urso.Core.Components.Base.Controller {

    _setHandler(){
        const texts = Urso.findAll('.totalBetVal');
        const { currency } = Urso.localData.get('balance');
        const amount = this._calculateTotalBet();
        
        Urso.localData.set('totalBet.value', amount);

        texts.forEach(textObj => this._formatTotalBet(textObj, { amount, currency }));

        this.emit('components.totalBet.updated');
    };

    _calculateTotalBet(){
        const bets = Urso.localData.get('bets');
        const lines = Urso.localData.get('lines');
        const coins = Urso.localData.get('coins');
        return (bets.value * lines.value * coins.value).toFixed(2);
    };

    _formatTotalBet(textObj, { currency, amount }){
        textObj.text = `${amount} ${currency}`;
    };

    _subscribeOnce(){
        this.addListener('components.totalBet.update', this._setHandler.bind(this));
    };
}

module.exports = ComponentsTotalBetController;
