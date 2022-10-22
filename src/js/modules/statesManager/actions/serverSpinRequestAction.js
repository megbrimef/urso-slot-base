const BaseTransportAction = require('./baseTransportAction');

class ModulesStatesManagerActionsServerSpinRequestAction extends BaseTransportAction {
    name = 'serverSpinRequestAction';
    serverActionType = 'Spin';

    _postProcessEvent(data) {
        Urso.localData.set('slotMachine', data);

        const canGamble = Urso.localData.get('slotMachine.spinStages.0.slotWin.canGamble');
        Urso.localData.set('gamble.canGamble', canGamble);

        return true;
    }

    _preProcessEvent() {
        const linesData = Urso.localData.get('lines');
        const coinData = Urso.localData.get('coins');
        const betData = Urso.localData.get('bets');
        const extraBetData = Urso.localData.get('extraBet');
        const sessionId = Urso.localData.get('sessionId');

        const lines = new Array(linesData.value).fill(1).map((_, i) => i);
        const data = {
            coin: coinData.value,
            bet: betData.value,
            extraBet: extraBetData.value,
            lines,
        };

        this.sendRequest('SpinRequest', { sessionId, data });
    }
}

module.exports = ModulesStatesManagerActionsServerSpinRequestAction;
