class ComponentsSlotMachineConfig {

    get() {
        return {
            reelsCount: 5,
            rowsCount: 3,
            vectors: false, // or vectors length array like [5, 4, 3, 2, 1]  //todo

            rowsXoffset: false, // or array like [15, 20, 30, 40, 50]   //todo
            rowsYoffset: false, // or array like [15, 20, 30, 40, 50]   //todo

            blurSymbolsCount: [5, 10, 15, 20, 25],

            blurAlpha: 0.5,

            spinCompleteDelay: 200, //event delay, after reels stops

            symbolSpeed: 1.5, //pixels in MS
            spinStartInterval: 0, //per reel

            speedUpReelsFactor: 2.5,

            //intrigue
            intrigueSpeedReelsFactor: 1.5,
            intrigueAdditionalSymbols: 20,

            symbolsBlurKeys: [], //array or array of arrays for each reel
            lastSymbolsBlurStaticKeys: [] //array or array of arrays for each reel [1,2,3,4] or [false,false,[1]]
        }
    }

    getSymbols() {
        return [
            {
                key: '0',
                object: { type: Urso.types.objects.IMAGE, assetKey: '00', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '1',
                object: { type: Urso.types.objects.IMAGE, assetKey: '01', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '2',
                object: { type: Urso.types.objects.IMAGE, assetKey: '02', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '3',
                object: { type: Urso.types.objects.IMAGE, assetKey: '03', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '4',
                object: { type: Urso.types.objects.IMAGE, assetKey: '04', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '5',
                object: { type: Urso.types.objects.IMAGE, assetKey: '05', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '6',
                object: { type: Urso.types.objects.IMAGE, assetKey: '06', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '7',
                object: { type: Urso.types.objects.IMAGE, assetKey: '07', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '8',
                object: { type: Urso.types.objects.IMAGE, assetKey: '08', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '9',
                object: { type: Urso.types.objects.IMAGE, assetKey: '09', anchorX: 0.5, anchorY: 0.5 }
            },
            {
                key: '10',
                object: { type: Urso.types.objects.IMAGE, assetKey: '10', anchorX: 0.5, anchorY: 0.5 }
            }
        ];
    }
};

module.exports = ComponentsSlotMachineConfig;
