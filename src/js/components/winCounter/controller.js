class ComponentsWinCounterController extends Urso.Core.Components.StateDriven.Controller {
    configActions = {
        showWinCounterAction: {
            guard: () => this._getTotalWin(),
            run: () => this._runShowWinCounter(),
            terminate: () => this._terminateShowWinCounter(),
        },
    };

    _counterTween = null;
    _showHideTween = null;
    _showParams = null;

    get _config() {
        return this.getInstance('Config').get();
    }

    get _counterText() {
        return this.common.findOne('^counterText');
    }

    get _bigWinCounterText() {
        return this.common.findOne('^bigWinCounterText');
    }

    get _bigWinAnimation() {
        return this.common.findOne('^bigWinAnimation');
    }

    get _currency() {
        const { showCurrencyType } = this._config;
        const { currentCurrency, currentSymbol } = Urso.localData.get('currency');

        switch (showCurrencyType) {
        case 'currency':
            return currentCurrency;
        case 'symbol':
            return currentSymbol;
        default:
            return '';
        }
    }

    _runShowWinCounter() {
        this._startCounterAnimation();
    }

    _terminateShowWinCounter() {
        this._startLastState();
    }

    _getTotalWin() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const { totalWin } = slotMachineData.spinStages[0].slotWin;
        return totalWin;
    }

    _startCounterAnimation() {
        this._reset();

        const totalWin = this._getTotalWin();
        this._showParams = this._getShowParams(totalWin);

        this._runCounterTextAnimation(totalWin);
        this._runShowAnimation(this._showParams);
    }

    _runShowAnimation({ type }) {
        if (type === 'big') {
            this._runBigWinAnimation();
            return;
        }

        this._runRegularWinAnimation();
    }

    _runBigWinAnimation() {
        const { showAnimationName } = this._showParams;
        this._bigWinAnimation.play(showAnimationName);

        this._bigWinAnimation._baseObject.state.clearListeners();
        this._bigWinAnimation._baseObject.state.addListener({
            complete: () => {
                this._bigWinAnimation._baseObject.state.clearListeners();
                this._bigWinShowComplete();
            },
        });
    }

    _bigWinShowComplete() {
        const { loopAnimationName } = this._showParams;
        this._bigWinAnimation.play(loopAnimationName, true);
    }

    _reset() {
        this._showParams = null;
        this._counterText.text = 0;
        this._counterText.alpha = 0;
        this._counterText.scaleX = 0;
        this._counterText.scaleY = 0;
    }

    _runRegularWinAnimation() {
        const { showDuration } = this._showParams;

        this._showHideTween = gsap.to(this._counterText, {
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: showDuration / 1000,
            ease: 'back.out(2)',
        });
    }

    _runCounterTextAnimation(totalWin) {
        const duration = this._getCounterDuration(totalWin);

        this._counterTween = gsap.to(this._counterText, {
            text: totalWin,
            onUpdate: () => {
                this._setTextSafe(this._counterText, this._counterText.text);
                this._setTextSafe(this._bigWinCounterText, this._counterText.text);
            },
            duration,
            onComplete: () => this._runHideAnimation(),
        });
    }

    _runHideAnimation() {
        const { type } = this._showParams;

        if (type === 'big') {
            this._runBigWinHideAnimation();
            return;
        }

        this._runRegularHideAnimation();
    }

    _runBigWinHideAnimation() {
        const { hideAnimationName, hideDelay } = this._showParams;

        setTimeout(() => {
            this._bigWinAnimation._baseObject.state.clearListeners();
            this._bigWinAnimation.play(hideAnimationName);

            this._bigWinAnimation._baseObject.state.addListener({
                complete: () => {
                    this._bigWinAnimation._baseObject.state.clearListeners();
                    this._winHideComplete();
                },
            });
        }, hideDelay);
    }

    _winHideComplete() {
        this._reset();
        this.callFinish('showWinCounterAction');
    }

    _runRegularHideAnimation() {
        const { hideDuration, hideDelay } = this._showParams;

        this._showHideTween = gsap.to(this._counterText, {
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            duration: hideDuration / 1000,
            delay: hideDelay / 1000,
            ease: 'back.in(2)',
            onComplete: () => this._winHideComplete(),
        });
    }

    _killTweens() {
        if (this._counterTween) {
            this._counterTween.kill();
        }

        if (this._showHideTween) {
            this._showHideTween.kill();
        }

        this._showHideTween = null;
        this._counterTween = null;
    }

    _getCounterDuration(winAmount) {
        const { durationFactor } = this._showParams;
        return winAmount * (durationFactor / 1000);
    }

    _startLastState() {
        const { type } = this._showParams;
        const totalWin = this._getTotalWin();
        this._killTweens();

        if (type === 'regular') {
            this._counterText.alpha = 1;
            this._counterText.scaleX = 1;
            this._counterText.scaleY = 1;
        }

        this._setTextSafe(this._counterText, totalWin);
        this._setTextSafe(this._bigWinCounterText, totalWin);

        this._runHideAnimation();
    }

    _formatWinText(winVal) {
        return Number(winVal).toFixed(2);
    }

    _setTextSafe(textObj, text) {
        if (textObj) {
            textObj.text = this._formatWinText(text);
        }
    }

    _getFactorParams(winVal) {
        const { winThresholdsDurations } = this._config;
        const { value } = Urso.localData.get('totalBet');
        const factors = Object.keys(winThresholdsDurations).sort().reverse();
        const currFactor = winVal / value;
        const factor = factors.filter((fcr) => +fcr <= currFactor).shift();
        return winThresholdsDurations[factor];
    }

    _getShowParams(winVal) {
        return this._getFactorParams(winVal);
    }
}

module.exports = ComponentsWinCounterController;
