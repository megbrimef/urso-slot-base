class ComponentsSlotMachineConfig {
    getBasicConfig() {
        return {
            reelsCount: 5,
            rowsCount: 3,
            vectors: false, // or vectors length array like [5, 4, 3, 2, 1]  //todo

            rowsXoffset: [],
            rowsYoffset: [],

            blurSymbolsCount: [5, 10, 15, 20, 25],

            blurAlpha: 0.5,
            borderSymbolsCount: 2,
            spinCompleteDelay: 200, // event delay, after reels stops

            hideMaskOnSpinComplete: true,

            tint: {
                default: 0xFFFFFF,
                darken: 0x555555,
                duration: 500,
            },

            bounce: {
                top: false, // { to: { y: -80, x: 0 }, duration: 200 }
                bottom: false, // { to: { y: 80, x: 0 }, duration: 200 }
            },

            symbolSpeed: 3, // pixels in MS
            spinStartInterval: 100, // per reel

            speedUpReelsFactor: 2.5,

            // intrigue
            intrigueSpeedReelsFactor: 1.5,
            intrigueAdditionalSymbols: 20,

            symbolsBlurKeys: [], // array or array of arrays for each reel
            // eslint-disable-next-line max-len
            lastSymbolsBlurStaticKeys: [], // array or array of arrays for each reel [1,2,3,4] or [false,false,[1]]
        };
    }

    getReel15Row1Config() {
        const basic = this.getBasicConfig();
        return {
            ...basic,
            reelsCount: 15,
            rowsCount: 1,
            rowsXoffset: [0, 0, 0, 0, 0, -5, -5, -5, -5, -5, -10, -10, -10, -10, -10],
            rowsYoffset: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
            symbolWidth: 790 / 5,
            symbolHeight: 501 / 3,
        };
    }

    getCascadeConfig() {
        const basic = this.getBasicConfig();
        return {
            ...basic,
            regularEasingParam: 75,
            borderSymbolsCount: 0,
            cascadeDuration: 400,
        };
    }

    getDropConfig() {
        const basic = this.getBasicConfig();
        return {
            ...basic,
            dropRemainSymbols: {
                delay: 0,
                duration: 200/1000,
                speedUpTimescale: 2,
                ease: 'expo.out'
            },
            dropNewSymbols: {
                delay: 250/1000,
                duration: 200/1000,
                speedUpTimescale: 2,
                ease: 'expo.out'
            },
            dropBounce: {
                bottom: [
                    { x: 0, y: -10, duration: 136, ease: 'power2.out' },
                    { x: 0, y: 0, duration: 136, ease: 'power2.in' },
                    { x: 0, y: -5, duration: 136/2, ease: 'power2.out' },
                    { x: 0, y: 0, duration: 136/2, ease: 'power2.in' },
                ]
            }
        };
    }

    getAllConfigsMap() {
        const basic = this.getBasicConfig();
        const reel15Row1 = this.getReel15Row1Config();
        const cascade = this.getCascadeConfig();
        const drop = this.getDropConfig();

        return {
            basic,
            reel15Row1,
            cascade,
            drop,
        };
    }

    getConfigById(id) {
        const configs = this.getAllConfigsMap();
        return configs[id] || this.getBasicConfig();
    }
}

module.exports = ComponentsSlotMachineConfig;
