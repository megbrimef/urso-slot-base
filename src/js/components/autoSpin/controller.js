//TODO: Move to base_game
class ComponentsAutoSpinController extends Urso.Core.Components.StateDriven.Controller {

    constructor() {
        super()

        this.eventBlank = 'components.autoSpin';
    }

    create() {
        this.autoSpin = this.common.findOne('^auto');
        this._setAutospinEnabled(false);
    }

    _guard() {
        return Urso.localData.get('autospin.enabled');
    }

    _start() {
        if (Urso.localData.get('spinning'))
            return;

        this.emit(`${this.eventBlank}.started`);
        this.emit('components.slotMachine.spinCommand');
        this._finished();
    }

    _setAutospinEnabled(isEnabled) {
        Urso.localData.set('autospin.enabled', isEnabled);
    }

    _setButtonFrameTo(frameName) {
        this.autoSpin.setButtonFrame('over', frameName);
        this.autoSpin.setButtonFrame('out', frameName);
    }

    _startAutoSpin() {
        this._setAutospinEnabled(true);
        this._setButtonFrameTo('autoPressed');

        this._start();
    }

    _stopAutoSpin() {
        this._setAutospinEnabled(false);
        this._setButtonFrameTo('autoUnpressed');
    }

    _handleButton(btn = {}) {
        if (btn.name !== 'auto')
            return;

        (!Urso.localData.get('autospin.enabled')) ?
            this._startAutoSpin() : this._stopAutoSpin();
    }

    _subscribeOnce() {
        super._subscribeOnce();
        this.addListener(Urso.events.MODULES_OBJECTS_BUTTON_PRESS, this._handleButton.bind(this));
        this.addListener('start.autoSpin', this._startAutoSpin.bind(this));
    }

}

module.exports = ComponentsAutoSpinController;
