class ComponentsAutoSpinController extends Urso.Core.Components.StateDriven.Controller {
    configStates = {
        IDLE: {
            guard: () => this._idleStateGuard(),
        },
    };

    configActions = {
        resumeAutospinAction: {
            guard: () => this._guardResumeAutospin(),
            run: () => this._runAutoSpin(),
            terminate: () => this._terminateAutoSpin(),
        },
        updateAutospinCounterAction: {
            guard: () => this._guardResumeAutospin(),
            run: (finishClbk) => this._runUpdateAutospinCounter(finishClbk),
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
        // let left = Urso.localData.get('autospin.left');

        // if (--left >= 0) {
        //     Urso.localData.set('autospin.left', left);
        this._finishAutoSpinAction();
        // } else {
        //     this._setAutospinEnabled(false);
        // }
    }

    _runUpdateAutospinCounter(finishClbk) {
        let left = Urso.localData.get('autospin.left');

        if (--left >= 0) {
            Urso.localData.set('autospin.left', left);
        } else {
            this._setAutospinEnabled(false);
        }

        finishClbk();
    }

    _guardResumeAutospin() {
        return this._isAutoSpinEnabled;
    }

    _finishAutoSpinAction() {
        this.callFinish('resumeAutospinAction');
    }

    _terminateAutoSpin() {
        this._finishAutoSpinAction();
    }

    _idleStateGuard() {
        return !this._isAutoSpinEnabled;
    }

    get _isAutoSpinEnabled() {
        return Urso.localData.get('autospin.enabled');
    }

    _setAutospinEnabled(isEnabled) {
        Urso.localData.set('autospin.enabled', isEnabled);
        Urso.localData.set('autospin.left', 0);
    }

    _setButtonFrameTo(frameName) {
        this.autoSpin.setButtonFrame('over', frameName);
        this.autoSpin.setButtonFrame('out', frameName);
    }
}

module.exports = ComponentsAutoSpinController;
