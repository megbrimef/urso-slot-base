class ComponentsPaytableController extends Urso.Core.Components.Base.Controller {

    constructor(){
        super();
        this.OPEN_WINDOW = 'open_window';
        this.CLOSE_WINDOW = 'close_window';
        this.NEXT_PAGE = 'next_page';
        this.PREV_PAGE = 'prev_page';
        this._currentPage = 0;
        this._basePayout = null;

        this._reset();
    };

    _reset(){
        this._currentPage = 0;
        this._setPageVisibility(this._currentPage);
    };

    _payTableSwitchHandler({ action = this.CLOSE_WINDOW } = {}){
        if(!Urso.localData.get('spinning'))
            this._doAction(action);
    };

    _doAction(action){
        switch (action) {
            case this.OPEN_WINDOW:
                this._reset();
                this._setWindowVisibility(true);
                this._recalculatePaytable();
                break;
            case this.CLOSE_WINDOW:
                this._setWindowVisibility(false);
                break;
            case this.NEXT_PAGE:
                this._setPageVisibility(++this._currentPage);
                break;
            case this.PREV_PAGE: 
                this._setPageVisibility(--this._currentPage);
                break; 
        }
    };

    _calculateBasePayout(){
        const payouts = Urso.localData.get('payoutsCfg');
        const data = {};

        payouts.forEach(payoutData => {
            const { payout, symbols, type } = payoutData;
            const symbol = symbols[0];
            const len = symbols.length;
            const name = `${symbol}-${len}`;
            data[name] = payout;
        });

        return data;
    };

    _updatePaytableData(currentPayout){
        for (const classPart in currentPayout) {
            const className = `.s${classPart}`;
            const texts = Urso.findAll(className);

            texts.forEach(textObj => textObj.text = currentPayout[classPart]);
        }
    };

    _recalculatePaytable(){
        if(!this._basePayout)
            this._basePayout = this._calculateBasePayout();

        const currentPayout = {};
        const bet = Urso.localData.get('bets.value');

        for (const key in this._basePayout)
            currentPayout[key] = this._basePayout[key] * bet;

        this._updatePaytableData(currentPayout);
    };

    _setWindowVisibility(isVisible){
        isVisible ?
            Urso.findOne('.paytable').addClass('active') :
            Urso.findOne('.paytable').removeClass('active');
    };

    _validatePageIndex(newIndex, pages){
        if(newIndex > pages.length - 1)
            return 0;

        if (newIndex < 0)
            return pages.length - 1;

        return newIndex;
    };

    _setPageVisibility(newIndex){
        const pages = Urso.findAll('.page');
        this._currentPage = this._validatePageIndex(newIndex, pages);
        const nameToSetVisible = `page${this._currentPage}`;

        pages.forEach(page => {
            page._originalModel.name === nameToSetVisible ?
                page.addClass('active') : page.removeClass('active');
        });
    };

    _subscribeOnce(){
        this.addListener('components.paytable.switch', this._payTableSwitchHandler.bind(this));
    };
}

module.exports = ComponentsPaytableController;
