class ComponentsAutoSpinController extends Urso.Core.Components.StateDriven.Controller {
    _waitingForSpinPress = false;

    configStates = {
        IDLE: {
            guard: () => this._idleStateGuard(),
        },
    };

    configActions = {
        autospinAction: {
            run: () => this._runAutoSpin(),
            terminate: () => this._terminateAutoSpin(),
        },
        autospinCheckAction: {
            run: () => this._runAutoSpinCheck(),
            terminate: () => this._terminateAutoSpinCheck(),
        },
    };

    create() {
        this.autoSpin = this.common.findOne('^auto');
        this._setAutospinEnabled(false);
    }

    _terminateAutoSpinCheck() {
        this.callFinish('autospinCheckAction');
    }

    _runAutoSpinCheck() {
        if (Urso.localData.get('autospin.enabled')) {
            this.callFinish('autospinCheckAction');
        }
    }

    _runAutoSpin() {
        this._waitingForSpinPress = true;
    }

    _terminateAutoSpin() {
        this._waitingForSpinPress = false;
        this.callFinish('autospinAction');
    }

    _idleStateGuard() {
        return !Urso.localData.get('autospin.enabled');
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
    }

    _stopAutoSpin() {
        this._setAutospinEnabled(false);
        this._setButtonFrameTo('autoUnpressed');
    }

    _switchAutospin() {
        if (Urso.localData.get('autospin.enabled')) {
            this._stopAutoSpin();
        } else {
            this._startAutoSpin();
        }
    }

    _buttonPressHandler = () => {
        this._switchAutospin();
        if (this._waitingForSpinPress) {
            this._terminateAutoSpin();
        }
    };

    _subscribeOnce() {
        super._subscribeOnce();
        this.addListener('components.autospin.press', this._buttonPressHandler);
    }
}

module.exports = ComponentsAutoSpinController;
