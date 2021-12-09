class ComponentsWinCounterController extends Urso.Core.Components.StateDriven.Controller {
    
    configActions = {
        showWinCounterAction: {
            guard: () => this._getTotalWin(),
            run: () => this._runShowWinCounter(),
            terminate: () => this._terminateShowWinCounter()
        },
        finishCounterAction: {
            guard: () => this._getTotalWin(),
            run: () => this._runFinishCounter(),
            terminate: () => this._terminateFinishCounter()
        }
    };

    _counterText = null;
    _tween = null;
    _finishCounterClbk = null;

    create() {
        this._counterText = this.common.findOne('^counterText');
    }

    get currency() {
        const { currency } = Urso.localData.get('balance');

        if (currency === 'USD') {
            return '$';
        }

        return '';
    }
    
    _runFinishCounter() {
        this._finishCounterClbk = this._useSubcribe('components.slotMachine.stopCommand', () => {
            this._clearFinishCounter();
        });
    }

    _terminateFinishCounter() {
        this._clearFinishCounter();
    }

    _clearFinishCounter() {
        this._finishCounterClbk();
        this.callFinish('finishCounterAction');
    }

    _runShowWinCounter(){
        this._startCounterAnimation();
    }


    _terminateShowWinCounter() {
        this._startLastState();   
    }

    _useSubcribe(event, callback){
        Urso.observer.addListener(event, callback);
        return () => Urso.observer.removeListener(event, callback);
    }

    _getTotalWin() {
        const slotMachineData = Urso.localData.get('slotMachine');
        const { totalWin } = slotMachineData.spinStages[0].slotWin;
        return totalWin;
    }

    _startCounterAnimation() {
        const totalWin = this._getTotalWin();
        const bet = Urso.localData.get('bets.value');

        this._counterText.y = totalWin >= (bet * 10) ? 700 : 500;
        this._counterTextTween(this._counterText, totalWin, this.firstWin);
    }

    _killTween() {
        if(this._tween) {
            this._tween.kill();
        }

        this._tween = null;
    }

    _startLastState(delay = 1000) {
        this._killTween();

        this._counterText.scaleX = 1;
        this._counterText.scaleY = 1;
        this._counterText.alpha = 1;
        this._counterText.text = this._getTotalWin();

        this._tween = gsap.to(this._counterText, { 
            scaleX: 0, 
            scaleY: 0, 
            alpha: 0, 
            delay: delay/1000, 
            onComplete: () => {
                this.emit('components.winField.showWin.finished');
                this.callFinish('showWinCounterAction');
        } });
    }

    _counterTextTween(obj, winVal) {
        this._killTween();

        obj.visible = true;
        obj.scaleX = obj.scaleY = obj.alpha = 0;
        obj.text = 0;
        
        let textConfig = {
            scaleX: 1,
            scaleY: 1,
            alpha: 1, 
            text: winVal,
            onUpdate: () => {
                obj.text = obj.text.toFixed(2)
            },
            duration: 2,
            onComplete: () => {
              this._startLastState()
            }
        };


        this._tween = gsap.to(obj, textConfig);
    }
}

module.exports = ComponentsWinCounterController;
