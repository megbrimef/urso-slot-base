class ComponentsBalanceController extends Urso.Core.Components.Base.Controller {

    _setHandler(){
        const balance = Urso.localData.get('balance');
        const texts = Urso.findAll('.balanceVal');

        texts.forEach(textObj => this._formatBalance(textObj, balance));

        this.emit('components.balance.updated');
    };

    _formatBalance(textObj, { currency, totalAmount }){
        totalAmount = (+totalAmount).toFixed(2);
        textObj.text = `${totalAmount} ${currency}`;
    };

    _makeBetHandler(){
        const balance = Urso.localData.get('balance');
        const totalBet = Urso.localData.get('totalBet.value');
        balance.totalAmount -= totalBet;

        this._setHandler();
    };

    _subscribeOnce(){
        this.addListener('components.balance.set', this._setHandler.bind(this));
        this.addListener('components.balance.makeBet', this._makeBetHandler.bind(this));
    };
}

module.exports = ComponentsBalanceController;
