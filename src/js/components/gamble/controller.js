class ComponentsGambleController extends Urso.Core.Components.StateDriven.Controller {
    _gambleGameShowed = false;
    _viewInstance = false;
    _selectedIndex = -1;

    configStates = {
        GAMBLE: {
            guard: () => this._guardGambleState(),
        },
    };

    configActions = {
        showGambleAction: {
            guard: () => this._guardShowGamble(),
            run: () => this._runShowGamble(),
        },
        waitingForCardChoose: {
            run: () => this._runWaitingForCardChoose(),
        },
        serverSendGambleRequestAction: {
            run: () => this._runServerSendGambleRequest(),
        },
        updateGambleWinAction: {
            run: (finishClbk) => this._runUpdateGambleWin(finishClbk),
        },
        hideGambleAction: {
            guard: () => this._guardHideGamble(),
            run: () => this._runHideGamble(),
        },
    };

    _guardGambleState() {
        return this._canGamble;
    }

    // SHOW GAMBLE ACTION
    _guardShowGamble() {
        return !this._gambleGameShowed;
    }

    _runShowGamble() {
        this._gambleGameShowed = true;
        this._view.show(this._showFinished.bind(this));
    }

    // WAITING FOR CARD CHOOSE ACTION
    _runWaitingForCardChoose() {
        this._view.enableCards();
        this._subscribeForButtonsPress();
    }

    _gambleButtonPressed({ class: classes }) {
        this._view.disableCards();
        this._unsubscribeForButtonsPress();
        this._updateSelectedIndex(classes);
        this.callFinish('waitingForCardChoose');
    }

    _isGambleButtonPressed({ class: classes }) {
        return classes.split(' ').includes('gambleCard');
    }

    _buttonPressed(params) {
        if (this._isGambleButtonPressed(params)) {
            this._gambleButtonPressed(params);
        }
    }

    _buttonPressHandler = (params) => this._buttonPressed(params);

    _subscribeForButtonsPress() {
        this.addListener(Urso.events.MODULES_OBJECTS_BUTTON_PRESS, this._buttonPressHandler);
    }

    _unsubscribeForButtonsPress() {
        this.removeListener(Urso.events.MODULES_OBJECTS_BUTTON_PRESS, this._buttonPressHandler);
    }

    // SERVER SEND GAMBLE REQUEST ACTION
    _runServerSendGambleRequest() {
        this._subscribeForServerResponse();
        if (this._selectedIndex >= 0) {
            const model = Urso.getInstance('Modules.Transport.Models.GambleRequest', { data: { index: this._selectedIndex } });
            Urso.transport.send(model);
        }
    }

    _serverResponseHandler = (data) => this._serverResponse(data);

    _serverResponse({ data: { canGamble, totalWin } }) {
        Urso.localData.set('gamble', { canGamble, totalWin });

        this._unsubscribeForServerResponse();
        this.callFinish('serverSendGambleRequestAction');
    }

    _subscribeForServerResponse() {
        this.addListener('modules.transport.receive', this._serverResponseHandler);
    }

    _unsubscribeForServerResponse() {
        this.removeListener('modules.transport.receive', this._serverResponseHandler);
    }

    // UPDATE GAMBLE WIN ACTION
    _runUpdateGambleWin(finishClbk) {
        finishClbk();
    }

    // HIDE GAMBLE ACTION
    _guardHideGamble() {
        return !this._canGamble && this._gambleGameShowed;
    }

    _runHideGamble() {
        this._gambleGameShowed = false;
        this._view.hide(this._hideFinished.bind(this));
    }

    create() {
        this._view.create();
    }

    get _canGamble() {
        return Urso.localData.get('gamble.canGamble');
    }

    get _view() {
        if (!this._viewInstance) {
            this._viewInstance = this.getInstance('View');
        }
        return this._viewInstance;
    }

    _showFinished() {
        this.callFinish('showGambleAction');
    }

    _hideFinished() {
        this.callFinish('hideGambleAction');
    }

    _updateSelectedIndex(classes) {
        const classesArr = classes.split(' ');

        if (classesArr.includes('red')) {
            this._selectedIndex = 0;
        } else if (classesArr.includes('black')) {
            this._selectedIndex = 0;
        } else {
            Urso.logger.error('Undefined button was pressed!');
        }
    }
}

module.exports = ComponentsGambleController;
