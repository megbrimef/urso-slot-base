const BaseTransportAction = require('./baseTransportAction');
class ModulesStatesManagerActionsServerAuthRequestAction extends BaseTransportAction {
    name = 'serverAuthRequestAction';

    _postProcessEvent(data) {
        const { 
            betMultiplier,
            bets,
            coinValues,
            defaultBet,
            defaultCoinValue,
            defaultLines,
            extrabet,
            gameParameters,
            sessionId
        } = data;

        this._sesId = sessionId;

        const { avaliableLines, payouts, initialSymbols } = gameParameters;
        const normalizedLines = defaultLines.map(index => index + 1);
        const linesVal = normalizedLines[normalizedLines.length - 1];

        Urso.localData.set('extraBet', { betMultiplier, extrabet });
        Urso.localData.set('coins', { coins: coinValues, value: defaultCoinValue });
        Urso.localData.set('bets', { bets: bets, value: defaultBet });
        Urso.localData.set('linesCfg', avaliableLines);
        Urso.localData.set('lines', { lines: normalizedLines, value: linesVal });
        Urso.localData.set('payoutsCfg', payouts);
        Urso.localData.set('slotMachine.initialSymbols', initialSymbols);

        return true; 
    }

    _preProcessEvent() {
        this.sendRequest('AuthRequest');
    }
};

module.exports = ModulesStatesManagerActionsServerAuthRequestAction;
