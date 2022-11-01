class ModulesLogicUiConfig {
    getConfig() {
        return {
            showCurrencyType: 'symbol', // 'currency' | 'symbol' | 'none'
        };
    }

    getControllers() {
        return {
            Buttons: [
                'AutoSpinButtonController',
                'BetIncreaseButtonController',
                'BetIncreaseButtonCircularController',
                'BetDecreaseButtonController',
                'BetDecreaseButtonCircularController',
                'LineIncreaseButtonController',
                'LineIncreaseButtonCircularController',
                'BetMaxButtonController',
                'SpinButtonController',
                'SkipButtonController',
                'CollectButtonController',
                'TurboModeButtonController', 
            ],
            Info: [
                'BetController',
                'TotalBetController',
                'BalanceController',
                'LinesController',
                'WinController',
                'ClockController',
                'CheeringController'
            ],
        };
    }
}

module.exports = ModulesLogicUiConfig;
