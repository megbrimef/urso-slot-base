class ComponentsGambleController extends Urso.Core.Components.StateDriven.Controller {

    constructor() {
        super();

        this._cardsContainer = null;
        this._gambleContainer = null;
        this._gambleWinText = null;

        this.cardsCount = 4;
        this.clickedIndexes = [];
        this.eventBlank = 'components.gamble';
    }

    create() {
        super.create();

        this._cardsContainer = this.common.findOne('^gambleCardsContainer');
        this._gambleContainer = this.common.findOne('^gambleContainer');
        this._gambleWinText = this.common.findOne('^gambleWinText');
        this._gambleContainer._baseObject.interactive = true;
    }

    _guard() {
        return Urso.localData.get('gamble.canActivate');
    }

    _clearAll() {
        const cards = this.common.findAll('.gambleCard');

        cards.forEach(card => {
            card.destroy();
        });

        this.clickedIndexes = [];

        this._cardsContainer._baseObject.removeChildren()
    }

    _createCards() {
        for (let i = 0; i < this.cardsCount; i++) {
            const cardTpl = this.getInstance('CardTemplate').objects[0];
            const card = Urso.objects.create(cardTpl, this._cardsContainer);
            const containerClass = `index${i}`;
            card.addClass('gambleCard');
            card.addClass(containerClass);
            const cardClosed = card._baseObject.children[0];
            const dW = this._cardsContainer.width - (this.cardsCount * cardClosed.width);
            card._baseObject.x = i * (dW + cardClosed.width);
            card._baseObject.interactive = true;
            card._baseObject.on('click', () => this.emit(`${this.eventBlank}.cardClicked`, i));
            card._baseObject.on('tap', () => this.emit(`${this.eventBlank}.cardClicked`, i));
        }
    }

    _setInteractive(isInteractive) {
        this._cardsContainer._baseObject.children.forEach((child, index) => {

            if (isInteractive && this.clickedIndexes.indexOf(index) > -1)
                return;

            child.buttonMode = isInteractive;
            child.interactive = isInteractive;
        });
    }

    _startHandler() {
        if (!Urso.localData.get('gamble.canActivate') || Urso.localData.get('spinning') || Urso.localData.get('autospin.enabled'))
            return;

        this._showGamble();
    }

    _showGamble() {
        setTimeout(() => {
            this.emit('components.bonusBg.show', 'gamble');
            this._gambleContainer.visible = true;
            this._clearAll();
            this._createCards();
            this._setInteractive(true);
            this._updateWinText();
        }, 500);
    }

    _start() { }

    _cardClicked(clickedIndex) {
        this.clickedIndexes.push(clickedIndex);
        this._setInteractive(false);
        this.emit(`${this.eventBlank}.sendRequest`);
    }

    _updateWinText() {
        const { totalWin } = Urso.localData.get('gamble');
        this._gambleWinText.text = totalWin;
        this.emit('components.winField.setText', totalWin);

        if (+totalWin === 0) {
            this.emit('components.winlines.stop');
        }
    }

    _updateGambleState() {
        const { canGamble, totalWin } = Urso.localData.get('gamble');
        const isRedCard = canGamble && totalWin > 0;

        this._hideClosedCard();
        this._openCard(isRedCard);

        this._setInteractive(isRedCard);
        this._updateWinText();
    }

    _gambleResponse() {
        this._updateGambleState();

        if (!this._checkCanGamble())
            this._hideGamble();
    }

    _checkCanGamble() {
        const { canGamble } = Urso.localData.get('gamble');
        return canGamble;
    }

    _hideGamble() {
        setTimeout(() => {
            this.emit('components.bonusBg.hide');
            this._gambleContainer.visible = false;
            this.emit(`${this.eventBlank}.closed`);
            this._finished();
        }, 2000);
    }

    _getLastClickedIndex() {
        return this.clickedIndexes[this.clickedIndexes.length - 1];
    }

    _hideClosedCard() {
        const lastIndex = this._getLastClickedIndex();
        const closedTexture = this.common.findOne(`.gambleCard.index${lastIndex} .closed`);
        closedTexture.visible = false;
    }

    _openCard(isRed) {
        const textureName = isRed ? 'red' : 'black';
        const lastIndex = this._getLastClickedIndex();
        const cardTexture = this.common.findOne(`.gambleCard.index${lastIndex} .${textureName}`);
        cardTexture.visible = true;
    }

    _subscribeOnce() {
        super._subscribeOnce();

        this.addListener('modules.logic.main.gambleResponse', this._gambleResponse.bind(this));
        this.addListener('components.gamble.start', this._startHandler.bind(this));
        this.addListener('components.gamble.cardClicked', this._cardClicked.bind(this));
    };
}

module.exports = ComponentsGambleController;
