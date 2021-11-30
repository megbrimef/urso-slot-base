class ComponentsCoinController extends Urso.Core.Components.Base.Controller {

    _setHandler(){
        const { value } = Urso.localData.get('coins');
        const texts = Urso.findAll('.coinVal');

        texts.forEach(t => t.text = value);
    };

    _setNextCoinValue(){};
    _setPrevCoinValue(){};

    _switchHandler({ type, circle }){};

    _subscribeOnce(){
        this.addListener('components.coin.set', this._setHandler.bind(this));
        this.addListener('components.coin.switch', this._switchHandler.bind(this));
    };
}

module.exports = ComponentsCoinController;
