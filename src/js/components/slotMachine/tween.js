/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable no-setter-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable func-names */
class ComponentsSlotMachineTween {
    constructor() {
        this.singleton = true;

        this._tweens = {};
        this._currentTime = 0;
        this._tweenIndex = 0;

        Object.defineProperties(this, {
            "globalTimeScale": {
                "get": function () { return Urso.scenes.timeScale; },
                "set": function () { Urso.logger.error('ComponentsSlotMachineTween: you cannot set globalTimeScale'); },
            },
        });

        this.tweens = this._tweens;
        // this._subscibe();
    }

    // sys
    update() {
        this._update();
    }

    removeAll() {
        for (const k in this._tweens) {
            this._tweens[k].stop();
        }
    }

    add(object) {
        const key = this._keyGenerate();
        const _this = this;
        const tween = {
            id: key,
            isRunning: false,
            enableUpdate: false,
            target: object,
            to: this._to,
            start: this._start,
            pause: this._pause,
            resume: this._resume,
            stop: this._stop,
            points: [],
            manager: this,

            _timeScale: 1,
            get timeScale() {
                return this._timeScale;
            },
            set timeScale(a) {
                if (this._timeScale === a || !this.points[0]) {
                    return this._timeScale;
                }

                const timeDiff = ~~(_this._currentTime - this.points[0].timeStart) * (_this.globalTimeScale * this._timeScale);

                if (this.points[0].duration - timeDiff <= 0) {
                    return this._timeScale;
                }

                this.points[0].duration -= timeDiff;
                this.points[0].timeStart = _this._currentTime;

                // update current point data
                for (const k in this.points[0].propsTo) {
                    this.points[0].propsFrom[k] = this.target[k];
                }

                this._timeScale = a;

                return this._timeScale;
            },

            _started: false,
            _paused: false,
            _pauseTime: false,
            _timeBonus: 0,
            _complete: false,
            _bkp: {
                points: [],
                obj: null,
            },
            _functions: {
                onStart: [],
                onStartOnce: [],
                onUpdate: [],
                onComplete: [],
                onCompleteOnce: [],
            },
        };

        // need to add some functions
        tween.onComplete = {
            addOnce: function (f) {
                tween._functions.onCompleteOnce.push(f);
                return tween;
            },
            add: function (f) {
                tween._functions.onComplete.push(f);
                return tween;
            },
        };

        tween.onStart = {
            addOnce: function (f) {
                tween._functions.onStartOnce.push(f);
                return tween;
            },
            add: function (f) {
                tween._functions.onStart.push(f);
                return tween;
            },
        };

        tween.onUpdateCallback = function (f) {
            tween._functions.onUpdate.push(f);
            return tween;
        };

        this._tweens[key] = tween;

        return tween;
    }

    _to(propsTo, duration, easing, autostart, startDelay) {
        const propsFrom = {};

        for (const k in propsTo) {
            propsFrom[k] = this.target[k];
        }

        if (!startDelay) {
            startDelay = 0;
        }

        const timeStart = this.manager._currentTime + startDelay;
        const point = {
            propsTo,
            duration,
            easing,
            propsFrom,
            timeStart,
            startDelay,
        };

        this.points.push(point);
        this._complete = false;

        if (autostart) {
            this.start();
        }

        return this;
    }

    _start() {
        if (this.isRunning || !this.points || (this.points.length === 0 && this._bkp.points.length === 0)) {
            return this;
        }

        if (this.points.length === 0 && this._bkp.points.length > 0) {
            this.points = this._bkp.points;
            const key = this._keyGenerate();
            this.manager._tweens[key] = this;
        }

        this.points[0].timeStart = this.manager._currentTime + this.points[0].startDelay;

        this._bkp = {
            points: Urso.helper.objectClone(this.points),
            obj: null, // TODO save states for all points
        };

        this._started = true;
        this.isRunning = true;
        this._complete = false;

        for (let i = 0; i < this._functions.onStartOnce.length; i++) {
            this._functions.onStartOnce[i]();
        }

        for (let i = 0; i < this._functions.onStart.length; i++) {
            this._functions.onStart[i]();
        }

        if (this._timeBonus > 0) {
            this.manager._calcStep(this, true);
        }

        return this;
    }

