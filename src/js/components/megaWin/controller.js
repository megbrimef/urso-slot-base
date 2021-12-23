class ComponentsMegaWinController extends Urso.Core.Components.Base.Controller {
    create() {
        this.megaWin = this.common.findOne('^megaWinAnimation');
        this.megaWin.play('', true);
    }

    _animationHandler() {
        const slotMachineDataFirstStage = Urso.localData.get('slotMachine.spinStages.0');
        const { totalWin, lineWinAmounts } = slotMachineDataFirstStage.slotWin;
        const bet = Urso.localData.get('bets.value');

        if (!lineWinAmounts.length || totalWin < bet * 10) {
            return;
        }

        gsap.to(this.megaWin, {
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            onComplete: () => {
                gsap.to(this.megaWin, {
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0,
                    delay: 1.5,
                });
            },
        });
    }

    _subscribeOnce() {
        this.addListener('components.winlines.animateAll.start', this._animationHandler.bind(this));
    }
}

module.exports = ComponentsMegaWinController;
