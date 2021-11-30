class ComponentsSlotMachineSymbol {

    constructor() {
        this.tween = this.getInstance('Tween');
        this.timeScale = 1;
        this.startTween = gsap.timeline();
        this.filter = new PIXI.filters.ColorMatrixFilter();
        this.reset();
    }

    getAnchor() {
        const { anchorX, anchorY } = this._texture;
        return { anchorX, anchorY };
    }

    getPosition() {
        const { x, y } = this._texture;
        return { x, y };
    }

    _getKey(symbol) {
        return Urso.helper.ldgZero(symbol, 2);
    }

    setSymbolsConfig(symbolsConfig){
        const { template, parent } = symbolsConfig;

        this._parent = parent;

        if (!this._texture) {
            this._createTexture(template);
        }

        const textureKey = this._getKey(template.key);

        this.setTexture(textureKey);

        if(this._needAddToParent())
            this._addToParent();
    }
    
    _needAddToParent(){
        return this._parent && this._parent !== this._texture.parent;
    }

    _addToParent(){
        this._parent.addChild(this._texture);
    }

    _createTexture({ object }) {
        this._texture = Urso.objects.create(object, null, true);
    }

    reset() {
        this._tintAnimation = null;
        this.brightness = { currentBrightness: 1 };
        this.animationTween = null;

        if (this.activeTween)
            this.activeTween.stop();

        this.activeTween = null;

        if (this._texture)
            this.nextY = this._texture.y;
    }

    removeFromScene() {
        if (this.parent) {
            this.parent.removeChild(this.texture);
        }

        this.parent = null;
    }

    setTexture(textureKey) {
        this._texture.changeTexture(textureKey);
    }

    setPosition(x, y) {
        this._texture.x = x;
        this._texture.y = y;
        this.nextY = y;
    }

    createAndStartTintAnimation(needTint, isAnimationStopped) {
        if(!this._texture)
            return

        if (this._tintAnimation)
            this._tintAnimation.kill();

        
        const targetBrightness = needTint ? 0.3 : 1;
        const duration = isAnimationStopped ? 0.2 : 1;

        this._tintAnimation = gsap.to(this.brightness, duration, {
            currentBrightness: targetBrightness,
            onUpdate: () => {
                this.filter.brightness(this.brightness.currentBrightness);
                this._texture._baseObject.filters = [this.filter];
            }
        })
    }

    animate() {
        if (!this._texture)
            return

        this.animationTween = gsap.timeline({ defaults: { duration: 1 } });

        this.animationTween.to(this._texture, { scaleX: 1.2, scaleY: 1.2 })
            .to(this._texture, { scaleX: 1, scaleY: 1 });
    }

    stopAnimation() {
        setTimeout(() => {
            if (this.animationTween) {
                this.animationTween.kill(); //todo find way to stop and desroy it?!

                this.animationTween = null;

                this._texture.scaleX = 1;
                this._texture.scaleY = 1;
            }
        }, 10)
    }

    setTimeScale(timeScale) {
        if (this.activeTween) {
            this.tween.globalTimeScale = timeScale;
        }

        this.startTween.timeScale(timeScale);
        this.timeScale = timeScale;
    }

    _createTweenAndStart(tweenDuration, startDelay, callback, bounceData) {
        startDelay = startDelay > 0 ? startDelay / 1000 : 0;
        this.activeTween = this.tween.add(this._texture);
        this.activeTween.onComplete.addOnce(() => callback());
        this.setTimeScale(this.timeScale);

        if(bounceData)
            this._bounceOnStart(bounceData);

        this.activeTween.to({ y: this.nextY }, tweenDuration, 'none', true)
    }

    _bounceOnStart({ moveTo, duration }) {
        this.activeTween.to({ y: this._texture.y - moveTo }, duration, 'none', false);
    }

    bounceOnFinish({ moveTo, duration }) {
        if (!this.activeTween)
            this.activeTween = this.tween.add(this._texture);

        this.activeTween.to({ y: this._texture.y + moveTo }, duration / 2, 'none', true);
        this.activeTween.to({ y: this.nextY }, duration / 2, 'none', true);
        this.activeTween.onComplete.addOnce(() => this.reset());
    }

    moveTween(moveTo, tweenDuration, startDelay, callback, bounceData) {
        this.nextY += moveTo;

        if (!this.activeTween) {
            this._createTweenAndStart(tweenDuration, startDelay, callback, bounceData)
            return
        }
        this.activeTween.onComplete.addOnce(() => callback());
        this.activeTween.to({ y: this.nextY }, tweenDuration, 'none');
    }
}

module.exports = ComponentsSlotMachineSymbol;
