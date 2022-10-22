class ComponentsSlotMachineSymbol {
    _key = null;
    _animationTween = null;
    _template = null;
    _parent = null;
    _texture = null;
    _tintCfg = null;
    _curTint = null;
    _animationFinishCallbacks = [];

    setConfig(symbolsConfig) {
        const { key, template, parent } = symbolsConfig;
        this._key = key;
        this._template = template;
        this._parent = parent;

        this._updateTexture();
    }

    _updateTexture() {
        if (!this._texture) {
            this._texture = Urso.objects.create(this._template, this._parent, true);
        } else {
            this._texture.changeTexture(this._template.assetKey);
        }
    }

    hide() {
        this._texture.visible = false;
    }

    show() {
        this._texture.visible = true;
    }

    prepareToDrop() {
        this._texture.visible = false;
    }

    destroy() {
        this._texture.destroy(true);
    }

    getAnchors() {
        const { anchorX, anchorY } = this._texture;
        return { anchorX, anchorY };
    }

    setPosition({ x, y }) {
        if (Number.isFinite(x)) {
            this._texture.x = x;
        }

        if (Number.isFinite(y)) {
            this._texture.y = y;
        }
    }

    getPosition() {
        if (!this._texture) {
            return null;
        }

        const { x, y } = this._texture;

        return { x, y };
    }

    animate(onAnimationFinishCallback) {
        this.stopAnimation();

        this._animationFinishCallbacks = [onAnimationFinishCallback];

        if (this._tintCfg) {
            this._animationFinishCallbacks.unshift(() => this._updateTint(this._curTint));
            this._updateTint(this._tintCfg.default);
        }

        this._createAndRunAnimation();
    }

    _createAndRunAnimation() {
        this._animationTween = gsap.timeline({ defaults: { duration: 1 } });
        this._animationTween.to(this._texture, { scaleX: 1.2, scaleY: 1.2 })
            .to(this._texture, {
                scaleX: 1,
                scaleY: 1,
                onComplete: this._makeOnAnimationCompleteClbk(),
            });
    }

    _makeOnAnimationCompleteClbk() {
        return () => {
            this._animationFinishCallbacks.forEach((clbk) => clbk());
            this._animationTween = null;
        };
    }

    setTintConfig(tint) {
        this._tintCfg = tint;
    }

    setTintType(type) {
        this._curTint = this._tintCfg[type] || this._tintCfg.default;

        this._updateTint(this._curTint);
    }

    _updateTint(tint) {
        if (typeof tint !== 'undefined') {
            this._texture.tint = tint;
        }
    }

    stopAnimation() {
        if (this._animationTween) {
            this._animationTween.kill(); // todo find way to stop and destroy it?!

            this._animationTween = null;

            this._texture.scaleX = 1;
            this._texture.scaleY = 1;

            this._makeOnAnimationCompleteClbk()();
        }
    }
}

module.exports = ComponentsSlotMachineSymbol;
