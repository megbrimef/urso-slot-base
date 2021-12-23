class ComponentsBalanceController extends Urso.Core.Components.StateDriven.Controller {
    _config = null;

    create() {
        super.create();

        this._config = this.getInstance('Config');
    }

    configActions = {
        balanceMakeBetAction: {
            run: (finishClbk) => this._runBalanceMakeBetAction(finishClbk),
        },
        updateBalanceAction: {
            run: (finishClbk) => this._runBalanceAction(finishClbk),
        },
    };

    _runBalanceMakeBetAction(finishClbk) {
        this._makeBet();
        finishClbk();
    }

    _runBalanceAction(finishClbk) {
        this._updateBalanceText();
        finishClbk();
    }

    _updateBalanceText() {
        const balance = Urso.localData.get('balance');
        const texts = Urso.findAll('.balanceVal');

        texts.forEach((textObj) => this._formatBalance(textObj, balance));

        this.emit('components.balance.updated');
    }

    _formatBalance(textObj, { totalAmount }) {
        const { currentCurrency, currentSymbol } = Urso.localData.get('currency');
        const { showCurrencySymbol } = this._config.get();
        const currency = showCurrencySymbol ? currentSymbol : currentCurrency;

        totalAmount = (+totalAmount).toFixed(2);
        textObj.text = `${totalAmount} ${currency}`;
    }

    _makeBet() {
        const { totalAmount } = Urso.localData.get('balance');
        const { value } = Urso.localData.get('totalBet');
        const newTotalAmount = totalAmount - value;
        Urso.localData.set('balance.totalAmount', newTotalAmount);

        this._updateBalanceText();
    }
}

module.exports = ComponentsBalanceController;
