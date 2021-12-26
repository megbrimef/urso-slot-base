class ModulesLogicUiConfig {
    getConfig() {
        return {
            showCurrencyType: 'symbol', // 'currency' | 'symbol' | 'none'
        };
    }

    getControllers() {
        return {
            Buttons: [
                'BetIncreaseButtonController',
                'BetDecreaseButtonController',
                'BetMaxButtonController',
                'SpinButtonController',
                'TurboModeButtonController',
            ],
            Info: [
                'BetController',
                'TotalBetController',
                'BalanceController',
                'LinesController',
                'WinController',
            ],
        };
    }
}

module.exports = ModulesLogicUiConfig;
