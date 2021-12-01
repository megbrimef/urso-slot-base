class ComponentsSlotMachineSymbol {

    constructor(symbolsConfig) {
        this.key = symbolsConfig.key;
        this.object = Urso.objects.create(symbolsConfig.template, symbolsConfig.parent, true);
        this._animationTween = null;
    }

    destroy() {
        this.object.destroy(true);
    }

    setPosition(x, y) {
        this.object.x = x;
        this.object.y = y;
    }

    getPosition() {
        return {
            x: this.object.x,
            y: this.object.y
        }
    }

    animate() {
        this._animationTween = gsap.timeline({ defaults: { duration: 1 } });

        this._animationTween.to(this.object, { scaleX: 1.2, scaleY: 1.2 })
            .to(this.object, { scaleX: 1, scaleY: 1 });

        this.emit('component.slotMachine.symbol.startAnimation', this.getPosition());
    }

    stopAnimation() {
        setTimeout(() => {
            if (this._animationTween) {
                this._animationTween.kill(); //todo find way to stop and desroy it?!

                this._animationTween = null;

                this.object.scaleX = 1;
                this.object.scaleY = 1;
            }
        }, 10);
    }
}

module.exports = ComponentsSlotMachineSymbol;
