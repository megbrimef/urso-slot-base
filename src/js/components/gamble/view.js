class ComponentsGambleView {
    create() {
        this._reset();
    }

    get _container() {
        return Urso.findOne('^gambleContainer');
    }

    get _cards() {
        return Urso.findAll('.gambleCard');
    }

    show(clbk) {
        this._setContainerVisibility(true);
        clbk();
    }

    hide(clbk) {
        this._setContainerVisibility(false);
        clbk();
    }

    _setContainerVisibility(isVisible) {
        this._container.visible = isVisible;
    }

    _reset() {
        this._setContainerVisibility(false);
        this.disableCards();
    }

    enableCards() {
        this._cards.forEach((card) => card.enable());
    }

    disableCards() {
        this._cards.forEach((card) => card.disable());
    }
}

module.exports = ComponentsGambleView;