    _pause() {
        this._paused = true;
        this.isRunning = false;
        this._pauseTime = this.manager._currentTime;

        return this;
    }

    _resume() {
        if (this.points && this.points[0]) {
            this.points[0].timeStart += (this.manager._currentTime - this._pauseTime);
        }

        this._paused = false;
        this.isRunning = true;
        this._pauseTime = 0;

        return this;
    }

    _stop() {
        this._complete = true;
        this.isRunning = false;
        delete this.manager._tweens[this.id];

        return this;
    }

    _update() {
        const curTime = (new Date()).getTime();

        // pause ?
        if (this.gamePaused) {
            const delta = curTime - this._currentTime;

            for (const k in this._tweens) {
                if (this._tweens[k].points && this._tweens[k].points[0]) {
                    this._tweens[k].points[0].timeStart += delta;
                }
            }

            return true;
        }

        this._currentTime = curTime;

        for (const k in this._tweens) {
            if (this._tweens[k]._complete) {
                continue; // todo remove old Tweens to garbage collect them (delete this._tweens[k];) if tween dont using in 1-5 min ?
            } else if (this._tweens[k]._started && !this._tweens[k]._paused) {
                this._calcStep(this._tweens[k]);
            }
        }
        return true;
    }

    _keyGenerate() {
        this._tweenIndex++;
        return `${this._currentTime}_${this._tweenIndex}`;
    }

    _calcStep(tween, onStartCall) {
        const point = tween.points[0]; // {propsTo: propsTo, duration: duration, easing: easing, propsFrom: propsFrom, timeStart: this._currentTime}

        if (this._currentTime < point.timeStart) {
            return false;
        }

        const progress = this._applyDelta(tween, point, onStartCall);

        const tweenData = {
            percent: +progress.toFixed(3),
            vEnd: point.propsTo,
        };

        for (let i = 0; i < tween._functions.onUpdate.length; i++) {
            tween._functions.onUpdate[i](tween, progress, tweenData);
        }

        // complete
        if (progress === 1) {
            tween.points.shift();

            if (tween.points.length === 0) {
                // no points
                tween._complete = true;
                tween.isRunning = false;
                const { onComplete } = tween._functions;
                const { onCompleteOnce } = tween._functions;

                tween._functions.onStartOnce = [];
                tween._functions.onCompleteOnce = [];

                if (!tween.enableUpdate) {
                    tween._functions.onStart = [];
                    tween._functions.onUpdate = [];
                    tween._functions.onComplete = [];
                }

                for (let i = 0; i < onCompleteOnce.length; i++) {
                    onCompleteOnce[i]();
                }

                for (let i = 0; i < onComplete.length; i++) {
                    onComplete[i]();
                }
            } else {
                // next point
                const { startDelay } = tween.points[0];

                // calc step for new point
                tween.points[0].timeStart = this._currentTime + startDelay;

                // update start data
                for (const k in tween.points[0].propsTo) {
                    tween.points[0].propsFrom[k] = tween.target[k];
                }

                if (startDelay) {
                    setTimeout(function () {
                        this._calcStep(tween);
                    }, startDelay);
                } else {
                    this._calcStep(tween);
                }
            }
        }

        return true;
    }

    _applyDelta(tween, point, onStartCall) {
        if (tween._timeBonus > 0) {
            point.timeStart -= tween._timeBonus;
            tween._timeBonus = 0;
        }

        const time = this._currentTime;
        let progress = (time - point.timeStart) * tween.timeScale * (this.globalTimeScale / point.duration); // 0-1

        // cannot finish tween onstart in one tick (callbacks magic)
        if (progress >= 1 && onStartCall) {
            progress = 0.99;
        }

        if (progress > 1) {
            progress = 1;

            tween._timeBonus = ~~((time - point.timeStart) - point.duration / (tween.timeScale * this.globalTimeScale));
        }

        // apply objects props
        for (const k in point.propsTo) {
            tween.target[k] = point.propsFrom[k] + (point.propsTo[k] - point.propsFrom[k]) * progress;
        }

        return progress;
    }

    _subscibe() {
        this.addListener(Urso.events.MODULES_SCENES_UPDATE, this._update.bind(this));
    }
}

module.exports = ComponentsSlotMachineTween;
