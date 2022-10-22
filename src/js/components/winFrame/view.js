class ComponentsWinFrameView {
    distance = 220;

    createdSparks = {};

    _generateSparks(position) {
        const name = `${position.x}_${position.y}`;
        const blueSpark = Urso.objects.create(
            {
                type: Urso.types.objects.EMITTER,
                name: `${name}_blue`,
                textures: ['blueFrame'],
                autostart: false,
                cfg: 'winFrameCfg',
            },
            this.common.findOne('^sparks'),
        );
        const pinkSpark = Urso.objects.create(
            {
                type: Urso.types.objects.EMITTER,
                name: `${name}_purple`,
                textures: ['purpleFrame'],
                autostart: false,
                cfg: 'winFrameCfg',
            },
            this.common.findOne('^sparks'),
        );

        this.createdSparks[name] = true;

        return [blueSpark, pinkSpark];
    }

    _animateSparks(obj, spark, distance) {
        spark.emitter.emit = true;
        spark.visible = true;

        spark.emitter.ownerPos.x = obj.x - distance / 2;
        spark.emitter.ownerPos.y = obj.y - distance / 2;

        const tl = gsap.timeline({ defaults: { duration: 0.25 } });

        tl
            .to(spark.emitter.spawnPos, {
                x: distance,
                onStart: () => {
                    spark.visible = true;
                    spark.emitter.emit = true;
                },
            })
            .to(spark.emitter.spawnPos, { y: distance })
            .to(spark.emitter.spawnPos, { x: 0 })
            .to(spark.emitter.spawnPos, {
                y: 0,
                onComplete: () => {
                    spark.emitter.emit = false;
                    spark.visible = false;
                },
            });
    }

    animationStop() {
        const sparksContainer = this.common.findOne('^sparks');
        sparksContainer._baseObject.children.forEach((child) => { child.visible = false; });
    }

    createWinFrame(winPosition) {
        const name = `${winPosition.x}_${winPosition.y}`;

        if (!this.createdSparks[name]) {
            this._generateSparks(winPosition);
        }

        this._animateSparks(winPosition, this.common.findOne(`^${name}_blue`), this.distance);
        this._animateSparks(winPosition, this.common.findOne(`^${name}_purple`), -this.distance);
    }
}

module.exports = ComponentsWinFrameView;
