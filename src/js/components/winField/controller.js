class ComponentsWinFieldController extends Urso.Core.Components.StateDriven.Controller {
    configActions = {
        showWinAmountTextAction: {
            guard: () => this._guardShowWinText(),
            run: (finishClbk) => this._runShowAmountWinText(finishClbk),
        },
        resetWinTextAction: {
            run: (finishClbk) => this._runResetText(finishClbk),
        },
        showWinTextAction: {
            run: (finishClbk) => this._runShowWinText(finishClbk),
        },
    };

    texts = null;

    cheering = null;

    create() {
        this.texts = Urso.findAll('.winFieldValue');
        this.cheering = Urso.findOne('.cheeringText');
    }

    _runShowAmountWinText(finishClbk) {
        this._showWinText();
        finishClbk();
    }

    _guardShowWinText() {
        return this._hasWin();
    }

    _hasWin() {
        return Urso.localData.get('slotMachine.spinStages.0.slotWin');
    }

    _runResetText(finishClbk) {
        this._resetText();
        finishClbk();
    }

    _runShowWinText(finishClbk) {
        this.cheering.text = 'WIN';
        finishClbk();
    }

    _getWinData(slotMachineData) {
        const isBonus = slotMachineData.state !== 'Ready';
        let totalWin = 0;

        slotMachineData.spinStages.forEach((stage) => {
            totalWin += +stage.slotWin.totalWin;
        });

        return { isBonus, totalWin };
    }

    _showWinText() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const { totalWin } = this._getWinData(slotMachineData);
        this._updateText(totalWin);
    }

    _formatWin(textObj, { currency, text }) {
        if (Number.isNaN(Number(text)) || text === '') {
            textObj.text = text;
            return;
        }

        textObj.text = `${text} ${currency}`;
    }

    _showWinQuickFinishHandler() { }

    _resetText() {
        this.texts.forEach((textObj) => this._formatWin(textObj, { text: '', currency: '' }));
        this.cheering.text = 'Good luck';
    }

    _updateText(win = 0) {
        const { currency } = Urso.localData.get('balance');
        this.cheering.text = win > 0 ? 'WIN' : 'Try again';

        const winAmount = win > 0 ? Number(win).toFixed(2) : '';
        this.texts.forEach((textObj) => this._formatWin(textObj, { text: winAmount, currency }));
    }

    _setTextHandler(win) {
        this._updateText(win);
    }
}

module.exports = ComponentsWinFieldController;
