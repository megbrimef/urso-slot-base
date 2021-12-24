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
                    type: 'big',
                    durationFactor: 2000,
                    hideDelay: 1000,
                    showAnimationName: 'show',
                    loopAnimationName: 'loop',
                    hideAnimationName: 'hide',
                },
            },
            smoothTransition: false, // TODO: implement
            showCurrencyType: 'currency', // 'currency' | 'symbol' | 'none'
        };
    }
}

module.exports = ComponentsWinCounterConfig;
