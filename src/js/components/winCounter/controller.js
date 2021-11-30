class ComponentsWinCounterController extends Urso.Core.Components.Base.Controller {

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

    _counterTextHandler() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const firstStageSlotWin = slotMachineData.spinStages[0].slotWin;
        const bet = Urso.localData.get('bets.value');

        let totalWin = firstStageSlotWin.totalWin;

        if (!totalWin) {
            return this.emit('components.winField.showWin.finished', null, 1);
        }

        this.counterText.y = totalWin >= (bet * 10) ? 700 : 500;
        this._counterTextTween(this.counterText, totalWin, this.firstWin);
        this.firstWin = false;
    }

    // TODO: REFACTOR
    _counterTextTween(obj, winVal, isFirstWin) {
        this.counterText.visible = true;
        let textConfig = {
            scaleX: 1, scaleY: 1, alpha: 1, duration: 1,
            onComplete: () => {
                gsap.to(obj, {
                    scaleX: 0, scaleY: 0, alpha: 0, delay: 1, onComplete: () => {
                        this.counterText.text = '';
                        this.counterText.visible = false;
                        this.emit('components.winField.showWin.finished', null, 1);
                    }
                });
            }
        };

        if (isFirstWin) {
            textConfig = {
                ...textConfig, get text() { return winVal },
                onUpdate: () => {
                    obj.text = `${this.currency}${obj.text.toFixed(2)} `;
                }
            }
        } else {
            obj.text = `${this.currency}${winVal}`;
        }

        gsap.to(obj, textConfig);
    }

    _subscribeOnce() {
        this.addListener('components.winlines.animateAll.start', this._counterTextHandler.bind(this));
        this.addListener('components.winlines.animateAll.finished', () => {
            this.firstWin = true;
        });
    };
}

module.exports = ComponentsWinCounterController;
