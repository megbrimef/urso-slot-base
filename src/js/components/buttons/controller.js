class ComponentsButtonsController extends Urso.Core.Components.StateDriven.Controller {
    configStates = {}
    configActions = {
        disableUiButtonsAction: {
            run: (finishClbk) => this._runDisableUiButtons(finishClbk),
        },
        enableUiButtonsAction: {
            run: (finishClbk) => this._runEnableUiButtons(finishClbk),
        },
        hideSpinButtonAction: {
            run: (finishClbk) => this._runHideSpinButton(finishClbk)
        },
        showSpinButtonAction: {
            run: (finishClbk) => this._runShowSpinButton(finishClbk)
        },
        hideStopButtonAction: {
            run: (finishClbk) => this._runHideStopButton(finishClbk)
        },
        showStopButtonAction: {
            run: (finishClbk) => this._runShowStopButton(finishClbk)
        }
    };

    _runHideSpinButton(finishClbk) {
        this._switchButtonVisibility('spin', false);
        finishClbk();
    }
    
    _runShowSpinButton(finishClbk) {
        this._switchButtonVisibility('spin', true);
        finishClbk();
    }

    _runHideStopButton(finishClbk) {
        this._switchButtonVisibility('stop', false);
        finishClbk();
    }

    _runShowStopButton(finishClbk) {
        this._switchButtonVisibility('stop', true);
        finishClbk();
    }
 
    get _disableableButtons() {
        return Urso.findAll('.uiButton.disableable');
    }

    _switchButtonVisibility(name, isVisible) {
        const btn = Urso.findOne(`^${name}`);

        if(!btn){
            Urso.logger.error(`Button with name '${name}' wasn't found`);
            return;
        }

        Urso.findOne(`^${name}`).visible = isVisible;
    }

    _runDisableUiButtons(finishClbk) {
        this._disableableButtons.forEach(btn => btn.disable());
        finishClbk();
    }

    _runEnableUiButtons(finishClbk) {
        this._disableableButtons.forEach(btn => btn.enable());
        finishClbk();
    }
}

module.exports = ComponentsButtonsController;
