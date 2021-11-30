class ComponentsWinFieldController extends Urso.Core.Components.Base.Controller {
    constructor(params) {
        super(params);
        this.texts;
        this.cheering;
    }

    create() {
        this.texts = Urso.findAll('.winFieldValue');
        this.cheering = Urso.findOne('.cheeringText');
    }

    _getWinData(slotMachineData) {
        let isBonus = slotMachineData.state !== 'Ready';
        let totalWin = 0;

        slotMachineData.spinStages.forEach(stage => {
            totalWin += +stage.slotWin.totalWin;
        });

        return { isBonus, totalWin }
    }

    _showWinStartHandler() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const { isBonus, totalWin } = this._getWinData(slotMachineData)

        this._updateText(totalWin);

        if (totalWin === 0 && !isBonus) {
            this.emit('components.winField.showWin.finished', null, 1);
            return;
        }
    };

    _formatWin(textObj, { currency, text }) {
        if (isNaN(Number(text)) || text === "") {
            textObj.text = text;
            return;
        }

        textObj.text = `${text} ${currency}`;
    };

    _showWinQuickFinishHandler() { };

    _resetHandler() {
        const text = '', currency = '';
        this.texts.forEach(textObj => this._formatWin(textObj, { text, currency }));
        this.cheering.text = 'Good luck'
        this.emit('components.winField.resetDone');
    };

    _updateText(win = 0) {
        const { currency } = Urso.localData.get('balance');
        this.cheering.text = win > 0 ? 'WIN' : 'Try again';

        const winAmount = win > 0 ? Number(win).toFixed(2) : '';
        this.texts.forEach(textObj => this._formatWin(textObj, { text: winAmount, currency }));
    }

    _setTextHandler(win) {
        this._updateText(win);
    }

    _subscribeOnce() {
        this.addListener('components.winField.showWin.start', this._showWinStartHandler.bind(this));
        this.addListener('components.winField.showWin.quickFinish', this._showWinQuickFinishHandler.bind(this));
        this.addListener('components.winField.reset', this._resetHandler.bind(this));
        this.addListener('components.winField.setText', this._setTextHandler.bind(this));
    };
}

module.exports = ComponentsWinFieldController;
