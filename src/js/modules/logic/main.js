class ModulesLogicMain {

    constructor(){
        this._sesId = null;
    }

    transportReadyHandler(){
        this.sendApiVersionRequest();
    };

    sendApiVersionRequest(){
        this.sendRequest('ApiVersionRequest');
    };

    sendRequest(requestName, data){
        this.emit('modules.logic.transport.send', { requestName, data });
    };

    processApiVersion({ transportConfig }){
        const { reconnectTimeout } = transportConfig;
        Urso.localData.set('transport.reconnectTimeout', reconnectTimeout);
    };

    processAuth(data){
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
    };

    emitUpdateBaseComponentsData(){
        this.emit('components.extraBet.set');
        this.emit('components.coin.set');
        this.emit('components.bet.set');
        this.emit('components.lines.set');
        this.emit('components.paytable.setPayouts');
        this.emit('components.slotMachine.setInitialSymbols');
        this.emit('components.balance.set');

        this.totalBetUpdate();
    };

    totalBetUpdate(){
        this.emit('components.totalBet.update');
    };

    processBalance({ currency, totalAmount }){
        Urso.localData.set('gamble.canActivate', false);

        Urso.localData.set('balance', { currency, totalAmount });
        this.emit('modules.logic.main.balanceResponce');
    };

    processCheckBrokenGame({ haveBrokenGame }){};


    processSpin(data){
        Urso.localData.set('slotMachine', data);
        this.updateGamble();
      
        this.emit('modules.logic.main.spinResponse');
    };

    updateGamble(){
        const canGamble = Urso.localData.get('slotMachine.spinStages.0.slotWin.canGamble');
        Urso.localData.set('gamble.canActivate', canGamble);
        Urso.localData.set('gamble.totalWin', Urso.localData.get('slotMachine.spinStages.0.slotWin.totalWin'));
    }

    sendAuthRequest(){
        this.sendRequest('AuthRequest');
    };

    sendBalanceRequestHandler(){
        this.sendRequest('BalanceRequest',  { sessionId: this._sesId });
    };

    sendCheckBonusGameRequest(){
        this.sendRequest('CheckBrokenGameRequest');
    };

    sendSpinRequestHandler(){
        const linesData = Urso.localData.get('lines');
        const coinData = Urso.localData.get('coins');
        const betData = Urso.localData.get('bets');
        const extraBetData = Urso.localData.get('extraBet');

        const lines = new Array(linesData.value).fill(1).map((_, i) =>  i);

        const data = {
            coin: coinData.value,
            bet: betData.value,
            extraBet: extraBetData.value,
            lines: lines
        };

        this.sendRequest('SpinRequest', { sessionId: this._sesId, data });
    };

    messageReceivedHandler({ type, data }){
        switch(type){
            case 'ApiVersion':
                this.processApiVersion(data);
                this.sendCheckBonusGameRequest();
                break;
            case 'CheckBrokenGame':
                this.processCheckBrokenGame(data);
                this.sendAuthRequest();
                break;
            case 'Auth':
                this.processAuth(data);
                this.sendBalanceRequestHandler();
                break;
            case 'Balance':
                this.processBalance(data);
                this.emitUpdateBaseComponentsData();
                break;
            case 'Spin':
                this.processSpin(data);
                break;
            case 'Gamble':
                this.processGamble(data);
                break;
            case 'PickBonus':
                this.processPickBonus(data);
                break;
                
        }
    };

    processGamble({canGamble, totalWin}){
        Urso.localData.set('slotMachine.spinStages.0.slotWin.canGamble', canGamble);
        Urso.localData.set('slotMachine.spinStages.0.slotWin.totalWin', totalWin);

        Urso.localData.set('gamble', {canGamble, totalWin});
        this.emit('modules.logic.main.gambleResponse');

    }

    processPickBonus(data){
        Urso.localData.set('slotMachine.state', data.state);
        const totalWin = Urso.localData.get('slotMachine.spinStages.0.slotWin.totalWin');
        const total = +totalWin + +data.totalWin;

        Urso.localData.set('slotMachine.spinStages.0.slotWin.totalWin', total);

        if (total === 0)
            this.emit('components.winField.setText', 'LOOSE');
        else
            this.emit('components.winField.setText', total)

        this.emit('pickBonus.updateState', data.totalWin);
    }

    displayFinishedHandler(sceneName){
        this.emitUpdateBaseComponentsData();
        Urso.statesManager.start();
    };
    
    betUpdatedHandler(){
        this.totalBetUpdate();
    };

    linesUpdatedHandler(){
        this.totalBetUpdate();
    };

    _setDefaults(){
        Urso.localData.set('extraBet', { betMultiplier: 2, extrabet: 0 });
        Urso.localData.set('coins', { coins: [0.01], value: 0.01 });
        Urso.localData.set('bets', { bets: [1], value: 1 });
        Urso.localData.set('linesCfg', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        Urso.localData.set('lines', { lines: [1, 2, 3, 4, 5, 6, 7, 8, 9], value: 9 });
        Urso.localData.set('payoutsCfg', {});
        Urso.localData.set('balance', { currency: 'FUN', totalAmount: '0.00' });
    };

    gambleSendRequest(){
        this.sendRequest('GambleRequest', { sessionId: this._sesId });
    }

    sendPickBonusRequestHandler(index){
        this.sendRequest('PickBonusRequest', { sessionId: this._sesId, data: {index} });
    }

    _subscribeOnce(){
        this.addListener('modules.transport.ready', this.transportReadyHandler.bind(this), true);
        this.addListener('modules.transport.receive', this.messageReceivedHandler.bind(this), true);
        this.addListener(Urso.events.MODULES_SCENES_DISPLAY_FINISHED, this.displayFinishedHandler.bind(this), true);

        this.addListener('modules.logic.main.spinRequest', this.sendSpinRequestHandler.bind(this), true);
        this.addListener('modules.logic.main.balanceRequest', this.sendBalanceRequestHandler.bind(this), true);
        this.addListener('modules.logic.main.pickBonusRequest', this.sendPickBonusRequestHandler.bind(this), true);
        
        this.addListener('components.bet.updated', this.betUpdatedHandler.bind(this), true);
        this.addListener('components.lines.updated', this.linesUpdatedHandler.bind(this), true);

        this.addListener('components.gamble.sendRequest', this.gambleSendRequest.bind(this), true);


        this._setDefaults();
    };
};

module.exports = ModulesLogicMain;
