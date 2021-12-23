class ComponentsPickBonusController extends Urso.Core.Components.StateDriven.Controller {
    constructor() {
        super();

        this.eventBlank = 'components.pickGame';
        this._pickObjects = [];
        this.picksAmount = 5;

        this._start = this._start.bind(this);
    }

    create() {
        Urso.localData.set('pickBonus.selected', null);
        super.create();
        this._createLinks();
        this._reset();
    }

    get _allPickItems() {
        return this.common.findAll('.pickItem').map((items) => items._controller);
    }

    get _selectedPickItem() {
        return this._allPickItems.find((i) => i.id === Urso.localData.get('pickBonus.selected'));
    }

    set _isAllItemsInteractive(isInteractive) {
        this._allPickItems.forEach((i) => { i.interactive = isInteractive; });
    }

    _guard() {
        return Urso.localData.get('slotMachine.state') === 'PickBonus';
    }

    _createLinks() {
        this._container = this.common.findOne('^pickBonusContainer');
    }

    _switchTourchAnimationTo(needShow) {
        this.common.findAll('.torch').forEach((torch) => {
            torch.play('main', needShow);
            torch.visible = needShow;
        });
    }

    _start() {
        this._reset();
        this.emit('components.bonusBg.show', 'pickBonus');
        this._switchTourchAnimationTo(true);
        this._isAllItemsInteractive = false;

        setTimeout(() => {
            this._isAllItemsInteractive = true;
            this._show();
        }, 1000);
    }

    _reset() {
        this._container.visible = false;
        this._switchTourchAnimationTo(false);
        this._allPickItems.forEach((i) => i.reset());
        this.emit('components.bonusBg.hide');
    }

    _show() {
        this._container.visible = true;
    }

    _pickItemClicked(index) {
        this._isAllItemsInteractive = false;

        Urso.localData.set('pickBonus.selected', index);
        this.emit('modules.logic.main.pickBonusRequest', index);
    }

    _updateState(win) {
        this._selectedPickItem.winTextValue = win;
        this._selectedPickItem.loose = win === 0;

        setTimeout(() => {
            if (win === 0) {
                this.emit('components.winField.setText', 'LOOSE');
            } else {
                this.emit('components.winField.setText', win);
            }

            this.emit('modules.logic.main.balanceRequest');
        }, 2000);
    }

    _balanceHandler() {
        const selected = Urso.localData.get('pickBonus.selected');

        if (selected === null || selected === undefined) {
            return;
        }

        Urso.localData.set('pickBonus.selected', null);
        this._reset();
        this._finished();
    }

    _subscribeOnce() {
        super._subscribeOnce();
        this.addListener('components.pickItem.clicked', this._pickItemClicked.bind(this));
        this.addListener('pickBonus.updateState', this._updateState.bind(this));
        this.addListener('components.balance.set', this._balanceHandler.bind(this));
    }
}

module.exports = ComponentsPickBonusController;
