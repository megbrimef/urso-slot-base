class ComponentsWinCounterConfig {
    get() {
        return {
            winThresholdsDurations: {
                0: {
                    type: 'regular',
                    durationFactor: 2000,
                    showDuration: 500,
                    hideDuration: 500,
                    hideDelay: 1000,
                },
                10: {
                    type: 'regular',
                    durationFactor: 20,
                    showDuration: 500,
                    hideDuration: 500,
                    hideDelay: 1000,
                },
            },
            smoothTransition: false, // TODO: implement
            showCurrencyType: 'currency', // 'currency' | 'symbol' | 'none'
        };
    }
}

module.exports = ComponentsWinCounterConfig;
