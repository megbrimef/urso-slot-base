class ComponentsSlotMachineSymbol {
    key = null;
    _animationTween = null;
    texture = null;

    setConfig(symbolsConfig) {
        const { key, template, parent } = symbolsConfig;
        this.key = key;
        
        if(!this.texture) {
            this.texture = Urso.objects.create(template, parent, true);
        } else {
            this.texture.changeTexture(template.assetKey);
        }
    };

    prepareToDrop() {
        this.texture.visible = false;
    }

    destroy() {
        this.texture.destroy(true);
    }
    
    getAnchors() {
        const { anchorX, anchorY } = this.texture;
        return { anchorX, anchorY };
    }

    setPosition ({ x, y }) {
        if (isFinite(x)) {
            this.texture.x = x;
        }

        if (isFinite(y)) {
            this.texture.y = y;
        }
    };

    getPosition() {
        if (!this.texture) {
            return null;
        }

        const { x, y } = this.texture;

        return { x, y };
    }

    animate(clbk) {
        this._animationTween = gsap.timeline({ defaults: { duration: 1 }});

        this._animationTween.to(this.texture, { scaleX: 1.2, scaleY: 1.2 })
            .to(this.texture, { scaleX: 1, scaleY: 1, onComplete: clbk });

        

        // this.emit('component.slotMachine.symbol.startAnimation', this.getPosition());
    }

    stopAnimation() {
        if (this._animationTween) {
            this._animationTween.kill(); //todo find way to stop and desroy it?!

            this._animationTween = null;

            this.texture.scaleX = 1;
            this.texture.scaleY = 1;
        }
    }
}

module.exports = ComponentsSlotMachineSymbol;
