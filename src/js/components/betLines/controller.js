class ComponentsBetLinesController extends Urso.Core.Components.StateDriven.Controller {
    configActions = {
        updateBetLinesAction: {
            run: (finishClbk) => this._runUpdateBetLines(finishClbk),
        },
    };

    _config = null;

    create() {
        super.create();

        this._config = this.getInstance('Config');
    }

    _getCurrencyText() {
        const { showCurrencyType } = this._config.get();
        const { currentSymbol, currentCurrency } = Urso.localData.get('currency');

        switch (showCurrencyType) {
        case 'currency':
            return currentCurrency;
        case 'symbol':
            return currentSymbol;
        default:
            return '';
        }
    }

    _runUpdateBetLines(finishClbk) {
        this._updateBet();
        this._updateLines();
        this._updateTotalBet();
        finishClbk();
    }

    _updateTotalBet() {
        const bets = Urso.localData.get('bets');
        // const coins = Urso.localData.get('coins');
        // const lines = Urso.localData.get('lines');

        const totalBet = bets.value;
        Urso.localData.set('totalBet.value', totalBet);
    }

    _updateLines() {
        // const { value } = Urso.localData.get('lines');
    }

    _updateBet() {
        const { value } = Urso.localData.get('bets');
        this._setBet(value);
    }

    _setBet(value) {
        const texts = Urso.findAll('.betVal');
        texts.forEach((t) => { t.text = value; });
    }

    _setBetHandler = (value) => this._setBet(value);

    _subscribeOnce() {
        super._subscribeOnce();
        // this.addListener('components.bet.set', this._setHandler);
    }
}

module.exports = ComponentsBetLinesController;
