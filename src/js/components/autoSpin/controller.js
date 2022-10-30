class ComponentsAutoSpinController extends Urso.Core.Components.StateDriven.Controller {

    configActions = {
        resumeAutospinAction: {
            run: () => this._runAutoSpin(),
            terminate: () => this._terminateAutoSpin(),
        },
        updateAutospinCounterAction: {
            guard: () => this._guardResumeAutospin(),
            run: (finishClbk) => this._runUpdateAutospinCounter(finishClbk),
        },
        checkAutospinAction: {
            guard: () => this._guardResumeAutospin(),
            run: (finishClbk) => this._runCheckAutospin(finishClbk),
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
        this._subscribeOnUpdate();

        if(Urso.localData.get('autospin.enabled')) {
            this._finishAutoSpinAction();
        }
    }

    _unsubscribeOnUpdate() {
        this.removeListener('modules.logic.ui.auto.update', this._onUpdateHandler);
    }

    _subscribeOnUpdate() {
        this.addListener('modules.logic.ui.auto.update', this._onUpdateHandler);
    }

    _onUpdateHandler = () => {
        this._finishAutoSpinAction();
    }

    get _noAutoSpinsLeft() {
        return Urso.localData.get('autospin.left') === 0;
    }

    _runAutoSpinChecks() {
        if (this._noAutoSpinsLeft) {
            this._setAutospinEnabled(false);
        }
    }

    _runCheckAutospin(finishCallback) {
        this._runAutoSpinChecks();
        finishCallback();
    }

    _runUpdateAutospinCounter(finishClbk) {
        let left = Urso.localData.get('autospin.left');

        if (--left >= 0) {
            Urso.localData.set('autospin.left', left);
        }

        finishClbk();
    }

    _guardResumeAutospin() {
        return this._isAutoSpinEnabled;
    }

    _finishAutoSpinAction() {
        this._unsubscribeOnUpdate();
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
    }
}

module.exports = ComponentsAutoSpinController;
