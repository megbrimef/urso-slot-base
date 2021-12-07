class ComponentsWinCounterController extends Urso.Core.Components.StateDriven.Controller {
    
    configActions = {
        showWinCounterAction: {
            guard: () => this._getTotalWin(),
            run: () => this._runShowWinCounter(),
        }
    };

    create() {
        this.counterText = this.common.findOne('^counterText');
        this.firstWin = true
        this.counterText.visible = false;
    }

    get currency() {
        const { currency } = Urso.localData.get('balance');

        if (currency === 'USD') {
            return '$';
        }

        return '';
    }
    
    _runShowWinCounter(){
        this._startCounterAnimation();
    }

    _getTotalWin() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const { totalWin } = slotMachineData.spinStages[0].slotWin;
        return totalWin;
    }

    _startCounterAnimation() {
        const totalWin = this._getTotalWin();
        const bet = Urso.localData.get('bets.value');

        this.counterText.y = totalWin >= (bet * 10) ? 700 : 500;
        this._counterTextTween(this.counterText, totalWin, this.firstWin);
        this.firstWin = false;
    }

    _counterTextTween(obj, winVal) {
        obj.visible = true;
        obj.scaleX = obj.scaleY = obj.alpha = 0;
        obj.text = 0;
        obj.y = 0;
        let textConfig = {
            scaleX: 1, scaleY: 1, alpha: 1, text: winVal,
            onUpdate: () => {obj.text = obj.text.toFixed(2)},
            duration: 2,
            onComplete: () => {
                gsap.to(obj, { scaleX: 0, scaleY: 0, alpha: 0, delay: 1, onComplete: () => {
                    this.emit('components.winField.showWin.finished', null, 1);
                    this.firstWin = true;
                    this.callFinish('showWinCounterAction');
                } });
            }
        };


        gsap.to(obj, textConfig);
    }

    // _subscribeOnce() {
        // this.addListener('components.winlines.animateAll.start', this._counterTextHandler.bind(this));
        // this.addListener('components.winlines.animateAll.finished', () => {
        //     this.firstWin = true;
        // });
    // };
}

module.exports = ComponentsWinCounterController;
